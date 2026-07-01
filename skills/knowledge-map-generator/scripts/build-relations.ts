#!/usr/bin/env node
/**
 * 关系构建脚本（Skills 范式重构版）
 *
 * 业务逻辑（prompt 内容、关系类型）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、JSON 解析、TS 校验。
 *
 * 用法:
 *   npx tsx build-relations.ts --book-id <bookId> --prompt-file <path>
 *   （无 --prompt-file 时使用通用 fallback prompt）
 *
 * 输出：books/{bookId}/data/knowledgeMap-relations.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import {
  loadBookTextContext,
  getFullText,
  type BookTextContext,
} from './loaders/bookLoader.ts';
import type { KnowledgeEntity } from './extract-entities.ts';

export type RelationType = string;

export interface KnowledgeRelation {
  from: string;
  to: string;
  type: RelationType;
  label?: string;
  reason?: string;
}

export interface RelationResult {
  relations: KnowledgeRelation[];
  source: 'llm' | 'rule';
  note?: string;
}

const RELATION_BATCH_SIZE = 60;

function buildDefaultPrompt(bookTitle: string, entities: KnowledgeEntity[], samples: string, batchInfo?: { batch: number; total: number }): string {
  const entityList = entities.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    culture: e.culture,
    medium: e.medium,
    summary: e.summary,
  }));

  const batchLabel = batchInfo ? `（第 ${batchInfo.batch}/${batchInfo.total} 批）` : '';

  return `你是一位教材知识结构分析专家。请根据教材《${bookTitle}》的内容和以下实体列表，提取实体之间的知识关联关系${batchLabel}。

实体列表：
${JSON.stringify(entityList, null, 2)}

教材内容片段：
${samples.slice(0, 8000)}

请严格输出以下 JSON 格式（不要 markdown 代码块，不要额外解释）：
{
  "relations": [
    { "from": "entity-id-1", "to": "entity-id-2", "type": "prerequisite", "label": "前置", "reason": "学习B需要先掌握A" },
    { "from": "entity-id-3", "to": "entity-id-4", "type": "application", "label": "应用于", "reason": "A是B的操作基础" }
  ]
}

字段说明：
- from/to: 必须是上面实体列表中的 id
- type: 关系类型（如 prerequisite/parallel/progressive/application/influence/citation/translation/adaptation/remake 等）
- label: 关系标签（如"前置""并列""递进""应用于""影响""引用""翻译""改编"）
- reason: 关系成立的人可读解释（15-50字，说明为什么存在这条关系）

要求：
1. 尽可能多构建关系，目标是将大部分实体连接起来
2. 关系必须基于教材内容，不编造
3. 优先构建实体间的直接知识关联，不要构建"教材包含实体"这类 trivial 关系
4. 每个实体至少参与 1 条关系
5. 只输出 JSON，不要任何解释`;
}

function buildPromptFromTemplate(template: string, bookTitle: string, entities: KnowledgeEntity[], samples: string): string {
  const entityList = entities.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    culture: e.culture,
    medium: e.medium,
    summary: e.summary,
  }));
  return template
    .replace(/\{\{bookTitle\}\}/g, bookTitle)
    .replace(/\{\{entities\}\}/g, JSON.stringify(entityList, null, 2))
    .replace(/\{\{samples\}\}/g, samples.slice(0, 15000));
}

function parseLLMOutput(output: string): KnowledgeRelation[] | null {
  try {
    const match = output.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    const rels = Array.isArray(parsed.relations) ? parsed.relations : Array.isArray(parsed) ? parsed : null;
    if (!rels) return null;
    return rels
      .filter((r: any) => r.from && r.to)
      .map((r: any) => ({
        from: r.from,
        to: r.to,
        type: (r.type || 'influence') as RelationType,
        label: r.label,
        reason: r.reason || '',
      }));
  } catch (err) {
    console.warn('[build-relations] JSON 解析失败:', err);
    return null;
  }
}

function buildRuleRelations(entities: KnowledgeEntity[], _context: BookTextContext): KnowledgeRelation[] {
  const rels: KnowledgeRelation[] = [];
  const entityMap = new Map(entities.map((e) => [e.id, e]));

  function add(fromId: string | undefined, toId: string | undefined, type: string, label: string, reason?: string) {
    if (!fromId || !toId || fromId === toId) return;
    if (!entityMap.has(fromId) || !entityMap.has(toId)) return;
    rels.push({ from: fromId, to: toId, type, label, reason });
  }

  // 基于同章节的实体间关系 — 每个章节内的实体互相关联
  const byChapter = new Map<string, KnowledgeEntity[]>();
  for (const e of entities) {
    if (e.id === 'center-work') continue;
    const chapters = e.refs ? [...new Set(e.refs.map(r => r.chapter))] : [];
    for (const ch of chapters) {
      if (!byChapter.has(ch)) byChapter.set(ch, []);
      byChapter.get(ch)!.push(e);
    }
  }
  for (const [, ents] of byChapter) {
    const sorted = [...ents].sort((a, b) => (b.count || 0) - (a.count || 0));
    const hub = sorted[0];
    if (hub) {
      for (const e of sorted.slice(1)) {
        add(hub.id, e.id, 'application', '同章节', `${hub.title}与${e.title}同属一个章节`);
      }
    }
  }

  // 基于同类型的实体间关系 — 同类型实体互相关联
  const byType = new Map<string, KnowledgeEntity[]>();
  for (const e of entities) {
    if (e.id === 'center-work') continue;
    const t = e.type || 'concept';
    if (!byType.has(t)) byType.set(t, []);
    byType.get(t)!.push(e);
  }
  for (const [, ents] of byType) {
    if (ents.length <= 1) continue;
    const sorted = [...ents].sort((a, b) => (b.count || 0) - (a.count || 0));
    const hub = sorted[0];
    if (hub) {
      for (const e of sorted.slice(1, Math.min(10, sorted.length))) {
        add(hub.id, e.id, 'parallel', '同类', `${hub.title}与${e.title}同属${e.type}类型`);
      }
    }
  }

  // 基于标题相似度的实体间关系
  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const a = entities[i];
      const b = entities[j];
      if (a.id === 'center-work' || b.id === 'center-work') continue;
      const shorter = a.title.length < b.title.length ? a.title : b.title;
      const longer = a.title.length < b.title.length ? b.title : a.title;
      if (shorter.length >= 2 && longer.includes(shorter)) {
        add(a.id, b.id, 'influence', '关联', `${a.title}与${b.title}存在标题关联`);
      }
    }
  }

  // 去重
  const seen = new Set<string>();
  return rels.filter((r) => {
    const key = `${r.from}-${r.to}-${r.type}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function buildRelations(bookId: string, promptFilePath?: string): Promise<RelationResult> {
  const context = await loadBookTextContext(bookId);
  const entitiesPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');

  if (!existsSync(entitiesPath)) {
    throw new Error(`找不到实体文件：${entitiesPath}`);
  }

  const raw = await readFile(entitiesPath, 'utf-8');
  const { entities } = JSON.parse(raw) as { entities: KnowledgeEntity[] };

  console.log(`[build-relations] 正在为 ${entities.length} 个实体构建关系...`);

  const samples = getFullText(context);
  const bookTitle = context.sourceParsed.bookMeta.title;

  const batches: KnowledgeEntity[][] = [];
  for (let i = 0; i < entities.length; i += RELATION_BATCH_SIZE) {
    batches.push(entities.slice(i, i + RELATION_BATCH_SIZE));
  }

  console.log(`[build-relations] 分 ${batches.length} 批调用 LLM`);

  const allLlmRels: KnowledgeRelation[] = [];
  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    let prompt: string;
    if (promptFilePath && existsSync(promptFilePath)) {
      const template = await readFile(promptFilePath, 'utf-8');
      prompt = buildPromptFromTemplate(template, bookTitle, batch, samples);
    } else {
      prompt = buildDefaultPrompt(bookTitle, batch, samples, { batch: bi + 1, total: batches.length });
    }

    try {
      const output = await callLLM(prompt, bookId);
      if (output) {
        const rels = parseLLMOutput(output);
        if (rels && rels.length > 0) {
          allLlmRels.push(...rels);
          console.log(`[build-relations] 第 ${bi + 1}/${batches.length} 批完成，提取 ${rels.length} 条关系`);
        }
      }
    } catch (err) {
      console.warn(`[build-relations] 第 ${bi + 1} 批 LLM 失败:`, err);
    }
  }

  const ruleRels = buildRuleRelations(entities, context);

  const llmIds = new Set(allLlmRels.map(r => `${r.from}-${r.to}-${r.type}`));
  const extraRules = ruleRels.filter(r => !llmIds.has(`${r.from}-${r.to}-${r.type}`));
  const combined = [...allLlmRels, ...extraRules];

  if (allLlmRels.length >= 8) {
    return { relations: combined, source: 'llm', note: `LLM ${allLlmRels.length} 条 + 规则补充 ${extraRules.length} 条 = ${combined.length} 条` };
  }

  console.warn('[build-relations] LLM 提取失败或结果不足，使用规则 fallback');
  return {
    relations: ruleRels,
    source: 'rule',
    note: `LLM 返回为空或结果不足，使用规则 fallback 构建了 ${ruleRels.length} 条关系`,
  };
}

export async function saveRelations(bookId: string, result: RelationResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-relations.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  const promptFile = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--prompt-file') || '';
  if (!bookId) {
    console.error('用法: npx tsx build-relations.ts --book-id <bookId> [--prompt-file <path>]');
    process.exit(1);
  }

  const result = await buildRelations(bookId, promptFile || undefined);
  const outPath = await saveRelations(bookId, result);
  console.log(`[build-relations] 已保存 ${result.relations.length} 条关系到 ${outPath}（来源：${result.source}）`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
