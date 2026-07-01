#!/usr/bin/env node
/**
 * Step 6: Layout + Serialization (= shiji-kb SKILL_00 orchestrator)
 *
 * This is the LEAN ORCHESTRATOR. It:
 *   1. Calls analyzeStructure (Step 1)
 *   2. Calls extractEntities (Step 2a) → disambiguateEntities (Step 2b) → classifyEntities (Step 2c)
 *   3. Calls extractEvents (Step 3)
 *   4. Calls buildRelations (Step 4a) → buildEventRelations (Step 4b)
 *   5. Calls reviewKnowledgeMap (Step 5)
 *   6. Computes layout + serializes to knowledgeMap.ts (this file)
 *   7. Calls evaluateQuality (Step 7)
 *
 * Usage:
 *   npx tsx skills/knowledge-map-generator/scripts/generate-knowledge-map.ts \
 *     --book-id <bookId> [--force] [--entity-prompt-file <path>] [--relation-prompt-file <path>]
 */

import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { ensureFileDir, getBookDataPath } from '../../shared/paths.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';
import { callLLM } from '../../shared/llm.ts';

import {
  analyzeStructure,
  extractEntities, saveEntities,
  disambiguateEntities, saveDisambiguated,
  classifyEntities, saveClassified,
  extractEvents, saveEvents,
  buildRelations, saveRelations,
  buildEventRelations, saveEventRelations,
  reviewKnowledgeMap, saveReviewed,
  evaluateQuality,
} from './pipeline.ts';

import type {
  BookDataShape,
  ChapterContentShape,
  Chapter,
  Paradigm,
  CanvasData,
  CanvasNode,
  CanvasEdge,
  AdaptationWork,
  AdaptationRelation,
  KnowledgeLine,
  EnrichedEntity,
  EnrichedRelation,
  KnowledgeEvent,
  EventRelation,
} from './types.ts';

import type { KnowledgeEntity, KnowledgeRelation } from './extract-entities.ts';

/* ------------------------------------------------------------------ */
// CLI args

function parseArgs(): { bookId: string; force: boolean; strict: boolean; reflect: number; entityPromptFile?: string; relationPromptFile?: string } {
  const args = process.argv.slice(2);
  let bookId = '';
  let force = false;
  let strict = false;
  let reflect = 0;
  let entityPromptFile: string | undefined;
  let relationPromptFile: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) { bookId = args[i + 1]; i++; }
    if (args[i] === '--force') force = true;
    if (args[i] === '--strict') strict = true;
    if (args[i] === '--reflect' && args[i + 1]) { reflect = Math.max(0, parseInt(args[i + 1], 10) || 0); i++; }
    if (args[i] === '--entity-prompt-file' && args[i + 1]) { entityPromptFile = args[i + 1]; i++; }
    if (args[i] === '--relation-prompt-file' && args[i + 1]) { relationPromptFile = args[i + 1]; i++; }
  }

  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    console.error('用法: npx tsx generate-knowledge-map.ts --book-id <bookId> [--force] [--strict] [--reflect N] [--entity-prompt-file <path>] [--relation-prompt-file <path>]');
    process.exit(1);
  }

  return { bookId, force, strict, reflect, entityPromptFile, relationPromptFile };
}

/* ------------------------------------------------------------------ */
// Utilities

function escapeTsString(s: unknown): string {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function extractTaskName(subTitle: string): string {
  return subTitle.replace(/^任务[一二三四五六七八九十\d]+[\s、,.]*/, '').trim();
}

/* ------------------------------------------------------------------ */
// Adaptation-flow helpers

const LINE_COLORS = ['#8B4513', '#2c5282', '#2E8B57', '#8B0000', '#B8860B', '#6b46c1'];

function generateLinesFromChapters(bookInfo: BookDataShape, cultureLanes: string[]): KnowledgeLine[] {
  const chapters = bookInfo.chapters;
  if (chapters.length === 0) return [];

  const lines: KnowledgeLine[] = [];
  const laneCount = Math.min(cultureLanes.length, 6);

  for (let laneIdx = 0; laneIdx < laneCount; laneIdx++) {
    const lane = cultureLanes[laneIdx];
    const stations: { chapter: string; title: string; quote?: string; x: number }[] = [];
    const chaptersInLane = chapters.filter((_, i) => i % laneCount === laneIdx);

    for (let i = 0; i < chaptersInLane.length; i++) {
      const ch = chaptersInLane[i];
      stations.push({ chapter: ch.id, title: ch.title, quote: ch.summary ? ch.summary.slice(0, 100) : '', x: 80 + i * 90 });
    }

    if (stations.length > 0) {
      lines.push({ id: `line-${laneIdx}`, name: lane, color: LINE_COLORS[laneIdx % LINE_COLORS.length], stations });
    }
  }
  return lines;
}

async function extractAdaptationFlowWithLLM(
  bookInfo: BookDataShape,
  chapterContent: ChapterContentShape,
  bookId: string,
): Promise<{ works: AdaptationWork[]; relations: AdaptationRelation[]; cultureLanes: string[] } | null> {
  const chapters = bookInfo.chapters;
  const samples: string[] = [];

  for (const ch of chapters) {
    samples.push(`模块：${ch.title}`);
    for (const sub of ch.subSections.slice(0, 2)) {
      const content = chapterContent.chapterContents[sub.id];
      if (content) {
        for (const block of content.blocks) {
          if (block.content && block.content.length > 10 && !block.content.startsWith('暂未解析')) samples.push(block.content.slice(0, 200));
          if (block.callout?.body) samples.push(block.callout.body.slice(0, 200));
          if (block.quiz?.explanation && !block.quiz.explanation.startsWith('依据教材内容')) samples.push(block.quiz.explanation.slice(0, 200));
        }
      }
    }
  }

  const prompt = `从教材《${bookInfo.title}》内容中提取知识体系流转图数据。

内容片段：
${samples.slice(0, 12).join('\n---\n')}

严格输出 JSON（不要 markdown 代码块）：
{
  "works": [{"id": "w1", "title": "概念名称", "author": "", "year": null, "culture": "核心概念", "medium": "概念", "summary": "概念描述"}],
  "relations": [{"from": "w1", "to": "w2", "type": "influence", "label": "相关"}],
  "cultureLanes": ["核心概念", "基础理论", "临床应用", "拓展延伸"]
}

type 可以是 translation/adaptation/influence/remake/citation/composition/derivation/extension 等任意描述性字符串；year 不确定填 null；至少 5 个知识节点。cultureLanes 应根据教材实际内容领域设置。`;

  try {
    const output = await callLLM(prompt, bookId);
    if (!output) return null;
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]);

    let works: AdaptationWork[] = [];
    let relations: AdaptationRelation[] = [];

    if (Array.isArray(parsed.works)) {
      works = parsed.works;
    } else if (Array.isArray(parsed.nodes)) {
      works = parsed.nodes.map((n: any, idx: number) => ({
        id: n.id || `work-${idx}`, title: n.title || n.name || '未命名作品', author: n.author || n.translator,
        year: n.year, culture: n.culture || n.region || '其他', medium: n.medium || n.type || '文本', summary: n.summary,
      }));
    }

    if (Array.isArray(parsed.relations)) {
      relations = parsed.relations;
    } else if (Array.isArray(parsed.edges) || Array.isArray(parsed.links)) {
      const rawRels = parsed.edges || parsed.links;
      relations = rawRels.map((r: any) => ({
        from: r.from || r.source, to: r.to || r.target, type: r.type || 'influence', label: r.label,
      })).filter((r: AdaptationRelation) => r.from && r.to);
    }

    if (works.length < 3) return null;
    return { works, relations, cultureLanes: Array.isArray(parsed.cultureLanes) ? parsed.cultureLanes : ['原作', '翻译', '改编'] };
  } catch {
    return null;
  }
}

function generateAbstractAdaptationFlow(bookInfo: BookDataShape): { works: AdaptationWork[]; relations: AdaptationRelation[]; cultureLanes: string[] } {
  const chapters = bookInfo.chapters;
  const cultureLanes = ['核心概念', '基础理论', '临床应用', '拓展延伸'];
  const works: AdaptationWork[] = [];
  const relations: AdaptationRelation[] = [];

  works.push({ id: 'center-work', title: bookInfo.title, culture: '核心概念', medium: '教材主题', summary: `${bookInfo.title}知识体系核心` });

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const laneIdx = Math.min(i, cultureLanes.length - 1);
    const workId = `work-${i + 1}`;
    works.push({ id: workId, title: ch.title, culture: cultureLanes[laneIdx], medium: '章节', summary: ch.summary });
    relations.push({ from: 'center-work', to: workId, type: 'composition', label: '包含' });
  }

  return { works, relations, cultureLanes };
}

function buildAdaptationFlowDataFromReview(
  bookInfo: BookDataShape,
  entities: KnowledgeEntity[],
  relations: KnowledgeRelation[],
): { works: AdaptationWork[]; relations: AdaptationRelation[]; cultureLanes: string[] } {
  const cultures = [...new Set(entities.map((e) => e.culture).filter(Boolean))] as string[];
  const cultureLanes = cultures.length > 0 ? cultures : ['核心概念', '基础理论', '应用', '拓展'];

  const works: AdaptationWork[] = entities.map((e) => ({
    id: e.id,
    title: e.title,
    author: e.author,
    year: e.year,
    culture: e.culture || cultureLanes[0],
    medium: e.medium || e.type,
    summary: e.summary,
  }));

  const flowRelations: AdaptationRelation[] = relations.map((r) => ({
    from: r.from, to: r.to, type: r.type, label: r.label, reason: r.reason,
  }));

  return { works, relations: flowRelations, cultureLanes };
}

/* ------------------------------------------------------------------ */
// Layout: adaptation-flow

function generateAdaptationFlowLayout(
  bookInfo: BookDataShape,
  flow: { works: AdaptationWork[]; relations: AdaptationRelation[]; cultureLanes: string[] },
  rationale: string,
  reviewEntities: KnowledgeEntity[] | null,
  reviewRelations: KnowledgeRelation[] | null,
): CanvasData {
  const { works, relations, cultureLanes } = flow;
  const laneHeight = 200;
  const nodeWidth = 200;
  const nodeHeight = 76;
  const colGap = 240;
  const laneIndexMap = new Map<string, number>();
  cultureLanes.forEach((lane, idx) => laneIndexMap.set(lane, idx));

  const laneWorks: AdaptationWork[][] = cultureLanes.map(() => []);
  for (const work of works) {
    const laneIdx = laneIndexMap.get(work.culture) ?? 0;
    laneWorks[laneIdx].push(work);
  }

  const maxCols = Math.max(...laneWorks.map((lw) => Math.min(lw.length, 3)));
  const gridWidth = maxCols * colGap;
  const startX = -gridWidth / 2;
  const startY = -((cultureLanes.length * laneHeight) / 2);

  const workXMap = new Map<string, number>();
  const workYMap = new Map<string, number>();

  for (let laneIdx = 0; laneIdx < laneWorks.length; laneIdx++) {
    const lw = laneWorks[laneIdx];
    const laneWidth = Math.min(lw.length, maxCols) * colGap;
    const laneStartX = startX + (gridWidth - laneWidth) / 2;
    for (let i = 0; i < lw.length; i++) {
      const col = i % maxCols;
      const row = Math.floor(i / maxCols);
      workXMap.set(lw[i].id, laneStartX + col * colGap);
      workYMap.set(lw[i].id, startY + laneIdx * laneHeight + row * (nodeHeight + 40));
    }
  }

  const nodes: CanvasNode[] = [];
  const edges: CanvasEdge[] = [];

  nodes.push({ id: 'adaptation-title', type: 'text', x: -220, y: startY - 140, width: 440, height: 90, text: `# ${bookInfo.title}\n\n跨文化文本旅行图`, color: '5' });

  for (let i = 0; i < cultureLanes.length; i++) {
    nodes.push({ id: `lane-${i}`, type: 'text', x: startX - 160, y: startY + i * laneHeight, width: 130, height: 36, text: `**${cultureLanes[i]}**`, color: '3' });
  }

  for (const work of works) {
    nodes.push({ id: work.id, type: 'text', x: workXMap.get(work.id) ?? 0, y: workYMap.get(work.id) ?? 0, width: nodeWidth, height: nodeHeight, text: work.year ? `**${work.title}**\n${work.year} · ${work.medium}` : `**${work.title}**\n${work.medium}`, color: '1' });
  }

  for (const rel of relations) {
    edges.push({ id: `e-${rel.from}-${rel.to}`, fromNode: rel.from, toNode: rel.to, label: rel.label || rel.type, color: '2', type: rel.type });
  }

  const lines = generateLinesFromChapters(bookInfo, cultureLanes);

  return {
    paradigm: 'adaptation-flow',
    rationale,
    nodes,
    edges,
    adaptationFlow: { works, relations, cultureLanes, lines: lines.length > 0 ? lines : undefined },
    enrichedEntities: reviewEntities ? reviewEntities.map(mapEntityToEnriched) : works.map((w) => ({
      id: w.id, title: w.title, type: w.medium === '人物' ? 'person' : 'work', summary: w.summary, culture: w.culture, medium: w.medium,
    })),
    enrichedRelations: (reviewRelations || relations).map(mapRelationToEnriched),
  };
}

/* ------------------------------------------------------------------ */
// Layout: radial

const NODE_W = 220;
const NODE_H = 50;
const TITLE_H = 60;
const GAP_X = 260;
const GAP_Y = 70;
const GROUP_PADDING_X = 40;
const GROUP_PADDING_TOP = 90;
const GROUP_PADDING_BOTTOM = 30;
const COLORS = ['1', '2', '3', '4', '5', '6'];

function generateRadialLayout(chapters: Chapter[], bookTitle: string): CanvasData {
  const nodes: CanvasNode[] = [];
  const edges: CanvasEdge[] = [];

  nodes.push({ id: 'center', type: 'text', x: -160, y: -70, width: 320, height: 140, text: `# ${bookTitle || '教材知识结构'}\n\n知识结构图谱`, color: '5' });

  const quadrants = [
    { x: -760, y: -560 }, { x: 240, y: -560 }, { x: -760, y: 240 }, { x: 240, y: 240 }, { x: -260, y: 640 },
  ];

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const color = COLORS[i % COLORS.length];
    const origin = quadrants[i % quadrants.length];

    const taskNames = ch.subSections.map((s) => ({ name: extractTaskName(s.title), taskId: s.id })).filter((t) => t.name.length > 0);
    const cols = 2;
    const rows = Math.ceil(taskNames.length / cols);
    const groupWidth = cols * NODE_W + (cols - 1) * (GAP_X - NODE_W) + GROUP_PADDING_X * 2;
    const groupHeight = GROUP_PADDING_TOP + rows * NODE_H + (rows - 1) * (GAP_Y - NODE_H) + GROUP_PADDING_BOTTOM;

    nodes.push({ id: `${ch.id}-group`, type: 'group', x: origin.x, y: origin.y, width: groupWidth, height: groupHeight, label: `${ch.section}：${ch.title}`, color });
    nodes.push({ id: ch.id, type: 'text', x: origin.x + GROUP_PADDING_X, y: origin.y + 30, width: groupWidth - GROUP_PADDING_X * 2, height: TITLE_H, text: `**${ch.title}**`, color });

    const sideMap = ['left', 'right', 'left', 'right', 'bottom'];
    edges.push({ id: `e-center-${ch.id}`, fromNode: 'center', toNode: ch.id, fromSide: sideMap[i % sideMap.length], toSide: i < 4 ? (i % 2 === 0 ? 'right' : 'left') : 'top', color });

    for (let j = 0; j < taskNames.length; j++) {
      const col = j % cols;
      const row = Math.floor(j / cols);
      const taskNodeId = `${ch.id}-t${j + 1}`;
      nodes.push({ id: taskNodeId, type: 'text', x: origin.x + GROUP_PADDING_X + col * GAP_X, y: origin.y + GROUP_PADDING_TOP + row * GAP_Y, width: NODE_W, height: NODE_H, text: taskNames[j].name, taskId: taskNames[j].taskId });
      edges.push({ id: `e-${ch.id}-${taskNodeId}`, fromNode: ch.id, toNode: taskNodeId, fromSide: 'bottom', toSide: 'top' });
    }
  }

  return { paradigm: 'radial', rationale: '模块数量适中，使用默认 radial 布局。', nodes, edges };
}

/* ------------------------------------------------------------------ */
// Layout: process-flow

function generateProcessFlowLayout(chapters: Chapter[], bookTitle: string): CanvasData {
  const nodes: CanvasNode[] = [];
  const edges: CanvasEdge[] = [];
  const STEP_W = 280, STEP_H = 80, STEP_GAP_X = 120, TASK_GAP_Y = 70, GROUP_PAD = 40, GROUP_TITLE_H = 50;

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const color = COLORS[i % COLORS.length];
    const taskNames = ch.subSections.map((s) => ({ name: extractTaskName(s.title), taskId: s.id })).filter((t) => t.name.length > 0);
    const groupX = i * (STEP_W + STEP_GAP_X) - 400;
    const groupH = GROUP_PAD * 2 + GROUP_TITLE_H + taskNames.length * TASK_GAP_Y;
    const groupY = -groupH / 2;

    nodes.push({ id: `${ch.id}-group`, type: 'group', x: groupX, y: groupY, width: STEP_W, height: groupH, label: ch.section, color });
    nodes.push({ id: ch.id, type: 'text', x: groupX + GROUP_PAD, y: groupY + GROUP_PAD, width: STEP_W - GROUP_PAD * 2, height: GROUP_TITLE_H, text: `**${ch.title}**`, color });

    if (i > 0) {
      edges.push({ id: `e-${chapters[i - 1].id}-${ch.id}`, fromNode: chapters[i - 1].id, toNode: ch.id, fromSide: 'right', toSide: 'left', color: '4', label: '流程' });
    }

    for (let j = 0; j < taskNames.length; j++) {
      const taskNodeId = `${ch.id}-t${j + 1}`;
      nodes.push({ id: taskNodeId, type: 'text', x: groupX + GROUP_PAD, y: groupY + GROUP_PAD + GROUP_TITLE_H + 20 + j * TASK_GAP_Y, width: STEP_W - GROUP_PAD * 2, height: 50, text: taskNames[j].name, taskId: taskNames[j].taskId });
      edges.push({ id: `e-${ch.id}-${taskNodeId}`, fromNode: ch.id, toNode: taskNodeId, fromSide: 'bottom', toSide: 'top' });
    }
  }

  return { paradigm: 'process-flow', rationale: `${chapters.length} 个流程阶段`, nodes, edges };
}

/* ------------------------------------------------------------------ */
// Entity → EnrichedEntity mapping

function mapEntityToEnriched(e: KnowledgeEntity): EnrichedEntity {
  return {
    id: e.id, title: e.title, type: e.type, gloss: e.gloss, desc: e.desc,
    summary: e.summary, count: e.count, refs: e.refs, culture: e.culture,
    medium: e.medium, aliases: e.aliases, occurrences: e.occurrences,
  };
}

function mapRelationToEnriched(r: KnowledgeRelation): EnrichedRelation {
  return { from: r.from, to: r.to, type: r.type, label: r.label, reason: r.reason };
}

/* ------------------------------------------------------------------ */
// Serialization

function nodeToString(n: CanvasNode): string {
  const fields = [`    id: '${escapeTsString(n.id)}',`, `    type: '${escapeTsString(n.type)}',`, `    x: ${n.x},`, `    y: ${n.y},`, `    width: ${n.width},`, `    height: ${n.height},`];
  if (n.text !== undefined) fields.push(`    text: '${escapeTsString(n.text)}',`);
  if (n.label !== undefined) fields.push(`    label: '${escapeTsString(n.label)}',`);
  if (n.color !== undefined) fields.push(`    color: '${escapeTsString(n.color)}',`);
  if (n.taskId !== undefined) fields.push(`    taskId: '${escapeTsString(n.taskId)}',`);
  return `  {\n${fields.join('\n')}\n  }`;
}

function edgeToString(e: CanvasEdge): string {
  const fields = [`    id: '${escapeTsString(e.id)}',`, `    fromNode: '${escapeTsString(e.fromNode)}',`, `    toNode: '${escapeTsString(e.toNode)}',`];
  if (e.fromSide) fields.push(`    fromSide: '${escapeTsString(e.fromSide)}',`);
  if (e.toSide) fields.push(`    toSide: '${escapeTsString(e.toSide)}',`);
  if (e.label) fields.push(`    label: '${escapeTsString(e.label)}',`);
  if (e.color) fields.push(`    color: '${escapeTsString(e.color)}',`);
  if (e.type) fields.push(`    type: '${escapeTsString(e.type)}',`);
  return `  {\n${fields.join('\n')}\n  }`;
}

function adaptationFlowToString(flow: NonNullable<CanvasData['adaptationFlow']>): string {
  const worksStr = flow.works.map((w) => `    { id: '${escapeTsString(w.id)}', title: '${escapeTsString(w.title)}', author: '${w.author ? escapeTsString(w.author) : ''}', year: ${w.year ? `'${escapeTsString(String(w.year))}'` : 'undefined'}, culture: '${escapeTsString(w.culture)}', medium: '${escapeTsString(w.medium)}', summary: '${w.summary ? escapeTsString(w.summary) : ''}' }`).join(',\n');
  const relationsStr = flow.relations.map((r) => `    { from: '${escapeTsString(r.from)}', to: '${escapeTsString(r.to)}', type: '${escapeTsString(r.type)}', label: '${r.label ? escapeTsString(r.label) : ''}', reason: '${r.reason ? escapeTsString(r.reason) : ''}' }`).join(',\n');
  const lanesStr = flow.cultureLanes.map((l) => `'${escapeTsString(l)}'`).join(', ');
  let linesStr = '';
  if (flow.lines && flow.lines.length > 0) {
    const linesData = flow.lines.map((line) => {
      const stations = line.stations.map((s) => `      { chapter: '${escapeTsString(s.chapter)}', title: '${escapeTsString(s.title)}', quote: '${s.quote ? escapeTsString(s.quote) : ''}', x: ${s.x} }`).join(',\n');
      return `    { id: '${escapeTsString(line.id)}', name: '${escapeTsString(line.name)}', color: '${escapeTsString(line.color)}', stations: [\n${stations}\n    ] }`;
    }).join(',\n');
    linesStr = `,\n  lines: [\n${linesData}\n  ]`;
  }
  return `{\n  works: [\n${worksStr}\n  ],\n  relations: [\n${relationsStr}\n  ],\n  cultureLanes: [${lanesStr}]${linesStr}\n}`;
}

function enrichedEntitiesToString(entities: EnrichedEntity[]): string {
  const items = entities.map((e) => {
    const fields = [`    id: '${escapeTsString(e.id)}'`, `title: '${escapeTsString(e.title)}'`, `type: '${escapeTsString(e.type)}'`];
    if (e.gloss) fields.push(`gloss: '${escapeTsString(e.gloss)}'`);
    if (e.desc) fields.push(`desc: '${escapeTsString(e.desc)}'`);
    if (e.summary) fields.push(`summary: '${escapeTsString(e.summary)}'`);
    if (e.count !== undefined) fields.push(`count: ${e.count}`);
    if (e.culture) fields.push(`culture: '${escapeTsString(e.culture)}'`);
    if (e.medium) fields.push(`medium: '${escapeTsString(e.medium)}'`);
    if (e.refs && e.refs.length > 0) {
      const refsStr = e.refs.map((r) => `{ chapter: '${escapeTsString(r.chapter)}', title: '${escapeTsString(r.title)}', pn: '${escapeTsString(r.pn)}' }`).join(', ');
      fields.push(`refs: [${refsStr}]`);
    }
    if (e.aliases && e.aliases.length > 0) {
      const aliasesStr = e.aliases.map((a) => `'${escapeTsString(a)}'`).join(', ');
      fields.push(`aliases: [${aliasesStr}]`);
    }
    if (e.occurrences && e.occurrences.length > 0) {
      const occStr = e.occurrences.slice(0, 20).map((o) => `{ taskId: '${escapeTsString(o.taskId)}', pn: '${escapeTsString(o.pn)}'${o.offset !== undefined ? `, offset: ${o.offset}` : ''}${o.length !== undefined ? `, length: ${o.length}` : ''} }`).join(', ');
      fields.push(`occurrences: [${occStr}]`);
    }
    return `    { ${fields.join(', ')} }`;
  }).join(',\n');
  return `[\n${items}\n  ]`;
}

function enrichedRelationsToString(relations: EnrichedRelation[]): string {
  const items = relations.map((r) => {
    const fields = [`    from: '${escapeTsString(r.from)}'`, `to: '${escapeTsString(r.to)}'`, `type: '${escapeTsString(r.type)}'`];
    if (r.label) fields.push(`label: '${escapeTsString(r.label)}'`);
    if (r.reason) fields.push(`reason: '${escapeTsString(r.reason)}'`);
    return `    { ${fields.join(', ')} }`;
  }).join(',\n');
  return `[\n${items}\n  ]`;
}

function eventsToString(events: KnowledgeEvent[]): string {
  const items = events.map((e) => {
    const fields = [`    id: '${escapeTsString(e.id)}'`, `title: '${escapeTsString(e.title)}'`, `verb: '${escapeTsString(e.verb)}'`];
    if (e.time) fields.push(`time: '${escapeTsString(e.time)}'`);
    if (e.location) fields.push(`location: '${escapeTsString(e.location)}'`);
    if (e.summary) fields.push(`summary: '${escapeTsString(e.summary)}'`);
    if (e.participants && e.participants.length > 0) {
      fields.push(`participants: [${e.participants.map((p) => `'${escapeTsString(p)}'`).join(', ')}]`);
    }
    if (e.refs && e.refs.length > 0) {
      const refsStr = e.refs.map((r) => `{ chapter: '${escapeTsString(r.chapter)}', title: '${escapeTsString(r.title)}', pn: '${escapeTsString(r.pn)}' }`).join(', ');
      fields.push(`refs: [${refsStr}]`);
    }
    return `    { ${fields.join(', ')} }`;
  }).join(',\n');
  return `[\n${items}\n  ]`;
}

function eventRelationsToString(relations: EventRelation[]): string {
  const items = relations.map((r) => {
    const fields = [`    from: '${escapeTsString(r.from)}'`, `to: '${escapeTsString(r.to)}'`, `type: '${escapeTsString(r.type)}'`];
    if (r.label) fields.push(`label: '${escapeTsString(r.label)}'`);
    return `    { ${fields.join(', ')} }`;
  }).join(',\n');
  return `[\n${items}\n  ]`;
}

function qualityToString(q: NonNullable<CanvasData['quality']>): string {
  return `{
    entityCount: ${q.entityCount},
    relationCount: ${q.relationCount},
    eventCount: ${q.eventCount},
    coverage: ${q.coverage},
    duplicateIds: ${q.duplicateIds},
    isolatedNodes: ${q.isolatedNodes},
    invalidRelations: ${q.invalidRelations},
    emptyRefsEntities: ${q.emptyRefsEntities},
    avgRefsPerEntity: ${q.avgRefsPerEntity},
    confidenceScore: ${q.confidenceScore},
    issues: [${q.issues.map((i) => `'${escapeTsString(i)}'`).join(', ')}],
    suggestions: [${q.suggestions.map((s) => `'${escapeTsString(s)}'`).join(', ')}],
  }`;
}

function generateKnowledgeMapTs(data: CanvasData, _bookTitle: string): string {
  return `export type Paradigm =
  | 'radial'
  | 'tree'
  | 'skill-tree'
  | 'metro'
  | 'network'
  | 'adaptation-flow'
  | 'process-flow'
  | 'spatial-map';

export interface CanvasNode {
  id: string;
  type: 'text' | 'group';
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  label?: string;
  color?: string;
  taskId?: string;
  knowledgePoints?: { id: string; type: string; title: string; summary?: string; difficulty?: number; paragraphRefs?: string[] }[];
}

export interface CanvasEdge {
  id: string;
  fromNode: string;
  toNode: string;
  fromSide?: string;
  toSide?: string;
  label?: string;
  color?: string;
  type?: string;
}

export interface AdaptationWork {
  id: string;
  title: string;
  author?: string;
  year?: number | string;
  culture: string;
  medium: string;
  summary?: string;
}

export interface AdaptationRelation {
  from: string;
  to: string;
  type: string;
  label?: string;
  reason?: string;
}

export interface KnowledgeLine {
  id: string;
  name: string;
  color: string;
  stations: { chapter: string; title: string; quote?: string; x: number }[];
}

export interface EntityRef {
  chapter: string;
  title: string;
  pn: string;
}

export interface KnowledgeEvent {
  id: string;
  title: string;
  verb: string;
  participants: string[];
  time?: string;
  location?: string;
  summary?: string;
  refs?: EntityRef[];
}

export interface EventRelation {
  from: string;
  to: string;
  type: 'temporal' | 'causal' | 'conditional' | 'concurrent';
  label?: string;
}

export interface QualityReport {
  entityCount: number;
  relationCount: number;
  eventCount: number;
  coverage: number;
  duplicateIds: number;
  isolatedNodes: number;
  invalidRelations: number;
  emptyRefsEntities: number;
  avgRefsPerEntity: number;
  confidenceScore: number;
  issues: string[];
  suggestions: string[];
}

export interface CanvasData {
  paradigm: Paradigm;
  rationale: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  aliases?: { standard: string; variant: string }[];
  adaptationFlow?: {
    works: AdaptationWork[];
    relations: AdaptationRelation[];
    cultureLanes: string[];
    lines?: KnowledgeLine[];
  };
  enrichedEntities?: {
    id: string;
    title: string;
    type: string;
    gloss?: string;
    desc?: string;
    summary?: string;
    count?: number;
    refs?: EntityRef[];
    culture?: string;
    medium?: string;
    aliases?: string[];
    occurrences?: { taskId: string; pn: string; offset?: number; length?: number }[];
  }[];
  enrichedRelations?: {
    from: string;
    to: string;
    type: string;
    label?: string;
    reason?: string;
  }[];
  events?: KnowledgeEvent[];
  eventRelations?: EventRelation[];
  quality?: QualityReport;
}

export const knowledgeMapData: CanvasData = {
  paradigm: '${data.paradigm}',
  rationale: '${escapeTsString(data.rationale)}',
  nodes: [
${data.nodes.map((n) => nodeToString(n)).join(',\n')}
  ],
  edges: [
${data.edges.map((e) => edgeToString(e)).join(',\n')}
  ],
${data.adaptationFlow ? `  adaptationFlow: ${adaptationFlowToString(data.adaptationFlow)},` : ''}
${data.enrichedEntities && data.enrichedEntities.length > 0 ? `  enrichedEntities: ${enrichedEntitiesToString(data.enrichedEntities)},` : ''}
${data.enrichedRelations && data.enrichedRelations.length > 0 ? `  enrichedRelations: ${enrichedRelationsToString(data.enrichedRelations)},` : ''}
${data.events && data.events.length > 0 ? `  events: ${eventsToString(data.events)},` : ''}
${data.eventRelations && data.eventRelations.length > 0 ? `  eventRelations: ${eventRelationsToString(data.eventRelations)},` : ''}
${data.quality ? `  quality: ${qualityToString(data.quality)},` : ''}
};
`;
}

/* ------------------------------------------------------------------ */
// Main: 7-step pipeline orchestration

async function runPipeline(
  bookId: string,
  force: boolean,
  entityPromptFile?: string,
  relationPromptFile?: string,
): Promise<{ entities: KnowledgeEntity[]; relations: KnowledgeRelation[] }> {
  const entitiesPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  const relationsPath = getBookDataPath(bookId, 'knowledgeMap-relations.json');

  // Step 2a: Entity extraction
  if (existsSync(entitiesPath) && !force) {
    console.log('[step-2a] 实体文件已存在，跳过提取（使用 --force 重新提取）');
  } else {
    console.log('[step-2a] 实体提取...');
    const entityResult = await extractEntities(bookId, entityPromptFile);
    await saveEntities(bookId, entityResult);
  }

  // Step 2b: Entity disambiguation
  console.log('[step-2b] 实体消歧...');
  const disambigResult = await disambiguateEntities(bookId);
  await saveDisambiguated(bookId, disambigResult);

  // Step 2c: Entity classification
  console.log('[step-2c] 实体分类...');
  const classifyResult = await classifyEntities(bookId);
  await saveClassified(bookId, classifyResult);

  // Step 3: Event extraction
  console.log('[step-3] 事件提取...');
  const eventResult = await extractEvents(bookId);
  await saveEvents(bookId, eventResult);

  // Step 4a: Relation building
  if (existsSync(relationsPath) && !force) {
    console.log('[step-4a] 关系文件已存在，跳过构建（使用 --force 重新构建）');
  } else {
    console.log('[step-4a] 关系构建...');
    const relationResult = await buildRelations(bookId, relationPromptFile);
    await saveRelations(bookId, relationResult);
  }

  // Step 4b: Event relations
  console.log('[step-4b] 事件关系构建...');
  const eventRelResult = await buildEventRelations(bookId);
  await saveEventRelations(bookId, eventRelResult);

  // Step 5: Review
  console.log('[step-5] 审查...');
  const reviewResult = await reviewKnowledgeMap(bookId);
  await saveReviewed(bookId, reviewResult);

  return { entities: reviewResult.entities, relations: reviewResult.relations };
}

async function main(): Promise<SkillResult<void>> {
  const { bookId, force, strict, reflect, entityPromptFile, relationPromptFile } = parseArgs();
  console.log(`[orchestrator] bookId=${bookId}, force=${force}, strict=${strict}, reflect=${reflect}`);

  // Step 1: Structure analysis
  console.log('[step-1] 结构分析...');
  const { bookInfo, chapterContent, paradigm, rationale } = await analyzeStructure(bookId);
  console.log(`[step-1] 书名: ${bookInfo.title}, 范式: ${paradigm}`);
  console.log(`[step-1] 理由: ${rationale}`);

  // Steps 2-5: Pipeline
  console.log('[step-2to5] 运行实体/事件/关系/审查流水线...');
  let reviewEntities: KnowledgeEntity[] = [];
  let reviewRelations: KnowledgeRelation[] = [];
  try {
    const result = await runPipeline(bookId, force, entityPromptFile, relationPromptFile);
    reviewEntities = result.entities;
    reviewRelations = result.relations;
  } catch (err) {
    console.warn('[orchestrator] 流水线失败:', err);
  }

  // Step 6: Layout + serialize
  console.log('[step-6] 布局生成...');
  let canvasData: CanvasData;

  if (paradigm === 'adaptation-flow') {
    let flow: { works: AdaptationWork[]; relations: AdaptationRelation[]; cultureLanes: string[] } | null = null;
    let flowRationale = '基于官方流水线对齐的实体-关系-审查流程生成 adaptation-flow。';

    if (reviewEntities.length >= 8) {
      flow = buildAdaptationFlowDataFromReview(bookInfo, reviewEntities, reviewRelations);
    }

    if (!flow || flow.works.length < 5) {
      const llmFlow = await extractAdaptationFlowWithLLM(bookInfo, chapterContent, bookId);
      if (llmFlow && llmFlow.works.length >= 3) {
        flow = llmFlow;
        flowRationale = '基于 LLM 提取的跨文化改编关系生成 adaptation-flow。';
      } else {
        flow = generateAbstractAdaptationFlow(bookInfo);
        flowRationale = '基于教材章节结构生成的跨文化改编流转概览。';
      }
    }

    canvasData = generateAdaptationFlowLayout(bookInfo, flow, flowRationale, reviewEntities.length > 0 ? reviewEntities : null, reviewRelations.length > 0 ? reviewRelations : null);
  } else if (paradigm === 'process-flow') {
    canvasData = generateProcessFlowLayout(bookInfo.chapters, bookInfo.title);
    canvasData.rationale = rationale;
    if (reviewEntities.length > 0) {
      canvasData.enrichedEntities = reviewEntities.map(mapEntityToEnriched);
      canvasData.enrichedRelations = reviewRelations.map(mapRelationToEnriched);
    }
  } else {
    canvasData = generateRadialLayout(bookInfo.chapters, bookInfo.title);
    if (reviewEntities.length > 0) {
      canvasData.enrichedEntities = reviewEntities.map(mapEntityToEnriched);
      canvasData.enrichedRelations = reviewRelations.map(mapRelationToEnriched);
    }
  }

  // Attach events if available
  try {
    const eventsPath = getBookDataPath(bookId, 'knowledgeMap-events.json');
    const eventRelsPath = getBookDataPath(bookId, 'knowledgeMap-event-relations.json');
    if (existsSync(eventsPath)) {
      const rawEvents = JSON.parse(await (await import('fs/promises')).readFile(eventsPath, 'utf-8'));
      if (rawEvents.events && rawEvents.events.length > 0) {
        canvasData.events = rawEvents.events;
      }
    }
    if (existsSync(eventRelsPath)) {
      const rawEventRels = JSON.parse(await (await import('fs/promises')).readFile(eventRelsPath, 'utf-8'));
      if (rawEventRels.relations && rawEventRels.relations.length > 0) {
        canvasData.eventRelations = rawEventRels.relations;
      }
    }
  } catch {
    // events are optional
  }

  // Step 7: Quality evaluation + 阻塞式质量门 + 有界反思重跑
  console.log('[step-7] 质量评估...');
  try {
    canvasData.quality = await evaluateQuality(bookId);
    console.log(`[step-7] 置信度: ${canvasData.quality.confidenceScore}, 覆盖度: ${canvasData.quality.coverage}, 关系密度: ${canvasData.quality.relationDensity}`);

    // 反思循环：门未通过且开启 --reflect 时，重跑关系构建+审查，最多 reflect 次
    let attempt = 0;
    while (canvasData.quality && !canvasData.quality.gatePassed && attempt < reflect) {
      attempt++;
      console.log(`[reflect] 质量门未通过，第 ${attempt}/${reflect} 次反思重跑（关系构建 + 审查）...`);
      for (const f of canvasData.quality.gateFailures) console.log(`  ✗ ${f}`);
      try {
        const relationResult = await buildRelations(bookId, relationPromptFile);
        await saveRelations(bookId, relationResult);
        const reviewResult = await reviewKnowledgeMap(bookId);
        await saveReviewed(bookId, reviewResult);
        reviewEntities = reviewResult.entities;
        reviewRelations = reviewResult.relations;
        if (paradigm !== 'adaptation-flow') {
          canvasData.enrichedEntities = reviewEntities.map(mapEntityToEnriched);
          canvasData.enrichedRelations = reviewRelations.map(mapRelationToEnriched);
        }
        canvasData.quality = await evaluateQuality(bookId);
      } catch (err) {
        console.warn(`[reflect] 第 ${attempt} 次反思重跑失败:`, err);
        break;
      }
    }

    console.log(`[gate] ${canvasData.quality.gatePassed ? '✅ 通过' : '❌ 未通过'}`);
    if (!canvasData.quality.gatePassed) {
      for (const f of canvasData.quality.gateFailures) console.log(`  ✗ ${f}`);
    }
    if (strict && !canvasData.quality.gatePassed) {
      return { success: false, errors: ['质量门未通过：', ...canvasData.quality.gateFailures] };
    }
  } catch (err) {
    console.warn('[step-7] 质量评估失败:', err);
  }

  console.log(`[orchestrator] 生成 ${canvasData.nodes.length} 个节点，${canvasData.edges.length} 条边`);

  const outputPath = getBookDataPath(bookId, 'knowledgeMap.ts');
  ensureFileDir(outputPath);
  const tsContent = generateKnowledgeMapTs(canvasData, bookInfo.title);
  await writeFile(outputPath, tsContent, 'utf-8');
  console.log(`[orchestrator] 已写入: ${outputPath}`);

  // Validate
  console.log('[orchestrator] 正在校验生成的 TS 文件...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[orchestrator] 校验通过');
  } else {
    console.error('[orchestrator] 校验失败:');
    validation.messages.forEach((m) => console.error(`  - ${m}`));
    return { success: false, errors: validation.messages };
  }

  return { success: true, errors: [] };
}

main().then((result) => {
  if (!result.success) process.exit(1);
});
