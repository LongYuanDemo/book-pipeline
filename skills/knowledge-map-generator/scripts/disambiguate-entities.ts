#!/usr/bin/env node
/**
 * Step 2b: Entity Disambiguation (= shiji-kb SKILL_03b/03g)
 *
 * LLM-based disambiguation of entities with similar names but potentially
 * different meanings. Merges true duplicates, splits true ambiguities.
 *
 * Input: knowledgeMap-entities.json (from Step 2a)
 * Output: knowledgeMap-entities-disambiguated.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import type { KnowledgeEntity } from './extract-entities.ts';

export interface DisambiguationResult {
  entities: KnowledgeEntity[];
  merges: { from: string; to: string; reason: string }[];
  splits: { entityId: string; newEntities: string[]; reason: string }[];
  source: 'llm' | 'rule';
}

function buildDisambiguationPrompt(bookTitle: string, entities: KnowledgeEntity[]): string {
  const entityList = entities.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    gloss: e.gloss,
    aliases: e.aliases,
    refs: e.refs?.map((r) => `${r.chapter}:${r.pn}`),
  }));

  return `你是一位教材知识体系消歧专家。请分析教材《${bookTitle}》中的以下实体列表，识别：
1. 需要合并的重复实体（同名同义但ID不同）
2. 需要拆分的歧义实体（同名但含义不同）

实体列表：
${JSON.stringify(entityList, null, 2)}

请输出 JSON（不要 markdown 代码块）：
{
  "merges": [
    { "from": "entity-id-to-merge", "to": "target-entity-id", "reason": "同一实体的不同写法" }
  ],
  "splits": [
    { "entityId": "ambiguous-id", "newTitle": "拆分后的新名称", "reason": "同名但指代不同概念" }
  ]
}

规则：
- 只合并确实相同的实体（别名关系、简写/全称）
- 只拆分确实不同的实体（同名但不同人/不同概念）
- 如果没有需要消歧的，返回空数组
- 只输出 JSON`;
}

function applyMerges(
  entities: KnowledgeEntity[],
  merges: { from: string; to: string; reason: string }[],
): { entities: KnowledgeEntity[]; appliedCount: number } {
  if (!merges || merges.length === 0) return { entities, appliedCount: 0 };

  const mergeMap = new Map<string, string>();
  for (const m of merges) {
    mergeMap.set(m.from, m.to);
  }

  const entityMap = new Map(entities.map((e) => [e.id, e]));
  const merged = new Set<string>();

  for (const [fromId, toId] of mergeMap) {
    const from = entityMap.get(fromId);
    const to = entityMap.get(toId);
    if (!from || !to) continue;

    const existingRefs = to.refs || [];
    const refKeys = new Set(existingRefs.map((r) => `${r.chapter}-${r.pn}`));
    for (const r of from.refs || []) {
      const key = `${r.chapter}-${r.pn}`;
      if (!refKeys.has(key)) {
        existingRefs.push(r);
        refKeys.add(key);
      }
    }
    to.refs = existingRefs;

    const existingChapters = new Set(to.chapterRefs);
    for (const c of from.chapterRefs) {
      if (!existingChapters.has(c)) to.chapterRefs.push(c);
    }

    if (from.aliases) {
      const existingAliases = new Set(to.aliases || []);
      for (const a of from.aliases) {
        if (!existingAliases.has(a)) (to.aliases = to.aliases || []).push(a);
      }
    }
    to.count = (to.count || 0) + (from.count || 0);

    merged.add(fromId);
  }

  return {
    entities: entities.filter((e) => !merged.has(e.id)),
    appliedCount: merged.size,
  };
}

export async function disambiguateEntities(bookId: string): Promise<DisambiguationResult> {
  const entitiesPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  if (!existsSync(entitiesPath)) {
    throw new Error(`实体文件不存在: ${entitiesPath}`);
  }

  const raw = JSON.parse(await readFile(entitiesPath, 'utf-8')) as { entities: KnowledgeEntity[] };
  const entities = raw.entities;

  if (entities.length < 2) {
    return { entities, merges: [], splits: [], source: 'rule' };
  }

  let merges: { from: string; to: string; reason: string }[] = [];
  let splits: { entityId: string; newEntities: string[]; reason: string }[] = [];

  try {
    const bookTitle = bookId;
    const prompt = buildDisambiguationPrompt(bookTitle, entities);
    const output = await callLLM(prompt, bookId);
    if (output) {
      const match = output.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        merges = parsed.merges || [];
        splits = parsed.splits || [];
      }
    }
  } catch (err) {
    console.warn('[disambiguate] LLM 消歧失败，跳过:', err);
  }

  const { entities: mergedEntities, appliedCount } = applyMerges(entities, merges);

  return {
    entities: mergedEntities,
    merges: merges.slice(0, appliedCount),
    splits,
    source: merges.length > 0 ? 'llm' : 'rule',
  };
}

export async function saveDisambiguated(bookId: string, result: DisambiguationResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-entities-disambiguated.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx disambiguate-entities.ts --book-id <bookId>');
    process.exit(1);
  }

  const result = await disambiguateEntities(bookId);
  const outPath = await saveDisambiguated(bookId, result);
  console.log(`[disambiguate] 已保存到 ${outPath}（来源：${result.source}）`);
  console.log(`[disambiguate] 实体 ${result.entities.length}，合并 ${result.merges.length}，拆分 ${result.splits.length}`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
