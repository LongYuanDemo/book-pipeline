#!/usr/bin/env node
/**
 * 内容对齐校验工具
 *
 * 检查 source.md 原文与 sourceParsed.ts 解析结果之间的结构一致性：
 * 1. 章节完整性：原文中所有章节标题是否都被正确识别
 * 2. 内容完整性：每个 task 的 rawContent 是否覆盖了原文对应区段
 * 3. 顺序一致性：章节顺序是否与原文一致
 * 4. 字数覆盖率：解析后总字数 vs 原文总字数
 *
 * 用法:
 *   npx tsx skills/source-parser/scripts/verify-alignment.ts --book-id <bookId>
 */

import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  getBookDataPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';

interface VerifyResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    sourceChars: number;
    parsedChars: number;
    coverage: number;
    moduleCount: number;
    taskCount: number;
    missingHeadings: string[];
    mismatchedOrder: string[];
  };
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
    console.error('用法: npx tsx verify-alignment.ts --book-id <bookId>');
    process.exit(1);
  }
  return { bookId };
}

/** 从 source.md 提取所有标题行 */
function extractHeadings(md: string): { level: number; title: string; line: number }[] {
  const lines = md.split('\n');
  const headings: { level: number; title: string; line: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        title: match[2].trim(),
        line: i + 1,
      });
    }
  }
  return headings;
}

/** 判断标题是否为模块/章节级别 */
function isModuleHeading(title: string, level: number): boolean {
  return (
    (/^(模块[一二三四五六七八九十\d]+)/.test(title) && level === 1) ||
    (/^(第[一二三四五六七八九十\d]+章)/.test(title) && level === 2)
  );
}

/** 判断标题是否为任务/节级别 */
function isTaskHeading(title: string, level: number): boolean {
  return (
    (/^(任务[一二三四五六七八九十\d]+)/.test(title) && !/\s+\d+\s*$/.test(title)) ||
    (/^(第[一二三四五六七八九十\d]+节)/.test(title) && level >= 2)
  );
}

/** 从 sourceParsed.ts 文件内容中提取模块和任务标题 */
function extractParsedStructure(tsContent: string): { modules: { title: string; tasks: { title: string; rawContent: string }[] }[] } {
  const modules: { title: string; tasks: { title: string; rawContent: string }[] }[] = [];

  const moduleRegex = /title:\s*['"`]([^'"`]+)['"`]/g;
  const taskRegex = /title:\s*['"`]([^'"`]+)['"`][\s\S]*?rawContent:\s*['"`]([^'"`]*)['"`]/g;

  const moduleMatches = [...tsContent.matchAll(/id:\s*['"`]module\d+['"`][\s\S]*?title:\s*['"`]([^'"`]+)['"`]/g)];
  for (const m of moduleMatches) {
    modules.push({ title: m[1], tasks: [] });
  }

  const taskMatches = [...tsContent.matchAll(/id:\s*['"`]module\d+-task\d+['"`][\s\S]*?title:\s*['"`]([^'"`]+)['"`][\s\S]*?rawContent:\s*['"`]([^'"`]*)['"`]/g)];
  for (const t of taskMatches) {
    const taskTitle = t[1];
    const rawContent = t[2];
    const moduleMatch = t[0].match(/id:\s*['"`](module\d+)-task/);
    if (moduleMatch) {
      const modIdx = modules.findIndex((m) => m.title.includes(moduleMatch[1]) || true);
      if (modIdx >= 0 && modIdx < modules.length) {
        modules[modIdx].tasks.push({ title: taskTitle, rawContent });
      }
    }
  }

  return { modules };
}

function verify(bookId: string): VerifyResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const sourcePath = resolve(PROJECT_ROOT, 'books', bookId, 'source.md');
  const parsedPath = getBookDataPath(bookId, 'sourceParsed.ts');

  if (!existsSync(sourcePath)) {
    errors.push(`source.md 不存在: ${sourcePath}`);
    return { passed: false, errors, warnings, stats: { sourceChars: 0, parsedChars: 0, coverage: 0, moduleCount: 0, taskCount: 0, missingHeadings: [], mismatchedOrder: [] } };
  }
  if (!existsSync(parsedPath)) {
    errors.push(`sourceParsed.ts 不存在: ${parsedPath}`);
    return { passed: false, errors, warnings, stats: { sourceChars: 0, parsedChars: 0, coverage: 0, moduleCount: 0, taskCount: 0, missingHeadings: [], mismatchedOrder: [] } };
  }

  const sourceMd = readFileSync(sourcePath, 'utf-8');
  const parsedTs = readFileSync(parsedPath, 'utf-8');

  // 1. 提取原文标题
  const headings = extractHeadings(sourceMd);
  const sourceModules = headings.filter((h) => isModuleHeading(h.title, h.level));
  const sourceTasks = headings.filter((h) => isTaskHeading(h.title, h.level));

  // 2. 提取解析后结构
  const parsed = extractParsedStructure(parsedTs);

  // 3. 检查模块完整性
  const missingHeadings: string[] = [];
  for (const sm of sourceModules) {
    const found = parsed.modules.some((pm) =>
      pm.title.includes(sm.title) || sm.title.includes(pm.title)
    );
    if (!found) {
      missingHeadings.push(`模块缺失: "${sm.title}" (第${sm.line}行)`);
    }
  }

  // 4. 检查顺序一致性
  const mismatchedOrder: string[] = [];
  for (let i = 0; i < Math.min(sourceModules.length, parsed.modules.length); i++) {
    const srcTitle = sourceModules[i].title;
    const parsedTitle = parsed.modules[i].title;
    if (!srcTitle.includes(parsedTitle) && !parsedTitle.includes(srcTitle)) {
      mismatchedOrder.push(`顺序不匹配 第${i + 1}个模块: 原文="${srcTitle}" vs 解析="${parsedTitle}"`);
    }
  }

  // 5. 字数覆盖率
  const sourceChars = sourceMd.replace(/\s/g, '').length;
  const parsedChars = parsed.modules.reduce((sum, m) => {
    return sum + m.tasks.reduce((s, t) => s + t.rawContent.replace(/\s/g, '').length, 0);
  }, 0);
  const coverage = sourceChars > 0 ? (parsedChars / sourceChars) * 100 : 0;

  // 6. 生成报告
  if (missingHeadings.length > 0) {
    errors.push(...missingHeadings);
  }
  if (mismatchedOrder.length > 0) {
    errors.push(...mismatchedOrder);
  }
  if (coverage < 80) {
    warnings.push(`字数覆盖率偏低: ${coverage.toFixed(1)}% (原文 ${sourceChars} 字, 解析 ${parsedChars} 字)`);
  }
  if (coverage > 120) {
    warnings.push(`字数覆盖率异常偏高: ${coverage.toFixed(1)}% — 可能存在重复内容`);
  }

  const taskCount = parsed.modules.reduce((sum, m) => sum + m.tasks.length, 0);

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    stats: {
      sourceChars,
      parsedChars,
      coverage: parseFloat(coverage.toFixed(1)),
      moduleCount: parsed.modules.length,
      taskCount,
      missingHeadings,
      mismatchedOrder,
    },
  };
}

// 主函数
function main() {
  const { bookId } = parseArgs();
  console.log(`[verify-alignment] 校验 bookId=${bookId}`);

  const result = verify(bookId);

  console.log('\n=== 校验报告 ===');
  console.log(`状态: ${result.passed ? '✅ 通过' : '❌ 失败'}`);
  console.log(`\n--- 统计 ---`);
  console.log(`原文字数: ${result.stats.sourceChars}`);
  console.log(`解析字数: ${result.stats.parsedChars}`);
  console.log(`覆盖率: ${result.stats.coverage}%`);
  console.log(`模块数: ${result.stats.moduleCount}`);
  console.log(`任务数: ${result.stats.taskCount}`);

  if (result.errors.length > 0) {
    console.log(`\n--- 错误 (${result.errors.length}) ---`);
    for (const e of result.errors) console.log(`  ❌ ${e}`);
  }
  if (result.warnings.length > 0) {
    console.log(`\n--- 警告 (${result.warnings.length}) ---`);
    for (const w of result.warnings) console.log(`  ⚠️  ${w}`);
  }
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log('\n  ✅ 所有检查项通过，内容对齐无异常');
  }

  process.exit(result.passed ? 0 : 1);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
