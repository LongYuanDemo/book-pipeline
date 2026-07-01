#!/usr/bin/env node
/**
 * Step 3: Event Extraction (= shiji-kb SKILL_04)
 *
 * LLM-based extraction of events from textbook content.
 * Each event includes a verb (action), participants, time, location, and refs.
 *
 * Input: bookInfo.ts + chapterContent.ts
 * Output: knowledgeMap-events.json
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { getBookDataPath, ensureFileDir } from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import {
  loadBookTextContext,
  getChapterText,
  type BookTextContext,
  type SourceModule,
} from './loaders/bookLoader.ts';
import type { KnowledgeEvent, EntityRef } from './types.ts';

export interface EventExtractionResult {
  events: KnowledgeEvent[];
  source: 'llm' | 'rule';
}

function buildEventPrompt(bookTitle: string, moduleTitle: string, moduleText: string, taskIds: { id: string; title: string }[]): string {
  const taskIdList = taskIds.map((t) => `  ${t.id} → ${t.title}`).join('\n');
  return `你是一位教材事件分析专家。请从教材《${bookTitle}》的以下模块中提取重要事件（具有动作性、过程性的知识点）。

模块：${moduleTitle}

该模块包含以下任务：
${taskIdList}

教材内容：
${moduleText.slice(0, 12000)}

请严格输出 JSON（不要 markdown 代码块）：
{
  "events": [
    {
      "id": "event-1",
      "title": "事件名称",
      "verb": "核心动词（如：发生、建立、提出、发现、实施）",
      "participants": ["参与实体ID或名称"],
      "time": "时间（如有）",
      "location": "地点（如有）",
      "summary": "50字以内事件描述",
      "refs": [{"chapter": "<合法任务ID>", "title": "<对应标题>", "pn": "pn-1"}]
    }
  ]
}

规则：
- 只提取具有动作性/过程性的事件，不提取静态概念
- verb 使用中文动词
- participants 引用已提取的实体名称或ID
- refs.chapter 必须使用上面列出的合法任务ID
- 如果教材内容中没有明显的事件，返回空数组
- 只输出 JSON`;
}

export async function extractEvents(bookId: string): Promise<EventExtractionResult> {
  let ctx: BookTextContext;
  try {
    ctx = await loadBookTextContext(bookId);
  } catch {
    return { events: [], source: 'rule' };
  }

  const allEvents: KnowledgeEvent[] = [];

  for (const module of ctx.sourceParsed.modules) {
    const taskIds = module.tasks.map((t: { id: string; title: string }) => ({ id: t.id, title: t.title }));
    const moduleText = getChapterText(ctx, module.id);

    if (!moduleText || moduleText.length < 50) continue;

    try {
      const prompt = buildEventPrompt(ctx.sourceParsed.bookMeta.title, module.title, moduleText, taskIds);
      const output = await callLLM(prompt, bookId);
      if (output) {
        const match = output.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed.events)) {
            for (const ev of parsed.events) {
              if (ev.id && ev.title) {
                allEvents.push({
                  id: ev.id,
                  title: ev.title,
                  verb: ev.verb || '发生',
                  participants: ev.participants || [],
                  time: ev.time,
                  location: ev.location,
                  summary: ev.summary,
                  refs: ev.refs as EntityRef[] | undefined,
                });
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn(`[extract-events] 模块 ${module.id} 事件提取失败:`, err);
    }
  }

  console.log(`[extract-events] 共提取 ${allEvents.length} 个事件`);
  return { events: allEvents, source: allEvents.length > 0 ? 'llm' : 'rule' };
}

export async function saveEvents(bookId: string, result: EventExtractionResult): Promise<string> {
  const outPath = getBookDataPath(bookId, 'knowledgeMap-events.json');
  await ensureFileDir(outPath);
  await writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

async function main() {
  const bookId = process.argv.find((arg, i) => i > 0 && process.argv[i - 1] === '--book-id') || '';
  if (!bookId) {
    console.error('用法: npx tsx extract-events.ts --book-id <bookId>');
    process.exit(1);
  }

  const result = await extractEvents(bookId);
  const outPath = await saveEvents(bookId, result);
  console.log(`[extract-events] 已保存到 ${outPath}（来源：${result.source}）`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
