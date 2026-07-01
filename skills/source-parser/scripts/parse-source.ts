#!/usr/bin/env node
/**
 * source-parser 主脚本（Skills 范式重构版）
 * 从教材 Markdown 解析为结构化数据 books/{bookId}/data/sourceParsed.ts
 *
 * 业务逻辑（摘要 prompt）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、Markdown 解析、LLM 调用、TS 校验。
 *
 * 用法:
 *   npx tsx skills/source-parser/scripts/parse-source.ts \
 *     --book-id <bookId> [--source books/<bookId>/source.md] [--prompt-file <path>]
 */

import { existsSync, readFileSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { readMarkdown, extractTitle } from '../../shared/markdown.ts';
import { callLLM } from '../../shared/llm.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';

/* ------------------------------------------------------------------ */
// 命令行参数解析

function parseArgs(): { bookId: string; sourcePath: string; promptFile?: string } {
  const args = process.argv.slice(2);
  let bookId = '';
  let sourcePath = '';
  let promptFile: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--source' && args[i + 1]) {
      sourcePath = resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--prompt-file' && args[i + 1]) {
      promptFile = args[i + 1];
      i++;
    }
  }

  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    console.error('用法: npx tsx parse-source.ts --book-id <bookId> [--source <path>] [--prompt-file <path>]');
    process.exit(1);
  }

  if (!sourcePath) {
    sourcePath = resolve(PROJECT_ROOT, 'books', bookId, 'source.md');
  }

  if (!existsSync(sourcePath)) {
    console.error(`错误: 源文件不存在: ${sourcePath}`);
    process.exit(1);
  }

  return { bookId, sourcePath, promptFile };
}

/* ------------------------------------------------------------------ */
// 类型定义

export interface BookMeta {
  title: string;
  authors: string[];
  publisher: string;
  isbn?: string;
}

export interface Task {
  id: string;
  title: string;
  rawContent: string;
  rawHtml?: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  summary?: string;
  tasks: Task[];
}

export interface SourceParsed {
  bookMeta: BookMeta;
  modules: Module[];
}

/* ------------------------------------------------------------------ */
// 元数据提取

function extractAuthors(content: string): string[] {
  const authors: string[] = [];
  const patterns = [
    /主编[：:]\s*(.+)/,
    /副主编[：:]\s*(.+)/,
    /参编[：:]\s*(.+)/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const names = match[1]
        .split(/[,，、\s]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && s.length < 20); // 过滤掉过长内容
      authors.push(...names);
    }
  }

  return [...new Set(authors)];
}

function extractPublisher(content: string): string {
  // 优先匹配 "出版/出版社：XXX出版社" 或 "XXX出版社 出版"
  const patterns = [
    /(?:出版(?:社|单位)|出版社)[:：]\s*([^\n]{2,30}出版社)/,
    /([^\n]{2,30}出版社)\s*(?:出版|编|著)/,
  ];
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

/* ------------------------------------------------------------------ */
// sourceHtml.ts 加载（优先）

interface HtmlSection {
  titleId: string;
  title: string;
  sequence: string;
  html: string;
}
interface HtmlChapter {
  chapter: string;
  sections: HtmlSection[];
}
interface SourceHtml {
  bookName: string;
  chapters: HtmlChapter[];
}

async function loadSourceHtml(bookId: string): Promise<SourceHtml | null> {
  const htmlPath = getBookDataPath(bookId, 'sourceHtml.ts');
  if (!existsSync(htmlPath)) {
    console.log('[source-parser] sourceHtml.ts 不存在，降级到 source.md 解析');
    return null;
  }
  try {
    const mod = await import(htmlPath);
    const data = mod.sourceHtml || mod.default;
    if (data && Array.isArray(data.chapters)) {
      console.log(`[source-parser] 从 sourceHtml.ts 加载到 ${data.chapters.length} 个 Chapter`);
      return data as SourceHtml;
    }
    return null;
  } catch (err) {
    console.warn(`[source-parser] 加载 sourceHtml.ts 失败: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/** 从 sourceHtml.ts 构建模块-任务结构（自适应层级） */
function buildModulesFromHtml(sourceHtml: SourceHtml, mdContent: string): { modules: Module[]; bookMeta: BookMeta } {
  const modules: Module[] = [];
  const lines = mdContent.split('\n');

  // 从 source.md 提取每个 Title 对应的 Markdown 内容
  // source.md 格式: # 模块N {chapter} → ## 任务N {title} → content
  // 我们按 title 匹配提取 Markdown
  function findMdForTitle(title: string): string {
    const titleClean = title.replace(/^(第[一二三四五六七八九十\d]+节\s*)/, '').trim() || title;
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      const headingMatch = trimmed.match(/^##\s+(.+)$/);
      if (headingMatch) {
        const mdTitle = headingMatch[1].trim();
        if (mdTitle.includes(titleClean) || titleClean.includes(mdTitle)) {
          // 提取该标题到下一个标题之间的内容
          const startIdx = i + 1;
          let endIdx = lines.length;
          for (let j = startIdx; j < lines.length; j++) {
            if (lines[j].trim().match(/^#{1,2}\s+/)) {
              endIdx = j;
              break;
            }
          }
          return lines.slice(startIdx, endIdx).join('\n').trim();
        }
      }
    }
    return '';
  }

  let moduleIdx = 0;
  for (const ch of sourceHtml.chapters) {
    moduleIdx++;
    const moduleId = `module${moduleIdx}`;
    const tasks: Task[] = [];

    let taskIdx = 0;
    for (const section of ch.sections) {
      taskIdx++;
      const taskId = `${moduleId}-task${taskIdx}`;
      const rawHtml = section.html;
      const rawContent = findMdForTitle(section.title);
      tasks.push({
        id: taskId,
        title: section.title,
        rawContent,
        rawHtml,
        order: taskIdx,
      });
    }

    modules.push({
      id: moduleId,
      title: ch.chapter,
      tasks,
    });
  }

  const bookMeta: BookMeta = {
    title: sourceHtml.bookName || extractTitle(mdContent) || '',
    authors: extractAuthors(mdContent),
    publisher: extractPublisher(mdContent),
  };

  return { modules, bookMeta };
}

/* ------------------------------------------------------------------ */
// 降级：从 source.md 解析（保留原有逻辑）

const numOrder = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function chineseToNumber(str: string): number {
  const map: Record<string, number> = {
    一: 1, 二: 2, 三: 3, 四: 4, 五: 5,
    六: 6, 七: 7, 八: 8, 九: 9, 十: 10,
  };

  if (/^\d+$/.test(str)) return parseInt(str, 10);
  if (map[str]) return map[str];

  let result = 0;
  for (const ch of str) {
    if (map[ch]) result += map[ch];
  }
  return result;
}

/** 判断是否为辅助标题 */
function isAuxiliaryTitle(title: string): boolean {
  return (
    title.includes('任务导入') ||
    title.includes('任务目标') ||
    title.includes('任务实施') ||
    title.includes('任务评价') ||
    title.includes('知识巩固') ||
    title.includes('知识链接') ||
    title.includes('制作要点') ||
    title.includes('模块导学') ||
    title.includes('模块目标') ||
    title === '目录' ||
    title === '编者' ||
    /^[一二三四五六七八九十\d]+$/.test(title)
  );
}

function parseSourceFromMd(content: string): { modules: Module[]; bookMeta: BookMeta } {
  const lines = content.split('\n');

  interface Position {
    index: number;
    type: 'module' | 'task';
    title: string;
    level: number;
  }

  const positions: Position[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const level = headingMatch ? headingMatch[1].length : 0;
    const title = headingMatch ? headingMatch[2].trim() : trimmed;

    if (isAuxiliaryTitle(title)) continue;

    const isModule = (
      (/^(模块[一二三四五六七八九十\d]+)/.test(title) && level === 1) ||
      (/^(第[一二三四五六七八九十\d]+章)/.test(title) && level === 2)
    );
    const isTask = (
      (/^(任务[一二三四五六七八九十\d]+)/.test(title) && !/\s+\d+\s*$/.test(title)) ||
      (/^(第[一二三四五六七八九十\d]+节)/.test(title) && level >= 2) ||
      (level === 2 && !isModule)
    );

    if (isModule) {
      positions.push({ index: i, type: 'module', title, level });
    } else if (isTask) {
      positions.push({ index: i, type: 'task', title, level });
    }
  }

  positions.sort((a, b) => a.index - b.index);

  const rawModules: { moduleTitle: string; tasks: { title: string; startIndex: number; endIndex: number }[] }[] = [];
  let currentModule: typeof rawModules[0] | null = null;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    if (pos.type === 'module') {
      currentModule = { moduleTitle: pos.title, tasks: [] };
      rawModules.push(currentModule);
    } else if (pos.type === 'task' && currentModule) {
      const endIndex = i + 1 < positions.length ? positions[i + 1].index : lines.length;
      currentModule.tasks.push({ title: pos.title, startIndex: pos.index, endIndex });
    }
  }

  const merged = new Map<string, { moduleTitle: string; tasks: typeof rawModules[0]['tasks']; order: number }>();
  let orderCounter = 0;

  for (const mod of rawModules) {
    const numMatch = mod.moduleTitle.match(/(?:模块|第)([一二三四五六七八九十\d]+)(?:章)?/);
    const key = numMatch ? numMatch[1] : mod.moduleTitle;
    const existing = merged.get(key);
    if (existing) {
      existing.tasks.push(...mod.tasks);
    } else {
      merged.set(key, { moduleTitle: mod.moduleTitle, tasks: [...mod.tasks], order: orderCounter++ });
    }
  }

  const modules: Module[] = [];

  for (const [, mod] of merged.entries()) {
    const seenTasks = new Set<string>();
    const uniqueTasks = mod.tasks.filter((t) => {
      if (seenTasks.has(t.title)) return false;
      seenTasks.add(t.title);
      return true;
    });

    const numMatch = mod.moduleTitle.match(/(?:模块|第)([一二三四五六七八九十\d]+)(?:章)?/);
    const moduleNum = numMatch ? chineseToNumber(numMatch[1]) : modules.length + 1;
    const moduleId = `module${moduleNum}`;

    const tasks: Task[] = uniqueTasks.map((t, idx) => {
      const taskNumMatch = t.title.match(/(?:任务|第)([一二三四五六七八九十\d]+)(?:节)?/);
      const taskNum = taskNumMatch ? chineseToNumber(taskNumMatch[1]) : idx + 1;
      const taskId = `${moduleId}-task${taskNum}`;
      const rawContent = lines.slice(t.startIndex, t.endIndex).join('\n');

      return {
        id: taskId,
        title: t.title,
        rawContent,
        order: idx + 1,
      };
    });

    modules.push({ id: moduleId, title: mod.moduleTitle, tasks });
  }

  const orderedModules: Module[] = [];
  for (const [, mod] of merged.entries()) {
    const existing = modules.find((m) => m.title === mod.moduleTitle);
    if (existing && !orderedModules.find((m) => m.id === existing.id)) {
      orderedModules.push(existing);
    }
  }
  const resultModules = orderedModules.length > 0 ? orderedModules : modules;

  const seenIds = new Set<string>();
  const dedupedModules = resultModules.filter((m) => {
    if (seenIds.has(m.id)) return false;
    seenIds.add(m.id);
    return true;
  });

  dedupedModules.sort((a, b) => {
    const aNum = parseInt(a.id.replace('module', ''), 10);
    const bNum = parseInt(b.id.replace('module', ''), 10);
    return aNum - bNum;
  });

  let bookTitle = '';
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      const t = m[1].trim();
      if (!/^(模块|任务|第[一二三四五六七八九十\d]+[章节])/.test(t)) {
        bookTitle = t;
        break;
      }
    }
  }
  if (!bookTitle) bookTitle = extractTitle(content) || '';

  const bookMeta: BookMeta = {
    title: bookTitle,
    authors: extractAuthors(content),
    publisher: extractPublisher(content),
  };

  return { modules: dedupedModules, bookMeta };
}

/* ------------------------------------------------------------------ */
// 摘要生成

async function generateModuleSummaries(
  modules: Module[],
  bookId: string,
  promptFilePath?: string,
): Promise<Module[]> {
  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFilePath && existsSync(promptFilePath)) {
    promptTemplate = await readFile(promptFilePath, 'utf-8');
  }

  const results: Module[] = [];

  for (const mod of modules) {
    let prompt: string;
    if (promptTemplate) {
      prompt = promptTemplate
        .replace(/\{\{moduleTitle\}\}/g, mod.title)
        .replace(/\{\{taskList\}\}/g, mod.tasks.map((t) => t.title).join('、'));
    } else {
      prompt = buildDefaultSummaryPrompt(mod.title, mod.tasks.map((t) => t.title).join('、'));
    }

    const summary = await callLLM(prompt, bookId);

    results.push({
      ...mod,
      summary: summary || `${mod.title}，涵盖${mod.tasks.length}个核心任务。`,
    });
  }

  return results;
}

/** 构建 fallback summary prompt（通用教材，不绑定特定书籍类型） */
function buildDefaultSummaryPrompt(moduleTitle: string, taskList: string): string {
  return [
    `请为以下教材模块生成一段结构化摘要，控制在80字以内。`,
    ``,
    `模块名称：${moduleTitle}`,
    `包含任务：${taskList}`,
    ``,
    `要求：`,
    `- 1个核心论点`,
    `- 3个关键要点`,
    `- 1个代表性例子`,
    `- 1个未涉及的内容提示`,
    ``,
    `请直接输出摘要文本，不要输出标题或编号。`,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
// TS 文件生成

function escapeTsString(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\\u2028/g, '\\u2028')
    .replace(/\\u2029/g, '\\u2029');
}

function generateSourceParsedTs(data: SourceParsed): string {
  const modulesStr = data.modules
    .map(
      (mod) => `  {
    id: '${mod.id}',
    title: '${escapeTsString(mod.title)}',
    summary: '${escapeTsString(mod.summary || '')}',
    tasks: [
${mod.tasks
  .map(
    (t) => `      {
        id: '${t.id}',
        title: '${escapeTsString(t.title)}',
        order: ${t.order},
        rawContent: '${escapeTsString(t.rawContent)}',${t.rawHtml ? `
        rawHtml: '${escapeTsString(t.rawHtml)}',` : ''}
      }`,
  )
  .join(',\n')}
    ],
  }`,
    )
    .join(',\n');

  return `export interface BookMeta {
  title: string;
  authors: string[];
  publisher: string;
  isbn?: string;
}

export interface Task {
  id: string;
  title: string;
  rawContent: string;
  rawHtml?: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  summary?: string;
  tasks: Task[];
}

export interface SourceParsed {
  bookMeta: BookMeta;
  modules: Module[];
}

export const sourceParsed: SourceParsed = {
  bookMeta: {
    title: '${escapeTsString(data.bookMeta.title)}',
    authors: [${data.bookMeta.authors.map((a) => `'${escapeTsString(a)}'`).join(', ')}],
    publisher: '${escapeTsString(data.bookMeta.publisher)}',
  },
  modules: [
${modulesStr}
  ],
};

export default sourceParsed;
`;
}

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<SkillResult<void>> {
  const { bookId, sourcePath, promptFile } = parseArgs();
  console.log(`[source-parser] bookId=${bookId}, source=${sourcePath}`);

  const content = readMarkdown(sourcePath);
  console.log(`[source-parser] 源文件大小: ${content.length} 字符`);

  // 优先从 sourceHtml.ts 获取层级结构
  const sourceHtml = await loadSourceHtml(bookId);
  let modules: Module[];
  let bookMeta: BookMeta;

  if (sourceHtml) {
    console.log('[source-parser] 使用 sourceHtml.ts 自适应层级');
    const result = buildModulesFromHtml(sourceHtml, content);
    modules = result.modules;
    bookMeta = result.bookMeta;
  } else {
    console.log('[source-parser] 降级: 从 source.md 解析层级');
    const result = parseSourceFromMd(content);
    modules = result.modules;
    bookMeta = result.bookMeta;
  }

  console.log(`[source-parser] 识别到 ${modules.length} 个模块`);
  for (const m of modules) {
    const htmlCount = m.tasks.filter(t => t.rawHtml).length;
    console.log(`  - ${m.title} (${m.tasks.length} 个任务, ${htmlCount} 个含 rawHtml)`);
  }

  console.log(`[source-parser] 书名: ${bookMeta.title}`);
  console.log(`[source-parser] 作者: ${bookMeta.authors.join(', ')}`);
  console.log(`[source-parser] 出版社: ${bookMeta.publisher}`);

  // 生成摘要（LLM 或降级）
  const modulesWithSummary = await generateModuleSummaries(modules, bookId, promptFile);

  const data: SourceParsed = {
    bookMeta,
    modules: modulesWithSummary,
  };

  const outputPath = getBookDataPath(bookId, 'sourceParsed.ts');
  ensureFileDir(outputPath);

  const tsContent = generateSourceParsedTs(data);
  await writeFile(outputPath, tsContent, 'utf-8');
  console.log(`[source-parser] 已写入: ${outputPath}`);

  // 自动校验
  console.log('[source-parser] 正在校验生成的 TS 文件...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[source-parser] 校验通过');
  } else {
    console.error('[source-parser] 校验失败:');
    validation.messages.forEach((m) => console.error(`  - ${m}`));
    return { success: false, errors: validation.messages };
  }

  return { success: true, errors: [] };
}

main().then((result) => {
  if (!result.success) {
    process.exit(1);
  }
});
