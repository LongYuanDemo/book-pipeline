#!/usr/bin/env node
/**
 * chapter-content-generator 主脚本（Skills 范式重构版）
 * 通用化内容解析 + Coze AI 增强 + LangGraph 并发
 *
 * 业务逻辑（prompt 内容、callout 类型）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、JSON 解析、ContentBlock 组装。
 *
 * 核心原则：全书输入 → 全书输出，不丢内容
 * - 原文每个段落/标题/列表都转为 ContentBlock
 * - Coze 为每个任务生成 AI 增强（callout/quiz），不替换原文
 * - LangGraph 并发处理所有任务
 *
 * 用法:
 *   npx tsx skills/chapter-content-generator/scripts/generate-chapter-content.ts \
 *     --book-id text-crossing-test [--concurrency 5] [--prompt-file <path>]
 */

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { readMarkdown } from '../../shared/markdown.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';
import type { SourceParsed } from '../../source-parser/scripts/parse-source.ts';
import { callCoze } from '../../shared/coze.ts';
import { entrypoint, task } from '@langchain/langgraph';

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
    console.error('用法: npx tsx generate-chapter-content.ts --book-id <bookId> [--source <path>] [--prompt-file <path>]');
    process.exit(1);
  }

  if (!sourcePath) {
    sourcePath = resolve(PROJECT_ROOT, 'books', bookId, 'source.md');
  }

  if (!existsSync(sourcePath)) {
    console.error(`错误: 源文件不存在: ${sourcePath}`);
    process.exit(1);
  }

  return { bookId, sourcePath };
}

/* ------------------------------------------------------------------ */
// sourceParsed.ts 加载（优先）

async function loadSourceParsed(bookId: string): Promise<SourceParsed | null> {
  const sourceParsedPath = getBookDataPath(bookId, 'sourceParsed.ts');
  if (!existsSync(sourceParsedPath)) {
    console.log('[chapter-content-generator] sourceParsed.ts 不存在，将回退到直接解析 source.md');
    return null;
  }

  try {
    const mod = await import(sourceParsedPath);
    const data = mod.sourceParsed || mod.default;
    if (data && Array.isArray(data.modules)) {
      console.log(`[chapter-content-generator] 从 sourceParsed.ts 加载到 ${data.modules.length} 个模块`);
      return data as SourceParsed;
    }
    return null;
  } catch (err) {
    console.warn(`[chapter-content-generator] 加载 sourceParsed.ts 失败: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/** 从 sourceParsed 构建 TaskSection 列表，优先使用 rawHtml */
function buildTaskSectionsFromSourceParsed(sourceParsed: SourceParsed): TaskSection[] {
  const sections: TaskSection[] = [];
  for (const mod of sourceParsed.modules) {
    for (const task of mod.tasks) {
      // 优先使用 rawHtml（完整 HTML），降级用 rawContent（Markdown）
      const content = task.rawHtml || task.rawContent;
      sections.push({
        title: task.title,
        content,
        isHtml: !!task.rawHtml,
      });
    }
  }
  return sections;
}

/* ------------------------------------------------------------------ */
// 类型定义（与 bookInfo.ts 对应）

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
}

interface BookDataShape {
  title: string;
  chapters: Chapter[];
}

interface ContentBlock {
  type:
    | 'heading'
    | 'paragraph'
    | 'image'
    | 'steps'
    | 'tips'
    | 'quiz'
    | 'callout'
    | 'ingredients'
    | 'evaluation'
    | 'html';
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
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
    brief?: {
      claim: string;
      points: string[];
      example: string;
      unaddressed: string;
    };
  };
  ingredients?: {
    main: string[];
    seasoning: string[];
  };
}

interface TaskContent {
  taskId: string;
  title: string;
  module: string;
  blocks: ContentBlock[];
}

/* ------------------------------------------------------------------ */
// 工具函数

function escapeTsString(s: string | undefined | null): string {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\\u2028/g, '\\u2028')
    .replace(/\\u2029/g, '\\u2029');
}

/** 将文本拆分为句子 */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？；.!?;])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 生成占位 quiz（通用版，不依赖烹饪领域知识） */
function generatePlaceholderQuiz(
  taskTitle: string,
  taskContent: string,
): ContentBlock {
  const sentences = splitSentences(taskContent);
  const keySentence = sentences[0] || `${taskTitle}的核心要点需要重点掌握。`;

  return {
    type: 'quiz',
    quiz: {
      question: `关于${taskTitle}，下列哪项描述是正确的？`,
      options: [
        keySentence.slice(0, 40) + (keySentence.length > 40 ? '...' : ''),
        '该内容不需要特别关注',
        '以上说法都不对',
        '该主题没有实际应用价值',
      ],
      answer: 0,
      explanation: `依据教材内容，${keySentence}`,
    },
  };
}

/* ------------------------------------------------------------------ */
// 通用内容解析 — 将原始 Markdown 转为 ContentBlocks，保留全部内容

/**
 * 将 HTML 解析为 ContentBlock 数组。
 * 保留表格、图片等完整 HTML 结构，不丢内容。
 */
/**
 * 检测 <p> 标签内容是否实际上是标题（教材 HTML 常用 <p> 包裹标题文本）。
 * 匹配模式：
 * - 中文序号开头：一、二、三、（一）（二）
 * - 阿拉伯序号开头：1. 2. 3.、(1) (2)
 * - 特殊标题：学习目标、案例导学、知识链接、素质拓展、考点提示、目标检测等
 * - 第X节/第X章 开头
 * - 短文本（<30字）且以：结尾或无标点结尾
 */
function isPseudoHeading(text: string): boolean {
  if (!text || text.length > 60) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;

  // 特殊标题关键词（教材常见结构性标题）
  const titleKeywords = [
    '学习目标', '案例导学', '知识链接', '素质拓展', '考点提示',
    '目标检测', '素质目标', '知识目标', '能力目标',
    '本章小结', '复习思考', '思考题', '案例分析',
    '知识拓展', '临床链接', '护理警示', '护理提示',
  ];
  if (titleKeywords.some(kw => trimmed.startsWith(kw) || trimmed === kw)) return true;

  // 中文序号开头：一、二、（一）（二）
  if (/^[一二三四五六七八九十]+[、.．]\s*.{0,40}$/.test(trimmed)) return true;
  if (/^[（(][一二三四五六七八九十]+[)）]\s*.{0,40}$/.test(trimmed)) return true;

  // 阿拉伯序号开头：1. 2.、(1) (2) — 仅当短文本时
  if (/^\d+[、.．]\s*.{0,40}$/.test(trimmed) && !trimmed.includes('。')) return true;
  if (/^[（(]\d+[)）]\s*.{0,40}$/.test(trimmed) && !trimmed.includes('。')) return true;

  // 第X节/第X章 开头
  if (/^第[一二三四五六七八九十\d]+[章节][^。；]{0,30}$/.test(trimmed)) return true;

  return false;
}

function parseHtmlToBlocks(html: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  // 用正则按块级元素切分 HTML
  // 匹配 <h1>-<h6>, <p>, <img>, <table>, <ul>, <ol>, <figure>, <div>, 其他
  const blockRegex = /<(h[1-6]|p|img|table|ul|ol|figure|div|blockquote)\b[^>]*>[\s\S]*?<\/\1>|<img\b[^>]*\/?>/gi;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = blockRegex.exec(html)) !== null) {
    // 处理标签前的裸文本
    if (match.index > lastIndex) {
      const between = html.slice(lastIndex, match.index).trim();
      if (between) {
        // 剥离标签后的纯文本作为 paragraph
        const text = between.replace(/<[^>]+>/g, '').trim();
        if (text) {
          if (isPseudoHeading(text)) {
            blocks.push({ type: 'heading', content: text });
          } else {
            blocks.push({ type: 'paragraph', content: text });
          }
        }
      }
    }

    const tag = match[1]?.toLowerCase() || 'img';
    const raw = match[0];

    if (tag.startsWith('h')) {
      const text = raw.replace(/<[^>]+>/g, '').trim();
      if (text) blocks.push({ type: 'heading', content: text });
    } else if (tag === 'img') {
      const srcMatch = raw.match(/src=["']([^"']+)["']/i);
      const altMatch = raw.match(/alt=["']([^"']*)["']/i);
      if (srcMatch) {
        blocks.push({
          type: 'image',
          content: srcMatch[1],
          imageCaption: altMatch?.[1] || '',
        });
      }
    } else if (tag === 'table') {
      // 表格保留原始 HTML，用 html block 渲染
      blocks.push({ type: 'html', content: raw });
    } else if (tag === 'ul' || tag === 'ol') {
      // 列表：提取 <li> 内容
      const items: string[] = [];
      const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch: RegExpExecArray | null;
      while ((liMatch = liRegex.exec(raw)) !== null) {
        const itemText = liMatch[1].replace(/<[^>]+>/g, '').trim();
        if (itemText) items.push(itemText);
      }
      if (items.length > 0) {
        blocks.push({ type: tag === 'ol' ? 'steps' : 'tips', items });
      }
    } else if (tag === 'figure') {
      // figure 可能包含 img + figcaption
      const imgMatch = raw.match(/<img\b[^>]*src=["']([^"']+)["']/i);
      const captionMatch = raw.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      if (imgMatch) {
        blocks.push({
          type: 'image',
          content: imgMatch[1],
          imageCaption: captionMatch?.[1].replace(/<[^>]+>/g, '').trim() || '',
        });
      } else {
        // 没有 img 的 figure，保留原始 HTML
        blocks.push({ type: 'html', content: raw });
      }
    } else if (tag === 'blockquote') {
      const text = raw.replace(/<[^>]+>/g, '').trim();
      if (text) {
        blocks.push({
          type: 'callout',
          callout: { variant: 'info', title: '原文引用', body: text },
        });
      }
    } else {
      // p, div 等：如果是简单段落，提取文本；否则保留 HTML
      const text = raw.replace(/<[^>]+>/g, '').trim();
      const hasNestedHtml = /<(table|img|ul|ol|figure|h[1-6])\b/i.test(raw);
      if (hasNestedHtml) {
        blocks.push({ type: 'html', content: raw });
      } else if (text) {
        // 检测伪标题（教材 <p> 标签中常包含标题文本）
        if (isPseudoHeading(text)) {
          blocks.push({ type: 'heading', content: text });
        } else {
          blocks.push({ type: 'paragraph', content: text });
        }
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // 处理最后的裸文本
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex).trim();
    if (remaining) {
      const text = remaining.replace(/<[^>]+>/g, '').trim();
      if (text) {
        blocks.push({ type: 'paragraph', content: text });
      }
    }
  }

  return blocks;
}

/**
 * 将 rawContent（原始 Markdown 或 HTML）解析为 ContentBlock 数组。
 * 通用解析器，不依赖任何特定学科领域知识。
 * 原则：不丢内容，每个段落/标题/列表/图片都转为 block。
 */
function parseRawContentToBlocks(rawContent: string, isHtml?: boolean): ContentBlock[] {
  if (isHtml) {
    return parseHtmlToBlocks(rawContent);
  }
  const blocks: ContentBlock[] = [];
  const lines = rawContent.split('\n');

  let i = 0;
  let currentList: string[] = [];
  let listType: 'steps' | 'tips' | null = null;

  function flushList() {
    if (currentList.length > 0 && listType) {
      blocks.push({ type: listType, items: [...currentList] });
      currentList = [];
      listType = null;
    }
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 空行：结束当前列表
    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    // Markdown 标题
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      // H1/H2 作为 heading block，H3+ 也作为 heading
      blocks.push({ type: 'heading', content: title });
      i++;
      continue;
    }

    // 图片
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      blocks.push({
        type: 'image',
        content: imgMatch[2],
        imageCaption: imgMatch[1] || '',
      });
      i++;
      continue;
    }

    // 编号列表项 (1. / 1、 / 1． / (1) / ①)
    const numberedMatch = trimmed.match(/^(?:\d+[.．、]\s*|[（(]\d+[)）]\s*|[①②③④⑤⑥⑦⑧⑨⑩]\s*)(.+)/);
    if (numberedMatch) {
      if (listType !== 'steps') {
        flushList();
        listType = 'steps';
      }
      currentList.push(numberedMatch[1].trim());
      i++;
      continue;
    }

    // 无序列表项 (- / * / • / ○ / ◆)
    const bulletMatch = trimmed.match(/^(?:[-*•○◆]\s+)(.+)/);
    if (bulletMatch) {
      if (listType !== 'tips') {
        flushList();
        listType = 'tips';
      }
      currentList.push(bulletMatch[1].trim());
      i++;
      continue;
    }

    // 引用块
    const quoteMatch = trimmed.match(/^>\s*(.*)/);
    if (quoteMatch) {
      flushList();
      const quoteText = quoteMatch[1].trim();
      if (quoteText) {
        blocks.push({
          type: 'callout',
          callout: {
            variant: 'info',
            title: '原文引用',
            body: quoteText,
          },
        });
      }
      i++;
      continue;
    }

    // 表格行（| ... | ... |）
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      // 收集连续表格行
      const tableLines: string[] = [trimmed];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|') && lines[i + 1].trim().endsWith('|')) {
        i++;
        tableLines.push(lines[i].trim());
      }
      // 将表格转为 paragraph block（保留原始格式）
      blocks.push({
        type: 'paragraph',
        content: tableLines.join('\n'),
      });
      i++;
      continue;
    }

    // 普通段落文本
    flushList();
    // 收集连续非空非特殊行作为一个段落
    const paraLines: string[] = [trimmed];
    while (i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      if (!nextLine) break;
      if (/^(#{1,6})\s+/.test(nextLine)) break;
      if (/^!\[/.test(nextLine)) break;
      if (/^(?:\d+[.．、]\s*|[（(]\d+[)）]\s*|[①②③④⑤⑥⑦⑧⑨⑩]\s*)/.test(nextLine)) break;
      if (/^[-*•○◆]\s+/.test(nextLine)) break;
      if (nextLine.startsWith('|')) break;
      if (/^>\s/.test(nextLine)) break;
      i++;
      paraLines.push(nextLine);
    }
    const paragraph = paraLines.join(' ').trim();
    if (paragraph) {
      blocks.push({ type: 'paragraph', content: paragraph });
    }
    i++;
  }

  flushList();
  return blocks;
}

/* ------------------------------------------------------------------ */
// 任务匹配

interface TaskSection {
  title: string;
  content: string;
  isHtml?: boolean;
}

/**
 * 直接从原始 Markdown 中切分任务章节
 * 教材中任务标题可能是 H1 或 H2，因此不能依赖 extractSections 的层级
 */
function extractTaskSections(content: string): TaskSection[] {
  const lines = content.split('\n');
  const positions: { index: number; title: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^#{1,2}\s+(任务[一二三四五六七八九十百千万\d]+.*)$/);
    if (match) {
      positions.push({ index: i, title: match[1].trim() });
    }
  }

  const sections: TaskSection[] = [];
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : lines.length;
    const sectionLines = lines.slice(start + 1, end);
    sections.push({
      title: positions[i].title,
      content: sectionLines.join('\n'),
    });
  }

  return sections;
}

function normalizeTaskTitle(title: string): string {
  return title
    .replace(/^任务[一二三四五六七八九十百千万\d]+[\s、,.]*/, '')
    .replace(/\s+\d+\s*$/, '')
    .trim();
}

function taskNumberToArabic(numStr: string): number {
  const map: Record<string, number> = {
    一: 1, 二: 2, 三: 3, 四: 4, 五: 5,
    六: 6, 七: 7, 八: 8, 九: 9, 十: 10,
  };

  // 阿拉伯数字
  if (/^\d+$/.test(numStr)) return parseInt(numStr, 10);

  // 十以内
  if (map[numStr]) return map[numStr];

  // 十一到九十九
  let result = 0;
  for (const ch of numStr) {
    if (map[ch]) result += map[ch];
  }
  return result;
}

function findTaskSection(
  sections: TaskSection[],
  subSection: SubSection,
): TaskSection | null {
  // 支持 任务X 和 第X节 两种格式
  const numMatch = subSection.title.match(/(?:任务|第)([一二三四五六七八九十百千万\d]+)(?:节)?/);
  if (!numMatch) return null;

  const targetNum = taskNumberToArabic(numMatch[1]);
  const targetName = normalizeTaskTitle(subSection.title);

  // 1. 编号 + 名称都匹配
  let matched = sections.find((s) => {
    const sNumMatch = s.title.match(/(?:任务|第)([一二三四五六七八九十百千万\d]+)(?:节)?/);
    if (!sNumMatch) return false;
    const sNum = taskNumberToArabic(sNumMatch[1]);
    const sName = normalizeTaskTitle(s.title);
    return sNum === targetNum && sName === targetName;
  });

  // 2. 仅编号匹配（允许菜名存在差异，如“韭黄/非黄”）
  if (!matched) {
    matched = sections.find((s) => {
      const sNumMatch = s.title.match(/(?:任务|第)([一二三四五六七八九十百千万\d]+)(?:节)?/);
      if (!sNumMatch) return false;
      return taskNumberToArabic(sNumMatch[1]) === targetNum;
    });
  }

  // 3. 标题完全匹配（fallback）
  if (!matched) {
    matched = sections.find((s) => s.title === subSection.title);
  }

  return matched || null;
}

/* ------------------------------------------------------------------ */
// Coze AI 增强 — 为每个任务生成 callout + quiz（不替换原文）

interface AIEnhancement {
  callout?: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

interface AIEnhancementSet {
  intro?: AIEnhancement;
  sections: Array<{
    headingHint: string;
    enhancement: AIEnhancement;
  }>;
  outro?: AIEnhancement;
}

function parseAIEnhancement(raw: string): AIEnhancement {
  const result: AIEnhancement = {};

  try {
    const json = JSON.parse(raw);
    if (json.callout) result.callout = json.callout;
    if (json.quiz) result.quiz = json.quiz;
  } catch {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const json = JSON.parse(jsonMatch[0]);
        if (json.callout) result.callout = json.callout;
        if (json.quiz) result.quiz = json.quiz;
      } catch {
        // 解析失败
      }
    }
  }

  return result;
}

function parseAIEnhancementSet(raw: string): AIEnhancementSet {
  const result: AIEnhancementSet = { sections: [] };

  try {
    const json = JSON.parse(raw);
    if (json.intro) {
      result.intro = {};
      if (json.intro.callout) result.intro.callout = json.intro.callout;
      if (json.intro.quiz) result.intro.quiz = json.intro.quiz;
    }
    if (Array.isArray(json.sections)) {
      for (const sec of json.sections) {
        if (sec.headingHint && (sec.callout || sec.quiz)) {
          result.sections.push({
            headingHint: sec.headingHint,
            enhancement: {
              callout: sec.callout,
              quiz: sec.quiz,
            },
          });
        }
      }
    }
    if (json.outro) {
      result.outro = {};
      if (json.outro.callout) result.outro.callout = json.outro.callout;
      if (json.outro.quiz) result.outro.quiz = json.outro.quiz;
    }
  } catch {
    // 降级：尝试提取单个 JSON 对象
    const single = parseAIEnhancement(raw);
    if (single.callout || single.quiz) {
      result.outro = single;
    }
  }

  return result;
}

/** 调用 Coze 为任务生成全书级 AI 增强集（intro + 多段 section + outro） */
async function generateAIEnhancementSet(
  taskTitle: string,
  moduleTitle: string,
  rawContent: string,
  headings: string[],
  promptFilePath?: string,
): Promise<AIEnhancementSet> {
  // 截取前 6000 字符作为上下文
  const contentPreview = rawContent.slice(0, 6000);
  const headingList = headings.slice(0, 8).map((h, i) => `${i + 1}. ${h}`).join('\n');

  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFilePath && existsSync(promptFilePath)) {
    promptTemplate = await readFile(promptFilePath, 'utf-8');
  }

  let prompt: string;
  if (promptTemplate) {
    prompt = promptTemplate
      .replace(/\{\{moduleTitle\}\}/g, moduleTitle)
      .replace(/\{\{taskTitle\}\}/g, taskTitle)
      .replace(/\{\{contentPreview\}\}/g, contentPreview)
      .replace(/\{\{headingList\}\}/g, headingList);
  } else {
    prompt = buildDefaultEnhancementPrompt(moduleTitle, taskTitle, contentPreview, headingList);
  }

  const result = await callCoze([{ role: 'user', content: prompt }]);
  if (!result) return { sections: [] };

  return parseAIEnhancementSet(result);
}

/** 构建 fallback prompt（通用教材增强，不绑定特定书籍类型） */
function buildDefaultEnhancementPrompt(
  moduleTitle: string,
  taskTitle: string,
  contentPreview: string,
  headingList: string,
): string {
  return `你是一位教材内容增强专家。请为以下教材任务生成多段 AI 增强内容。

模块：${moduleTitle}
任务：${taskTitle}
原文内容（节选）：
${contentPreview}

该任务包含以下子标题：
${headingList}

请输出以下 JSON（不要 markdown 代码块，不要额外解释）：
{
  "intro": {
    "callout": {
      "variant": "tip",
      "title": "本节导读",
      "body": "2-3 句概述本节核心要点和学习路径"
    }
  },
  "sections": [
    {
      "headingHint": "子标题文本片段（用于匹配插入位置）",
      "callout": {
        "variant": "info",
        "title": "AI 学习提示",
        "body": "针对该子标题内容的 2-3 句学习建议"
      },
      "quiz": {
        "question": "基于该子标题内容的选择题",
        "options": ["正确选项", "错误选项1", "错误选项2", "错误选项3"],
        "answer": 0,
        "explanation": "为什么正确选项是对的"
      }
    },
    {
      "headingHint": "涉及操作步骤或注意事项的子标题",
      "callout": {
        "variant": "warning",
        "title": "注意事项",
        "body": "标注该部分常见误解、易错点、易混淆概念或安全风险"
      }
    }
  ],
  "outro": {
    "callout": {
      "variant": "culture",
      "title": "知识拓展",
      "body": "1-2 句跨章节或跨领域的拓展提示"
    },
    "quiz": {
      "question": "综合本节内容的选择题",
      "options": ["正确选项", "错误选项1", "错误选项2", "错误选项3"],
      "answer": 0,
      "explanation": "为什么正确选项是对的"
    }
  }
}

要求：
1. sections 数组：为每个重要子标题生成一个增强项，至少 2 个，最多 5 个
2. headingHint 必须是原文中实际出现的标题文本片段
3. callout 和 quiz 都必须基于原文实际内容，不能编造
4. callout 的 variant 必须根据内容选择：知识概念用 "info"，操作要点用 "tip"，背景文化用 "culture"，注意事项/易错点/安全风险用 "warning"。至少包含 1 个 "warning" 类型的 callout
5. quiz 的 4 个选项要有区分度
6. answer 是正确选项的索引（0-3）
7. 直接输出 JSON，不要任何其他文字`;
}

/* ------------------------------------------------------------------ */
// 主生成逻辑

/** 单个任务的完整处理：原文解析 + AI 增强（分段插入） */
async function processTaskContent(
  taskSection: TaskSection,
  moduleTitle: string,
  subSection: SubSection,
  promptFile?: string,
): Promise<TaskContent> {
  // 1. 通用解析：保留全部原文内容（优先 HTML 解析）
  const blocks = parseRawContentToBlocks(taskSection.content, taskSection.isHtml);

  // 如果没有任何 block，至少给一个占位
  if (blocks.length === 0) {
    blocks.push({
      type: 'paragraph',
      content: `暂未解析到${subSection.title}的详细内容。`,
    });
  }

  // 2. 提取所有 heading 文本，用于 AI 增强的分段定位
  const headings = blocks
    .filter(b => b.type === 'heading' && b.content)
    .map(b => b.content!);

  // 3. Coze AI 增强：生成 intro + 多段 section + outro
  let enhancementSet: AIEnhancementSet = { sections: [] };
  try {
    enhancementSet = await generateAIEnhancementSet(
      subSection.title,
      moduleTitle,
      taskSection.content,
      headings,
      promptFile,
    );
  } catch {
    // AI 增强失败，用占位 quiz
  }

  // 4. 将 AI 增强分段插入 blocks 中
  const resultBlocks: ContentBlock[] = [];

  // 4a. intro 插在最前面
  if (enhancementSet.intro?.callout) {
    resultBlocks.push({ type: 'callout', callout: enhancementSet.intro.callout });
  }

  // 4b. 遍历 blocks，在每个匹配的 heading 后插入对应的 section 增强
  const usedSections = new Set<number>();
  for (const block of blocks) {
    resultBlocks.push(block);

    // 如果是 heading，尝试匹配 section 增强
    if (block.type === 'heading' && block.content) {
      for (let i = 0; i < enhancementSet.sections.length; i++) {
        if (usedSections.has(i)) continue;
        const sec = enhancementSet.sections[i];
        // headingHint 是标题文本的片段，用包含匹配
        if (block.content.includes(sec.headingHint) || sec.headingHint.includes(block.content)) {
          if (sec.enhancement.callout) {
            resultBlocks.push({ type: 'callout', callout: sec.enhancement.callout });
          }
          if (sec.enhancement.quiz) {
            resultBlocks.push({ type: 'quiz', quiz: sec.enhancement.quiz });
          }
          usedSections.add(i);
          break;
        }
      }
    }
  }

  // 4c. 未匹配的 section 增强均匀追加到末尾
  for (let i = 0; i < enhancementSet.sections.length; i++) {
    if (usedSections.has(i)) continue;
    const sec = enhancementSet.sections[i];
    if (sec.enhancement.callout) {
      resultBlocks.push({ type: 'callout', callout: sec.enhancement.callout });
    }
    if (sec.enhancement.quiz) {
      resultBlocks.push({ type: 'quiz', quiz: sec.enhancement.quiz });
    }
  }

  // 4d. outro 插在最后
  if (enhancementSet.outro?.callout) {
    resultBlocks.push({ type: 'callout', callout: enhancementSet.outro.callout });
  }
  if (enhancementSet.outro?.quiz) {
    resultBlocks.push({ type: 'quiz', quiz: enhancementSet.outro.quiz });
  }

  // 5. 确保至少有一个 quiz
  const hasQuiz = resultBlocks.some((b) => b.type === 'quiz');
  if (!hasQuiz) {
    resultBlocks.push(generatePlaceholderQuiz(subSection.title, taskSection.content));
  }

  return {
    taskId: subSection.id,
    title: subSection.title,
    module: moduleTitle,
    blocks: resultBlocks,
  };
}

/* ------------------------------------------------------------------ */
// 并发控制

async function runWithConcurrency<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  limit: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/* ------------------------------------------------------------------ */
// LangGraph 工作流

interface TaskJob {
  subSection: SubSection;
  taskSection: TaskSection | null;
  moduleTitle: string;
  promptFile?: string;
}

const processTaskJob = task(
  'processTaskJob',
  async (job: TaskJob): Promise<{ id: string; content: TaskContent }> => {
    if (!job.taskSection) {
      // pipeline 兜底：即使没有原文，也生成有意义的占位内容
      console.warn(`[chapter-content-generator] ${job.subSection.id} 无原文数据，生成占位内容`);
      return {
        id: job.subSection.id,
        content: {
          taskId: job.subSection.id,
          title: job.subSection.title,
          module: job.moduleTitle,
          blocks: [
            {
              type: 'paragraph',
              content: `本节内容待补充。`,
            },
            generatePlaceholderQuiz(job.subSection.title, ''),
          ],
        },
      };
    }

    const content = await processTaskContent(
      job.taskSection,
      job.moduleTitle,
      job.subSection,
      job.promptFile,
    );
    console.log(`[chapter-content-generator] ${job.subSection.id} → ${content.blocks.length} blocks`);
    return { id: job.subSection.id, content };
  },
);

const chapterContentWorkflow = entrypoint(
  { name: 'chapterContentWorkflow' },
  async (params: {
    bookId: string;
    sourcePath: string;
    concurrency: number;
    promptFile?: string;
  }) => {
    console.log(`[chapter-content-generator] bookId=${params.bookId}, concurrency=${params.concurrency}`);

    // 1. 加载 bookInfo
    const bookInfo = await loadBookInfo(params.bookId);
    console.log(`[chapter-content-generator] 书名: ${bookInfo.title}`);

    // 2. 加载 sourceParsed
    let taskSections: TaskSection[];
    const sourceParsed = await loadSourceParsed(params.bookId);
    if (sourceParsed) {
      taskSections = buildTaskSectionsFromSourceParsed(sourceParsed);
      console.log(`[chapter-content-generator] 从 sourceParsed.ts 读取到 ${taskSections.length} 个任务章节`);
    } else {
      const content = readMarkdown(params.sourcePath);
      taskSections = extractTaskSections(content);
      console.log(`[chapter-content-generator] 从 source.md 直接解析到 ${taskSections.length} 个任务章节`);
    }

    // 3. 构建任务列表
    // 构建 sourceParsed 的 task id → rawHtml/rawContent 索引，用于兜底
    const sourceParsedIndex = new Map<string, { content: string; isHtml: boolean }>();
    if (sourceParsed) {
      for (const mod of sourceParsed.modules) {
        for (const task of mod.tasks) {
          sourceParsedIndex.set(task.id, {
            content: (task as any).rawHtml || task.rawContent || '',
            isHtml: !!(task as any).rawHtml,
          });
        }
      }
    }

    const jobs: TaskJob[] = [];
    for (const chapter of bookInfo.chapters) {
      for (const sub of chapter.subSections) {
        let taskSection = findTaskSection(taskSections, sub);
        if (!taskSection) {
          // 兜底：从 sourceParsed 按 task id 查找
          const fallback = sourceParsedIndex.get(sub.id);
          if (fallback && fallback.content) {
            taskSection = {
              title: sub.title,
              content: fallback.content,
              isHtml: fallback.isHtml,
            };
            console.log(`[chapter-content-generator] 兜底匹配: ${sub.title} (${sub.id}) → 从 sourceParsed rawHtml`);
          } else {
            console.warn(`[chapter-content-generator] 未找到任务内容: ${sub.title} (${sub.id})`);
          }
        }
        jobs.push({
          subSection: sub,
          taskSection,
          moduleTitle: `${chapter.section} · ${chapter.title}`,
          promptFile: params.promptFile,
        });
      }
    }

    console.log(`[chapter-content-generator] 共 ${jobs.length} 个任务，开始并发处理...`);

    // 4. LangGraph fan-out：并发处理所有任务
    const rawResults = await runWithConcurrency(
      jobs,
      (job) => processTaskJob(job),
      params.concurrency,
    );
    const results = await Promise.all(rawResults);

    // 5. fan-in：收集结果
    const chapterContents: Record<string, TaskContent> = {};
    for (const { id, content } of results) {
      chapterContents[id] = content;
    }

    // 6. 统计
    const totalBlocks = Object.values(chapterContents).reduce(
      (sum, tc) => sum + tc.blocks.length,
      0,
    );
    console.log(`[chapter-content-generator] 共生成 ${Object.keys(chapterContents).length} 个任务内容，${totalBlocks} 个 blocks`);

    // 7. 写入 TS 文件
    const outputPath = getBookDataPath(params.bookId, 'chapterContent.ts');
    ensureFileDir(outputPath);
    const tsContent = generateChapterContentTs(chapterContents);
    await writeFile(outputPath, tsContent, 'utf-8');
    console.log(`[chapter-content-generator] 已写入: ${outputPath}`);

    // 8. 校验
    console.log('[chapter-content-generator] 正在校验生成的 TS 文件...');
    const validation = await validateTsFile(outputPath);
    if (validation.valid) {
      console.log('[chapter-content-generator] 校验通过');
    } else {
      console.error('[chapter-content-generator] 校验失败:');
      validation.messages.forEach((m) => console.error(`  - ${m}`));
      return { success: false, errors: validation.messages, chapterContents };
    }

    return { success: true, errors: [] as string[], chapterContents };
  },
);

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<void> {
  const { bookId, sourcePath, promptFile } = parseArgs();
  const concurrency = 5;

  const result = await chapterContentWorkflow.invoke({ bookId, sourcePath, concurrency, promptFile });

  if (!result.success) {
    process.exit(1);
  }
}

main();

function generateChapterContentTs(
  contents: Record<string, TaskContent>,
): string {
  const entries = Object.entries(contents);

  return `export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'steps' | 'tips' | 'quiz' | 'callout' | 'ingredients' | 'evaluation' | 'html';
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
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
    brief?: {
      claim: string;
      points: string[];
      example: string;
      unaddressed: string;
    };
  };
  ingredients?: {
    main: string[];
    seasoning: string[];
  };
}

export interface TaskContent {
  taskId: string;
  title: string;
  module: string;
  blocks: ContentBlock[];
}

export const chapterContents: Record<string, TaskContent> = {
${entries
  .map(
    ([key, task]) => `  '${key}': {
    taskId: '${task.taskId}',
    title: '${escapeTsString(task.title)}',
    module: '${escapeTsString(task.module)}',
    blocks: [
${task.blocks.map((b) => blockToString(b)).join(',\n')}
    ],
  },`,
  )
  .join('\n')}
};
`;
}

function blockToString(block: ContentBlock): string {
  const fields: string[] = [];
  fields.push(`      type: '${block.type}'`);

  if (block.content !== undefined) {
    fields.push(`content: '${escapeTsString(block.content)}'`);
  }
  if (block.imageCaption !== undefined) {
    fields.push(`imageCaption: '${escapeTsString(block.imageCaption)}'`);
  }
  if (block.items !== undefined) {
    fields.push(
      `items: [\n${block.items.map((item) => `        '${escapeTsString(item)}'`).join(',\n')}\n      ]`,
    );
  }
  if (block.quiz !== undefined) {
    const opts = (block.quiz.options || []).map((o) => `'${escapeTsString(o)}'`).join(', ');
    fields.push(`quiz: {
        question: '${escapeTsString(block.quiz.question)}',
        options: [${opts}],
        answer: ${block.quiz.answer ?? 0},
        explanation: '${escapeTsString(block.quiz.explanation)}',
      }`);
  }
  if (block.callout !== undefined) {
    const callout = block.callout;
    const calloutFields = [
      `variant: '${callout.variant}'`,
      `title: '${escapeTsString(callout.title)}'`,
      `body: '${escapeTsString(callout.body)}'`,
    ];
    if (callout.brief) {
      calloutFields.push(
        `brief: {\n          claim: '${escapeTsString(callout.brief.claim)}',\n          points: [${callout.brief.points.map((p) => `'${escapeTsString(p)}'`).join(', ')}],\n          example: '${escapeTsString(callout.brief.example)}',\n          unaddressed: '${escapeTsString(callout.brief.unaddressed)}'\n        }`,
      );
    }
    fields.push(`callout: {\n        ${calloutFields.join(',\n        ')}\n      }`);
  }
  if (block.ingredients !== undefined) {
    fields.push(
      `ingredients: {\n        main: [${block.ingredients.main.map((m) => `'${escapeTsString(m)}'`).join(', ')}],\n        seasoning: [${block.ingredients.seasoning.map((s) => `'${escapeTsString(s)}'`).join(', ')}]\n      }`,
    );
  }

  return `      {\n        ${fields.join(',\n        ')}\n      }`;
}

/* ------------------------------------------------------------------ */
// 动态导入 bookInfo.ts

async function loadBookInfo(bookId: string): Promise<BookDataShape> {
  const bookInfoPath = getBookDataPath(bookId, 'bookInfo.ts');
  if (!existsSync(bookInfoPath)) {
    throw new Error(`bookInfo.ts 不存在: ${bookInfoPath}`);
  }

  // 使用 tsx 动态导入 TS 模块
  const mod = await import(bookInfoPath);
  const bookData = mod.bookData || mod.default;

  if (!bookData || !Array.isArray(bookData.chapters)) {
    throw new Error(`bookInfo.ts 中没有找到有效的 bookData.chapters`);
  }

  return bookData as BookDataShape;
}

