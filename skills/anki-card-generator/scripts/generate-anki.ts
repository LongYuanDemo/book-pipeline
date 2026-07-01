#!/usr/bin/env node
/**
 * anki-card-generator 主脚本（Skills 范式重构版）
 * 从 sourceParsed.ts + chapterContent.ts 加载全书内容，
 * 使用 Coze AI 为每个章节生成闪卡和测验题，LangGraph 并发处理。
 *
 * 业务逻辑（prompt 内容、卡片类型）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、JSON 解析、TS 校验。
 *
 * 用法:
 *   npx tsx skills/anki-card-generator/scripts/generate-anki.ts --book-id eye-ent-nursing [--prompt-file <path>]
 */

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';
import { callCoze } from '../../shared/coze.ts';

/* ------------------------------------------------------------------ */
// 命令行参数解析

function parseArgs(): { bookId: string; promptFile?: string } {
  const args = process.argv.slice(2);
  let bookId = '';
  let promptFile: string | undefined;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--prompt-file' && args[i + 1]) {
      promptFile = args[i + 1];
      i++;
    }
  }
  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    console.error('用法: npx tsx generate-anki.ts --book-id <bookId> [--prompt-file <path>]');
    process.exit(1);
  }
  return { bookId, promptFile };
}

/* ------------------------------------------------------------------ */
// 类型定义

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

interface BookDataShape {
  title: string;
  chapters: Chapter[];
}

export interface Flashcard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  hint?: string;
}

export interface FeynmanCard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
  explanation?: string;
}

export interface AnkiDeck {
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  feynmanCards: FeynmanCard[];
}

/* ------------------------------------------------------------------ */
// 工具函数

function escapeTsString(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/* ------------------------------------------------------------------ */
// 动态导入 bookInfo.ts + sourceParsed.ts + chapterContent.ts

async function loadBookInfo(bookId: string): Promise<BookDataShape> {
  const bookInfoPath = getBookDataPath(bookId, 'bookInfo.ts');
  if (!existsSync(bookInfoPath)) {
    throw new Error(`bookInfo.ts 不存在: ${bookInfoPath}`);
  }
  const mod = await import(bookInfoPath);
  const bookData = mod.bookData || mod.default;
  if (!bookData || !Array.isArray(bookData.chapters)) {
    throw new Error(`bookInfo.ts 中没有找到有效的 bookData.chapters`);
  }
  return bookData as BookDataShape;
}

interface SourceTask {
  id: string;
  title: string;
  rawContent: string;
  order: number;
}

interface SourceModule {
  id: string;
  title: string;
  tasks: SourceTask[];
  summary?: string;
}

interface SourceParsedShape {
  bookMeta: { title: string; authors: string[]; publisher: string };
  modules: SourceModule[];
}

async function loadSourceParsed(bookId: string): Promise<SourceParsedShape | null> {
  const path = getBookDataPath(bookId, 'sourceParsed.ts');
  if (!existsSync(path)) return null;
  const mod = await import(path);
  return (mod.sourceParsed || mod.default) as SourceParsedShape;
}

interface ContentBlock {
  type: string;
  content: string;
  rawContent?: string;
}

interface TaskContent {
  id: string;
  blocks: ContentBlock[];
}

interface ChapterContentShape {
  [taskId: string]: TaskContent;
}

async function loadChapterContent(bookId: string): Promise<ChapterContentShape | null> {
  const path = getBookDataPath(bookId, 'chapterContent.ts');
  if (!existsSync(path)) return null;
  const mod = await import(path);
  return (mod.chapterContent || mod.default) as ChapterContentShape;
}

/* ------------------------------------------------------------------ */
// 为单个章节生成闪卡（Coze AI 驱动）

interface ChapterJob {
  chapter: Chapter;
  chapterText: string;
  promptFile?: string;
}

interface ChapterResult {
  chapterId: string;
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  feynmanCards: FeynmanCard[];
}

async function generateChapterAnki(job: ChapterJob): Promise<ChapterResult> {
  const { chapter, chapterText, promptFile } = job;
  const chapterLabel = `${chapter.section} · ${chapter.title}`;

  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFile && existsSync(promptFile)) {
    promptTemplate = await readFile(promptFile, 'utf-8');
  }

  let prompt: string;
  if (promptTemplate) {
    prompt = promptTemplate
      .replace(/\{\{chapterLabel\}\}/g, chapterLabel)
      .replace(/\{\{chapterText\}\}/g, chapterText.slice(0, 8000));
  } else {
    prompt = buildDefaultAnkiPrompt(chapterLabel, chapterText);
  }

  let flashcards: Flashcard[] = [];
  let quizQuestions: QuizQuestion[] = [];
  let feynmanCards: FeynmanCard[] = [];

  try {
    const response = await callCoze([{ role: 'user', content: prompt }]);
    if (!response) throw new Error('Coze 返回空响应');
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      let fcId = 1;
      let qId = 1;
      const chapterId = chapter.id;

      if (parsed.flashcards && Array.isArray(parsed.flashcards)) {
        flashcards = parsed.flashcards.map((fc: any) => ({
          id: `${chapterId}-f${fcId++}`,
          chapterId,
          chapter: chapterLabel,
          question: String(fc.question || '').slice(0, 500),
          answer: String(fc.answer || '').slice(0, 500),
          keyPoint: String(fc.keyPoint || '').slice(0, 300),
          explanation: fc.explanation ? String(fc.explanation).slice(0, 500) : undefined,
        }));
      }

      if (parsed.quizQuestions && Array.isArray(parsed.quizQuestions)) {
        quizQuestions = parsed.quizQuestions.map((q: any) => ({
          id: `${chapterId}-q${qId++}`,
          chapterId,
          chapter: chapterLabel,
          question: String(q.question || '').slice(0, 500),
          options: Array.isArray(q.options) ? q.options.map((o: any, idx: number) => ({
            id: String.fromCharCode(97 + idx),
            text: String(o.text || '').slice(0, 300),
            correct: !!o.correct,
          })) : [],
          explanation: String(q.explanation || '').slice(0, 500),
          hint: q.hint ? String(q.hint).slice(0, 300) : undefined,
        }));
      }

      if (parsed.feynmanCards && Array.isArray(parsed.feynmanCards)) {
        let fmId = 1;
        feynmanCards = parsed.feynmanCards.map((fc: any) => ({
          id: `${chapterId}-fm${fmId++}`,
          chapterId,
          chapter: chapterLabel,
          question: String(fc.question || '').slice(0, 500),
          answer: String(fc.answer || '').slice(0, 800),
          keyPoint: String(fc.keyPoint || '').slice(0, 300),
          explanation: fc.explanation ? String(fc.explanation).slice(0, 500) : undefined,
        }));
      }
    }
  } catch (err) {
    console.error(`[anki] AI 生成失败 (${chapter.id}): ${err}`);
  }

  // Fallback: 如果 AI 没生成足够卡片，用规则补充
  if (flashcards.length < 5) {
    const fallbackCards = generateFallbackCards(chapter, chapterText);
    flashcards = [...flashcards, ...fallbackCards];
  }
  if (quizQuestions.length < 1) {
    quizQuestions.push(generateFallbackQuiz(chapter));
  }
  if (feynmanCards.length < 1) {
    // 从闪卡中精选最多3张，改写为开放性复述题目
    feynmanCards = flashcards.slice(0, 3).map((fc, i) => ({
      id: `${chapter.id}-fm${i + 1}`,
      chapterId: fc.chapterId,
      chapter: fc.chapter,
      question: `请用自己的话完整解释：${fc.question}`,
      answer: fc.answer,
      keyPoint: fc.keyPoint,
      explanation: fc.explanation,
    }));
  }

  console.log(`[anki] ${chapter.id} → ${flashcards.length} 张闪卡, ${quizQuestions.length} 道测验题, ${feynmanCards.length} 张费曼卡片`);

  return { chapterId: chapter.id, flashcards, quizQuestions, feynmanCards };
}

function generateFallbackCards(chapter: Chapter, text: string): Flashcard[] {
  const cards: Flashcard[] = [];
  const chapterLabel = `${chapter.section} · ${chapter.title}`;
  // 从文本中提取关键句子作为闪卡
  const sentences = text.split(/[。；;\n]/).filter(s => s.trim().length > 10);
  const seen = new Set<string>();
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length < 15 || trimmed.length > 200) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    cards.push({
      id: `${chapter.id}-f-fb${cards.length + 1}`,
      chapterId: chapter.id,
      chapter: chapterLabel,
      question: `根据"${chapter.title}"，以下知识点的含义是什么？`,
      answer: trimmed,
      keyPoint: trimmed.slice(0, 80),
    });
    if (cards.length >= 10) break;
  }
  return cards;
}

function generateFallbackQuiz(chapter: Chapter): QuizQuestion {
  const chapterLabel = `${chapter.section} · ${chapter.title}`;
  return {
    id: `${chapter.id}-q-fb1`,
    chapterId: chapter.id,
    chapter: chapterLabel,
    question: `以下哪项属于"${chapter.title}"的内容？`,
    options: [
      { id: 'a', text: chapter.subSections[0]?.title || '正确选项', correct: true },
      { id: 'b', text: '其他章节内容', correct: false },
      { id: 'c', text: '无关内容', correct: false },
      { id: 'd', text: '不属于本章的内容', correct: false },
    ],
    explanation: `${chapter.subSections[0]?.title || '本章内容'}属于${chapterLabel}。`,
  };
}

/* ------------------------------------------------------------------ */
// 并发处理（直接 Promise.all，不依赖 LangGraph task API）

/* ------------------------------------------------------------------ */
// TS 文件生成

function generateAnkiTs(deck: AnkiDeck): string {
  return `export interface Flashcard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  hint?: string;
}

export interface FeynmanCard {
  id: string;
  chapterId: string;
  chapter: string;
  question: string;
  answer: string;
  keyPoint: string;
  explanation?: string;
}

export interface AnkiDeck {
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  feynmanCards: FeynmanCard[];
}

export const ankiDeck: AnkiDeck = {
  flashcards: [
${deck.flashcards.map((f) => flashcardToString(f)).join(',\n')}
  ],
  quizQuestions: [
${deck.quizQuestions.map((q) => quizToString(q)).join(',\n')}
  ],
  feynmanCards: [
${deck.feynmanCards.map((f) => feynmanCardToString(f)).join(',\n')}
  ],
};
`;
}

function flashcardToString(f: Flashcard): string {
  const lines = [
    `    {`,
    `      id: '${f.id}',`,
    `      chapterId: '${f.chapterId}',`,
    `      chapter: '${escapeTsString(f.chapter)}',`,
    `      question: '${escapeTsString(f.question)}',`,
    `      answer: '${escapeTsString(f.answer)}',`,
    `      keyPoint: '${escapeTsString(f.keyPoint)}',`,
  ];
  if (f.explanation) {
    lines.push(`      explanation: '${escapeTsString(f.explanation)}',`);
  }
  lines.push(`    }`);
  return lines.join('\n');
}

function feynmanCardToString(f: FeynmanCard): string {
  const lines = [
    `    {`,
    `      id: '${f.id}',`,
    `      chapterId: '${f.chapterId}',`,
    `      chapter: '${escapeTsString(f.chapter)}',`,
    `      question: '${escapeTsString(f.question)}',`,
    `      answer: '${escapeTsString(f.answer)}',`,
    `      keyPoint: '${escapeTsString(f.keyPoint)}',`,
  ];
  if (f.explanation) {
    lines.push(`      explanation: '${escapeTsString(f.explanation)}',`);
  }
  lines.push(`    }`);
  return lines.join('\n');
}

function quizToString(q: QuizQuestion): string {
  const lines = [
    `    {`,
    `      id: '${q.id}',`,
    `      chapterId: '${q.chapterId}',`,
    `      chapter: '${escapeTsString(q.chapter)}',`,
    `      question: '${escapeTsString(q.question)}',`,
    `      options: [`,
    ...q.options.map(
      (o) =>
        `        { id: '${o.id}', text: '${escapeTsString(o.text)}', correct: ${o.correct} },`,
    ),
    `      ],`,
    `      explanation: '${escapeTsString(q.explanation)}',`,
  ];
  if (q.hint) {
    lines.push(`      hint: '${escapeTsString(q.hint)}',`);
  }
  lines.push(`    }`);
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
// Fallback prompt 构建

function buildDefaultAnkiPrompt(chapterLabel: string, chapterText: string): string {
  return `你是一位教育专家，请根据以下教材章节内容，生成闪卡、测验题和费曼复述核心卡片。

章节标题：${chapterLabel}
章节内容：
${chapterText.slice(0, 8000)}

请生成以下内容，以 JSON 格式返回：

{
  "flashcards": [
    {
      "question": "问题（简明扼要，针对该章节的核心知识点）",
      "answer": "答案（简洁准确）",
      "keyPoint": "关键要点（一句话总结）",
      "explanation": "详细解释（可选，帮助理解）"
    }
  ],
  "quizQuestions": [
    {
      "question": "选择题题干",
      "options": [
        {"text": "选项A", "correct": false},
        {"text": "选项B", "correct": true},
        {"text": "选项C", "correct": false},
        {"text": "选项D", "correct": false}
      ],
      "explanation": "答案解析",
      "hint": "答题提示（可选）"
    }
  ],
  "feynmanCards": [
    {
      "question": "复述题目（该章节最核心的论点或概念，要求学生用自己的话完整解释）",
      "answer": "参考答案（完整的论述，2-4句话）",
      "keyPoint": "关键要点（复述时必须涵盖的核心要素，用逗号分隔）",
      "explanation": "深度解释（可选，帮助学生理解为什么这个知识点重要）"
    }
  ]
}

要求：
1. 闪卡数量：20-30张，覆盖该章节的重要知识点
2. 测验题数量：5-8道四选一选择题
3. 费曼复述卡片数量：每章仅3-5张，精选该章节最核心、最值得复述的知识点
4. 费曼复述卡片的问题应是开放性的，要求学生用自己的话解释，而非简单问答
5. 费曼复述卡片的参考答案应是完整的论述，而非简短答案
6. 闪卡问题应涵盖：定义、分类、特征、操作要点、注意事项等
7. 测验题的干扰项要有迷惑性，不能太明显
8. 所有内容必须基于章节原文，不要编造
9. 返回纯JSON，不要有其他文字`;
}

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<SkillResult<void>> {
  const { bookId, promptFile } = parseArgs();
  console.log(`[anki-card-generator] bookId=${bookId}, concurrency=5`);

  // 1. 加载 bookInfo
  const bookInfo = await loadBookInfo(bookId);
  console.log(`[anki-card-generator] 书名: ${bookInfo.title}`);
  console.log(`[anki-card-generator] 共 ${bookInfo.chapters.length} 个章节`);

  // 2. 加载 sourceParsed + chapterContent 获取全文
  const sourceParsed = await loadSourceParsed(bookId);
  const chapterContent = await loadChapterContent(bookId);

  // 3. 为每个章节构建文本
  const jobs: ChapterJob[] = [];
  for (const chapter of bookInfo.chapters) {
    let chapterText = '';

    // 从 sourceParsed 获取原始内容
    if (sourceParsed) {
      // 优先通过 sourceModuleId 查找 module
      const mod = sourceParsed.modules.find(m => m.id === chapter.sourceModuleId);
      if (mod) {
        chapterText = mod.tasks.map(t => t.rawContent).join('\n\n');
      } else {
        // 降级：通过标题匹配
        const modByTitle = sourceParsed.modules.find(m =>
          m.title.includes(chapter.title) || chapter.title.includes(m.title)
        );
        if (modByTitle) {
          chapterText = modByTitle.tasks.map(t => t.rawContent).join('\n\n');
        }
      }
    }

    // 如果没有 sourceParsed，从 chapterContent 获取
    if (!chapterText && chapterContent) {
      const blocks: string[] = [];
      for (const sub of chapter.subSections) {
        const tc = chapterContent[sub.id];
        if (tc && tc.blocks) {
          for (const b of tc.blocks) {
            blocks.push(b.content || b.rawContent || '');
          }
        }
      }
      chapterText = blocks.join('\n\n');
    }

    jobs.push({ chapter, chapterText, promptFile });
  }

  console.log(`[anki-card-generator] 共 ${jobs.length} 个章节，开始并发处理...`);

  // 4. LangGraph 并发处理
  const CONCURRENCY = 5;
  const allFlashcards: Flashcard[] = [];
  const allQuizQuestions: QuizQuestion[] = [];
  const allFeynmanCards: FeynmanCard[] = [];

  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    const batch = jobs.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(job => generateChapterAnki(job)),
    );
    for (const r of results) {
      allFlashcards.push(...r.flashcards);
      allQuizQuestions.push(...r.quizQuestions);
      allFeynmanCards.push(...r.feynmanCards);
    }
  }

  console.log(`[anki-card-generator] 共生成 ${allFlashcards.length} 张闪卡，${allQuizQuestions.length} 道测验题，${allFeynmanCards.length} 张费曼卡片`);

  // 5. 写入 TS 文件
  const deck: AnkiDeck = { flashcards: allFlashcards, quizQuestions: allQuizQuestions, feynmanCards: allFeynmanCards };
  const outputPath = getBookDataPath(bookId, 'anki.ts');
  ensureFileDir(outputPath);
  const tsContent = generateAnkiTs(deck);
  await writeFile(outputPath, tsContent, 'utf-8');
  console.log(`[anki-card-generator] 已写入: ${outputPath}`);

  // 6. 校验
  console.log('[anki-card-generator] 正在校验生成的 TS 文件...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[anki-card-generator] 校验通过');
  } else {
    console.error('[anki-card-generator] 校验失败:');
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
