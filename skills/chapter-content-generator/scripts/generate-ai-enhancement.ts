#!/usr/bin/env node
/**
 * AI 增强独立生成脚本
 * 从 sourceParsed.ts 读取 rawHtml，为每个 task 生成 AI 增强数据
 * 输出 aiEnhancement.ts — 独立于原文，前端按 heading 关联渲染
 *
 * 用法:
 *   npx tsx skills/chapter-content-generator/scripts/generate-ai-enhancement.ts \
 *     --book-id critical-care-nursing [--chapter ch1]
 */

import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
  ensureFileDir,
  getBookDataPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { callCoze } from '../../shared/coze.ts';
import { evaluateEnhancementFile } from './enhancement-gate.ts';

/* ------------------------------------------------------------------ */
// 类型定义

export interface AIEnhancementItem {
  headingHint: string;
  callout: {
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

export interface TaskEnhancement {
  taskId: string;
  title: string;
  intro: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  sections: AIEnhancementItem[];
  outro: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  outroQuiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

/* ------------------------------------------------------------------ */
// 参数解析

function parseArgs(): { bookId: string; chapterFilter: string | null; strict: boolean } {
  const args = process.argv.slice(2);
  let bookId = '';
  let chapterFilter: string | null = null;
  let strict = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--chapter' && args[i + 1]) {
      chapterFilter = args[i + 1];
      i++;
    } else if (args[i] === '--strict') {
      strict = true;
    }
  }

  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    process.exit(1);
  }

  return { bookId, chapterFilter, strict };
}

/* ------------------------------------------------------------------ */
// 数据加载

interface BookInfoChapter {
  id: string;
  title: string;
  section: string;
  subSections: { id: string; title: string }[];
  sourceModuleId?: string;
}

async function loadBookInfoChapters(bookId: string): Promise<BookInfoChapter[]> {
  const bookInfoPath = getBookDataPath(bookId, 'bookInfo.ts');
  if (!existsSync(bookInfoPath)) {
    throw new Error(`bookInfo.ts 不存在: ${bookInfoPath}`);
  }
  const mod = await import(bookInfoPath);
  const bookData = mod.bookData || mod.default;
  if (!bookData || !Array.isArray(bookData.chapters)) {
    throw new Error('bookInfo.ts 中没有找到有效的 bookData.chapters');
  }
  return bookData.chapters as BookInfoChapter[];
}

interface SourceParsedTask {
  id: string;
  title: string;
  rawHtml?: string;
  rawContent: string;
}

interface SourceParsedData {
  modules: { id: string; title: string; tasks: SourceParsedTask[] }[];
}

async function loadSourceParsed(bookId: string): Promise<SourceParsedData | null> {
  const sourceParsedPath = getBookDataPath(bookId, 'sourceParsed.ts');
  if (!existsSync(sourceParsedPath)) {
    console.warn('[ai-enhancement] sourceParsed.ts 不存在');
    return null;
  }
  try {
    const mod = await import(sourceParsedPath);
    const data = mod.sourceParsed || mod.default;
    if (data && Array.isArray(data.modules)) return data as SourceParsedData;
    return null;
  } catch (err) {
    console.warn(`[ai-enhancement] 加载 sourceParsed.ts 失败: ${err}`);
    return null;
  }
}

/* ------------------------------------------------------------------ */
// 从 rawHtml 提取伪标题

function extractHeadingsFromHtml(html: string): string[] {
  const headings: string[] = [];
  const titleKeywords = [
    '学习目标', '案例导学', '知识链接', '素质拓展', '考点提示',
    '目标检测', '素质目标', '知识目标', '能力目标',
    '本章小结', '复习思考', '思考题', '案例分析',
    '知识拓展', '临床链接', '护理警示', '护理提示',
  ];

  // 按 <p> 标签提取文本
  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (!text || text.length > 60) continue;

    if (titleKeywords.some(kw => text.startsWith(kw) || text === kw)) {
      headings.push(text);
      continue;
    }
    if (/^[一二三四五六七八九十]+[、.．]\s*.{0,40}$/.test(text)) {
      headings.push(text);
      continue;
    }
    if (/^[（(][一二三四五六七八九十]+[)）]\s*.{0,40}$/.test(text)) {
      headings.push(text);
      continue;
    }
    if (/^\d+[、.．]\s*.{0,40}$/.test(text) && !text.includes('。')) {
      headings.push(text);
      continue;
    }
    if (/^[（(]\d+[)）]\s*.{0,40}$/.test(text) && !text.includes('。')) {
      headings.push(text);
      continue;
    }
  }

  return headings.slice(0, 10);
}

/* ------------------------------------------------------------------ */
// AI 增强生成

function parseEnhancementResult(raw: string): Partial<TaskEnhancement> {
  try {
    const json = JSON.parse(raw);
    return json;
  } catch {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return {};
      }
    }
    return {};
  }
}

async function generateTaskEnhancement(
  taskId: string,
  taskTitle: string,
  moduleTitle: string,
  rawHtml: string,
  headings: string[],
): Promise<TaskEnhancement> {
  const contentPreview = rawHtml.slice(0, 6000);
  const headingList = headings.map((h, i) => `${i + 1}. ${h}`).join('\n');

  const prompt = `你是一位教材内容增强专家。请为以下教材任务生成 AI 增强内容。

模块：${moduleTitle}
任务：${taskTitle}
原文内容（节选）：
${contentPreview}

该任务包含以下子标题：
${headingList}

请输出以下 JSON（不要 markdown 代码块，不要额外解释）：
{
  "intro": {
    "variant": "tip",
    "title": "本节导读",
    "body": "2-3句概述本节核心要点和学习路径"
  },
  "sections": [
    {
      "headingHint": "子标题文本片段",
      "callout": {
        "variant": "info",
        "title": "<用一个概括该段要点的具体标题，禁止统一写'AI 学习提示'>",
        "body": "针对该子标题内容的2-3句学习建议"
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
    "variant": "culture",
    "title": "知识拓展",
    "body": "1-2句跨章节或临床实践的拓展提示"
  },
  "outroQuiz": {
    "question": "综合本节内容的选择题",
    "options": ["正确选项", "错误选项1", "错误选项2", "错误选项3"],
    "answer": 0,
    "explanation": "为什么正确选项是对的"
  }
}

要求：
1. sections数组：为每个重要子标题生成一个增强项，至少2个，最多5个
2. headingHint必须是原文中实际出现的标题文本片段
3. callout和quiz都必须基于原文实际内容，不能编造
4. callout的variant必须根据内容选择：知识概念用"info"，操作要点用"tip"，背景文化用"culture"，注意事项/易错点/安全风险用"warning"
5. 【硬性要求】本任务必须至少包含 1 个 "warning" 类型 callout，标注该内容的易错点/安全风险/常见误解——这是安全相关学科的强制项，不得省略
6. 【硬性要求】每个 callout 的 title 必须是能概括该段具体内容的短语（如"院前急救的黄金时间""气道梗阻的识别"），禁止所有 callout 统一使用"AI 学习提示""知识拓展"等通用套话；同一任务内标题不得重复
7. quiz的4个选项要有区分度
8. answer是正确选项的索引（0-3）
9. 直接输出JSON，不要任何其他文字`;

  const result = await callCoze([{ role: 'user', content: prompt }]);
  if (!result) {
    return {
      taskId,
      title: taskTitle,
      intro: { variant: 'tip', title: '本节导读', body: '本节内容待AI增强。' },
      sections: [],
      outro: { variant: 'culture', title: '知识拓展', body: '暂无拓展内容。' },
    };
  }

  const parsed = parseEnhancementResult(result);
  return {
    taskId,
    title: taskTitle,
    intro: parsed.intro || { variant: 'tip', title: '本节导读', body: '本节内容待AI增强。' },
    sections: Array.isArray(parsed.sections) ? parsed.sections.filter((s: any) => s.headingHint && s.callout) : [],
    outro: parsed.outro || { variant: 'culture', title: '知识拓展', body: '暂无拓展内容。' },
    outroQuiz: parsed.outroQuiz,
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
// TS 文件生成

function escapeTsString(s: string | undefined | null): string {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

function generateAiEnhancementTs(
  enhancements: Record<string, TaskEnhancement>,
): string {
  const entries = Object.entries(enhancements);

  return `export interface AIEnhancementItem {
  headingHint: string;
  callout: {
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

export interface TaskEnhancement {
  taskId: string;
  title: string;
  intro: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  sections: AIEnhancementItem[];
  outro: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  outroQuiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

export const aiEnhancements: Record<string, TaskEnhancement> = {
${entries
  .map(
    ([key, enh]) => `  '${key}': {
    taskId: '${escapeTsString(enh.taskId)}',
    title: '${escapeTsString(enh.title)}',
    intro: {
      variant: '${enh.intro.variant}',
      title: '${escapeTsString(enh.intro.title)}',
      body: '${escapeTsString(enh.intro.body)}',
    },
    sections: [
${enh.sections
  .map(
    (s) => `      {
        headingHint: '${escapeTsString(s.headingHint)}',
        callout: {
          variant: '${s.callout.variant}',
          title: '${escapeTsString(s.callout.title)}',
          body: '${escapeTsString(s.callout.body)}',
        },${
      s.quiz
        ? `
        quiz: {
          question: '${escapeTsString(s.quiz.question)}',
          options: [${s.quiz.options.map((o) => `'${escapeTsString(o)}'`).join(', ')}],
          answer: ${s.quiz.answer ?? 0},
          explanation: '${escapeTsString(s.quiz.explanation)}',
        },`
        : ''
    }
      },`,
  )
  .join('\n')}
    ],
    outro: {
      variant: '${enh.outro.variant}',
      title: '${escapeTsString(enh.outro.title)}',
      body: '${escapeTsString(enh.outro.body)}',
    },${
  enh.outroQuiz
    ? `
    outroQuiz: {
      question: '${escapeTsString(enh.outroQuiz.question)}',
      options: [${enh.outroQuiz.options.map((o) => `'${escapeTsString(o)}'`).join(', ')}],
      answer: ${enh.outroQuiz.answer ?? 0},
      explanation: '${escapeTsString(enh.outroQuiz.explanation)}',
    },`
    : ''
}
  },`,
  )
  .join('\n')}
};
`;
}

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<void> {
  const { bookId, chapterFilter, strict } = parseArgs();

  console.log(`[ai-enhancement] bookId=${bookId}${chapterFilter ? `, chapter=${chapterFilter}` : ''}`);

  // 1. 加载 bookInfo
  const chapters = await loadBookInfoChapters(bookId);
  console.log(`[ai-enhancement] 书籍共 ${chapters.length} 章`);

  // 2. 加载 sourceParsed
  const sourceParsed = await loadSourceParsed(bookId);
  if (!sourceParsed) {
    console.error('[ai-enhancement] 无法加载 sourceParsed.ts');
    process.exit(1);
  }

  // 3. 构建 task 索引
  const taskIndex = new Map<string, { task: SourceParsedTask; moduleTitle: string }>();
  for (const mod of sourceParsed.modules) {
    for (const task of mod.tasks) {
      taskIndex.set(task.id, { task, moduleTitle: mod.title });
    }
  }

  // 4. 构建任务列表
  interface EnhanceJob {
    subSectionId: string;
    taskTitle: string;
    moduleTitle: string;
    rawHtml: string;
    headings: string[];
  }

  const jobs: EnhanceJob[] = [];
  for (const chapter of chapters) {
    if (chapterFilter && !chapter.id.startsWith(chapterFilter)) continue;

    for (const sub of chapter.subSections) {
      // 优先通过 sourceModuleId 查找 task
      let taskData: { task: SourceParsedTask; moduleTitle: string } | undefined;

      if (chapter.sourceModuleId) {
        const mod = sourceParsed.modules.find(m => m.id === chapter.sourceModuleId);
        if (mod) {
          const subIdx = chapter.subSections.indexOf(sub as any);
          const taskKey = `${chapter.sourceModuleId}-task${subIdx + 1}`;
          taskData = taskIndex.get(taskKey);
        }
      }

      // 降级：按标题匹配
      if (!taskData) {
        for (const [, val] of taskIndex) {
          if (val.task.title === sub.title) {
            taskData = val;
            break;
          }
        }
      }

      if (!taskData) {
        console.warn(`[ai-enhancement] 未找到 task: ${sub.id} (${sub.title})`);
        continue;
      }

      const rawHtml = taskData.task.rawHtml || taskData.task.rawContent;
      if (!rawHtml) {
        console.warn(`[ai-enhancement] 无 rawHtml: ${sub.id}`);
        continue;
      }

      const headings = extractHeadingsFromHtml(rawHtml);
      jobs.push({
        subSectionId: sub.id,
        taskTitle: sub.title,
        moduleTitle: `${chapter.section} · ${chapter.title}`,
        rawHtml,
        headings,
      });
    }
  }

  console.log(`[ai-enhancement] 共 ${jobs.length} 个任务，开始生成 AI 增强...`);

  // 5. 并发生成
  const results = await runWithConcurrency(
    jobs,
    async (job) => {
      console.log(`[ai-enhancement] 生成: ${job.subSectionId} (${job.taskTitle})`);
      const enhancement = await generateTaskEnhancement(
        job.subSectionId,
        job.taskTitle,
        job.moduleTitle,
        job.rawHtml,
        job.headings,
      );
      console.log(`[ai-enhancement] 完成: ${job.subSectionId} → ${enhancement.sections.length} sections`);
      return { id: job.subSectionId, enhancement };
    },
    5,
  );

  // 6. 收集结果
  const enhancements: Record<string, TaskEnhancement> = {};
  for (const { id, enhancement } of results) {
    enhancements[id] = enhancement;
  }

  // 7. 如果是单章生成，合并到已有文件
  const outputPath = getBookDataPath(bookId, 'aiEnhancement.ts');
  if (chapterFilter && existsSync(outputPath)) {
    try {
      const existingMod = await import(outputPath);
      const existing = existingMod.aiEnhancements || existingMod.default;
      if (existing) {
        Object.assign(existing, enhancements);
        console.log(`[ai-enhancement] 合并到已有文件，共 ${Object.keys(existing).length} 个任务`);
        const mergedTs = generateAiEnhancementTs(existing);
        ensureFileDir(outputPath);
        await writeFile(outputPath, mergedTs, 'utf-8');
      } else {
        const tsContent = generateAiEnhancementTs(enhancements);
        ensureFileDir(outputPath);
        await writeFile(outputPath, tsContent, 'utf-8');
      }
    } catch {
      const tsContent = generateAiEnhancementTs(enhancements);
      ensureFileDir(outputPath);
      await writeFile(outputPath, tsContent, 'utf-8');
    }
  } else {
    const tsContent = generateAiEnhancementTs(enhancements);
    ensureFileDir(outputPath);
    await writeFile(outputPath, tsContent, 'utf-8');
  }

  console.log(`[ai-enhancement] 已写入: ${outputPath}`);

  // 8. 校验
  console.log('[ai-enhancement] 正在校验...');
  const validation = await validateTsFile(outputPath);
  if (validation.valid) {
    console.log('[ai-enhancement] 校验通过');
  } else {
    console.error('[ai-enhancement] 校验失败:');
    validation.messages.forEach((m) => console.error(`  - ${m}`));
  }

  // 9. 质量门（内容质量，非仅存在性）
  console.log('[ai-enhancement] 质量门评估...');
  try {
    const report = await evaluateEnhancementFile(bookId);
    console.log(`[gate] 变体分布 info ${report.variantDistribution.info} / tip ${report.variantDistribution.tip} / culture ${report.variantDistribution.culture} / warning ${report.variantDistribution.warning}`);
    console.log(`[gate] 标题去重率 ${report.distinctTitleRatio}, 通用标题占比 ${report.genericTitleRatio}, warning 任务占比 ${report.warningTaskRatio}`);
    console.log(`[gate] ${report.gatePassed ? '✅ 通过' : '❌ 未通过'}`);
    if (!report.gatePassed) {
      for (const f of report.gateFailures) console.log(`  ✗ ${f}`);
      if (strict) {
        console.error('[gate] AI 增强质量门未通过（--strict），退出码 1');
        process.exit(1);
      }
    }
  } catch (err) {
    console.warn('[gate] 质量门评估失败:', err);
  }
}

main();
