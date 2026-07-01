#!/usr/bin/env node
/**
 * Pipeline Orchestrator
 * 一键串联 7 个 Skill，实现 "输入一本书 → 输出五个完整交互页面"
 *
 * 执行顺序：
 *   1. source-parser              → books/{bookId}/data/sourceParsed.ts
 *   2. book-info-generator        → books/{bookId}/data/bookInfo.ts
 *   3. chapter-content-generator  → books/{bookId}/data/chapterContent.ts
 *   4. anki-card-generator        → books/{bookId}/data/anki.ts
 *   5. knowledge-map-generator    → books/{bookId}/data/knowledgeMap.ts
 *   6. audio-course-generator     → books/{bookId}/data/audioCourse.ts
 *   7. video-keyframe-extractor  → books/{bookId}/data/video.ts
 *
 * 用法:
 *   npx tsx skills/orchestrator/scripts/run-pipeline.ts --book-id <bookId>
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import { execFileSync } from 'child_process';
import { PROJECT_ROOT } from '../../shared/paths.ts';

/* ------------------------------------------------------------------ */
// 命令行参数解析

function parseArgs(): { bookId: string; sourcePath?: string } {
  const args = process.argv.slice(2);
  let bookId = '';
  let sourcePath = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--source' && args[i + 1]) {
      sourcePath = resolve(args[i + 1]);
      i++;
    }
  }

  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    process.exit(1);
  }

  return { bookId, sourcePath };
}

/* ------------------------------------------------------------------ */
// Skill 定义

interface SkillStep {
  name: string;
  script: string;
  args: string[];
}

function buildSteps(bookId: string, sourcePath?: string): SkillStep[] {
  const bookInfoArgs = ['--book-id', bookId];
  if (sourcePath) {
    bookInfoArgs.push('--source', sourcePath);
  }

  return [
    {
      name: 'source-parser',
      script: 'skills/source-parser/scripts/parse-source.ts',
      args: bookInfoArgs,
    },
    {
      name: 'book-info-generator',
      script: 'skills/book-info-generator/scripts/generate-book-info.ts',
      args: bookInfoArgs,
    },
    {
      name: 'chapter-content-generator',
      script: 'skills/chapter-content-generator/scripts/generate-chapter-content.ts',
      args: ['--book-id', bookId],
    },
    {
      name: 'anki-card-generator',
      script: 'skills/anki-card-generator/scripts/generate-anki.ts',
      args: ['--book-id', bookId],
    },
    {
      name: 'knowledge-map-generator',
      script: 'skills/knowledge-map-generator/scripts/generate-knowledge-map.ts',
      args: ['--book-id', bookId],
    },
    {
      name: 'audio-course-generator',
      script: 'skills/audio-course-generator/scripts/generate-audio-course.ts',
      args: ['--book-id', bookId],
    },
    {
      name: 'video-keyframe-extractor',
      script: 'skills/video-keyframe-extractor/scripts/generate-video-data.ts',
      args: ['--book-id', bookId],
    },
  ];
}

/* ------------------------------------------------------------------ */
// 执行

function runStep(step: SkillStep): boolean {
  console.log(`\n========================================`);
  console.log(`[orchestrator] 执行: ${step.name}`);
  console.log(`========================================`);

  try {
    execFileSync(
      'npx',
      ['tsx', step.script, ...step.args],
      {
        cwd: PROJECT_ROOT,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    console.log(`[orchestrator] ${step.name} 完成 ✅`);
    return true;
  } catch (err) {
    console.error(`[orchestrator] ${step.name} 失败 ❌`);
    if (err instanceof Error) {
      console.error(err.message);
    }
    return false;
  }
}

/* ------------------------------------------------------------------ */
// 主流程

async function main() {
  const { bookId, sourcePath } = parseArgs();
  console.log(`[orchestrator] 开始为 bookId=${bookId} 运行完整 Pipeline`);
  if (sourcePath) {
    console.log(`[orchestrator] 指定源文件: ${sourcePath}`);
  }

  const steps = buildSteps(bookId, sourcePath);
  let successCount = 0;

  for (const step of steps) {
    const ok = runStep(step);
    if (!ok) {
      console.error(`\n[orchestrator] Pipeline 在 ${step.name} 处中断`);
      process.exit(1);
    }
    successCount++;
  }

  console.log(`\n========================================`);
  console.log(`[orchestrator] Pipeline 全部完成 ✅`);
  console.log(`[orchestrator] 共 ${successCount}/${steps.length} 个 Skill 执行成功`);
  console.log(`[orchestrator] 输出目录: books/${bookId}/data/`);
  console.log(`========================================`);
}

main();
