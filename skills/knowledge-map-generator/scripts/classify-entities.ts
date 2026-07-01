#!/usr/bin/env node
/**
 * Step 2c: Entity Classification (= shiji-kb SKILL_03h-03k)
 *
 * LLM-based classification of entities into a taxonomy tree.
 * Assigns/normalizes `culture` and `type` fields, builds classification hierarchy.
 *
 * Input: knowledgeMap-entities-disambiguated.json (from Step 2b)
 * Output: knowledgeMap-entities-classified.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import type { KnowledgeEntity } from './extract-entities.ts';

export interface TaxonomyNode {
  type: string;
  label: string;
  count: number;
  children?: TaxonomyNode[];
}

export interface ClassificationResult {
  entities: KnowledgeEntity[];
  taxonomy: TaxonomyNode[];
  source: 'llm' | 'rule';
}

const BATCH_SIZE = 50;

function buildClassificationPrompt(bookTitle: string, entities: KnowledgeEntity[], batchInfo?: { batch: number; total: number }): string {
  const entityList = entities.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    culture: e.culture,
    gloss: e.gloss,
  }));

  const batchLabel = batchInfo ? `（第 ${batchInfo.batch}/${batchInfo.total} 批）` : '';

  return `你是一位教材知识分类专家。请对教材《${bookTitle}》中的以下实体进行分类整理${batchLabel}：

1. 为每个实体分配或规范化 type（实体类型英文单词）和 culture（知识分类中文名）
2. culture 应根据实体在知识体系中的角色分类，不要全部填"核心概念"

实体列表：
${JSON.stringify(entityList, null, 2)}

请输出 JSON（不要 markdown 代码块）：
{
  "classifications": [
    { "id": "entity-id", "type": "concept", "culture": "核心概念" }
  ]
}

规则：
- type 使用英文小写单词（如 concept, person, disease, drug, procedure, tool, process, step, event, place, work）
- culture 使用中文，根据实体在教材中的角色分类，例如：
  - 翻译/文学研究类：原著来源、翻译改编、学术概念、历史背景、媒介载体
  - 医学类：基础理论、临床应用、药物疗法、护理操作、拓展延伸
  - 工程类：基础原理、工具材料、工艺流程、安全规范、拓展延伸
  - 通用：核心概念、基础理论、实践应用、拓展延伸
- 同类实体的 culture 应保持一致
- 只输出 JSON`;
}

function buildRuleBasedTaxonomy(entities: KnowledgeEntity[]): TaxonomyNode[] {
  const cultureMap = new Map<string, Map<string, number>>();

  for (const e of entities) {
    const culture = e.culture || '其他';
    const type = e.type || 'concept';
    if (!cultureMap.has(culture)) cultureMap.set(culture, new Map());
    const typeMap = cultureMap.get(culture)!;
    typeMap.set(type, (typeMap.get(type) || 0) + 1);
  }

  const taxonomy: TaxonomyNode[] = [];
  for (const [culture, typeMap] of cultureMap) {
    const children: TaxonomyNode[] = [];
    for (const [type, count] of typeMap) {
      children.push({ type, label: type, count });
    }
    taxonomy.push({
      type: culture,
      label: culture,
      count: children.reduce((sum, c) => sum + c.count, 0),
      children,
    });
  }

  return taxonomy;
}

export async function classifyEntities(bookId: string): Promise<ClassificationResult> {
  const inputPath = getBookDataPath(bookId, 'knowledgeMap-entities-disambiguated.json');
  const fallbackPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');

  const path = existsSync(inputPath) ? inputPath : fallbackPath;
  if (!existsSync(path)) {
    throw new Error(`实体文件不存在: ${path}`);
  }

  const raw = JSON.parse(await readFile(path, 'utf-8')) as { entities: KnowledgeEntity[] };
  let entities = raw.entities;

  let source: 'llm' | 'rule' = 'rule';

  const batches: KnowledgeEntity[][] = [];
  for (let i = 0; i < entities.length; i += BATCH_SIZE) {
    batches.push(entities.slice(i, i + BATCH_SIZE));
  }

  console.log(`[classify] 共 ${entities.length} 个实体，分 ${batches.length} 批处理`);

  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    try {
      const prompt = buildClassificationPrompt(bookId, batch, { batch: bi + 1, total: batches.length });
      const output = await callLLM(prompt, bookId);
      if (output) {
        const match = output.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed.classifications)) {
            const classMap = new Map<string, { id: string; type?: string; culture?: string }>(
              parsed.classifications.map((c: { id: string; type?: string; culture?: string }) => [c.id, c])
            );
            entities = entities.map((e) => {
              const c = classMap.get(e.id);
              if (c) {
                return { ...e, type: c.type || e.type, culture: c.culture || e.culture };
              }
              return e;
            });
            source = 'llm';
            console.log(`[classify] 第 ${bi + 1}/${batches.length} 批完成，分类 ${parsed.classifications.length} 个实体`);
          }
        }
      }
    } catch (err) {
      console.warn(`[classify] 第 ${bi + 1} 批 LLM 分类失败:`, err);
    }
  }

  if (source === 'rule') {
    console.warn('[classify] 所有批次 LLM 分类均失败，使用规则分类');
  }

  const taxonomy = buildRuleBasedTaxonomy(entities);

  return { entities, taxonomy, source };
}

export async function saveClassified(bookId: string, result: ClassificationResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-entities-classified.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx classify-entities.ts --book-id <bookId>');
    process.exit(1);
  }

  const result = await classifyEntities(bookId);
  const outPath = await saveClassified(bookId, result);
  console.log(`[classify] 已保存到 ${outPath}（来源：${result.source}）`);
  console.log(`[classify] 实体 ${result.entities.length}，分类树 ${result.taxonomy.length} 个顶层节点`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
