#!/usr/bin/env node
/**
 * book-info-generator 主脚本（Skills 范式重构版）
 * 从教材 Markdown 自动生成 books/{bookId}/data/bookInfo.ts
 *
 * 业务逻辑（摘要 prompt）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、TS 校验。
 *
 * 用法:
 *   npx tsx skills/book-info-generator/scripts/generate-book-info.ts \
 *     --book-id <bookId> --source books/<bookId>/source.md [--prompt-file <path>]
 */

import { existsSync, readFileSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { basename, resolve } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  getBookLogsPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { callLLM } from '../../shared/llm.ts';
import {
  extractHeadingsByLevel,
  extractSections,
  extractTitle,
  readMarkdown,
} from '../../shared/markdown.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';
import type { SourceParsed, Module } from '../../source-parser/scripts/parse-source.ts';

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
    console.error('用法: npx tsx generate-book-info.ts --book-id <bookId> [--source <path>] [--prompt-file <path>]');
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
// 数据结构定义

interface SubSection {
  id: string;
  title: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  section: string;
  status: 'completed' | 'learning' | 'not-started';
  subSections: SubSection[];
  summary: string;
  sourceModuleId?: string;
}

interface BookInfo {
  title: string;
  publisher: string;
  author: string;
  isbn: string;
  totalChapters: number;
  completedChapters: number;
  readMinutes: number;
  totalMinutes: number;
  streakDays: number;
  chapters: Chapter[];
}

/* ------------------------------------------------------------------ */
// sourceParsed.ts 加载（优先）

async function loadSourceParsed(bookId: string): Promise<SourceParsed | null> {
  const sourceParsedPath = getBookDataPath(bookId, 'sourceParsed.ts');
  if (!existsSync(sourceParsedPath)) {
    console.log('[book-info-generator] sourceParsed.ts 不存在，将回退到直接解析 source.md');
    return null;
  }

  try {
    const mod = await import(sourceParsedPath);
    const data = mod.sourceParsed || mod.default;
    if (data && Array.isArray(data.modules)) {
      console.log(`[book-info-generator] 从 sourceParsed.ts 加载到 ${data.modules.length} 个模块`);
      return data as SourceParsed;
    }
    return null;
  } catch (err) {
    console.warn(`[book-info-generator] 加载 sourceParsed.ts 失败: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/**
 * 将 sourceParsed.ts 的 module/task id 改写为 bookInfo 的 chapter/subSection id。
 *
 * 前端 ChapterContent.findRawHtml 用 `task.id === subSectionId`（如 ch1-1）定位原文，
 * 但 source-parser 产出的是 module2-task1 之类的 id，两套命名不一致，导致该路径
 * 命中 0，只能退回脆弱的 `module{ci+2}` 位置兜底（仅对"章节从 module2 起"的书成立）。
 * 由 book-info（掌握 module→chapter 映射）统一改写，使 join 确定化、书籍无关。
 * 幂等：已对齐的 id 不在映射内，重复运行无副作用。
 */
async function alignSourceParsedIds(
  bookId: string,
  chapters: Chapter[],
  sourceParsed: SourceParsed | null,
): Promise<void> {
  if (!sourceParsed) return;

  const idMap = new Map<string, string>();
  for (const ch of chapters) {
    if (!ch.sourceModuleId) continue;
    const mod = sourceParsed.modules.find((m) => m.id === ch.sourceModuleId);
    if (!mod) continue;
    idMap.set(mod.id, ch.id);
    for (let i = 0; i < mod.tasks.length && i < ch.subSections.length; i++) {
      idMap.set(mod.tasks[i].id, ch.subSections[i].id);
    }
  }
  if (idMap.size === 0) return;

  const path = getBookDataPath(bookId, 'sourceParsed.ts');
  let src = await readFile(path, 'utf-8');
  let n = 0;
  // 长 id 先替换；`id: '...'` 前缀 + 引号定界，精确匹配，不会误伤正文
  for (const [from, to] of [...idMap.entries()].sort((a, b) => b[0].length - a[0].length)) {
    const needle = `id: '${from}'`;
    if (src.includes(needle)) {
      src = src.split(needle).join(`id: '${to}'`);
      n++;
    }
  }
  if (n > 0) {
    await writeFile(path, src, 'utf-8');
    console.log(`[book-info-generator] 已对齐 sourceParsed.ts 的 ${n} 个 id → bookInfo 子章节 id（前端 findRawHtml 直接命中）`);
  }
}

/** 将 sourceParsed.modules 转换为 generate-book-info 内部使用的模块格式 */
function convertModules(spModules: Module[]): { moduleId: string; moduleTitle: string; tasks: string[] }[] {
  return spModules.map((mod) => ({
    moduleId: mod.id,
    moduleTitle: mod.title,
    tasks: mod.tasks.map((t) => t.title),
  }));
}

/** 判断是否为非正文章节（前言、附录、参考文献等） */
function isNonContentModule(title: string): boolean {
  const t = title.trim();
  return (
    /^(前言|序言|后记|致谢)/.test(t) ||
    /^附录/.test(t) ||
    /^(参考文献|参考资料)/.test(t) ||
    t === '目录'
  );
}

/* ------------------------------------------------------------------ */
// 核心生成逻辑

/**
 * 从 Markdown 解析模块-任务结构
 * 规则：
 *   - 识别 "模块X" 或 "模块X 名称" 的 H1/H2 作为模块标题
 *   - 识别 "任务X 名称" 的行（无论是否有 # 前缀）作为任务
 *   - 忽略 "任务导入/目标/实施/评价/知识巩固/制作要点" 等辅助标题
 *   - 按文档顺序处理，任务归属于最近的一个模块
 *   - 合并同名模块，去重任务
 *   - 通用匹配：模块X (H1) 或 第X章 (H2) 作为 module
 *   - 通用匹配：任务X 或 第X节 作为 task
 */
function parseModules(content: string): { moduleTitle: string; tasks: string[] }[] {
  const lines = content.split('\n');
  const rawModules: { moduleTitle: string; tasks: string[] }[] = [];

  let currentModule: { moduleTitle: string; tasks: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 解析 heading 层级
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const level = headingMatch ? headingMatch[1].length : 0;
    const title = headingMatch ? headingMatch[2].trim() : trimmed;

    // 跳过辅助性标题
    if (
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
      title === '前言' ||
      title === '编者' ||
      /^[一二三四五六七八九十\d]+$/.test(title)
    ) {
      continue;
    }

    const isModule = (
      (/^(模块[一二三四五六七八九十\d]+)/.test(title) && level === 1) ||
      (/^(第[一二三四五六七八九十\d]+章)/.test(title) && level === 2)
    );
    const isTask = (
      (/^(任务[一二三四五六七八九十\d]+)/.test(title) && !/\s+\d+\s*$/.test(title)) ||
      (/^(第[一二三四五六七八九十\d]+节)/.test(title) && level >= 2)
    );

    if (isModule) {
      currentModule = { moduleTitle: title, tasks: [] };
      rawModules.push(currentModule);
    } else if (isTask && currentModule) {
      currentModule.tasks.push(title);
    }
  }

  // 合并同名模块（按模块编号），但保持文档出现顺序
  const merged = new Map<string, { moduleTitle: string; tasks: string[]; order: number }>();
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

  // 去重任务并按文档顺序排序
  const result: { moduleTitle: string; tasks: string[]; order: number }[] = [];

  for (const [, mod] of merged.entries()) {
    const seen = new Set<string>();
    const uniqueTasks = mod.tasks.filter((t) => {
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    });

    result.push({ moduleTitle: mod.moduleTitle, tasks: uniqueTasks, order: mod.order });
  }

  result.sort((a, b) => a.order - b.order);

  return result;
}

/**
 * 生成章节 ID
 * ch1, ch2, ...  ch1-1, ch1-2, ...
 */
const numOrder = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function numberToChinese(num: number): string {
  if (num <= 10) return numOrder[num - 1] || String(num);
  if (num === 100) return '一百';
  if (num < 20) return '十' + (num % 10 === 0 ? '' : numOrder[(num % 10) - 1]);
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return (tens === 1 ? '' : numOrder[tens - 1]) + '十' + (ones === 0 ? '' : numOrder[ones - 1]);
}

function generateChapterIds(modules: { moduleId?: string; moduleTitle: string; tasks: string[] }[]): Chapter[] {
  const chapters: Chapter[] = [];

  let chIdx = 0;
  for (let mi = 0; mi < modules.length; mi++) {
    const mod = modules[mi];

    // 过滤非正文章节（前言、附录、参考文献等）
    if (isNonContentModule(mod.moduleTitle)) {
      console.log(`[book-info-generator] 跳过非正文章节: ${mod.moduleTitle}`);
      continue;
    }

    chIdx++;
    const chId = `ch${chIdx}`;

    // 模块本身作为 Chapter
    const moduleTitleClean = mod.moduleTitle
      .replace(/^模块[一二三四五六七八九十\d]+[\s、,.]*/g, '')
      .replace(/\s+\d+\s*$/g, '') // 去掉末尾页码
      .replace(/^[,，\s]+/, '')
      .trim();

    const subSections: SubSection[] = [];

    for (let ti = 0; ti < mod.tasks.length; ti++) {
      const taskTitle = mod.tasks[ti];
      subSections.push({
        id: `${chId}-${ti + 1}`,
        title: taskTitle,
        completed: false,
      });
    }

    chapters.push({
      id: chId,
      title: moduleTitleClean || mod.moduleTitle,
      section: `模块${numberToChinese(chIdx)}`,
      status: chIdx === 1 ? 'learning' : 'not-started',
      subSections,
      summary: '',
      sourceModuleId: mod.moduleId,
    });
  }

  return chapters;
}

/**
 * 调用 LLM 为每个模块生成结构化 summary
 * 格式：1论点 + 3要点 + 1例子 + 1未涉及
 */
async function generateSummaries(
  chapters: Chapter[],
  bookId: string,
  promptFilePath?: string,
): Promise<Chapter[]> {
  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFilePath && existsSync(promptFilePath)) {
    promptTemplate = await readFile(promptFilePath, 'utf-8');
  }

  const results: Chapter[] = [];

  for (const ch of chapters) {
    let prompt: string;
    if (promptTemplate) {
      prompt = promptTemplate
        .replace(/\{\{moduleTitle\}\}/g, ch.title)
        .replace(/\{\{taskList\}\}/g, ch.subSections.map((s) => s.title).join('、'));
    } else {
      prompt = buildDefaultSummaryPrompt(ch.title, ch.subSections.map((s) => s.title).join('、'));
    }

    const summary = await callLLM(prompt, bookId);

    results.push({
      ...ch,
      summary: summary || `${ch.title}，涵盖${ch.subSections.length}个核心任务。`,
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

/**
 * 生成 bookInfo.ts 文件内容
 */
function generateBookInfoTs(bookInfo: BookInfo): string {
  const chaptersStr = bookInfo.chapters
    .map(
      (ch) => `    {
      id: '${ch.id}',
      title: '${escapeTsString(ch.title)}',
      section: '${escapeTsString(ch.section)}',
      status: '${ch.status}',
      summary: '${escapeTsString(ch.summary)}',
      sourceModuleId: '${ch.sourceModuleId || ''}',
      subSections: [
${ch.subSections.map((s) => `        { id: '${s.id}', title: '${escapeTsString(s.title)}', completed: ${s.completed} },`).join('\n')}
      ],
    }`,
    )
    .join(',\n');

  return `export interface SubSection {
  id: string;
  title: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  section: string;
  status: 'completed' | 'learning' | 'not-started';
  subSections: SubSection[];
  summary: string;
  sourceModuleId?: string;
}

export interface AnkiCard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
}

export interface AudioLesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  progress: number;
  description: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChecklistStep {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  category: string;
  difficulty: '简单' | '中等' | '困难';
  itemCount: number;
  duration: string;
  steps: ChecklistStep[];
}

export interface MindMapNode {
  id: string;
  label: string;
  status: 'completed' | 'learning' | 'not-started';
  angle: number;
}

export interface BookData {
  title: string;
  publisher: string;
  author: string;
  isbn: string;
  totalChapters: number;
  completedChapters: number;
  readMinutes: number;
  totalMinutes: number;
  streakDays: number;
  chapters: Chapter[];
  ankiCards: AnkiCard[];
  audioLessons: AudioLesson[];
  checklists: Checklist[];
  mindMapNodes: MindMapNode[];
}

export const bookData: BookData = {
  title: '${escapeTsString(bookInfo.title)}',
  publisher: '${escapeTsString(bookInfo.publisher)}',
  author: '${escapeTsString(bookInfo.author)}',
  isbn: '${escapeTsString(bookInfo.isbn)}',
  totalChapters: ${bookInfo.totalChapters},
  completedChapters: ${bookInfo.completedChapters},
  readMinutes: ${bookInfo.readMinutes},
  totalMinutes: ${bookInfo.totalMinutes},
  streakDays: ${bookInfo.streakDays},
  chapters: [
${chaptersStr}
  ],
  ankiCards: [],
  audioLessons: [],
  checklists: [],
  mindMapNodes: [
${bookInfo.chapters.map((ch, i) => `    { id: '${ch.id}', label: '${escapeTsString(ch.title)}', status: '${ch.status}' as const, angle: ${Math.round((i * 360) / bookInfo.chapters.length)} },`).join('\n')}
  ],
};

export type ViewType =
  | 'home'
  | 'anki'
  | 'audio'
  | 'audio-player'
  | 'mindmap'
  | 'checklist'
  | 'checklist-detail'
  | 'chapter-content'
  | 'agent'
  | 'book-skill'
  | 'profile';

export type ToolType = 'anki' | 'audio' | 'mindmap' | 'checklist';

export const MODULES = {
  audioCourse: true,
  video: true,
  knowledgeMap: true,
  anki: true,
  chapterContent: true,
  agent: true,
  bookSkill: true,
} as const;

export const TOOLS: { key: ToolType; label: string; icon: string }[] = [
  { key: 'anki', label: 'Anki卡片', icon: '🗂️' },
  { key: 'audio', label: '音频课', icon: '🎧' },
  { key: 'mindmap', label: '知识地图', icon: '🗺️' },
  ...(MODULES.video ? [{ key: 'checklist' as ToolType, label: '视频清单', icon: '🎬' }] : []),
];

export default bookData;
`;
}

/**
 * 转义字符串中的特殊字符，用于生成 TS 字符串字面量
 */
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

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<SkillResult<void>> {
  const { bookId, sourcePath, promptFile } = parseArgs();
  console.log(`[book-info-generator] bookId=${bookId}, source=${sourcePath}`);

  let title: string;
  let modules: { moduleId?: string; moduleTitle: string; tasks: string[] }[];

  // 优先尝试从 sourceParsed.ts 加载
  const sourceParsed = await loadSourceParsed(bookId);
  if (sourceParsed) {
    title = sourceParsed.bookMeta.title || bookId;
    modules = convertModules(sourceParsed.modules);
    console.log(`[book-info-generator] 从 sourceParsed.ts 读取: ${title}`);
  } else {
    const content = readMarkdown(sourcePath);
    title = extractTitle(content) || bookId;
    modules = parseModules(content);
    console.log(`[book-info-generator] 从 source.md 直接解析: ${title}`);
  }

  console.log(`[book-info-generator] 书名: ${title}`);
  console.log(`[book-info-generator] 识别到 ${modules.length} 个模块`);
  for (const m of modules) {
    console.log(`  - ${m.moduleTitle} (${m.tasks.length} 个任务)`);
  }

  let chapters = generateChapterIds(modules);
  chapters = await generateSummaries(chapters, bookId, promptFile);

  // 对齐 sourceParsed.ts 的 id 到 bookInfo 子章节 id，使前端 ChapterContent 的
  // findRawHtml(task.id === subSectionId) 直接命中，而非依赖脆弱的位置兜底映射。
  await alignSourceParsedIds(bookId, chapters, sourceParsed);

  const bookInfo: BookInfo = {
    title: title || bookId,
    publisher: sourceParsed?.bookMeta.publisher || '',
    author: sourceParsed?.bookMeta.authors?.join('、') || '',
    isbn: sourceParsed?.bookMeta.isbn || '',
    totalChapters: chapters.length,
    completedChapters: 0,
    readMinutes: 0,
    totalMinutes: chapters.length * 18,
    streakDays: 0,
    chapters,
  };

  const outputPath = getBookDataPath(bookId, 'bookInfo.ts');
  ensureFileDir(outputPath);

  const tsContent = generateBookInfoTs(bookInfo);
  await writeFile(outputPath, tsContent, 'utf-8');
  console.log(`[book-info-generator] 已写入: ${outputPath}`);

  // 自动校验
  console.log('[book-info-generator] 正在校验生成的 TS 文件...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[book-info-generator] 校验通过');
  } else {
    console.error('[book-info-generator] 校验失败:');
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
