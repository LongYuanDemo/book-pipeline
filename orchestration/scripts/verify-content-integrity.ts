#!/usr/bin/env node
/**
 * 全书完整性校验脚本
 * 对比原文 vs 输出的字数，确保 pipeline 不丢内容
 *
 * 用法:
 *   npx tsx skills/orchestrator/scripts/verify-content-integrity.ts \
 *     --book-id text-crossing-test
 */

import { existsSync } from 'fs';
import { getBookDataPath } from '../../skills/shared/paths.ts';

interface VerifyResult {
  stage: string;
  inputChars: number;
  outputChars: number;
  ratio: number;
  status: 'pass' | 'warn' | 'fail';
  details?: string;
}

function parseArgs(): { bookId: string } {
  const args = process.argv.slice(2);
  let bookId = '';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    }
  }
  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    process.exit(1);
  }
  return { bookId };
}

function countChars(text: string): number {
  // 去除空白字符后计数
  return text.replace(/\s/g, '').length;
}

async function loadModule(path: string): Promise<any | null> {
  if (!existsSync(path)) return null;
  try {
    const mod = await import(path);
    return mod;
  } catch {
    return null;
  }
}

async function main() {
  const { bookId } = parseArgs();
  console.log(`\n📊 全书完整性校验: ${bookId}\n${'='.repeat(50)}\n`);

  const results: VerifyResult[] = [];

  // 1. source.md 原始字数
  const sourcePath = getBookDataPath(bookId, 'source.md');
  let sourceChars = 0;
  if (existsSync(sourcePath)) {
    const { readFileSync } = await import('fs');
    const sourceText = readFileSync(sourcePath, 'utf-8');
    sourceChars = countChars(sourceText);
    console.log(`原文 source.md: ${sourceChars} 字符（去空白）`);
  } else {
    console.warn(`⚠️ source.md 不存在: ${sourcePath}`);
  }

  // 2. sourceParsed.ts — rawContent 总字数
  const sourceParsedMod = await loadModule(getBookDataPath(bookId, 'sourceParsed.ts'));
  let parsedChars = 0;
  let moduleCount = 0;
  let taskCount = 0;
  if (sourceParsedMod) {
    const sp = sourceParsedMod.sourceParsed || sourceParsedMod.default;
    if (sp?.modules) {
      moduleCount = sp.modules.length;
      for (const mod of sp.modules) {
        if (mod.tasks) {
          taskCount += mod.tasks.length;
          for (const t of mod.tasks) {
            parsedChars += countChars(t.rawContent || '');
          }
        }
      }
      results.push({
        stage: 'source-parser',
        inputChars: sourceChars,
        outputChars: parsedChars,
        ratio: sourceChars > 0 ? parsedChars / sourceChars : 0,
        status: parsedChars / sourceChars > 0.9 ? 'pass' : 'warn',
        details: `${moduleCount} 模块, ${taskCount} 任务`,
      });
    }
  }

  // 3. chapterContent.ts — blocks 总字数
  const chapterMod = await loadModule(getBookDataPath(bookId, 'chapterContent.ts'));
  let chapterChars = 0;
  let chapterTaskCount = 0;
  if (chapterMod) {
    const cc = chapterMod.chapterContents || chapterMod.default;
    if (cc) {
      for (const taskId of Object.keys(cc)) {
        chapterTaskCount++;
        const tc = cc[taskId];
        if (tc.blocks) {
          for (const b of tc.blocks) {
            if (b.content) chapterChars += countChars(b.content);
            if (b.items) chapterChars += b.items.reduce((s: number, i: string) => s + countChars(i), 0);
            if (b.quiz) {
              chapterChars += countChars(b.quiz.question || '');
              chapterChars += (b.quiz.options || []).reduce((s: number, o: string) => s + countChars(o), 0);
              chapterChars += countChars(b.quiz.explanation || '');
            }
            if (b.callout) {
              chapterChars += countChars(b.callout.title || '');
              chapterChars += countChars(b.callout.body || '');
            }
          }
        }
      }
      results.push({
        stage: 'chapter-content-generator',
        inputChars: parsedChars,
        outputChars: chapterChars,
        ratio: parsedChars > 0 ? chapterChars / parsedChars : 0,
        status: chapterChars / parsedChars >= 1.0 ? 'pass' : 'fail',
        details: `${chapterTaskCount} 任务, ${chapterChars} 字符 (应 ≥ ${parsedChars})`,
      });
    }
  }

  // 4. audioCourse.ts — 课程数量
  const audioMod = await loadModule(getBookDataPath(bookId, 'audioCourse.ts'));
  let audioCount = 0;
  if (audioMod) {
    const ac = audioMod.audioCourse || audioMod.lessons || audioMod.default;
    if (Array.isArray(ac)) {
      audioCount = ac.length;
      results.push({
        stage: 'audio-course-generator',
        inputChars: moduleCount,
        outputChars: audioCount,
        ratio: moduleCount > 0 ? audioCount / moduleCount : 0,
        status: audioCount >= moduleCount ? 'pass' : 'fail',
        details: `${audioCount} 节课程 (应 ≥ ${moduleCount} 模块)`,
      });
    }
  }

  // 5. knowledgeMap-entities.json — 实体数量
  const entitiesPath = getBookDataPath(bookId, 'knowledgeMap-entities.json');
  let entityCount = 0;
  if (existsSync(entitiesPath)) {
    const { readFileSync } = await import('fs');
    try {
      const entities = JSON.parse(readFileSync(entitiesPath, 'utf-8'));
      const entityList = Array.isArray(entities) ? entities : (entities.entities || []);
      entityCount = entityList.length;
      results.push({
        stage: 'knowledge-map-generator',
        inputChars: taskCount,
        outputChars: entityCount,
        ratio: taskCount > 0 ? entityCount / taskCount : 0,
        status: entityCount > 0 ? 'pass' : 'fail',
        details: `${entityCount} 个实体 (来自 ${taskCount} 个任务)`,
      });
    } catch {
      results.push({
        stage: 'knowledge-map-generator',
        inputChars: 0,
        outputChars: 0,
        ratio: 0,
        status: 'fail',
        details: 'JSON 解析失败',
      });
    }
  }

  // 输出报告
  console.log(`\n${'='.repeat(50)}`);
  console.log('校验报告:');
  console.log(`${'='.repeat(50)}\n`);

  const statusIcon = (s: string) => s === 'pass' ? '✅' : s === 'warn' ? '⚠️' : '❌';

  for (const r of results) {
    const pct = (r.ratio * 100).toFixed(1);
    console.log(`${statusIcon(r.status)} ${r.stage}`);
    console.log(`   输入: ${r.inputChars} → 输出: ${r.outputChars} (${pct}%)`);
    if (r.details) console.log(`   ${r.details}`);
    console.log();
  }

  // 总结
  const failed = results.filter((r) => r.status === 'fail');
  const warned = results.filter((r) => r.status === 'warn');

  if (failed.length === 0 && warned.length === 0) {
    console.log('🎉 全部通过！全书内容完整性校验成功。');
  } else if (failed.length === 0) {
    console.log(`⚠️ 有 ${warned.length} 个警告，建议检查。`);
  } else {
    console.log(`❌ 有 ${failed.length} 个失败，${warned.length} 个警告。`);
    process.exit(1);
  }
}

main();
