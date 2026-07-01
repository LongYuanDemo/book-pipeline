#!/usr/bin/env node
/**
 * 知识地图实体提取 — LangGraph 工作流版本
 *
 * 用 LangGraph 的 entrypoint + task 模式编排：
 * 1. 加载书籍 → 拆分 module/task
 * 2. 并发调用 Kimi 提取实体（fan-out）
 * 3. 合并去重（fan-in）
 * 4. 保存结果
 *
 * 用法:
 *   npx tsx skills/knowledge-map-generator/scripts/extract-workflow.ts \
 *     --book-id text-crossing-test [--concurrency 5]
 */

import { writeFile } from 'fs/promises';
import { entrypoint, task, MemorySaver } from '@langchain/langgraph';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callCoze } from '../../shared/coze.ts';
import {
  loadBookTextContext,
  getChapterText,
  getTaskText,
  type BookTextContext,
  type SourceModule,
} from './loaders/bookLoader.ts';
import { validateTsFile } from '../../shared/validator.ts';

/* ------------------------------------------------------------------ */
// 类型定义

interface KnowledgeEntity {
  id: string;
  title: string;
  author?: string;
  year?: number | null;
  culture: string;
  medium: string;
  type: 'work' | 'person' | 'concept' | 'location' | 'medium' | 'culture';
  summary: string;
  chapterRefs: string[];
  aliases?: string[];
}

interface EntityExtractionResult {
  entities: KnowledgeEntity[];
  source: 'llm' | 'rule';
  note?: string;
}

interface ExtractUnit {
  moduleId: string;
  moduleTitle: string;
  unitId: string;
  unitTitle: string;
  text: string;
}

/* ------------------------------------------------------------------ */
// 命令行参数

function parseArgs(): { bookId: string; concurrency: number } {
  const args = process.argv.slice(2);
  let bookId = '';
  let concurrency = 5;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--concurrency' && args[i + 1]) {
      concurrency = parseInt(args[i + 1], 10) || 5;
      i++;
    }
  }

  if (!bookId) {
    console.error('用法: npx tsx extract-workflow.ts --book-id <bookId> [--concurrency 5]');
    process.exit(1);
  }

  return { bookId, concurrency };
}

/* ------------------------------------------------------------------ */
// Prompt 构建

function buildPrompt(bookTitle: string, unitTitle: string, unitText: string, moduleId: string): string {
  return `你是一位比较文学与跨文化研究专家。请从教材《${bookTitle}》的以下内容中提取所有重要实体。

内容：${unitTitle}

教材原文：
${unitText.slice(0, 12000)}

请严格输出以下 JSON 格式（不要 markdown 代码块，不要额外解释）：
{
  "entities": [
    {
      "id": "work-1",
      "title": "《女人之过》",
      "author": "伯莎·M.克莱",
      "year": null,
      "culture": "美国文学",
      "medium": "小说",
      "type": "work",
      "summary": "50-100字简介",
      "chapterRefs": ["${moduleId}"],
      "aliases": []
    }
  ]
}

字段说明：
- id: 唯一标识，只能包含字母、数字、下划线、连字符
- title: 实体名称，作品请带书名号《》
- author: 作者/译者/改编者，不确定则 null
- year: 年份，不确定则 null
- culture: 文化圈层
- medium: 媒介类型
- type: 只能是 work/person/concept/location/medium/culture
- summary: 50-100 字简介
- chapterRefs: 出现该实体的模块 id
- aliases: 别名数组（可空）

要求：
1. 提取该内容中出现的所有重要实体（作品、人物、概念、媒介等）
2. 只输出 JSON，不要任何解释`;
}

/* ------------------------------------------------------------------ */
// JSON 解析

function parseLLMOutput(output: string): KnowledgeEntity[] | null {
  try {
    // 直接尝试 JSON.parse — callCoze 返回的应该是有效 JSON
    let parsed: any;
    try {
      parsed = JSON.parse(output);
    } catch {
      // 如果直接 parse 失败，尝试提取包含 "entities" 的 JSON 对象
      const entitiesIdx = output.indexOf('"entities"');
      if (entitiesIdx === -1) return null;
      
      // 向前找 { 
      let braceStart = output.lastIndexOf('{', entitiesIdx);
      if (braceStart === -1) return null;
      
      // 向后做括号匹配
      let depth = 0;
      let inString = false;
      let escape = false;
      let end = -1;
      
      for (let i = braceStart; i < output.length; i++) {
        const ch = output[i];
        if (escape) { escape = false; continue; }
        if (ch === '\\') { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === '{') depth++;
        if (ch === '}') {
          depth--;
          if (depth === 0) { end = i; break; }
        }
      }
      
      if (end === -1) return null;
      const candidate = output.slice(braceStart, end + 1);
      parsed = JSON.parse(candidate);
    }
    
    const entities = Array.isArray(parsed.entities) ? parsed.entities : Array.isArray(parsed) ? parsed : null;
    if (!entities) return null;
    return entities
      .filter((e: any) => e.title)
      .map((e: any) => ({
        id: e.id || `entity-${Math.random().toString(36).slice(2, 8)}`,
        title: e.title,
        author: e.author || e.translator || e.adapter,
        year: e.year === undefined ? null : e.year,
        culture: e.culture || '其他',
        medium: e.medium || '文本',
        type: e.type || 'work',
        summary: e.summary || '',
        chapterRefs: Array.isArray(e.chapterRefs) ? e.chapterRefs : [],
        aliases: Array.isArray(e.aliases) ? e.aliases : [],
      }));
  } catch (err) {
    console.warn('[extract-workflow] JSON 解析失败:', err);
    return null;
  }
}

function normalizeTitle(title: string): string {
  return title.replace(/[《》]/g, '').trim().toLowerCase();
}

/* ------------------------------------------------------------------ */
// LangGraph tasks

/** 拆分书籍为提取单元 */
const splitBookIntoUnits = task(
  'splitBookIntoUnits',
  async (context: BookTextContext): Promise<ExtractUnit[]> => {
    const units: ExtractUnit[] = [];

    for (const mod of context.sourceParsed.modules) {
      const modText = getChapterText(context, mod.id);
      if (modText.length < 50) continue;

      // 模块文本超过 12K，按 task 拆分
      if (modText.length > 12000) {
        for (const t of mod.tasks) {
          const taskText = getTaskText(context, t.id);
          if (taskText.length < 50) continue;
          units.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            unitId: t.id,
            unitTitle: `${mod.title} / ${t.title}`,
            text: taskText,
          });
        }
      } else {
        units.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          unitId: mod.id,
          unitTitle: mod.title,
          text: modText,
        });
      }
    }

    return units;
  },
);

/** 对单个提取单元调用 Coze */
const extractUnitEntities = task(
  'extractUnitEntities',
  async (unit: ExtractUnit, bookTitle: string): Promise<{ unit: ExtractUnit; entities: KnowledgeEntity[] }> => {
    const prompt = buildPrompt(bookTitle, unit.unitTitle, unit.text, unit.moduleId);
    const output = await callCoze([{ role: 'user', content: prompt }]);

    if (!output) {
      console.warn(`[extract-workflow] ${unit.unitId} Coze 返回空`);
      return { unit, entities: [] };
    }

    const entities = parseLLMOutput(output);
    if (!entities || entities.length === 0) {
      console.warn(`[extract-workflow] ${unit.unitId} 解析失败或无实体`);
      return { unit, entities: [] };
    }

    console.log(`[extract-workflow] ${unit.unitId} → ${entities.length} 个实体`);
    return { unit, entities };
  },
);

/** 合并去重 */
const mergeEntities = task(
  'mergeEntities',
  async (results: { unit: ExtractUnit; entities: KnowledgeEntity[] }[]): Promise<KnowledgeEntity[]> => {
    const merged: KnowledgeEntity[] = [];
    const seen = new Set<string>();

    for (const { unit, entities } of results) {
      for (const e of entities) {
        const key = normalizeTitle(e.title);
        if (seen.has(key)) {
          const existing = merged.find((m) => normalizeTitle(m.title) === key);
          if (existing) {
            if (!existing.chapterRefs.includes(unit.moduleId)) {
              existing.chapterRefs.push(unit.moduleId);
            }
            if (e.aliases && e.aliases.length > 0) {
              existing.aliases = [...new Set([...(existing.aliases || []), ...e.aliases])];
            }
          }
          continue;
        }
        seen.add(key);
        if (!e.chapterRefs.includes(unit.moduleId)) {
          e.chapterRefs.push(unit.moduleId);
        }
        merged.push(e);
      }
    }

    return merged;
  },
);

/* ------------------------------------------------------------------ */
// 并发控制

async function runWithConcurrency<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  limit: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/* ------------------------------------------------------------------ */
// LangGraph entrypoint — 工作流编排

const bookExtractWorkflow = entrypoint(
  { name: 'bookExtractWorkflow' },
  async (params: { bookId: string; concurrency: number }) => {
    console.log(`[extract-workflow] 启动工作流: bookId=${params.bookId}, concurrency=${params.concurrency}`);

    // Step 1: 加载书籍
    const context = await loadBookTextContext(params.bookId);
    const bookTitle = context.sourceParsed.bookMeta.title || params.bookId;
    console.log(`[extract-workflow] 书名: ${bookTitle}`);
    console.log(`[extract-workflow] 共 ${context.sourceParsed.modules.length} 个模块`);

    // Step 2: 拆分为提取单元
    const units = await splitBookIntoUnits(context);
    console.log(`[extract-workflow] 拆分为 ${units.length} 个提取单元`);
    for (const u of units) {
      console.log(`  ${u.unitId}: ${u.unitTitle} (${u.text.length} 字符)`);
    }

    // Step 3: 并发调用 Coze（fan-out）
    console.log(`[extract-workflow] 开始并发提取（并发度: ${params.concurrency}）...`);
    const rawResults = await runWithConcurrency(
      units,
      (unit) => extractUnitEntities(unit, bookTitle),
      params.concurrency,
    );
    let results = await Promise.all(rawResults);

    // Step 3b: 重试失败单元（降并发到 2）
    const failedUnits = results.filter((r) => r.entities.length === 0).map((r) => r.unit);
    if (failedUnits.length > 0) {
      console.log(`[extract-workflow] ${failedUnits.length} 个单元失败，降并发重试（并发度: 2）...`);
      const retryResults = await runWithConcurrency(
        failedUnits,
        (unit) => extractUnitEntities(unit, bookTitle),
        2,
      );
      const retryResolved = await Promise.all(retryResults);

      // 用重试结果替换失败结果
      const retryMap = new Map(retryResolved.map((r) => [r.unit.unitId, r]));
      results = results.map((r) => retryMap.get(r.unit.unitId) || r);
    }

    // Step 4: 合并去重（fan-in）
    const merged = await mergeEntities(results);
    console.log(`[extract-workflow] 合并去重后: ${merged.length} 个实体`);

    // Step 5: 统计成功/失败
    const successCount = results.filter((r) => r.entities.length > 0).length;
    const failCount = results.length - successCount;
    console.log(`[extract-workflow] 成功: ${successCount}/${units.length}, 失败: ${failCount}`);

    // 列出仍然失败的单元
    const stillFailed = results.filter((r) => r.entities.length === 0).map((r) => r.unit.unitId);
    if (stillFailed.length > 0) {
      console.warn(`[extract-workflow] 仍然失败的单元: ${stillFailed.join(', ')}`);
    }

    return { entities: merged, successCount, totalUnits: units.length };
  },
);

/* ------------------------------------------------------------------ */
// 规则 fallback（与 extract-entities.ts 相同的逻辑）

const WORK_TITLES: Array<{ title: string; author?: string; year?: number; culture: string; medium: string; summary: string; aliases?: string[] }> = [
  { title: '《女人之过》', author: '伯莎·M.克莱', culture: '美国文学', medium: '小说', summary: '美国廉价小说原作', aliases: ["A Woman's Error"] },
  { title: '《野之花》', author: '黑岩泪香译', year: 1900, culture: '日本文学', medium: '翻译小说', summary: '《女人之过》日文译本，1900年在《万朝报》连载' },
  { title: '《越过那座山》', author: '佐藤红绿', year: 1935, culture: '日本文学', medium: '小说', summary: '《野之花》的日本模仿作品' },
  { title: '《空谷兰》', author: '包天笑译', year: 1910, culture: '中国文学', medium: '翻译小说', summary: '《野之花》中文译本，1910-1911年在《时报》连载' },
  { title: '《幽兰夫人》', culture: '跨媒介改编', medium: '沪剧', summary: '沪剧改编作品' },
];

const MEDIUM_PATTERNS = [
  { pattern: /文明戏《空谷兰》/g, title: '文明戏《空谷兰》', medium: '文明戏', culture: '跨媒介改编' },
  { pattern: /无声电影《空谷兰》/g, title: '无声电影《空谷兰》', medium: '无声电影', culture: '跨媒介改编' },
  { pattern: /有声电影《空谷兰》/g, title: '有声电影《空谷兰》', medium: '有声电影', culture: '跨媒介改编' },
  { pattern: /粤语片《空谷兰》/g, title: '粤语片《空谷兰》(1954)', medium: '粤语片', culture: '跨媒介改编' },
  { pattern: /香港国语片《空谷兰》/g, title: '香港国语片《空谷兰》(1966)', medium: '香港国语片', culture: '跨媒介改编' },
  { pattern: /沪剧《幽兰夫人》/g, title: '沪剧《幽兰夫人》(1980)', medium: '沪剧', culture: '跨媒介改编' },
  { pattern: /地方戏《空谷兰》/g, title: '地方戏《空谷兰》', medium: '地方戏曲', culture: '跨媒介改编' },
];

const PEOPLE = [
  { name: '伯莎·M.克莱', role: '原作者' },
  { name: '黑岩泪香', role: '日本译者' },
  { name: '包天笑', role: '中文译者' },
  { name: '佐藤红绿', role: '日本改编者' },
  { name: '郑正秋', role: '文明戏改编者' },
  { name: '关文清', role: '粤语片导演' },
];

function buildRuleEntities(context: BookTextContext): KnowledgeEntity[] {
  const fullText = getChapterText(context, 'all');
  const entities: KnowledgeEntity[] = [];
  const seen = new Set<string>();

  function add(e: KnowledgeEntity) {
    const key = normalizeTitle(e.title);
    if (seen.has(key)) return;
    seen.add(key);
    entities.push(e);
  }

  add({
    id: 'center-work',
    title: context.sourceParsed.bookMeta.title || '教材主题',
    culture: '源起',
    medium: '教材主题',
    type: 'concept',
    summary: '跨文化文本旅行核心主题',
    chapterRefs: [],
  });

  for (const w of WORK_TITLES) {
    if (fullText.includes(w.title.replace(/[《》]/g, '')) || fullText.includes(w.title)) {
      add({
        id: `work-${w.title.replace(/[^\w一-龥]/g, '-').toLowerCase()}`,
        title: w.title,
        author: w.author,
        year: w.year || null,
        culture: w.culture,
        medium: w.medium,
        type: 'work',
        summary: w.summary,
        chapterRefs: [],
        aliases: w.aliases,
      });
    }
  }

  for (const pat of MEDIUM_PATTERNS) {
    if (pat.pattern.test(fullText)) {
      add({
        id: pat.title.replace(/[^\w一-龥]/g, '-').replace(/-+/g, '-').toLowerCase(),
        title: pat.title,
        culture: pat.culture,
        medium: pat.medium,
        type: 'work',
        summary: `${pat.medium}改编作品`,
        chapterRefs: [],
      });
    }
  }

  for (const p of PEOPLE) {
    if (fullText.includes(p.name)) {
      add({
        id: `person-${p.name.replace(/[·\s]/g, '-')}`,
        title: p.name,
        culture: '人物',
        medium: p.role,
        type: 'person',
        summary: `${p.role}，推动《女人之过》在中日两国的文本旅行`,
        chapterRefs: [],
      });
    }
  }

  return entities;
}

/* ------------------------------------------------------------------ */
// 主流程

async function main() {
  const { bookId, concurrency } = parseArgs();

  const result = await bookExtractWorkflow.invoke({ bookId, concurrency });

  let finalResult: EntityExtractionResult;

  if (result.entities.length >= 5) {
    finalResult = {
      entities: result.entities,
      source: 'llm',
      note: `LangGraph 工作流：${result.successCount}/${result.totalUnits} 个单元成功，共 ${result.entities.length} 个实体`,
    };
  } else {
    console.warn(`[extract-workflow] LLM 提取不足（${result.entities.length} 个），使用规则 fallback`);
    const context = await loadBookTextContext(bookId);
    const ruleEntities = buildRuleEntities(context);
    finalResult = {
      entities: ruleEntities,
      source: 'rule',
      note: `LLM 返回不足，规则 fallback 提取了 ${ruleEntities.length} 个实体`,
    };
  }

  // 保存
  const outPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(finalResult, null, 2), 'utf-8');
  console.log(`[extract-workflow] 已保存 ${finalResult.entities.length} 个实体到 ${outPath}（来源：${finalResult.source}）`);
}

main();
