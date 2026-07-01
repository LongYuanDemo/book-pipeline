#!/usr/bin/env node
/**
 * video-keyframe-extractor 数据生成脚本
 * 从 bookInfo.ts + chapterContent.ts 自动生成 books/{bookId}/data/video.ts
 *
 * 当前为数据骨架生成，不含真实视频文件与关键帧图片。
 * 视频素材需后续按 SKILL.md 流程人工或自动补充。
 *
 * 用法:
 *   npx tsx skills/video-keyframe-extractor/scripts/generate-video-data.ts \
 *     --book-id <bookId>
 */

import { existsSync, readdirSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import {
  ensureFileDir,
  getBookDataPath,
  getBookAssetsPath,
} from '../../shared/paths.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { SkillResult } from '../../shared/types.ts';

/* ------------------------------------------------------------------ */
// 命令行参数解析

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
}

interface BookDataShape {
  title: string;
  chapters: Chapter[];
}

interface ContentBlock {
  type: string;
  items?: string[];
}

interface TaskContent {
  taskId: string;
  title: string;
  module: string;
  blocks: ContentBlock[];
}

interface ChapterContentShape {
  chapterContents: Record<string, TaskContent>;
}

interface VideoStep {
  id: string;
  title: string;
  timestamp: string;
  imageUrl: string;
  description: string;
  tips?: string;
}

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: '简单' | '中等' | '困难';
  module: string;
  steps: VideoStep[];
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
    .replace(/\\u2028/g, '\\u2028')
    .replace(/\\u2029/g, '\\u2029');
}

function extractTaskName(subTitle: string): string {
  return subTitle.replace(/^任务[一二三四五六七八九十\d]+[\s、,.]*/, '').trim();
}

function secondsToTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function inferDifficulty(title: string): '简单' | '中等' | '困难' {
  const t = title.toLowerCase();
  if (t.includes('汤') || t.includes('白灼') || t.includes('蒸')) return '简单';
  if (t.includes('炸') || t.includes('焖') || t.includes('扒') || t.includes('煎')) return '中等';
  if (t.includes('炒')) return '中等';
  return '中等';
}

/* ------------------------------------------------------------------ */
// 步骤提取

async function loadChapterContents(bookId: string): Promise<ChapterContentShape | null> {
  const path = getBookDataPath(bookId, 'chapterContent.ts');
  if (!existsSync(path)) return null;

  try {
    const mod = await import(path);
    return { chapterContents: mod.chapterContents || mod.default };
  } catch {
    return null;
  }
}

function getStepsForChapter(
  chapter: Chapter,
  chapterContents: Record<string, TaskContent>,
): { title: string; description: string; tips?: string }[] {
  const results: { title: string; description: string; tips?: string }[] = [];

  for (const sub of chapter.subSections) {
    const content = chapterContents[sub.id];
    if (!content) continue;

    for (const block of content.blocks) {
      if (block.type === 'steps' && block.items && block.items.length > 0) {
        for (const item of block.items) {
          results.push({
            title: extractTaskName(sub.title),
            description: item,
          });
        }
      }
      if (block.type === 'tips' && block.items && block.items.length > 0) {
        // 把要点附加到最后一个步骤
        if (results.length > 0) {
          const last = results[results.length - 1];
          if (!last.tips) {
            last.tips = block.items[0];
          }
        }
      }
    }
  }

  return results;
}

/* ------------------------------------------------------------------ */
// 视频生成

function generateVideoItem(
  chapter: Chapter,
  index: number,
  chapterContents: Record<string, TaskContent>,
): VideoItem {
  const videoId = `v${index + 1}`;
  const taskSteps = getStepsForChapter(chapter, chapterContents);

  const steps: VideoStep[] = taskSteps.slice(0, 8).map((s, i) => ({
    id: `s${i + 1}`,
    title: s.title,
    timestamp: secondsToTimestamp(i * 60),
    imageUrl: `/video-frames/${videoId}/step${String(i + 1).padStart(2, '0')}.jpg`,
    description: s.description,
    tips: s.tips,
  }));

  // 兜底：如果解析不到步骤，用任务名生成
  if (steps.length === 0) {
    for (let i = 0; i < Math.min(chapter.subSections.length, 5); i++) {
      const sub = chapter.subSections[i];
      steps.push({
        id: `s${i + 1}`,
        title: extractTaskName(sub.title),
        timestamp: secondsToTimestamp(i * 60),
        imageUrl: `/video-frames/${videoId}/step${String(i + 1).padStart(2, '0')}.jpg`,
        description: `${sub.title}的操作要点与注意事项。`,
      });
    }
  }

  return {
    id: videoId,
    title: `${chapter.title}微课`,
    subtitle: `${chapter.section}教学视频 · ${steps.length} 个步骤拆解`,
    videoUrl: `/videos/${videoId}.mp4`,
    thumbnailUrl: `/video-frames/${videoId}/thumbnail.jpg`,
    duration: secondsToTimestamp(steps.length * 60 + 30),
    difficulty: inferDifficulty(chapter.title),
    module: `${chapter.section} · ${chapter.title}`,
    steps,
  };
}

function generateVideos(
  chapters: Chapter[],
  chapterContents: Record<string, TaskContent>,
): VideoItem[] {
  return chapters.map((ch, i) => generateVideoItem(ch, i, chapterContents));
}

/* ------------------------------------------------------------------ */
// TS 文件生成

function generateVideoTs(videos: VideoItem[]): string {
  return `export interface VideoStep {
  id: string;
  title: string;
  timestamp: string;
  imageUrl: string;
  description: string;
  tips?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: '简单' | '中等' | '困难';
  module: string;
  steps: VideoStep[];
}

export const videoList: VideoItem[] = [
${videos.map((v) => videoToString(v)).join(',\n')}
];
`;
}

function videoToString(v: VideoItem): string {
  const stepsStr = v.steps
    .map(
      (s) =>
        `      { id: '${s.id}', title: '${escapeTsString(s.title)}', timestamp: '${s.timestamp}', imageUrl: '${escapeTsString(s.imageUrl)}', description: '${escapeTsString(s.description)}'${s.tips ? `, tips: '${escapeTsString(s.tips)}'` : ''} }`,
    )
    .join(',\n');

  return `  {
    id: '${v.id}',
    title: '${escapeTsString(v.title)}',
    subtitle: '${escapeTsString(v.subtitle)}',
    videoUrl: '${escapeTsString(v.videoUrl)}',
    thumbnailUrl: '${escapeTsString(v.thumbnailUrl)}',
    duration: '${v.duration}',
    difficulty: '${v.difficulty}',
    module: '${escapeTsString(v.module)}',
    steps: [
${stepsStr}
    ],
  }`;
}

/* ------------------------------------------------------------------ */
// 动态导入 bookInfo.ts

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

/* ------------------------------------------------------------------ */
// 视频文件检测

function hasRealVideos(bookId: string): boolean {
  const videoDir = `${getBookAssetsPath(bookId)}/video`;
  if (!existsSync(videoDir)) return false;
  try {
    const files = readdirSync(videoDir);
    return files.some((f) => /\.(mp4|avi|mov|webm)$/i.test(f));
  } catch {
    return false;
  }
}

/** 更新 bookInfo.ts 中的 MODULES.video 配置 */
async function updateBookInfoVideoFlag(bookId: string, hasVideos: boolean): Promise<void> {
  const bookInfoPath = getBookDataPath(bookId, 'bookInfo.ts');
  if (!existsSync(bookInfoPath)) return;

  let content = await readFile(bookInfoPath, 'utf-8');
  const oldFlag = hasVideos ? 'false' : 'true';
  const newFlag = hasVideos ? 'true' : 'false';
  content = content.replace(
    new RegExp(`(video:\\s*)${oldFlag}`, 'g'),
    `$1${newFlag}`,
  );
  await writeFile(bookInfoPath, content, 'utf-8');
  console.log(`[video-keyframe-extractor] 已更新 bookInfo.ts: MODULES.video = ${newFlag}`);
}

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<SkillResult<void>> {
  const { bookId } = parseArgs();
  console.log(`[video-keyframe-extractor] bookId=${bookId}`);

  const bookInfo = await loadBookInfo(bookId);
  console.log(`[video-keyframe-extractor] 书名: ${bookInfo.title}`);

  const realVideos = hasRealVideos(bookId);
  console.log(`[video-keyframe-extractor] 真实视频文件: ${realVideos ? '存在' : '不存在'}`);

  const chapterContentData = await loadChapterContents(bookId);
  const chapterContents = chapterContentData?.chapterContents || {};
  console.log(
    `[video-keyframe-extractor] 加载到 ${Object.keys(chapterContents).length} 个任务内容`,
  );

  const videos = realVideos ? generateVideos(bookInfo.chapters, chapterContents) : [];

  const outputPath = getBookDataPath(bookId, 'video.ts');
  ensureFileDir(outputPath);

  const tsContent = generateVideoTs(videos);
  await writeFile(outputPath, tsContent, 'utf-8');
  console.log(`[video-keyframe-extractor] 已写入: ${outputPath}`);
  console.log(`[video-keyframe-extractor] 共生成 ${videos.length} 个视频清单`);

  // 更新 bookInfo.ts 中的 MODULES.video 标志
  await updateBookInfoVideoFlag(bookId, realVideos);

  // 自动校验
  console.log('[video-keyframe-extractor] 正在校验生成的 TS 文件...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[video-keyframe-extractor] 校验通过');
  } else {
    console.error('[video-keyframe-extractor] 校验失败:');
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
