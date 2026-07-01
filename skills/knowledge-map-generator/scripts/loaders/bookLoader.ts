/**
 * 整书文本加载器
 *
 * 统一聚合 sourceParsed.ts / chapterContent.ts 中的内容，
 * 为知识地图流水线提供完整、未截断的教材文本。
 */

import { getBookDataPath } from '../../../shared/paths.ts';

const PLACEHOLDER_PREFIX = '暂未解析';

export interface SourceTask {
  id: string;
  title: string;
  rawContent: string;
  order: number;
}

export interface SourceModule {
  id: string;
  title: string;
  summary?: string;
  tasks: SourceTask[];
}

export interface SourceParsedShape {
  bookMeta: { title: string; authors: string[]; publisher: string; isbn?: string };
  modules: SourceModule[];
}

export interface ContentBlock {
  type: string;
  content?: string;
  imageCaption?: string;
  items?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  callout?: {
    variant: string;
    title: string;
    body: string;
    brief?: {
      claim: string;
      points: string[];
      example: string;
      unaddressed: string;
    };
  };
}

export interface TaskContent {
  taskId: string;
  title: string;
  module: string;
  blocks: ContentBlock[];
}

export interface ChapterContentShape {
  chapterContents: Record<string, TaskContent>;
}

export interface BookInfoShape {
  title: string;
  chapters: {
    id: string;
    title: string;
    section: string;
    status: string;
    subSections: { id: string; title: string; completed: boolean }[];
    summary: string;
    sourceModuleId?: string;
  }[];
}

export interface BookTextContext {
  bookId: string;
  sourceParsed: SourceParsedShape;
  chapterContent: ChapterContentShape;
  bookInfo: BookInfoShape | null;
  /** sourceParsed module/task ID -> bookInfo chapter/subSection ID */
  idMap: Map<string, string>;
}

async function loadSourceParsed(bookId: string): Promise<SourceParsedShape> {
  const path = getBookDataPath(bookId, 'sourceParsed.ts');
  try {
    const mod = await import(path);
    return mod.sourceParsed as SourceParsedShape;
  } catch (err) {
    console.warn(`[bookLoader] 无法加载 sourceParsed.ts: ${path}`, err);
    return { bookMeta: { title: '', authors: [], publisher: '' }, modules: [] };
  }
}

async function loadChapterContent(bookId: string): Promise<ChapterContentShape> {
  const path = getBookDataPath(bookId, 'chapterContent.ts');
  try {
    const mod = await import(path);
    return { chapterContents: mod.chapterContents as Record<string, TaskContent> };
  } catch (err) {
    console.warn(`[bookLoader] 无法加载 chapterContent.ts: ${path}`, err);
    return { chapterContents: {} };
  }
}

async function loadBookInfo(bookId: string): Promise<BookInfoShape | null> {
  const path = getBookDataPath(bookId, 'bookInfo.ts');
  try {
    const mod = await import(path);
    const data = mod.bookData || mod.default;
    if (!data || !Array.isArray(data.chapters)) return null;
    return data as BookInfoShape;
  } catch (err) {
    console.warn(`[bookLoader] 无法加载 bookInfo.ts: ${path}`, err);
    return null;
  }
}

/** Build mapping from sourceParsed IDs to bookInfo IDs using sourceModuleId + title fallback */
function buildIdMap(sourceParsed: SourceParsedShape, bookInfo: BookInfoShape | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!bookInfo) return map;

  // 1. 通过 sourceModuleId 直接映射 module → chapter
  for (const ch of bookInfo.chapters) {
    if (ch.sourceModuleId) {
      map.set(ch.sourceModuleId, ch.id);
      // 同时映射该 module 下的 task → subSection
      const mod = sourceParsed.modules.find(m => m.id === ch.sourceModuleId);
      if (mod) {
        for (let i = 0; i < mod.tasks.length && i < ch.subSections.length; i++) {
          map.set(mod.tasks[i].id, ch.subSections[i].id);
        }
      }
    }
  }

  // 2. 降级：对未映射的 task 按标题匹配
  const titleToBiId = new Map<string, string>();
  for (const ch of bookInfo.chapters) {
    for (const sub of ch.subSections) {
      const normalized = sub.title.replace(/^第[一二三四五六七八九十\d]+节\s*/, '').trim();
      titleToBiId.set(normalized, sub.id);
      titleToBiId.set(sub.title.trim(), sub.id);
    }
  }
  for (const mod of sourceParsed.modules) {
    for (const task of mod.tasks) {
      if (map.has(task.id)) continue;
      const normalized = task.title.replace(/^第[一二三四五六七八九十\d]+节\s*/, '').trim();
      const biId = titleToBiId.get(normalized) || titleToBiId.get(task.title.trim());
      if (biId) {
        map.set(task.id, biId);
      }
    }
  }

  // 3. 降级：对未映射的 module 按标题匹配
  for (const mod of sourceParsed.modules) {
    if (map.has(mod.id)) continue;
    for (const ch of bookInfo.chapters) {
      const modNorm = mod.title.replace(/^第[一二三四五六七八九十\d]+章\s*/, '').trim();
      const chNorm = ch.title.replace(/^第[一二三四五六七八九十\d]+章\s*/, '').trim();
      if (modNorm === chNorm || mod.title.includes(ch.title) || ch.title.includes(mod.title)) {
        map.set(mod.id, ch.id);
        break;
      }
    }
  }

  return map;
}

export async function loadBookTextContext(bookId: string): Promise<BookTextContext> {
  const [sourceParsed, chapterContent, bookInfo] = await Promise.all([
    loadSourceParsed(bookId),
    loadChapterContent(bookId),
    loadBookInfo(bookId),
  ]);
  const idMap = buildIdMap(sourceParsed, bookInfo);
  console.log(`[bookLoader] ID 映射: ${idMap.size} 个条目`);
  return { bookId, sourceParsed, chapterContent, bookInfo, idMap };
}

function isPlaceholder(text?: string): boolean {
  return !text || text.trim().startsWith(PLACEHOLDER_PREFIX) || text.trim().length < 20;
}

function cleanText(text: string): string {
  return text.replace(/\r\n/g, '\n').trim();
}

/** 从 task 的 blocks 中提取可读的文本内容 */
function extractBlocksText(taskContent?: TaskContent): string {
  if (!taskContent) return '';
  const parts: string[] = [];
  for (const block of taskContent.blocks || []) {
    if (block.content && !isPlaceholder(block.content)) {
      parts.push(block.content);
    }
    if (block.callout?.body && !isPlaceholder(block.callout.body)) {
      parts.push(block.callout.body);
    }
    if (block.quiz?.explanation && !isPlaceholder(block.quiz.explanation)) {
      parts.push(block.quiz.explanation);
    }
    if (block.items && block.items.length > 0) {
      parts.push(block.items.filter((i) => !isPlaceholder(i)).join('\n'));
    }
  }
  return cleanText(parts.join('\n\n'));
}

/** 获取某个任务的最完整文本：优先 sourceParsed.rawContent，fallback chapterContent.blocks */
export function getTaskText(context: BookTextContext, taskId: string): string {
  for (const mod of context.sourceParsed.modules) {
    for (const task of mod.tasks) {
      if (task.id === taskId) {
        const raw = task.rawContent;
        if (raw && !isPlaceholder(raw)) {
          return cleanText(raw);
        }
      }
    }
  }
  const fallback = context.chapterContent.chapterContents[taskId];
  return extractBlocksText(fallback);
}

/** 获取某个章节（按 chapterId 匹配 module id 或 task id 前缀）的文本 */
export function getChapterText(context: BookTextContext, chapterId: string): string {
  const parts: string[] = [];
  for (const mod of context.sourceParsed.modules) {
    if (mod.id === chapterId) {
      parts.push(`# ${mod.title}`);
      if (mod.summary && !isPlaceholder(mod.summary)) {
        parts.push(mod.summary);
      }
      for (const task of mod.tasks) {
        const t = getTaskText(context, task.id);
        if (t) parts.push(t);
      }
      return cleanText(parts.join('\n\n'));
    }
  }
  // fallback：按 task id 前缀匹配
  for (const mod of context.sourceParsed.modules) {
    for (const task of mod.tasks) {
      if (task.id.startsWith(chapterId)) {
        const t = getTaskText(context, task.id);
        if (t) parts.push(t);
      }
    }
  }
  return cleanText(parts.join('\n\n'));
}

/** 获取整本书的完整文本 */
export function getFullText(context: BookTextContext): string {
  const parts: string[] = [];
  for (const mod of context.sourceParsed.modules) {
    parts.push(`# ${mod.title}`);
    if (mod.summary && !isPlaceholder(mod.summary)) {
      parts.push(mod.summary);
    }
    for (const task of mod.tasks) {
      const t = getTaskText(context, task.id);
      if (t) parts.push(t);
    }
  }
  return cleanText(parts.join('\n\n'));
}

/** 为 adaptation-flow LLM 提取生成丰富样本 */
export function getAdaptationFlowSamples(context: BookTextContext): string {
  const samples: string[] = [];
  for (const mod of context.sourceParsed.modules) {
    const modText = [`模块：${mod.title}`];
    for (const task of mod.tasks) {
      const raw = getTaskText(context, task.id);
      if (raw) {
        // 保留任务标题，内容截断到 1000 字符（比之前的 200 大得多）
        const snippet = raw.slice(0, 1000);
        modText.push(`## ${task.title}\n${snippet}`);
      }
    }
    samples.push(modText.join('\n\n'));
  }
  return samples.join('\n---\n');
}

/** 通用样本生成：按模块聚合，每个模块取前 N 字符 */
export function getModuleSamples(context: BookTextContext, maxCharsPerModule = 2000): string {
  const samples: string[] = [];
  for (const mod of context.sourceParsed.modules) {
    const parts: string[] = [`模块：${mod.title}`];
    for (const task of mod.tasks) {
      const raw = getTaskText(context, task.id);
      if (raw) parts.push(raw);
    }
    const joined = cleanText(parts.join('\n\n'));
    samples.push(joined.slice(0, maxCharsPerModule));
  }
  return samples.join('\n---\n');
}
