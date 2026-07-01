#!/usr/bin/env node
/**
 * 实体提取脚本（Skills 范式重构版）
 *
 * 业务逻辑（prompt 内容、实体类型）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、JSON 解析、去重、occurrences 计算。
 *
 * 用法:
 *   npx tsx extract-entities.ts --book-id <bookId> --prompt-file <path>
 *   （无 --prompt-file 时使用通用 fallback prompt）
 *
 * 输出：books/{bookId}/data/knowledgeMap-entities.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callCoze } from '../../shared/coze.ts';
import {
  loadBookTextContext,
  getChapterText,
  getTaskText,
  getFullText,
  type BookTextContext,
} from './loaders/bookLoader.ts';

export interface EntityRef {
  chapter: string;
  title: string;
  pn: string;
}

export interface EntityOccurrence {
  taskId: string;
  pn: string;
  offset?: number;
  length?: number;
}

export interface KnowledgeEntity {
  id: string;
  title: string;
  author?: string;
  year?: number | null;
  culture: string;
  medium: string;
  type: string;
  summary: string;
  chapterRefs: string[];
  aliases?: string[];
  count?: number;
  refs?: EntityRef[];
  gloss?: string;
  desc?: string;
  occurrences?: EntityOccurrence[];
}

export interface EntityExtractionResult {
  entities: KnowledgeEntity[];
  source: 'llm' | 'rule';
  note?: string;
}

function buildDefaultModulePrompt(
  bookTitle: string,
  moduleTitle: string,
  moduleText: string,
  moduleId: string,
  taskIds: { id: string; title: string }[],
): string {
  const taskIdList = taskIds.map((t) => `  ${t.id} → ${t.title}`).join('\n');
  const validIds = taskIds.map((t) => t.id).concat([moduleId]);
  return `你是一位教材知识体系分析专家。请从教材《${bookTitle}》的以下模块中提取所有重要实体。

模块：${moduleTitle}（模块ID: ${moduleId}）

该模块包含以下任务（请务必使用这些真实ID）：
${taskIdList}

合法的 chapter ID 列表（refs.chapter 和 chapterRefs 只能从中选择）：
${validIds.join(', ')}

教材内容：
${moduleText.slice(0, 12000)}

请严格输出以下 JSON 格式（不要 markdown 代码块，不要额外解释）：
{
  "entities": [
    {
      "id": "concept-1",
      "title": "实体名称",
      "author": null,
      "year": null,
      "culture": "根据实体在知识体系中的角色分类",
      "medium": "实体的媒介或表现形式",
      "type": "concept",
      "summary": "50-100字简介",
      "gloss": "简短释义",
      "desc": "一句话描述",
      "chapterRefs": ["${moduleId}"],
      "count": 3,
      "refs": [{"chapter": "<合法ID>", "title": "<对应标题>", "pn": "pn-1"}],
      "aliases": []
    }
  ]
}

字段说明：
- id: 唯一标识，只能包含字母、数字、下划线、连字符。同一实体在全书中的 id 必须一致
- title: 实体名称
- type: 实体类型，根据教材内容自适应选择。常见类型包括但不限于：
  - 文学/翻译类: work(作品) / person(人物) / concept(概念) / medium(媒介) / location(地点) / organization(机构)
  - 医学类: disease(疾病) / drug(药物) / procedure(操作) / anatomy(解剖) / concept(概念) / person(人物)
  - 工程类: tool(工具) / process(流程) / material(材料) / step(步骤) / concept(概念) / safety(安全)
  - 通用: concept(概念) / person(人物) / organization(机构) / location(地点) / event(事件) / theory(理论)
  请根据实际内容选择最贴切的类型英文单词
- culture: 知识分类，根据实体在教材中的角色自定义，不要全部填同一个值。例如：
  - 翻译/文学研究类：原著来源、翻译改编、学术概念、历史背景、媒介载体
  - 医学类：基础理论、临床应用、药物疗法、护理操作、拓展延伸
  - 工程类：基础原理、工具材料、工艺流程、安全规范、拓展延伸
  - 通用：核心概念、基础理论、实践应用、拓展延伸
- medium: 实体媒介或表现形式（如 小说/电影/戏剧/概念/理论/方法 等）
- chapterRefs: 必须使用上面列出的合法 ID，不要用中文"第一章"等
- refs: 【必填】每个实体至少1条引用，chapter 必须是上面列出的合法 ID 之一，title 是对应模块/任务标题，pn 是段落编号如"pn-1"
- count: 该实体在本文中出现的次数
- aliases: 实体的别名或简称列表

严格要求：
1. 提取该模块中出现的所有重要实体（概念、技术、人物、机构、疾病、药物等，根据教材类型自适应）
2. chapterRefs 和 refs.chapter 必须使用上面列出的合法 ID 之一，绝对不要用中文章节名
3. refs 字段必须填写，每个实体至少1条引用记录
4. 每个实体的 id 必须唯一，不要与已有实体冲突
5. culture 字段要根据实体角色分类，不要全部填同一个值
6. 只输出 JSON，不要任何解释`;
}

function buildModulePromptFromTemplate(
  template: string,
  bookTitle: string,
  moduleTitle: string,
  moduleText: string,
  moduleId: string,
  taskIds: { id: string; title: string }[],
): string {
  const taskIdList = taskIds.map((t) => `  ${t.id} → ${t.title}`).join('\n');
  const validIds = taskIds.map((t) => t.id).concat([moduleId]);
  return template
    .replace(/\{\{bookTitle\}\}/g, bookTitle)
    .replace(/\{\{moduleTitle\}\}/g, moduleTitle)
    .replace(/\{\{moduleId\}\}/g, moduleId)
    .replace(/\{\{taskIds\}\}/g, taskIdList)
    .replace(/\{\{validIds\}\}/g, validIds.join(', '))
    .replace(/\{\{moduleText\}\}/g, moduleText.slice(0, 12000));
}

/** Remap sourceParsed IDs to bookInfo IDs in entity chapterRefs and refs */
function remapEntityIds(entities: KnowledgeEntity[], idMap: Map<string, string>): KnowledgeEntity[] {
  if (idMap.size === 0) return entities;
  return entities.map((e) => ({
    ...e,
    chapterRefs: e.chapterRefs?.map((id) => idMap.get(id) || id) || [],
    refs: e.refs?.map((r) => ({
      ...r,
      chapter: idMap.get(r.chapter) || r.chapter,
    })) || [],
  }));
}

function parseLLMOutput(output: string, validIds: Set<string>): KnowledgeEntity[] | null {
  try {
    const match = output.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
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
        type: e.type || 'concept',
        summary: e.summary || '',
        chapterRefs: Array.isArray(e.chapterRefs) ? e.chapterRefs.filter((id: string) => validIds.has(id)) : [],
        aliases: Array.isArray(e.aliases) ? e.aliases : [],
        gloss: e.gloss || '',
        desc: e.desc || '',
        count: e.count || 0,
        refs: Array.isArray(e.refs) ? e.refs.filter((r: any) => validIds.has(r.chapter)) : [],
      }));
  } catch (err) {
    console.warn('[extract-entities] JSON 解析失败:', err);
    return null;
  }
}

function normalizeTitle(title: string): string {
  return title.replace(/[《》]/g, '').trim();
}

function buildRuleEntities(context: BookTextContext): KnowledgeEntity[] {
  const entities: KnowledgeEntity[] = [];
  const seen = new Set<string>();

  function add(e: KnowledgeEntity) {
    const key = normalizeTitle(e.title);
    if (seen.has(key)) return;
    seen.add(key);
    entities.push(e);
  }

  // 中心主题（通用，不绑定特定书籍）
  const bookTitle = context.sourceParsed.bookMeta.title || '教材主题';
  add({
    id: 'center-work',
    title: bookTitle,
    culture: '核心概念',
    medium: '教材主题',
    type: 'concept',
    summary: `${bookTitle}知识体系核心`,
    chapterRefs: context.sourceParsed.modules.map((m: any) => m.id),
    count: context.sourceParsed.modules.length,
    refs: context.sourceParsed.modules.map((m: any) => ({ chapter: m.id, title: m.title, pn: `pn-${m.id}.1` })),
  });

  // 通用：从各模块标题提取实体（不硬编码特定书籍内容）
  for (const mod of context.sourceParsed.modules) {
    const modText = getChapterText(context, mod.id);
    if (modText.length < 50) continue;

    // 提取模块标题作为实体
    add({
      id: `module-${mod.id}`,
      title: mod.title,
      culture: '章节主题',
      medium: '章节',
      type: 'concept',
      summary: `${mod.title} — ${bookTitle}的核心模块`,
      chapterRefs: [mod.id],
      count: 1,
      refs: [{ chapter: mod.id, title: mod.title, pn: 'pn-1' }],
    });

    // 提取任务标题作为实体
    for (const task of mod.tasks) {
      const taskText = getTaskText(context, task.id);
      if (taskText.length < 50) continue;
      add({
        id: `task-${task.id}`,
        title: task.title,
        culture: '知识点',
        medium: '任务',
        type: 'concept',
        summary: `${task.title} — ${mod.title}中的知识点`,
        chapterRefs: [task.id],
        count: 1,
        refs: [{ chapter: task.id, title: task.title, pn: 'pn-1' }],
      });
    }
  }

  return entities;
}

export async function extractEntities(bookId: string, promptFilePath?: string): Promise<EntityExtractionResult> {
  const context = await loadBookTextContext(bookId);
  const bookTitle = context.sourceParsed.bookMeta.title || bookId;

  console.log(`[extract-entities] 书名: ${bookTitle}`);
  console.log(`[extract-entities] 共 ${context.sourceParsed.modules.length} 个模块，按模块逐个提取...`);
  if (promptFilePath) {
    console.log(`[extract-entities] 使用外部 prompt: ${promptFilePath}`);
  } else {
    console.log('[extract-entities] 未提供 --prompt-file，使用通用 fallback prompt');
  }

  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFilePath && existsSync(promptFilePath)) {
    promptTemplate = await readFile(promptFilePath, 'utf-8');
  }

  const allEntities: KnowledgeEntity[] = [];
  const seen = new Set<string>();
  let llmSuccessCount = 0;

  for (const mod of context.sourceParsed.modules) {
    const modText = getChapterText(context, mod.id);
    if (modText.length < 50) {
      console.log(`[extract-entities] 跳过 ${mod.id}（文本过短: ${modText.length} 字符）`);
      continue;
    }

    console.log(`[extract-entities] 处理 ${mod.id}: ${mod.title} (${modText.length} 字符)...`);

    const validIds = new Set<string>([mod.id, ...mod.tasks.map((t) => t.id)]);

    // 构建 prompt
    const buildPrompt = (
      title: string, text: string, id: string, tasks: { id: string; title: string }[],
    ): string => {
      if (promptTemplate) {
        return buildModulePromptFromTemplate(promptTemplate, bookTitle, title, text, id, tasks);
      }
      return buildDefaultModulePrompt(bookTitle, title, text, id, tasks);
    };

    // 如果模块文本超过 12K，按 task 拆分
    if (modText.length > 12000) {
      console.log(`[extract-entities]   模块过长，按 task 拆分...`);
      for (const task of mod.tasks) {
        const taskText = getTaskText(context, task.id);
        if (taskText.length < 50) continue;

        console.log(`[extract-entities]   task ${task.id}: ${taskText.length} 字符`);
        const prompt = buildPrompt(`${mod.title} / ${task.title}`, taskText, task.id, [{ id: task.id, title: task.title }]);
        const output = await callCoze([{ role: 'user', content: prompt }]);

        if (output) {
          const entities = parseLLMOutput(output, new Set<string>([task.id, mod.id]));
          if (entities && entities.length > 0) {
            for (const e of entities) {
              const key = normalizeTitle(e.title);
              if (!seen.has(key)) {
                seen.add(key);
                allEntities.push(e);
              } else {
                const existing = allEntities.find((ex) => normalizeTitle(ex.title) === key);
                if (existing) {
                  mergeEntityRefs(existing, e);
                }
              }
            }
            llmSuccessCount++;
            console.log(`[extract-entities]   → 提取 ${entities.length} 个实体`);
          }
        }
      }
    } else {
      const prompt = buildPrompt(mod.title, modText, mod.id, mod.tasks.map((t) => ({ id: t.id, title: t.title })));
      const output = await callCoze([{ role: 'user', content: prompt }]);

      if (output) {
        const entities = parseLLMOutput(output, validIds);
        if (entities && entities.length > 0) {
          for (const e of entities) {
            const key = normalizeTitle(e.title);
            if (!seen.has(key)) {
              seen.add(key);
              allEntities.push(e);
            } else {
              const existing = allEntities.find((ex) => normalizeTitle(ex.title) === key);
              if (existing) {
                mergeEntityRefs(existing, e);
              }
            }
          }
          llmSuccessCount++;
          console.log(`[extract-entities]   → 提取 ${entities.length} 个实体`);
        }
      }
    }
  }

  if (allEntities.length >= 5) {
    const deduped = deduplicateEntities(allEntities);
    const remapped = remapEntityIds(deduped, context.idMap);
    const withOccurrences = computeOccurrences(remapped, context);
    console.log(`[extract-entities] LLM 提取完成：共 ${withOccurrences.length} 个实体（去重前 ${allEntities.length}，${llmSuccessCount} 次成功调用），ID 映射 ${context.idMap.size} 条`);
    return { entities: withOccurrences, source: 'llm' };
  }

  console.warn(`[extract-entities] LLM 提取失败或结果不足（${allEntities.length} 个），使用规则 fallback`);
  const ruleEntities = remapEntityIds(buildRuleEntities(context), context.idMap);
  return {
    entities: ruleEntities,
    source: 'rule',
    note: `LLM 返回为空或结果不足，使用规则 fallback 提取了 ${ruleEntities.length} 个实体`,
  };
}

export async function saveEntities(bookId: string, result: EntityExtractionResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

function mergeEntityRefs(existing: KnowledgeEntity, incoming: KnowledgeEntity): void {
  const existingRefs = existing.refs || [];
  const incomingRefs = incoming.refs || [];
  const refKeys = new Set(existingRefs.map((r) => `${r.chapter}-${r.pn}`));
  for (const r of incomingRefs) {
    const key = `${r.chapter}-${r.pn}`;
    if (!refKeys.has(key)) {
      existingRefs.push(r);
      refKeys.add(key);
    }
  }
  existing.refs = existingRefs;
  const existingChapters = new Set(existing.chapterRefs);
  for (const c of incoming.chapterRefs) {
    if (!existingChapters.has(c)) {
      existing.chapterRefs.push(c);
      existingChapters.add(c);
    }
  }
  if (incoming.aliases) {
    const existingAliases = new Set(existing.aliases || []);
    for (const a of incoming.aliases) {
      if (!existingAliases.has(a)) {
        (existing.aliases = existing.aliases || []).push(a);
        existingAliases.add(a);
      }
    }
  }
  existing.count = (existing.count || 0) + (incoming.count || 0);
}

function deduplicateEntities(entities: KnowledgeEntity[]): KnowledgeEntity[] {
  const idMap = new Map<string, KnowledgeEntity>();
  const titleMap = new Map<string, KnowledgeEntity>();
  const result: KnowledgeEntity[] = [];

  for (const e of entities) {
    const titleKey = normalizeTitle(e.title);
    const existing = idMap.get(e.id) || titleMap.get(titleKey);
    if (existing) {
      mergeEntityRefs(existing, e);
    } else {
      idMap.set(e.id, e);
      titleMap.set(titleKey, e);
      result.push(e);
    }
  }
  return result;
}

function computeOccurrences(entities: KnowledgeEntity[], context: BookTextContext): KnowledgeEntity[] {
  for (const e of entities) {
    const occurrences: EntityOccurrence[] = [];
    const titleByTask = new Map<string, string>();
    const searchTerms = [e.title, ...(e.aliases || [])].filter((t) => t.length >= 2);
    if (searchTerms.length === 0) continue;

    for (const mod of context.sourceParsed.modules) {
      for (const task of mod.tasks) {
        const taskText = getTaskText(context, task.id);
        if (!taskText) continue;
        const mappedId = context.idMap.get(task.id) || task.id;
        for (const term of searchTerms) {
          let idx = taskText.indexOf(term);
          let count = 0;
          while (idx !== -1 && count < 10) {
            occurrences.push({ taskId: mappedId, pn: `pn-${count + 1}`, offset: idx, length: term.length });
            titleByTask.set(mappedId, task.title);
            idx = taskText.indexOf(term, idx + term.length);
            count++;
          }
        }
      }
    }
    if (occurrences.length > 0) {
      e.occurrences = occurrences.slice(0, 50);
      if (!e.count || e.count < occurrences.length) {
        e.count = occurrences.length;
      }
      // 用文本验证过的、子章节粒度的 occurrences 重建 refs（覆盖 LLM 给出的
      // 模块/章节粒度 refs），使前端阅读页的实体高亮 join
      // （refs[].chapter === subSectionId，如 ch1-1）真正命中。
      e.refs = deriveRefsFromOccurrences(e.occurrences, titleByTask);
    }
    // 无 occurrences 时保留 LLM 原 refs 作为兜底
  }
  return entities;
}

/**
 * 从文本验证过的 occurrences 派生 refs：每个子章节 taskId 一条，
 * 取该任务内首个 pn。前端阅读页/知识地图都以 refs[].chapter 作为章节 join key。
 */
export function deriveRefsFromOccurrences(
  occurrences: EntityOccurrence[] | undefined,
  titleByTask?: Map<string, string>,
): EntityRef[] {
  if (!occurrences || occurrences.length === 0) return [];
  const refByTask = new Map<string, EntityRef>();
  for (const occ of occurrences) {
    if (!refByTask.has(occ.taskId)) {
      refByTask.set(occ.taskId, {
        chapter: occ.taskId,
        title: titleByTask?.get(occ.taskId) || occ.taskId,
        pn: occ.pn,
      });
    }
  }
  return [...refByTask.values()];
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  const promptFile = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--prompt-file') || '';
  if (!bookId) {
    console.error('用法: npx tsx extract-entities.ts --book-id <bookId> [--prompt-file <path>]');
    process.exit(1);
  }

  const result = await extractEntities(bookId, promptFile || undefined);
  const outPath = await saveEntities(bookId, result);
  console.log(`[extract-entities] 已保存 ${result.entities.length} 个实体到 ${outPath}（来源：${result.source}）`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
