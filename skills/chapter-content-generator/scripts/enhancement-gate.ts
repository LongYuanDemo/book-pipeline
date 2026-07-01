#!/usr/bin/env node
/**
 * AI 增强质量门（Enhancement Quality Gate）
 *
 * 把知识图谱阶段确立的"阻塞式质量门"范式复用到 AI 增强阶段：
 * aiEnhancement.ts 必须达标才算合格交付物（面向 2000+ 本批量制作）。
 *
 * 治理目标（对照 critical-care-nursing 暴露的问题）：
 *   - callout 标题被通用元提示（"AI 学习提示"）稀释 → 标题去重率 / 通用标题占比
 *   - 缺少易错点/安全风险提示（warning 变体为 0）→ warning 覆盖
 *   - 占位/降级内容（"本节内容待AI增强"）→ 占位计数
 *   - 随堂测验覆盖不足 → quiz 任务覆盖率
 *
 * 用法：
 *   npx tsx skills/chapter-content-generator/scripts/enhancement-gate.ts --book-id <bookId> [--gate]
 */

import { existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { resolve } from 'path';
import { getBookDataPath } from '../../shared/paths.ts';

/* ------------------------------------------------------------------ */
// 类型

interface Callout {
  variant: 'info' | 'tip' | 'culture' | 'warning';
  title: string;
  body: string;
}

interface EnhancementItem {
  headingHint: string;
  callout: Callout;
  quiz?: unknown;
}

interface TaskEnhancement {
  taskId: string;
  title: string;
  intro: Callout;
  sections: EnhancementItem[];
  outro: Callout;
  outroQuiz?: unknown;
}

export interface EnhancementThresholds {
  minWarningCount: number;        // 全书 warning callout 总数下限
  minWarningTaskRatio: number;    // 含 ≥1 warning 的任务占比下限
  maxGenericTitleRatio: number;   // 正文 callout 通用标题占比上限
  minDistinctTitleRatio: number;  // 正文 callout 标题去重率下限
  minQuizTaskRatio: number;       // 含 ≥1 quiz 的任务占比下限
  minBodyLen: number;             // callout body 最短字符数
  maxPlaceholderCount: number;    // 占位/降级 callout 数上限
}

export const DEFAULT_ENHANCEMENT_THRESHOLDS: EnhancementThresholds = {
  minWarningCount: 1,
  minWarningTaskRatio: 0.3,
  maxGenericTitleRatio: 0.4,
  minDistinctTitleRatio: 0.3,
  minQuizTaskRatio: 0.8,
  minBodyLen: 20,
  maxPlaceholderCount: 0,
};

export interface EnhancementReport {
  taskCount: number;
  calloutCount: number;
  sectionCalloutCount: number;
  quizCount: number;
  variantDistribution: Record<string, number>;
  warningCount: number;
  warningTaskRatio: number;
  distinctTitleRatio: number;   // 正文 callout
  genericTitleRatio: number;    // 正文 callout
  quizTaskRatio: number;
  placeholderCount: number;
  shortBodyCount: number;
  gatePassed: boolean;
  gateFailures: string[];
  issues: string[];
  thresholds: EnhancementThresholds;
}

/* ------------------------------------------------------------------ */
// 判定用常量

/** 通用元提示标题（内容无关的套话），用于"稀释度"判定 */
const GENERIC_TITLES = ['ai学习提示', 'ai学习建议', 'ai知识拓展', 'ai提示', '学习提示'];

/** 占位/降级内容特征 */
const PLACEHOLDER_MARKERS = ['待ai增强', '待AI增强', '暂无拓展', '暂无内容', '待补充', '本节内容待'];

function normTitle(t: string): string {
  return (t || '').replace(/\s+/g, '').toLowerCase();
}

function isGenericTitle(t: string): boolean {
  return GENERIC_TITLES.includes(normTitle(t));
}

function isPlaceholder(body: string): boolean {
  const b = body || '';
  return PLACEHOLDER_MARKERS.some((m) => b.includes(m));
}

/* ------------------------------------------------------------------ */
// 核心评估

export function evaluateEnhancements(
  tasks: TaskEnhancement[],
  thresholds: EnhancementThresholds = DEFAULT_ENHANCEMENT_THRESHOLDS,
): EnhancementReport {
  const variantDistribution: Record<string, number> = { info: 0, tip: 0, culture: 0, warning: 0 };
  let calloutCount = 0;
  let warningCount = 0;
  let placeholderCount = 0;
  let shortBodyCount = 0;
  let quizCount = 0;
  let tasksWithWarning = 0;
  let tasksWithQuiz = 0;

  const sectionTitles: string[] = [];

  const tallCalloutsOf = (t: TaskEnhancement): Callout[] => [
    t.intro,
    ...t.sections.map((s) => s.callout),
    t.outro,
  ].filter(Boolean) as Callout[];

  for (const t of tasks) {
    let taskHasWarning = false;
    let taskHasQuiz = false;

    for (const c of tallCalloutsOf(t)) {
      calloutCount++;
      const v = c.variant || 'info';
      variantDistribution[v] = (variantDistribution[v] || 0) + 1;
      if (v === 'warning') { warningCount++; taskHasWarning = true; }
      if (isPlaceholder(c.body)) placeholderCount++;
      if ((c.body || '').trim().length < thresholds.minBodyLen) shortBodyCount++;
    }

    // 正文 callout 标题（intro/outro 是固定角色标题，不计入稀释度）
    for (const s of t.sections) {
      if (s.callout) sectionTitles.push(s.callout.title || '');
      if (s.quiz) { quizCount++; taskHasQuiz = true; }
    }
    if (t.outroQuiz) { quizCount++; taskHasQuiz = true; }

    if (taskHasWarning) tasksWithWarning++;
    if (taskHasQuiz) tasksWithQuiz++;
  }

  const sectionCalloutCount = sectionTitles.length;
  const distinctTitles = new Set(sectionTitles.map(normTitle)).size;
  const genericCount = sectionTitles.filter(isGenericTitle).length;
  const distinctTitleRatio = sectionCalloutCount > 0 ? distinctTitles / sectionCalloutCount : 0;
  const genericTitleRatio = sectionCalloutCount > 0 ? genericCount / sectionCalloutCount : 0;
  const warningTaskRatio = tasks.length > 0 ? tasksWithWarning / tasks.length : 0;
  const quizTaskRatio = tasks.length > 0 ? tasksWithQuiz / tasks.length : 0;

  const issues: string[] = [];
  if (warningCount === 0) issues.push('全书没有任何 warning（易错点/安全风险）callout');
  if (genericTitleRatio > 0.5) issues.push(`正文 callout 标题 ${Math.round(genericTitleRatio * 100)}% 是通用元提示`);
  if (placeholderCount > 0) issues.push(`${placeholderCount} 个占位/降级 callout`);
  if (shortBodyCount > 0) issues.push(`${shortBodyCount} 个 callout 正文过短（< ${thresholds.minBodyLen} 字）`);

  // ── 阻塞式质量门 ──
  const gateFailures: string[] = [];
  if (warningCount < thresholds.minWarningCount) gateFailures.push(`warning 数 ${warningCount} < ${thresholds.minWarningCount}`);
  if (warningTaskRatio < thresholds.minWarningTaskRatio) gateFailures.push(`含 warning 的任务占比 ${warningTaskRatio.toFixed(2)} < ${thresholds.minWarningTaskRatio}`);
  if (genericTitleRatio > thresholds.maxGenericTitleRatio) gateFailures.push(`通用标题占比 ${genericTitleRatio.toFixed(2)} > ${thresholds.maxGenericTitleRatio}`);
  if (distinctTitleRatio < thresholds.minDistinctTitleRatio) gateFailures.push(`标题去重率 ${distinctTitleRatio.toFixed(2)} < ${thresholds.minDistinctTitleRatio}`);
  if (quizTaskRatio < thresholds.minQuizTaskRatio) gateFailures.push(`含 quiz 的任务占比 ${quizTaskRatio.toFixed(2)} < ${thresholds.minQuizTaskRatio}`);
  if (placeholderCount > thresholds.maxPlaceholderCount) gateFailures.push(`占位/降级 callout 数 ${placeholderCount} > ${thresholds.maxPlaceholderCount}`);
  const gatePassed = gateFailures.length === 0;

  return {
    taskCount: tasks.length,
    calloutCount,
    sectionCalloutCount,
    quizCount,
    variantDistribution,
    warningCount,
    warningTaskRatio: Math.round(warningTaskRatio * 100) / 100,
    distinctTitleRatio: Math.round(distinctTitleRatio * 100) / 100,
    genericTitleRatio: Math.round(genericTitleRatio * 100) / 100,
    quizTaskRatio: Math.round(quizTaskRatio * 100) / 100,
    placeholderCount,
    shortBodyCount,
    gatePassed,
    gateFailures,
    issues,
    thresholds,
  };
}

/** 从 books/{bookId}/data/aiEnhancement.ts 加载并评估。 */
export async function evaluateEnhancementFile(
  bookId: string,
  thresholds: EnhancementThresholds = DEFAULT_ENHANCEMENT_THRESHOLDS,
): Promise<EnhancementReport> {
  const path = getBookDataPath(bookId, 'aiEnhancement.ts');
  if (!existsSync(path)) {
    throw new Error(`找不到 AI 增强文件：${path}`);
  }
  const mod = await import(pathToFileURL(path).href);
  const map = (mod.aiEnhancements || mod.default || {}) as Record<string, TaskEnhancement>;
  return evaluateEnhancements(Object.values(map), thresholds);
}

/* ------------------------------------------------------------------ */
// CLI

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  const gateMode = process.argv.includes('--gate') || process.argv.includes('--strict');
  if (!bookId) {
    console.error('用法: npx tsx enhancement-gate.ts --book-id <bookId> [--gate]');
    process.exit(1);
  }

  const r = await evaluateEnhancementFile(bookId);
  console.log(`[enh] 任务: ${r.taskCount}, callout: ${r.calloutCount}（正文 ${r.sectionCalloutCount}）, quiz: ${r.quizCount}`);
  console.log(`[enh] 变体分布: info ${r.variantDistribution.info} / tip ${r.variantDistribution.tip} / culture ${r.variantDistribution.culture} / warning ${r.variantDistribution.warning}`);
  console.log(`[enh] 标题去重率: ${r.distinctTitleRatio}, 通用标题占比: ${r.genericTitleRatio}`);
  console.log(`[enh] warning 任务占比: ${r.warningTaskRatio}, quiz 任务占比: ${r.quizTaskRatio}`);
  if (r.issues.length) {
    console.log('[enh] 问题:');
    for (const i of r.issues) console.log(`  - ${i}`);
  }
  console.log(`[gate] ${r.gatePassed ? '✅ 通过' : '❌ 未通过'}`);
  if (!r.gatePassed) for (const f of r.gateFailures) console.log(`  ✗ ${f}`);

  if (gateMode && !r.gatePassed) {
    console.error('[gate] AI 增强质量门未通过，退出码 1');
    process.exit(1);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
