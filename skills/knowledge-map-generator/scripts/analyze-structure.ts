#!/usr/bin/env node
/**
 * Step 1: Structure Analysis (= shiji-kb SKILL_02)
 *
 * Loads bookInfo.ts + chapterContent.ts, detects visualization paradigm.
 * Exports analyzeStructure() for the orchestrator.
 *
 * Output: StructureAnalysisResult { bookInfo, chapterContent, paradigm, rationale }
 */

import { existsSync } from 'fs';
import { getBookDataPath } from '../../shared/paths.ts';
import type {
  BookDataShape,
  ChapterContentShape,
  Paradigm,
  StructureAnalysisResult,
} from './types.ts';

const ADAPTATION_KEYWORDS = [
  '翻译', '译本', '改编', '改写', '影视', '电影', '戏曲', '跨文化', '越境', '跨界',
  '文本旅行', '重写',
];
const MEDICAL_KEYWORDS = ['护理', '临床', '诊断', '治疗', '症状', '病理', '解剖', '药物', '手术', '患者', '医学', '护理学'];
const METRO_KEYWORDS = ['历史', '朝代', '年代', '时期', '史记', '年表', '世纪'];
const PROCESS_KEYWORDS = ['步骤', '工序', '操作', '实验', '流程', '制作', '烹饪', '技法'];
const SPATIAL_KEYWORDS = ['地理', '地图', '区域', '城市', '迁徙', '旅行', '建筑'];

function countKeywords(text: string, keywords: string[]): number {
  let count = 0;
  for (const kw of keywords) {
    const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = text.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}

function detectParadigm(
  bookInfo: BookDataShape,
  chapterContent: ChapterContentShape,
): { paradigm: Paradigm; rationale: string } {
  const chapters = bookInfo.chapters;
  const sampleTexts: string[] = [];

  for (const ch of chapters) {
    sampleTexts.push(ch.title, ch.summary);
    for (const sub of ch.subSections) {
      sampleTexts.push(sub.title);
      const content = chapterContent.chapterContents[sub.id];
      if (content) {
        for (const block of content.blocks) {
          if (block.content) sampleTexts.push(block.content);
          if (block.callout?.body) sampleTexts.push(block.callout.body);
          if (block.callout?.brief?.claim) sampleTexts.push(block.callout.brief.claim);
          if (block.quiz?.explanation) sampleTexts.push(block.quiz.explanation);
        }
      }
    }
  }

  const fullText = sampleTexts.join(' ');
  const chapterCount = Math.max(chapters.length, 1);

  const adaptationScore = countKeywords(fullText, ADAPTATION_KEYWORDS) / chapterCount;
  const metroScore = countKeywords(fullText, METRO_KEYWORDS) / chapterCount;
  const processScore = countKeywords(fullText, PROCESS_KEYWORDS) / chapterCount;
  const spatialScore = countKeywords(fullText, SPATIAL_KEYWORDS) / chapterCount;
  const medicalScore = countKeywords(fullText, MEDICAL_KEYWORDS) / chapterCount;

  if (medicalScore > 0.5) {
    if (processScore > 0.4) {
      return {
        paradigm: 'process-flow',
        rationale: `医学/护理关键词密度 ${medicalScore.toFixed(2)}，流程/操作关键词密度 ${processScore.toFixed(2)}，判定为医学实训类教材，使用 process-flow 布局。`,
      };
    }
    return {
      paradigm: 'radial',
      rationale: `医学/护理关键词密度 ${medicalScore.toFixed(2)}，判定为医学教材，使用 radial 布局。`,
    };
  }

  const titleLower = bookInfo.title.toLowerCase();
  if (titleLower.includes('越境') || titleLower.includes('跨界') || titleLower.includes('改编') || titleLower.includes('翻译')) {
    return {
      paradigm: 'adaptation-flow',
      rationale: `书名《${bookInfo.title}》含越境/跨界/改编/翻译强信号，且改编关键词密度 ${adaptationScore.toFixed(2)}。`,
    };
  }

  if (adaptationScore > 0.5) {
    return {
      paradigm: 'adaptation-flow',
      rationale: `改编关键词密度 ${adaptationScore.toFixed(2)}，判定为跨媒介/跨文化改编研究。`,
    };
  }

  if (metroScore > 0.4) {
    return {
      paradigm: 'metro',
      rationale: `时间/历史关键词密度 ${metroScore.toFixed(2)}，判定为历史/文学史类。`,
    };
  }

  if (processScore > 0.4) {
    return {
      paradigm: 'process-flow',
      rationale: `流程/操作关键词密度 ${processScore.toFixed(2)}，判定为工艺流程类。`,
    };
  }

  if (spatialScore > 0.4) {
    return {
      paradigm: 'spatial-map',
      rationale: `地理/空间关键词密度 ${spatialScore.toFixed(2)}，判定为空间地图类。`,
    };
  }

  return {
    paradigm: 'radial',
    rationale: '未命中特定范式信号，使用默认 radial 布局。',
  };
}

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

async function loadChapterContent(bookId: string): Promise<ChapterContentShape> {
  const path = getBookDataPath(bookId, 'chapterContent.ts');
  if (!existsSync(path)) {
    return { chapterContents: {} };
  }
  const mod = await import(path);
  const contents = mod.chapterContents || mod.default;
  if (!contents || typeof contents !== 'object') {
    return { chapterContents: {} };
  }
  return { chapterContents: contents };
}

export async function analyzeStructure(bookId: string): Promise<StructureAnalysisResult> {
  const bookInfo = await loadBookInfo(bookId);
  const chapterContent = await loadChapterContent(bookId);
  const { paradigm, rationale } = detectParadigm(bookInfo, chapterContent);
  return { bookInfo, chapterContent, paradigm, rationale };
}
