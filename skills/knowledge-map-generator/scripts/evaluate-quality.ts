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
import type { KnowledgeEvent, EventRelation, QualityReport, QualityThresholds } from './types.ts';
import { DEFAULT_QUALITY_THRESHOLDS } from './types.ts';
import { findForeignRelationTypes } from './relation-vocab.ts';
import { loadBookTitle } from './book-meta.ts';

/** 跨书模板污染的特征短语（应由本书内容生成，出现即为串味） */
const CONTAMINATION_PHRASES = ['跨文化文本旅行', '源起'];

export async function evaluateQuality(
  bookId: string,
  thresholds: QualityThresholds = DEFAULT_QUALITY_THRESHOLDS,
): Promise<QualityReport> {
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

  // ── 质量门指标 ──
  const nonCenterEntities = entities.filter((e) => e.id !== 'center-work').length;
  const relationDensity = nonCenterEntities > 0 ? relations.length / nonCenterEntities : 0;
  const relationsWithReason = relations.filter((r) => (r as any).reason && String((r as any).reason).trim()).length;
  const reasonRatio = relations.length > 0 ? relationsWithReason / relations.length : 0;
  const foreignRelationTypes = findForeignRelationTypes(relations.map((r) => (r as any).type).filter(Boolean));

  // 跨书模板污染：中心节点文案应由本书生成，命中特征短语或书名不符即判污染
  const bookTitle = await loadBookTitle(bookId);
  const contaminationIssues: string[] = [];
  const center = entities.find((e) => e.id === 'center-work');
  if (center) {
    const centerText = [center.title, (center as any).summary, (center as any).culture, (center as any).medium]
      .filter(Boolean).join(' ');
    for (const phrase of CONTAMINATION_PHRASES) {
      if (centerText.includes(phrase)) {
        contaminationIssues.push(`中心节点包含跨书模板短语「${phrase}」`);
      }
    }
    if (bookTitle && bookTitle !== bookId && center.title && !center.title.includes(bookTitle) && bookTitle.length > 1) {
      contaminationIssues.push(`中心节点标题「${center.title}」与书名「${bookTitle}」不符`);
    }
  }

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

  if (foreignRelationTypes.length > 0) issues.push(`${foreignRelationTypes.length} 种未知关系类型：${foreignRelationTypes.join('、')}`);
  if (contaminationIssues.length > 0) issues.push(...contaminationIssues);

  const suggestions: string[] = [];
  if (avgRefsPerEntity < 1.5) suggestions.push('建议通过 --entity-prompt-file 提供更详细的 prompt 以提取更多引用位置');
  if (isolatedNodes > 0) suggestions.push('建议通过 --relation-prompt-file 改善关系提取以减少孤立节点');
  if (events.length === 0) suggestions.push('教材内容可能不适合事件提取，或建议调整事件提取 prompt');
  if (confidenceScore < 0.6) suggestions.push('整体置信度较低，建议使用 --force 重新生成并提供自定义 prompt');
  if (relationDensity < thresholds.minRelationDensity) suggestions.push('关系密度偏低，建议用 --relation-prompt-file 增强关系提取或开启 --reflect 重跑');
  if (foreignRelationTypes.length > 0) suggestions.push('存在词表外关系类型，请在 relation-vocab.ts 登记或修正 prompt');

  // ── 阻塞式质量门 ──
  const isolatedRatio = nonCenterEntities > 0 ? isolatedNodes / nonCenterEntities : 0;
  const gateFailures: string[] = [];
  if (entities.length < thresholds.minEntityCount) gateFailures.push(`实体数 ${entities.length} < ${thresholds.minEntityCount}`);
  if (relations.length < thresholds.minRelationCount) gateFailures.push(`关系数 ${relations.length} < ${thresholds.minRelationCount}`);
  if (relationDensity < thresholds.minRelationDensity) gateFailures.push(`关系密度 ${relationDensity.toFixed(2)} < ${thresholds.minRelationDensity}`);
  if (reasonRatio < thresholds.minReasonRatio) gateFailures.push(`关系 reason 覆盖率 ${reasonRatio.toFixed(2)} < ${thresholds.minReasonRatio}`);
  if (coverage < thresholds.minCoverage) gateFailures.push(`实体引用覆盖率 ${coverage.toFixed(2)} < ${thresholds.minCoverage}`);
  if (isolatedRatio > thresholds.maxIsolatedRatio) gateFailures.push(`孤立节点占比 ${isolatedRatio.toFixed(2)} > ${thresholds.maxIsolatedRatio}`);
  if (duplicateIds > 0) gateFailures.push(`存在 ${duplicateIds} 个重复实体 ID`);
  if (invalidRelations > 0) gateFailures.push(`存在 ${invalidRelations} 条无效关系`);
  if (foreignRelationTypes.length > 0) gateFailures.push(`存在词表外关系类型：${foreignRelationTypes.join('、')}`);
  if (contaminationIssues.length > 0) gateFailures.push(...contaminationIssues);
  const gatePassed = gateFailures.length === 0;

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
    relationDensity: Math.round(relationDensity * 100) / 100,
    reasonRatio: Math.round(reasonRatio * 100) / 100,
    foreignRelationTypes,
    contaminationIssues,
    gatePassed,
    gateFailures,
    thresholds,
    issues,
    suggestions,
  };
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  const gateMode = process.argv.includes('--gate') || process.argv.includes('--strict');
  if (!bookId) {
    console.error('用法: npx tsx evaluate-quality.ts --book-id <bookId> [--gate]');
    process.exit(1);
  }

  const report = await evaluateQuality(bookId);
  console.log(`[quality] 实体: ${report.entityCount}, 关系: ${report.relationCount}, 事件: ${report.eventCount}`);
  console.log(`[quality] 覆盖度: ${report.coverage}, 置信度: ${report.confidenceScore}`);
  console.log(`[quality] 关系密度: ${report.relationDensity}, reason 覆盖率: ${report.reasonRatio}`);
  if (report.issues.length) {
    console.log('[quality] 问题:');
    for (const issue of report.issues) console.log(`  - ${issue}`);
  }
  if (report.suggestions.length) {
    console.log('[quality] 建议:');
    for (const s of report.suggestions) console.log(`  - ${s}`);
  }
  console.log(`[gate] ${report.gatePassed ? '✅ 通过' : '❌ 未通过'}`);
  if (!report.gatePassed) {
    for (const f of report.gateFailures) console.log(`  ✗ ${f}`);
  }
  if (gateMode && !report.gatePassed) {
    console.error('[gate] 质量门未通过，退出码 1');
    process.exit(1);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
