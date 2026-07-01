#!/usr/bin/env node
/**
 * Step 4b: Event Relation Building (= shiji-kb SKILL_05a)
 *
 * Builds temporal/causal relations between extracted events.
 * Uses LLM when available, falls back to rule-based ordering.
 *
 * Input: knowledgeMap-events.json (from Step 3)
 * Output: knowledgeMap-event-relations.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import type { KnowledgeEvent, EventRelation } from './types.ts';

export interface EventRelationResult {
  relations: EventRelation[];
  source: 'llm' | 'rule';
}

function buildEventRelationPrompt(bookTitle: string, events: KnowledgeEvent[]): string {
  const eventList = events.map((e) => ({
    id: e.id,
    title: e.title,
    verb: e.verb,
    time: e.time,
    summary: e.summary,
  }));

  return `你是一位事件关系分析专家。请分析教材《${bookTitle}》中以下事件之间的时序和因果关系：

事件列表：
${JSON.stringify(eventList, null, 2)}

请输出 JSON（不要 markdown 代码块）：
{
  "relations": [
    {
      "from": "event-a-id",
      "to": "event-b-id",
      "type": "temporal",
      "label": "之后"
    }
  ]
}

关系类型：
- temporal: A 在 B 之前发生
- causal: A 导致了 B
- conditional: A 是 B 的前提条件
- concurrent: A 和 B 同时发生

规则：
- 只建立有明确依据的关系
- 如果事件之间没有明确关系，返回空数组
- 只输出 JSON`;
}

function buildRuleBasedRelations(events: KnowledgeEvent[]): EventRelation[] {
  const relations: EventRelation[] = [];

  const sorted = [...events].sort((a, b) => {
    if (a.time && b.time) return String(a.time).localeCompare(String(b.time));
    return 0;
  });

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].time && sorted[i + 1].time && sorted[i].time !== sorted[i + 1].time) {
      relations.push({
        from: sorted[i].id,
        to: sorted[i + 1].id,
        type: 'temporal',
        label: '之后',
      });
    }
  }

  return relations;
}

export async function buildEventRelations(bookId: string): Promise<EventRelationResult> {
  const eventsPath = getBookDataPath(bookId, 'knowledgeMap-events.json');
  if (!existsSync(eventsPath)) {
    return { relations: [], source: 'rule' };
  }

  const raw = JSON.parse(await readFile(eventsPath, 'utf-8')) as { events: KnowledgeEvent[] };
  const events = raw.events;

  if (events.length < 2) {
    return { relations: [], source: 'rule' };
  }

  let relations: EventRelation[] = [];
  let source: 'llm' | 'rule' = 'rule';

  try {
    const prompt = buildEventRelationPrompt(bookId, events);
    const output = await callLLM(prompt, bookId);
    if (output) {
      const match = output.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed.relations)) {
          const validTypes = new Set(['temporal', 'causal', 'conditional', 'concurrent']);
          relations = parsed.relations.filter(
            (r: { from: string; to: string; type: string }) =>
              r.from && r.to && validTypes.has(r.type),
          );
          source = 'llm';
        }
      }
    }
  } catch (err) {
    console.warn('[event-relations] LLM 构建失败，使用规则:', err);
  }

  if (relations.length === 0) {
    relations = buildRuleBasedRelations(events);
  }

  console.log(`[event-relations] 共构建 ${relations.length} 条事件关系`);
  return { relations, source };
}

export async function saveEventRelations(bookId: string, result: EventRelationResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-event-relations.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx build-event-relations.ts --book-id <bookId>');
    process.exit(1);
  }

  const result = await buildEventRelations(bookId);
  const outPath = await saveEventRelations(bookId, result);
  console.log(`[event-relations] 已保存到 ${outPath}（来源：${result.source}）`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
