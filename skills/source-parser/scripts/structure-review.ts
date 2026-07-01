#!/usr/bin/env node
/**
 * 结构审查与重建脚本
 *
 * 第一性原理：不信任 JSON 的 Chapter/Title 分组，从内容本身识别真实结构。
 *
 * 流程：
 *   1. 加载 sourceRaw.ts，按 Chapter 合并所有碎片记录的 HTML
 *   2. 将每章 HTML 转为纯文本，发送给 DeepSeek 识别真实章节结构
 *   3. LLM 返回每节的标题 + 开头标记文本（前100字）
 *   4. 用标记文本在原始 HTML 中定位切分点
 *   5. 输出修正后的 sourceParsed.ts
 *
 * 用法:
 *   npx tsx skills/source-parser/scripts/structure-review.ts --book-id critical-care-nursing
 */

import { existsSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  BOOKS_ROOT,
} from '../../shared/paths.ts';
import { callCoze } from '../../shared/coze.ts';

/* ------------------------------------------------------------------ */
// 类型定义

interface RawItem {
  titleId: string;
  title: string;
  chapter: string;
  sequence: string;
  content: string;
}

interface RawBook {
  bookGuid: string;
  bookName: string;
  items: RawItem[];
}

interface SectionInfo {
  title: string;
  /** 该节开头的前 80-120 字纯文本，用于在 HTML 中定位切分点 */
  startMarker: string;
  /** 该节包含的子标题列表（一、二、三、等） */
  subHeadings: string[];
}

interface ChapterStructure {
  chapter: string;
  sections: SectionInfo[];
}

/* ------------------------------------------------------------------ */
// 参数解析

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

/* ------------------------------------------------------------------ */
// 数据加载

async function loadSourceRaw(bookId: string): Promise<RawBook> {
  const rawPath = getBookDataPath(bookId, 'sourceRaw.ts');
  if (!existsSync(rawPath)) {
    throw new Error(`sourceRaw.ts 不存在: ${rawPath}`);
  }
  const mod = await import(rawPath);
  const data = mod.sourceRaw || mod.default;
  if (!data || !Array.isArray(data.items)) {
    throw new Error('sourceRaw.ts 中没有找到有效数据');
  }
  return data as RawBook;
}

/* ------------------------------------------------------------------ */
// HTML → 纯文本

function htmlToText(html: string): string {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '')
    .replace(/<p\b[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<h[1-6][^>]*>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ------------------------------------------------------------------ */
// 按 Chapter 合并碎片

interface MergedChapter {
  chapter: string;
  html: string;
  text: string;
}

function mergeByChapter(rawBook: RawBook): MergedChapter[] {
  const chapterMap = new Map<string, RawItem[]>();

  for (const item of rawBook.items) {
    const ch = item.chapter.trim() || '正文';
    if (!chapterMap.has(ch)) chapterMap.set(ch, []);
    chapterMap.get(ch)!.push(item);
  }

  const result: MergedChapter[] = [];
  for (const [chapter, items] of chapterMap) {
    // 按 sequence 排序
    items.sort((a, b) => a.sequence.localeCompare(b.sequence));
    // 在每个 item 的 content 前插入 Title 作为标题段落（如果 content 中不包含该标题）
    const htmlParts: string[] = [];
    const seenTitles = new Set<string>();
    for (const item of items) {
      const titleText = item.title.trim();
      // 只对每个 Title 插入一次标题
      if (titleText && !seenTitles.has(titleText)) {
        seenTitles.add(titleText);
        // 检查 content 是否已以该标题开头
        const contentText = item.content.replace(/<[^>]+>/g, '').trim().slice(0, 50);
        if (!contentText.includes(titleText)) {
          htmlParts.push(`<p class="section-title">${titleText}</p>`);
        }
      }
      htmlParts.push(item.content);
    }
    const html = htmlParts.join('\n');
    const text = htmlToText(html);
    result.push({ chapter, html, text });
  }

  return result;
}

/* ------------------------------------------------------------------ */
// LLM 结构识别

function parseStructureResult(raw: string): ChapterStructure[] {
  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json)) return json;
    if (json.chapters && Array.isArray(json.chapters)) return json.chapters;
    return [];
  } catch {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return [];
      }
    }
    // 尝试提取 { chapters: [...] }
    const objMatch = raw.match(/\{[\s\S]*\}/);
    if (objMatch) {
      try {
        const obj = JSON.parse(objMatch[0]);
        return obj.chapters || [];
      } catch {
        return [];
      }
    }
    return [];
  }
}

async function identifyStructure(
  bookName: string,
  chapters: MergedChapter[],
  rawBook: RawBook,
): Promise<ChapterStructure[]> {
  // 过滤掉附录、参考文献等非正文内容
  const mainChapters = chapters.filter(c => {
    const ch = c.chapter;
    return !ch.includes('附录') &&
           !ch.includes('参考文献') &&
           !ch.includes('前言') &&
           c.text.length > 500;
  });

  console.log(`[structure-review] 正文章节: ${mainChapters.length} 个`);

  // 逐章发送给 LLM
  const structures: ChapterStructure[] = [];

  for (const ch of mainChapters) {
    console.log(`[structure-review] 识别结构: ${ch.chapter} (${ch.text.length} 字)`);

    // 收集 JSON 中该章的原始 Title 列表
    const rawTitles = [...new Set(
      rawBook.items
        .filter(i => i.chapter === ch.chapter)
        .map(i => i.title)
    )];

    // 小章节（<15000字）直接用 JSON 原始 Title，不调 LLM
    if (ch.text.length < 15000 && rawTitles.length >= 2) {
      console.log(`[structure-review] ${ch.chapter} 内容较少，直接使用 JSON Title 结构`);
      const sections: SectionInfo[] = [];
      for (const title of rawTitles) {
        // 找到该 Title 对应的第一条记录的内容开头作为 marker
        const firstItem = rawBook.items.find(
          i => i.chapter === ch.chapter && i.title === title
        );
        if (firstItem) {
          const itemText = htmlToText(firstItem.content).slice(0, 100);
          sections.push({
            title,
            startMarker: itemText,
            subHeadings: [],
          });
        }
      }
      if (sections.length > 0) {
        structures.push({ chapter: ch.chapter, sections });
        console.log(`[structure-review] ${ch.chapter} → ${sections.length} 个节 (JSON 直引)`);
      }
      continue;
    }

    const titleList = rawTitles.map((t, i) => `${i + 1}. ${t}`).join('\n');

    // 如果文本太长，截取前 50000 字（DeepSeek 上下文足够）
    const textForLLM = ch.text.length > 50000
      ? ch.text.slice(0, 50000) + '\n\n[... 后续内容省略 ...]'
      : ch.text;

    const prompt = `你是一位教材结构分析专家。以下是《${bookName}》中"${ch.chapter}"的完整纯文本内容。

注意：原始 JSON 数据中该章的 Title 列表如下。但这些 Title 可能不准确——有些节被错误拆分成了多个 Title，有些节被错误合并了。请以内容本身为准，不要照搬这些 Title：
${titleList}

请仔细阅读全文内容，从内容结构本身识别出该章的真实节级结构。

重要规则：
1. 必须识别出所有"节"级标题（第一节、第二节等），不要遗漏
2. "节"级标题通常是"第X节 xxx"格式，或者是没有子编号的大标题（如"急性中毒概况"独立成节）
3. "一、xxx"是节内子标题，不要当作独立的节
4. 学习目标、案例导学等导言内容应归入"导言"部分，不作为独立节
5. 每个节返回：title（节标题）、startMarker（该节开头前 80-120 字的连续原文文本）、subHeadings（该节内的子标题列表）
6. startMarker 必须是原文中实际出现的连续文本，不要修改任何字

输出 JSON 数组（不要 markdown 代码块，不要额外解释）：
[
  {
    "chapter": "${ch.chapter}",
    "sections": [
      {
        "title": "第一节 xxx",
        "startMarker": "该节开头前80-120字的连续原文文本",
        "subHeadings": ["一、xxx", "二、xxx"]
      }
    ]
  }
]

以下是章节内容：
${textForLLM}`;

    const result = await callCoze(
      [{ role: 'user', content: prompt }],
      { timeout: 180_000 },
    );

    if (!result) {
      console.warn(`[structure-review] LLM 未返回结果，跳过: ${ch.chapter}`);
      continue;
    }

    const parsed = parseStructureResult(result);
    if (parsed.length > 0) {
      // 确保每个元素有 chapter 字段
      for (const p of parsed) {
        if (!p.chapter) p.chapter = ch.chapter;
      }
      structures.push(...parsed);
      console.log(`[structure-review] ${ch.chapter} → ${parsed[0]?.sections?.length || 0} 个节`);
    } else {
      console.warn(`[structure-review] 解析失败: ${ch.chapter}`);
    }
  }

  return structures;
}

/* ------------------------------------------------------------------ */
// 用 startMarker 在 HTML 中定位切分点

interface SplitSection {
  title: string;
  html: string;
  subHeadings: string[];
}

function findMarkerInHtml(html: string, marker: string): number {
  if (!marker || marker.length < 10) return -1;

  const normalize = (s: string) => s.replace(/\s+/g, '').replace(/<[^>]+>/g, '');
  const normalizedMarker = normalize(marker).slice(0, 60);
  if (normalizedMarker.length < 10) return -1;

  // 优先：搜索 section-title <p> 标签
  const stRegex = /<p\b[^>]*class="section-title"[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = stRegex.exec(html)) !== null) {
    const titleText = normalize(match[1]);
    // marker 可能是 Title 本身，也可能是该节内容开头
    if (titleText.includes(normalizedMarker) || normalizedMarker.includes(titleText)) {
      return match.index;
    }
  }

  // 次选：在普通 <p> 标签中搜索
  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = pRegex.exec(html)) !== null) {
    const pText = normalize(match[1]);
    if (pText.includes(normalizedMarker) || normalizedMarker.includes(pText)) {
      return match.index;
    }
  }

  // 降级：在完整 HTML 归一化文本中搜索
  const fullNormalized = normalize(html);
  const idx = fullNormalized.indexOf(normalizedMarker);
  if (idx !== -1) {
    // 反向映射回原始 HTML 位置（近似）
    // 找到归一化文本中 idx 对应的原始位置
    let rawIdx = 0;
    let normIdx = 0;
    while (normIdx < idx && rawIdx < html.length) {
      if (/\s/.test(html[rawIdx]) || html[rawIdx] === '<') {
        // 跳过标签
        if (html[rawIdx] === '<') {
          while (rawIdx < html.length && html[rawIdx] !== '>') rawIdx++;
          rawIdx++;
        } else {
          while (rawIdx < html.length && /\s/.test(html[rawIdx])) rawIdx++;
        }
      } else {
        normIdx++;
        rawIdx++;
      }
    }
    // 回退到最近的 <p> 标签开头
    const lastP = html.lastIndexOf('<p', rawIdx);
    if (lastP !== -1 && rawIdx - lastP < 500) return lastP;
    return rawIdx;
  }

  return -1;
}

function splitChapterHtml(
  html: string,
  sections: SectionInfo[],
): SplitSection[] {
  if (sections.length === 0) {
    return [{ title: '全文', html, subHeadings: [] }];
  }

  // 策略1：用 section-title <p> 标签按标题文本切分
  const stRegex = /<p\b[^>]*class="section-title"[^>]*>([\s\S]*?)<\/p>/gi;
  const stMatches: { title: string; start: number }[] = [];
  let stMatch: RegExpExecArray | null;
  while ((stMatch = stRegex.exec(html)) !== null) {
    const titleText = stMatch[1].replace(/<[^>]+>/g, '').trim();
    stMatches.push({ title: titleText, start: stMatch.index });
  }

  if (stMatches.length >= sections.length) {
    // 按 section-title 切分
    const result: SplitSection[] = [];
    for (let i = 0; i < stMatches.length; i++) {
      const start = stMatches[i].start;
      const end = i + 1 < stMatches.length ? stMatches[i + 1].start : html.length;
      const sectionHtml = html.slice(start, end).trim();
      if (sectionHtml.length > 50) {
        result.push({
          title: stMatches[i].title,
          html: sectionHtml,
          subHeadings: [],
        });
      }
    }

    // 如果第一个 section-title 之前有内容，作为导言
    if (stMatches.length > 0 && stMatches[0].start > 100) {
      const intro = html.slice(0, stMatches[0].start).trim();
      if (intro.length > 50) {
        result.unshift({ title: '导言', html: intro, subHeadings: [] });
      }
    }

    if (result.length > 0) {
      console.log(`  → section-title 切分: ${result.length} 段`);
      return result;
    }
  }

  // 策略2：用 LLM 返回的 startMarker 在 HTML 中定位
  const positions: { title: string; start: number; subHeadings: string[] }[] = [];

  for (const sec of sections) {
    const pos = findMarkerInHtml(html, sec.startMarker);
    positions.push({
      title: sec.title,
      start: pos !== -1 ? pos : -1,
      subHeadings: sec.subHeadings || [],
    });
    console.log(`  → ${sec.title}: ${pos !== -1 ? `位置 ${pos}` : '未找到标记'}`);
  }

  // 处理未找到标记的 section：尝试用标题文本搜索
  for (let i = 0; i < positions.length; i++) {
    if (positions[i].start === -1) {
      const titleText = positions[i].title.replace(/^(第[一二三四五六七八九十\d]+节\s*)/, '').trim();
      const titleRegex = new RegExp(
        `<p[^>]*>\\s*${titleText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</p>`,
        'i'
      );
      const match = html.match(titleRegex);
      if (match && match.index !== undefined) {
        positions[i].start = match.index;
        console.log(`  → ${positions[i].title}: 标题匹配位置 ${match.index}`);
      }
    }
  }

  // 按 start 排序，过滤掉仍然未找到的
  const valid = positions.filter(p => p.start !== -1).sort((a, b) => a.start - b.start);

  if (valid.length === 0) {
    console.warn('  → 所有标记均未找到，返回全文');
    return [{ title: '全文', html, subHeadings: [] }];
  }

  // 切分
  const result: SplitSection[] = [];
  for (let i = 0; i < valid.length; i++) {
    const start = valid[i].start;
    const end = i + 1 < valid.length ? valid[i + 1].start : html.length;
    result.push({
      title: valid[i].title,
      html: html.slice(start, end).trim(),
      subHeadings: valid[i].subHeadings,
    });
  }

  // 如果第一个 section 不是从 0 开始，前面的内容作为"导言"
  if (valid[0].start > 100) {
    const intro = html.slice(0, valid[0].start).trim();
    if (intro.length > 50) {
      result.unshift({
        title: '导言',
        html: intro,
        subHeadings: [],
      });
    }
  }

  return result;
}

/* ------------------------------------------------------------------ */
// 二次切分：当 LLM 返回的节太大（>20000字）时，按 "一、" 级子标题再切

function findSubHeadingPositions(html: string): { title: string; start: number }[] {
  const positions: { title: string; start: number }[] = [];
  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (/^[一二三四五六七八九十]+[、.．]\s*.{0,50}$/.test(text) && !text.includes('。')) {
      positions.push({ title: text, start: match.index });
    }
  }
  return positions;
}

function refineSections(sections: SplitSection[]): SplitSection[] {
  const THRESHOLD = 30000; // 超过 3 万字符的 section 尝试二次切分
  const MIN_SUBS = 3; // 至少 3 个子标题才切
  const result: SplitSection[] = [];

  for (const sec of sections) {
    if (sec.html.length < THRESHOLD) {
      result.push(sec);
      continue;
    }

    const subPositions = findSubHeadingPositions(sec.html);
    if (subPositions.length < MIN_SUBS) {
      // 没有足够的子标题，保持原样
      result.push(sec);
      continue;
    }

    console.log(`  → 二次切分: ${sec.title} (${subPositions.length} 个子标题)`);

    // 第一个子标题之前的内容保留为 section 的导言部分
    const firstSubPos = subPositions[0].start;
    if (firstSubPos > 200) {
      const intro = sec.html.slice(0, firstSubPos).trim();
      if (intro.length > 100) {
        result.push({
          title: sec.title + ' · 导言',
          html: intro,
          subHeadings: [],
        });
      }
    }

    // 按子标题切分
    for (let i = 0; i < subPositions.length; i++) {
      const start = subPositions[i].start;
      const end = i + 1 < subPositions.length ? subPositions[i + 1].start : sec.html.length;
      const subHtml = sec.html.slice(start, end).trim();
      if (subHtml.length > 50) {
        result.push({
          title: subPositions[i].title,
          html: subHtml,
          subHeadings: [],
        });
      }
    }
  }

  return result;
}

/* ------------------------------------------------------------------ */
// HTML 标题语义化：将标题性 <p> 替换为 <h2>/<h3>/<h4>

/** 判断一段纯文本是否是标题，返回标题层级（2=节级, 3=一级子标题, 4=二级子标题）或 0 */
function classifyHeading(text: string): number {
  const clean = text.trim();
  if (!clean || clean.length > 80) return 0;

  // 节标题：第X节 xxx
  if (/^第[一二三四五六七八九十\d]+[节章]\s*.{0,40}$/.test(clean)) return 2;

  // 特殊标题关键词（独立成段）
  const specialHeadings = [
    '学习目标', '案例导学', '知识链接', '素质拓展', '考点提示',
    '目标检测', '素质目标', '知识目标', '能力目标',
    '本章小结', '复习思考', '思考题', '案例分析',
    '知识拓展', '临床链接', '护理警示', '护理提示',
    '操作准备', '操作流程', '注意事项', '健康指导',
    '护理评估', '护理诊断', '护理措施', '护理评价',
    '急救流程', '救护原则', '病情评估',
  ];
  if (specialHeadings.includes(clean)) return 3;

  // 一级子标题：一、xxx 二、xxx
  if (/^[一二三四五六七八九十]+[、.．]\s*.{0,50}$/.test(clean) && !clean.includes('。')) return 3;

  // 二级子标题：(一) xxx (二) xxx
  if (/^[（(][一二三四五六七八九十]+[)）]\s*.{0,50}$/.test(clean) && !clean.includes('。')) return 4;

  // 三级子标题：1. xxx 2. xxx（不带句号）
  if (/^\d+[、.．]\s*.{0,50}$/.test(clean) && !clean.includes('。') && !clean.includes('；')) return 4;

  // 三级子标题：(1) xxx (2) xxx
  if (/^[（(]\d+[)）]\s*.{0,50}$/.test(clean) && !clean.includes('。')) return 4;

  return 0;
}

/** 将 HTML 中标题性的 <p> 替换为语义化 <h2>/<h3>/<h4> */
function semanticizeHtml(html: string): string {
  // 先处理 section-title 类的 <p>（来自 JSON Title 注入）
  let result = html.replace(/<p\b[^>]*class="section-title"[^>]*>([\s\S]*?)<\/p>/gi, (fullMatch, inner: string) => {
    return `<h2>${inner.trim()}</h2>`;
  });

  // 再处理其他标题性 <p>
  result = result.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, (fullMatch, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const level = classifyHeading(text);
    if (level === 0) return fullMatch;

    const tag = `h${level}`;
    return `<${tag}>${inner.trim()}</${tag}>`;
  });

  return result;
}

/* ------------------------------------------------------------------ */
// 生成 sourceParsed.ts

function escapeTsString(s: string): string {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

interface ParsedTask {
  id: string;
  title: string;
  rawContent: string;
  rawHtml: string;
  order: number;
}

interface ParsedModule {
  id: string;
  title: string;
  summary: string;
  tasks: ParsedTask[];
}

interface ParsedBookMeta {
  title: string;
  authors: string[];
  publisher: string;
}

function generateSourceParsedTs(
  bookMeta: ParsedBookMeta,
  modules: ParsedModule[],
): string {
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
  bookMeta: ${JSON.stringify(bookMeta, null, 2).replace(/"/g, "'")},
  modules: [
${modules
  .map(
    (mod) => `  {
    id: '${escapeTsString(mod.id)}',
    title: '${escapeTsString(mod.title)}',
    summary: '${escapeTsString(mod.summary || '')}',
    tasks: [
${mod.tasks
  .map(
    (task) => `      {
        id: '${escapeTsString(task.id)}',
        title: '${escapeTsString(task.title)}',
        rawContent: '${escapeTsString(task.rawContent)}',
        rawHtml: '${escapeTsString(task.rawHtml)}',
        order: ${task.order},
      },`,
  )
  .join('\n')}
    ],
  },`,
  )
  .join('\n')}
  ],
};
`;
}

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<void> {
  const { bookId } = parseArgs();
  console.log(`[structure-review] bookId=${bookId}`);

  // 1. 加载原始数据
  const rawBook = await loadSourceRaw(bookId);
  console.log(`[structure-review] 原始数据: ${rawBook.items.length} 条记录`);

  // 2. 按 Chapter 合并碎片
  const mergedChapters = mergeByChapter(rawBook);
  console.log(`[structure-review] 合并后: ${mergedChapters.length} 个 Chapter`);
  for (const ch of mergedChapters) {
    console.log(`  ${ch.chapter}: ${ch.text.length} 字`);
  }

  // 3. LLM 识别结构
  console.log('\n[structure-review] 开始 LLM 结构识别...');
  const structures = await identifyStructure(rawBook.bookName, mergedChapters, rawBook);

  console.log(`\n[structure-review] 识别到 ${structures.length} 个章，共 ${structures.reduce((a, c) => a + (c.sections?.length || 0), 0)} 个节`);

  // 4. 用识别的结构切分 HTML
  console.log('\n[structure-review] 开始切分 HTML...');
  const modules: ParsedModule[] = [];

  let moduleIdx = 0;

  // 先处理前言（如果有）
  const preface = mergedChapters.find(c => c.chapter.includes('前言'));
  if (preface && preface.text.length > 50) {
    moduleIdx++;
    modules.push({
      id: `module${moduleIdx}`,
      title: preface.chapter,
      summary: '',
      tasks: [{
        id: `module${moduleIdx}-task1`,
        title: preface.chapter,
        rawContent: preface.text,
        rawHtml: preface.html,
        order: 1,
      }],
    });
  }

  // 处理正文章节
  for (const struct of structures) {
    moduleIdx++;
    const moduleId = `module${moduleIdx}`;

    // 找到对应的合并 HTML
    const merged = mergedChapters.find(c => c.chapter === struct.chapter);
    if (!merged) {
      console.warn(`[structure-review] 未找到 Chapter 对应的 HTML: ${struct.chapter}`);
      continue;
    }

    console.log(`\n  切分: ${struct.chapter} (${struct.sections?.length || 0} 节)`);

    // 检查是否是跳过 LLM 的小章节（在 identifyStructure 中标记）
    const isJsonDirect = merged.text.length < 15000 && struct.sections.every(s =>
      rawBook.items.some(i =>
        i.chapter === struct.chapter &&
        i.title === s.title
      )
    );

    let splitSections: SplitSection[];

    if (isJsonDirect) {
      // JSON 直引：按原始 item 的 content 直接切分
      console.log(`  → JSON 直引模式`);
      splitSections = [];
      for (const sec of struct.sections) {
        const items = rawBook.items
          .filter(i => i.chapter === struct.chapter && i.title === sec.title)
          .sort((a, b) => a.sequence.localeCompare(b.sequence));
        const html = items.map(i => i.content).join('\n');
        if (html.trim().length > 0) {
          splitSections.push({
            title: sec.title,
            html,
            subHeadings: sec.subHeadings || [],
          });
        }
      }
    } else {
      // LLM 识别：在合并 HTML 中按 marker 切分
      const rawSections = splitChapterHtml(merged.html, struct.sections || []);
      splitSections = refineSections(rawSections);
    }

    const tasks: ParsedTask[] = splitSections.map((sec, i) => {
      const semanticHtml = semanticizeHtml(sec.html);
      return {
        id: `${moduleId}-task${i + 1}`,
        title: sec.title,
        rawContent: htmlToText(sec.html),
        rawHtml: semanticHtml,
        order: i + 1,
      };
    });

    modules.push({
      id: moduleId,
      title: struct.chapter,
      summary: '',
      tasks,
    });

    for (const task of tasks) {
      console.log(`    ${task.id}: ${task.title} (${task.rawHtml.length} chars HTML)`);
    }
  }

  // 处理附录等
  for (const ch of mergedChapters) {
    if (ch.chapter.includes('附录') || ch.chapter.includes('参考文献')) {
      if (ch.text.length < 10) continue;
      moduleIdx++;
      const moduleId = `module${moduleIdx}`;
      modules.push({
        id: moduleId,
        title: ch.chapter,
        summary: '',
        tasks: [{
          id: `${moduleId}-task1`,
          title: ch.chapter,
          rawContent: ch.text,
          rawHtml: ch.html,
          order: 1,
        }],
      });
    }
  }

  // 5. 生成 sourceParsed.ts
  const bookMeta: ParsedBookMeta = {
    title: rawBook.bookName,
    authors: [],
    publisher: '',
  };

  const outputPath = getBookDataPath(bookId, 'sourceParsed.ts');
  const tsContent = generateSourceParsedTs(bookMeta, modules);
  ensureFileDir(outputPath);
  await writeFile(outputPath, tsContent, 'utf-8');

  console.log(`\n[structure-review] 已写入: ${outputPath}`);
  console.log(`[structure-review] 共 ${modules.length} 个模块，${modules.reduce((a, m) => a + m.tasks.length, 0)} 个任务`);

  // 6. 输出结构摘要
  console.log('\n=== 结构摘要 ===');
  for (const mod of modules) {
    console.log(`${mod.id} ${mod.title}`);
    for (const task of mod.tasks) {
      console.log(`  ${task.id} ${task.title} (${task.rawHtml.length} chars)`);
    }
  }
}

main();
