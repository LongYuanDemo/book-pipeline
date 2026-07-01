#!/usr/bin/env node
/**
 * Step 7: Quality Evaluation (= shiji-kb SKILL_08)
 *
 * Evaluates the final knowledge map data for coverage, correctness, and confidence.
 * Produces a QualityReport embedded in CanvasData.
 *
 * Input: knowledgeMap-reviewed.json + knowledgeMap-events.json + knowledgeMap-event-relations.json
 * Output: QualityReport (returned to orchestrator, not saved separately)
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath } from '../../shared/paths.ts';
import type { KnowledgeEntity } from './extract-entities.ts';
import type { KnowledgeRelation } from './build-relations.ts';
import type { KnowledgeEvent, EventRelation, QualityReport } from './types.ts';

export async function evaluateQuality(bookId: string): Promise<QualityReport> {
  const reviewedPath = getBookDataPath(bookId, 'knowledgeMap-reviewed.json');
  const eventsPath = getBookDataPath(bookId, 'knowledgeMap-events.json');
  const eventRelsPath = getBookDataPath(bookId, 'knowledgeMap-event-relations.json');

  let entities: KnowledgeEntity[] = [];
  let relations: KnowledgeRelation[] = [];
  let events: KnowledgeEvent[] = [];
  let eventRelations: EventRelation[] = [];

  if (existsSync(reviewedPath)) {
    const raw = JSON.parse(await readFile(reviewedPath, 'utf-8'));
    entities = raw.entities || [];
    relations = raw.relations || [];
  }

  if (existsSync(eventsPath)) {
    const raw = JSON.parse(await readFile(eventsPath, 'utf-8'));
    events = raw.events || [];
  }

  if (existsSync(eventRelsPath)) {
    const raw = JSON.parse(await readFile(eventRelsPath, 'utf-8'));
    eventRelations = raw.relations || [];
  }

  const entityIds = new Set(entities.map((e) => e.id));

  const duplicateIds = entities.length - new Set(entities.map((e) => e.id)).size;

  const connected = new Set<string>();
  for (const r of relations) {
    connected.add(r.from);
    connected.add(r.to);
  }
  const isolatedNodes = entities.filter((e) => e.id !== 'center-work' && !connected.has(e.id)).length;

  const invalidRelations = relations.filter((r) => !entityIds.has(r.from) || !entityIds.has(r.to)).length;

  const emptyRefsEntities = entities.filter((e) => !e.refs || e.refs.length === 0).length;
  const totalRefs = entities.reduce((sum, e) => sum + (e.refs?.length || 0), 0);
  const avgRefsPerEntity = entities.length > 0 ? totalRefs / entities.length : 0;

  const coverage = entities.length > 0
    ? Math.min(1, entities.filter((e) => e.refs && e.refs.length > 0).length / entities.length)
    : 0;

  let confidenceScore = 0;
  if (entities.length > 0) confidenceScore += 0.3;
  if (relations.length > 0) confidenceScore += 0.2;
  if (events.length > 0) confidenceScore += 0.2;
  if (eventRelations.length > 0) confidenceScore += 0.1;
  if (duplicateIds === 0) confidenceScore += 0.1;
  if (isolatedNodes <= entities.length * 0.1) confidenceScore += 0.1;
  confidenceScore = Math.min(1, confidenceScore);

  const issues: string[] = [];
  if (duplicateIds > 0) issues.push(`${duplicateIds} 个重复实体 ID`);
  if (isolatedNodes > 0) issues.push(`${isolatedNodes} 个孤立节点`);
  if (invalidRelations > 0) issues.push(`${invalidRelations} 条无效关系`);
  if (emptyRefsEntities > 0) issues.push(`${emptyRefsEntities} 个实体无引用位置`);
  if (entities.length < 5) issues.push(`实体数量过少（${entities.length}）`);
  if (relations.length < 3) issues.push(`关系数量过少（${relations.length}）`);

  const suggestions: string[] = [];
  if (avgRefsPerEntity < 1.5) suggestions.push('建议通过 --entity-prompt-file 提供更详细的 prompt 以提取更多引用位置');
  if (isolatedNodes > 0) suggestions.push('建议通过 --relation-prompt-file 改善关系提取以减少孤立节点');
  if (events.length === 0) suggestions.push('教材内容可能不适合事件提取，或建议调整事件提取 prompt');
  if (confidenceScore < 0.6) suggestions.push('整体置信度较低，建议使用 --force 重新生成并提供自定义 prompt');

  return {
    entityCount: entities.length,
    relationCount: relations.length,
    eventCount: events.length,
    coverage: Math.round(coverage * 100) / 100,
    duplicateIds,
    isolatedNodes,
    invalidRelations,
    emptyRefsEntities,
    avgRefsPerEntity: Math.round(avgRefsPerEntity * 100) / 100,
    confidenceScore: Math.round(confidenceScore * 100) / 100,
    issues,
    suggestions,
  };
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx evaluate-quality.ts --book-id <bookId>');
    process.exit(1);
  }

  const report = await evaluateQuality(bookId);
  console.log(`[quality] 实体: ${report.entityCount}, 关系: ${report.relationCount}, 事件: ${report.eventCount}`);
  console.log(`[quality] 覆盖度: ${report.coverage}, 置信度: ${report.confidenceScore}`);
  if (report.issues.length) {
    console.log('[quality] 问题:');
    for (const issue of report.issues) console.log(`  - ${issue}`);
  }
  if (report.suggestions.length) {
    console.log('[quality] 建议:');
    for (const s of report.suggestions) console.log(`  - ${s}`);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
