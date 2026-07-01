#!/usr/bin/env node
/**
 * 知识地图审查脚本
 *
 * 对提取的实体和关系进行质量审查：
 * - 检查孤立节点
 * - 检查重复实体
 * - 检查无效关系
 * - 可选：调用 LLM 做深度审查
 *
 * 输出：books/{bookId}/data/knowledgeMap-reviewed.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import type { KnowledgeEntity } from './extract-entities.ts';
import type { KnowledgeRelation } from './build-relations.ts';

export interface ReviewResult {
  entities: KnowledgeEntity[];
  relations: KnowledgeRelation[];
  reviewNotes: string[];
  fixes: string[];
  source: 'llm' | 'rule';
}

function normalizeTitle(title: string): string {
  return title.replace(/[《》]/g, '').trim();
}

function findDuplicates(entities: KnowledgeEntity[]): string[] {
  const seenTitle = new Map<string, string>();
  const seenId = new Map<string, string>();
  const dups: string[] = [];
  for (const e of entities) {
    const titleKey = normalizeTitle(e.title);
    if (seenTitle.has(titleKey)) {
      dups.push(`重复实体（标题）：${e.title}（与 ${seenTitle.get(titleKey)}）`);
    } else {
      seenTitle.set(titleKey, e.id);
    }
    if (seenId.has(e.id)) {
      dups.push(`重复实体（ID）：${e.id} — ${e.title}（与 ${seenId.get(e.id)}）`);
    } else {
      seenId.set(e.id, e.title);
    }
  }
  return dups;
}

function findIsolatedNodes(entities: KnowledgeEntity[], relations: KnowledgeRelation[]): string[] {
  const connected = new Set<string>();
  for (const r of relations) {
    connected.add(r.from);
    connected.add(r.to);
  }
  const isolated = entities.filter((e) => !connected.has(e.id));
  return isolated.map((e) => `孤立节点：${e.title}（${e.id}）`);
}

function findInvalidRelations(entities: KnowledgeEntity[], relations: KnowledgeRelation[]): string[] {
  const ids = new Set(entities.map((e) => e.id));
  const invalid: string[] = [];
  for (const r of relations) {
    if (!ids.has(r.from)) invalid.push(`无效关系 from: ${r.from}`);
    if (!ids.has(r.to)) invalid.push(`无效关系 to: ${r.to}`);
  }
  return invalid;
}

function findEmptyRefs(entities: KnowledgeEntity[]): string[] {
  const issues: string[] = [];
  for (const e of entities) {
    if (!e.refs || e.refs.length === 0) {
      issues.push(`实体无引用：${e.title}（${e.id}）— refs 为空`);
    } else {
      const validRefs = e.refs.filter((r) => r.chapter && r.chapter !== 'ch1');
      if (validRefs.length === 0 && e.id !== 'center-work') {
        issues.push(`实体引用全部指向 ch1：${e.title}（${e.id}）— 可能未正确关联章节`);
      }
    }
  }
  return issues;
}

function autoFix(
  entities: KnowledgeEntity[],
  relations: KnowledgeRelation[],
): { entities: KnowledgeEntity[]; relations: KnowledgeRelation[]; fixes: string[] } {
  const fixes: string[] = [];
  const entityMap = new Map(entities.map((e) => [e.id, e]));
  const centerId = 'center-work';

  // 修复重复 ID：合并同名同 ID 实体
  const deduped = deduplicateAndMerge(entities);
  if (deduped.length !== entities.length) {
    fixes.push(`去重：合并 ${entities.length - deduped.length} 个重复实体`);
    entities = deduped;
  }

  // 标记孤立节点（不再自动添加 center-work → entity 的 trivial 关系）
  const connected = new Set<string>();
  for (const r of relations) {
    connected.add(r.from);
    connected.add(r.to);
  }

  const isolatedEntities = entities.filter((e) => e.id !== centerId && !connected.has(e.id));
  if (isolatedEntities.length > 0) {
    const byType = new Map<string, KnowledgeEntity[]>();
    for (const e of isolatedEntities) {
      const t = e.type || 'concept';
      if (!byType.has(t)) byType.set(t, []);
      byType.get(t)!.push(e);
    }
    for (const [, ents] of byType) {
      const sorted = [...ents].sort((a, b) => (b.count || 0) - (a.count || 0));
      const hub = sorted[0];
      for (const e of sorted.slice(1, Math.min(5, sorted.length))) {
        relations.push({ from: hub.id, to: e.id, type: 'parallel', label: '同类', reason: `${hub.title}与${e.title}同属${e.type}类型` });
      }
    }
    fixes.push(`修复 ${isolatedEntities.length} 个孤立节点：按类型建立了关联关系`);
  }

  // 过滤无效关系（引用不存在的实体 ID）
  const validIds = new Set(entities.map((e) => e.id));
  const validRels = relations.filter((r) => validIds.has(r.from) && validIds.has(r.to));
  if (validRels.length !== relations.length) {
    fixes.push(`过滤 ${relations.length - validRels.length} 条无效关系（引用不存在的实体 ID）`);
    relations = validRels;
  }

  // 去重关系
  const seenRels = new Set<string>();
  const uniqueRels: KnowledgeRelation[] = [];
  for (const r of relations) {
    const key = `${r.from}-${r.to}-${r.type}`;
    if (!seenRels.has(key)) {
      seenRels.add(key);
      uniqueRels.push(r);
    }
  }
  if (uniqueRels.length !== relations.length) {
    fixes.push(`去重：移除 ${relations.length - uniqueRels.length} 条重复关系`);
  }

  // 确保中心主题存在（通用描述，不绑定特定书籍）
  if (!entityMap.has(centerId)) {
    entities.unshift({
      id: centerId,
      title: '教材主题',
      culture: '核心概念',
      medium: '教材主题',
      type: 'concept',
      summary: '教材知识体系核心主题',
      chapterRefs: [],
    });
    fixes.push('添加缺失的中心主题节点');
  }

  return { entities, relations: uniqueRels, fixes };
}

function deduplicateAndMerge(entities: KnowledgeEntity[]): KnowledgeEntity[] {
  const idMap = new Map<string, KnowledgeEntity>();
  const titleMap = new Map<string, KnowledgeEntity>();
  const result: KnowledgeEntity[] = [];

  for (const e of entities) {
    const titleKey = e.title.replace(/[《》]/g, '').trim();
    const existing = idMap.get(e.id) || titleMap.get(titleKey);
    if (existing) {
      const existingRefs = existing.refs || [];
      const refKeys = new Set(existingRefs.map((r) => `${r.chapter}-${r.pn}`));
      for (const r of e.refs || []) {
        const key = `${r.chapter}-${r.pn}`;
        if (!refKeys.has(key)) {
          existingRefs.push(r);
          refKeys.add(key);
        }
      }
      existing.refs = existingRefs;
      const existingChapters = new Set(existing.chapterRefs);
      for (const c of e.chapterRefs) {
        if (!existingChapters.has(c)) {
          existing.chapterRefs.push(c);
          existingChapters.add(c);
        }
      }
      if (e.aliases) {
        const existingAliases = new Set(existing.aliases || []);
        for (const a of e.aliases) {
          if (!existingAliases.has(a)) {
            (existing.aliases = existing.aliases || []).push(a);
            existingAliases.add(a);
          }
        }
      }
      existing.count = (existing.count || 0) + (e.count || 0);
    } else {
      idMap.set(e.id, e);
      titleMap.set(titleKey, e);
      result.push(e);
    }
  }
  return result;
}

function buildLLMPrompt(bookTitle: string, entities: KnowledgeEntity[], relations: KnowledgeRelation[]): string {
  return `你是一位教材知识体系审查专家。请审查以下从教材《${bookTitle}》中提取的知识地图数据，指出问题并给出修正建议。

实体列表：
${JSON.stringify(entities, null, 2)}

关系列表：
${JSON.stringify(relations, null, 2)}

请输出以下 JSON 格式：
{
  "issues": ["缺少关键概念X", "关系 from=entity-x 无效"],
  "suggestedAdditions": [{ "title": "实体名称", "type": "concept", "culture": "核心概念", "medium": "概念" }],
  "suggestedRelations": [{ "from": "entity-a", "to": "entity-b", "type": "prerequisite", "label": "前置" }]
}

只输出 JSON，不要任何解释。`;
}

export async function reviewKnowledgeMap(bookId: string): Promise<ReviewResult> {
  const classifiedPath = getBookDataPath(bookId, 'knowledgeMap-entities-classified.json');
  const rawEntitiesPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  const relationsPath = getBookDataPath(bookId, 'knowledgeMap-relations.json');

  const entitiesPath = existsSync(classifiedPath) ? classifiedPath : rawEntitiesPath;
  if (!existsSync(entitiesPath) || !existsSync(relationsPath)) {
    throw new Error(`找不到审查输入文件：${entitiesPath} 或 ${relationsPath}`);
  }

  const rawEntities = JSON.parse(await readFile(entitiesPath, 'utf-8')) as { entities: KnowledgeEntity[] };
  const rawRelations = JSON.parse(await readFile(relationsPath, 'utf-8')) as { relations: KnowledgeRelation[] };

  let entities = rawEntities.entities;
  let relations = rawRelations.relations;

  const notes: string[] = [];

  notes.push(`实体数量：${entities.length}`);
  notes.push(`关系数量：${relations.length}`);

  const dups = findDuplicates(entities);
  if (dups.length) notes.push(...dups);

  const isolated = findIsolatedNodes(entities, relations);
  if (isolated.length) notes.push(...isolated);

  const invalid = findInvalidRelations(entities, relations);
  if (invalid.length) notes.push(...invalid);

  const emptyRefs = findEmptyRefs(entities);
  if (emptyRefs.length) notes.push(...emptyRefs);

  // 尝试 LLM 深度审查
  let llmSuggestions: any = null;
  try {
    const prompt = buildLLMPrompt(bookId, entities, relations);
    const output = await callLLM(prompt, bookId);
    if (output) {
      const match = output.match(/\{[\s\S]*\}/);
      if (match) {
        llmSuggestions = JSON.parse(match[0]);
        notes.push('LLM 审查完成');
      }
    }
  } catch (err) {
    notes.push('LLM 审查失败，使用规则审查');
  }

  // 自动修复
  const { entities: fixedEntities, relations: fixedRelations, fixes } = autoFix(entities, relations);

  return {
    entities: fixedEntities,
    relations: fixedRelations,
    reviewNotes: notes,
    fixes,
    source: llmSuggestions ? 'llm' : 'rule',
  };
}

export async function saveReviewed(bookId: string, result: ReviewResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-reviewed.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx review-knowledge-map.ts --book-id <bookId>');
    process.exit(1);
  }

  const result = await reviewKnowledgeMap(bookId);
  const outPath = await saveReviewed(bookId, result);
  console.log(`[review] 已保存审查结果到 ${outPath}（来源：${result.source}）`);
  console.log(`[review] 实体 ${result.entities.length}，关系 ${result.relations.length}`);
  if (result.reviewNotes.length) {
    console.log('[review] 审查笔记：');
    for (const note of result.reviewNotes) console.log(`  - ${note}`);
  }
  if (result.fixes.length) {
    console.log('[review] 自动修复：');
    for (const fix of result.fixes) console.log(`  - ${fix}`);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
