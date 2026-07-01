#!/usr/bin/env node
/**
 * audio-course-generator 主脚本（Skills 范式重构版）
 * 通用化音频课程生成 + Coze 讲稿 + LangGraph 并发
 *
 * 核心原则：
 * - TTS 只用 Coze API（generateLocalTts 内部调用 generateCozeTts），禁止本地小模型 TTS
 * - ASR 是刚需：Coze 返回音频后必须用 mlx-whisper 做句子级时间戳对齐，字数估算仅作 fallback
 * - 脚本优先：先写朗读稿，再从稿子提炼 Mermaid 帧
 * - LangGraph 并发处理（--concurrency 控制并发数，默认 2）
 *
 * 业务逻辑（讲稿 prompt）由 Agent 读 SKILL.md 后通过 --prompt-file 传入。
 * 本脚本只负责：文件读写、LLM 调用、TTS 生成、ASR 对齐、TS 校验。
 *
 * 用法:
 *   npx tsx skills/audio-course-generator/scripts/generate-audio-course.ts \
 *     --book-id eye-ent-nursing [--concurrency 2] [--prompt-file <path>]
 */

import { existsSync } from 'fs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join as pathJoin } from 'path';

// 确保 ~/bin 在 PATH 中（ffmpeg/ffprobe 安装位置）
const homeDir = process.env.HOME || '/Users/apple';
if (!process.env.PATH?.includes(`${homeDir}/bin`)) {
  process.env.PATH = `${homeDir}/bin:${process.env.PATH || ''}`;
}
import {
  ensureFileDir,
  getBookDataPath,
  getBookAssetsPath,
  PROJECT_ROOT,
} from '../../shared/paths.ts';
import { validateTsFile } from '../../shared/validator.ts';
import { generateLocalTts, getAudioDuration } from '../../shared/tts.ts';
import { callCoze } from '../../shared/coze.ts';
import { entrypoint, task } from '@langchain/langgraph';
import type { SourceParsed } from '../../source-parser/scripts/parse-source.ts';

/* ------------------------------------------------------------------ */
// 命令行参数解析

function parseArgs(): { bookId: string; promptFile?: string; concurrency: number } {
  const args = process.argv.slice(2);
  let bookId = '';
  let promptFile: string | undefined;
  let concurrency = 2; // 默认 2（ASR 是 CPU/内存密集型，不能高并发）

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book-id' && args[i + 1]) {
      bookId = args[i + 1];
      i++;
    } else if (args[i] === '--prompt-file' && args[i + 1]) {
      promptFile = args[i + 1];
      i++;
    } else if (args[i] === '--concurrency' && args[i + 1]) {
      concurrency = parseInt(args[i + 1], 10) || 2;
      i++;
    }
  }

  if (!bookId) {
    console.error('错误: 必须提供 --book-id 参数');
    console.error('用法: npx tsx generate-audio-course.ts --book-id <bookId> [--prompt-file <path>] [--concurrency 2]');
    process.exit(1);
  }

  return { bookId, promptFile, concurrency };
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

interface VisualSequenceLesson {
  id: string;
  title: string;
  moduleTitle: string;
  durationSeconds: number;
  audioUrl: string;
  visualSequence: {
    audioUrl: string;
    dialog: { id: string };
    frames: {
      start: number;
      element: {
        diagram: {
          content: string;
        };
      };
    }[];
  };
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
  return subTitle
    .replace(/^(?:任务|第)[一二三四五六七八九十\d]+(?:节)?[\s、,.]*/, '')
    .trim();
}

function numberToChinese(num: number): string {
  const map = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (num <= 10) return map[num - 1];
  if (num < 20) return '十' + (num % 10 === 0 ? '' : map[(num % 10) - 1]);
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return (tens === 1 ? '' : map[tens - 1]) + '十' + (ones === 0 ? '' : map[ones - 1]);
}

/* ------------------------------------------------------------------ */
// Mermaid 模板

const MERMAID_CONFIG = `%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%

`;

const CLASS_DEFS = `
 classDef default fill:#f8f9fa,stroke:#9aa0a6
 classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400
 classDef new fill:#e8f0fe,stroke:#4285f4
`;

function m(content: string): string {
  return MERMAID_CONFIG + content + CLASS_DEFS;
}

/* ------------------------------------------------------------------ */
// sourceParsed 加载

async function loadSourceParsed(bookId: string): Promise<SourceParsed | null> {
  const sourceParsedPath = getBookDataPath(bookId, 'sourceParsed.ts');
  if (!existsSync(sourceParsedPath)) return null;
  try {
    const mod = await import(sourceParsedPath);
    const data = mod.sourceParsed || mod.default;
    if (data && Array.isArray(data.modules)) return data as SourceParsed;
    return null;
  } catch {
    return null;
  }
}

/** 从 sourceParsed 查找任务的 rawContent */
function findTaskRawContent(
  sourceParsed: SourceParsed | null,
  chapterTitle: string,
  subSectionTitle: string,
): string {
  if (!sourceParsed) return '';
  for (const mod of sourceParsed.modules) {
    for (const t of mod.tasks) {
      if (t.title.includes(subSectionTitle) || subSectionTitle.includes(t.title)) {
        return t.rawContent;
      }
    }
  }
  return '';
}

/* ------------------------------------------------------------------ */
// 时间戳：ASR 优先，估算降级

interface SentenceTimestamp {
  text: string;
  start: number;
  end: number;
}

/**
 * ASR 对齐 — 用 mlx-whisper 识别音频，获取真实句子级时间戳。
 * 
 * 原理：mlx-whisper 在 Apple Silicon 上跑 whisper-large-v3-turbo，
 * 输出与音频完全对齐的句子级时间戳。
 * 
 * @param audioPath 音频文件绝对路径
 * @returns 句子级时间戳数组，或 null（ASR 不可用时）
 */
async function performASR(audioPath: string): Promise<SentenceTimestamp[] | null> {
  const { execFile } = await import('child_process');
  const { promisify } = await import('util');
  const execFileAsync = promisify(execFile);

  const script = `
import json
import mlx_whisper

result = mlx_whisper.transcribe(
    '${audioPath.replace(/'/g, "'")}',
    path_or_hf_repo='mlx-community/whisper-large-v3-turbo',
    language='zh',
    word_timestamps=False,
)

sentences = []
for seg in result['segments']:
    sentences.append({
        'text': seg['text'].strip(),
        'start': round(seg['start'], 2),
        'end': round(seg['end'], 2),
    })

print(json.dumps(sentences, ensure_ascii=False))
`;

  try {
    const { stdout } = await execFileAsync('python3', ['-c', script], {
      maxBuffer: 50 * 1024 * 1024,
      timeout: 300000,
    });
    const sentences = JSON.parse(stdout.trim()) as SentenceTimestamp[];
    if (sentences.length > 0) {
      console.log(`[audio-course-generator] ASR 成功: ${sentences.length} 句`);
      return sentences;
    }
  } catch (err: any) {
    console.log(`[audio-course-generator] ASR 失败，降级到估算: ${err.message?.slice(0, 100) || err}`);
  }
  return null;
}

/**
 * 估算时间戳（降级方案）— 基于朗读稿句子 + 实际音频时长。
 * 
 * 原理：中文 TTS 语速均匀，按每句字数占比 × 总时长 = 该句的起止时间。
 * 仅在 ASR 不可用时使用。
 * 
 * @param script 朗读稿纯文本
 * @param totalDuration 音频实际总时长（秒）
 * @returns 句子级时间戳数组
 */
function estimateTimestamps(script: string, totalDuration: number): SentenceTimestamp[] {
  // 按句号、问号、感叹号、分号分句，保留分隔符
  const sentences = script
    .split(/(?<=[。！？；\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // 计算总字数（去除空白和标点，只算实际朗读字数）
  const totalChars = sentences.reduce((sum, s) => {
    const chars = s.replace(/[\s，。！？；：、""''（）()【】《》—…\-\d]/g, '').length;
    return sum + Math.max(chars, 1);
  }, 0);

  // 每字平均时长（秒）
  const charDuration = totalDuration / totalChars;

  const timestamps: SentenceTimestamp[] = [];
  let currentTime = 0;

  for (const sentence of sentences) {
    const chars = Math.max(sentence.replace(/[\s，。！？；：、""''（）()【】《》—…\-\d]/g, '').length, 1);
    const duration = chars * charDuration;
    timestamps.push({
      text: sentence,
      start: Math.round(currentTime * 10) / 10,
      end: Math.round((currentTime + duration) * 10) / 10,
    });
    currentTime += duration;
  }

  return timestamps;
}

/**
 * LLM 从讲稿中提取 topic 分段和知识点。
 * 
 * 返回结构化的 topic 列表，每个 topic 包含标题、起始百分比和知识点列表。
 * 知识点也带起始百分比，用于计算帧的 start 时间。
 */
interface LLMKnowledgePoint {
  text: string;
  startPercent: number;
  relation: string;
}

interface LLMTopic {
  title: string;
  startPercent: number;
  layout: 'TD' | 'LR';
  knowledgePoints: LLMKnowledgePoint[];
}

interface LLMFramePlan {
  topics: LLMTopic[];
  summaryPoints: string[];
}

function parseFramePlan(raw: string): LLMFramePlan | null {
  try {
    const json = JSON.parse(raw);
    if (json.topics && Array.isArray(json.topics)) return json;
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
  }
  return null;
}

async function extractFramePlan(
  chapter: Chapter,
  script: string,
  totalDuration: number,
): Promise<LLMFramePlan | null> {
  const tasks = chapter.subSections
    .map((s) => extractTaskName(s.title))
    .filter((n) => n.length > 0);

  const scriptPreview = script.slice(0, 8000);

  const prompt = `你是一位教学可视化专家。请从以下音频讲稿中提取 Topic 分段和知识点，用于生成渐进式 Mermaid 流程图。

模块：${chapter.title}
包含任务：${tasks.join('、')}

讲稿内容：
${scriptPreview}

请分析讲稿内容，识别话题转换点（Topic 边界），并在每个 Topic 内提取核心知识点。

输出以下 JSON（不要 markdown 代码块）：
{
  "topics": [
    {
      "title": "Topic 标题（简短，如"急危重症护理学概况"）",
      "startPercent": 0.0,
      "layout": "TD",
      "knowledgePoints": [
        { "text": "知识点1（4-12字核心概念）", "startPercent": 0.02, "relation": "包含" },
        { "text": "知识点2", "startPercent": 0.08, "relation": "展开" }
      ]
    },
    {
      "title": "第二个 Topic",
      "startPercent": 0.25,
      "layout": "LR",
      "knowledgePoints": [
        { "text": "知识点", "startPercent": 0.26, "relation": "步骤" }
      ]
    }
  ],
  "summaryPoints": ["核心知识点1", "核心知识点2", "核心知识点3"]
}

要求：
1. startPercent 是该 Topic/知识点在讲稿中的位置百分比（0-1），用于计算出现时间
2. 每个 Topic 至少 2 个知识点，整个讲稿至少 3 个 Topic
3. **知识点文本必须是核心概念或术语，4-12字**。这是最重要的要求！
   - ✅ 正确示例："急危重症定义"、"EMSS体系"、"院前急救原则"、"深静脉血栓预防"、"急救医疗调度"
   - ❌ 错误示例："大家注意"、"顾名思义"、"这一点是很多初学者容易忽略的"、"现在我们讲最后一个任务"
   - 知识点不能是讲稿原文片段、口语过渡语、语气词、叙述性文字
   - 知识点应该是教材中的专业术语、概念名称、操作步骤名称
4. relation 描述该知识点与父节点的关系（如"包含""展开""分类""举例""对比""步骤""定义"等）
5. Topic 边界在话题转换处（如"接下来""我们来看""总结"等过渡语）
6. 最后一个 Topic 应为总结/回顾
7. layout: "TD"（自上而下，适合概念展开）或 "LR"（从左到右，适合流程步骤）
8. summaryPoints: 从全讲稿中提取 3-5 个最核心的知识点，用于总结帧
9. 直接输出 JSON，不要任何其他文字`;

  const result = await callCoze([{ role: 'user', content: prompt }]);
  if (!result) return null;

  const plan = parseFramePlan(result);
  if (!plan || !plan.topics || plan.topics.length === 0) {
    console.log(`[audio-course-generator] ${chapter.id} LLM 帧规划失败，将使用规则降级`);
    return null;
  }

  // 后处理：过滤口语碎片知识点，只保留专业术语/概念
  const ORAL_PATTERNS = /^(大家|我们|那么|这个|那个|其实|也就是说|换句话说|顾名思义|当然了|不过|但是|所以|因此|然后|接下来|现在|刚才|前面|后面|这一点|这一点是|这里|那里|你看|你想|你知道|你会发现|你可能会|大家注意|大家一定要|大家可能|同学们|老师|我们来看|我们来说|我们先|我们再|讲一讲|聊一聊|说一下|看一下|了解一下|注意一下|提醒一下|强调一下|总结一下|回顾一下|开始|结束|最后|首先|其次|第一|第二|第三)/;
  const cleanedTopics = plan.topics.map(topic => ({
    ...topic,
    knowledgePoints: topic.knowledgePoints.filter(kp => {
      const text = kp.text.trim();
      // 过滤口语开头的
      if (ORAL_PATTERNS.test(text)) return false;
      // 过滤过长的（>20字大概率是句子片段）
      if (text.length > 20) return false;
      // 过滤含句号的（知识点不应该有句号）
      if (/[。！？，]/.test(text)) return false;
      return true;
    }),
  })).filter(t => t.knowledgePoints.length > 0);

  if (cleanedTopics.length === 0) {
    console.log(`[audio-course-generator] ${chapter.id} LLM 知识点全部被过滤（口语碎片），使用规则降级`);
    return null;
  }

  const totalPoints = cleanedTopics.reduce((s, t) => s + t.knowledgePoints.length, 0);
  const removedPoints = plan.topics.reduce((s, t) => s + t.knowledgePoints.length, 0) - totalPoints;
  if (removedPoints > 0) {
    console.log(`[audio-course-generator] ${chapter.id} 过滤 ${removedPoints} 个口语碎片知识点，剩余 ${totalPoints} 个`);
  }
  plan.topics = cleanedTopics;

  console.log(`[audio-course-generator] ${chapter.id} LLM 提取 ${plan.topics.length} 个 topic，${totalPoints} 个知识点`);
  return plan;
}

/**
 * 基于 LLM 帧规划生成渐进式 Mermaid 帧。
 * 
 * 策略：
 * 1. 帧1 (0s): 标题帧 — 章节标题
 * 2. 每个 Topic 第一帧：Topic 标题 + 前 1-2 个知识点（新图，所有节点 new）
 * 3. Topic 内后续知识点：逐个添加（渐进式，只新节点 new）
 * 4. 最后一帧: 总结帧
 * 
 * 注意：content 存储原始 Mermaid 语法（不含 config/classDef），由生成 TS 中的 m() 包裹。
 */
async function generateAlignedFrames(
  chapter: Chapter,
  timestamps: SentenceTimestamp[],
  script: string,
  totalDuration: number,
): Promise<VisualSequenceLesson['visualSequence']['frames']> {
  const frames: VisualSequenceLesson['visualSequence']['frames'] = [];

  // 帧1：标题帧 (0s) — content 不含 config/classDef，由 m() 包裹
  frames.push({
    start: 0,
    element: {
      diagram: {
        content: m(`flowchart TD\n A["${chapter.title}"]\n\n class A new`),
      },
    },
  });

  if (timestamps.length <= 1) {
    return frames;
  }

  // 尝试用 LLM 提取帧规划
  const plan = await extractFramePlan(chapter, script, totalDuration);

  if (plan) {
    // LLM 路径：渐进式帧生成
    // 同一 topic 内：累积节点，只新节点标 new
    // topic 切换：新图，所有节点标 new
    for (let topicIdx = 0; topicIdx < plan.topics.length; topicIdx++) {
      const topic = plan.topics[topicIdx];
      const topicNodeId = `T${topicIdx}`;

      // topic 内的帧：每个知识点一帧，渐进式累积（最多 MAX_NODES_PER_FRAME 个节点）
      // 链式纵向布局：T0 --> N0 --> N1 --> N2 ...（而非星型 T0 --> N0, T0 --> N1 ...）
      // 链式布局保证图宽恒定（1 个节点宽），图高随节点数增长，适配固定画布
      const MAX_NODES_PER_FRAME = 6;
      for (let kpIdx = 0; kpIdx < topic.knowledgePoints.length; kpIdx++) {
        const kp = topic.knowledgePoints[kpIdx];
        // 用 ASR 时间戳校准知识点出现时间：找到最接近 startPercent 位置的 ASR 句子
        const targetTime = kp.startPercent * totalDuration;
        const asrMatch = timestamps.length > 1
          ? timestamps.reduce((best, ts) =>
              Math.abs(ts.start - targetTime) < Math.abs(best.start - targetTime) ? ts : best
            )
          : null;
        const kpStart = asrMatch ? Math.round(asrMatch.start) : Math.round(targetTime);

        // 构建到当前知识点为止的节点（累积，但最多显示 MAX_NODES_PER_FRAME 个）
        // 超过限制时用滑动窗口：保留最近的 MAX_NODES_PER_FRAME 个节点
        const allPoints = topic.knowledgePoints.slice(0, kpIdx + 1);
        const visiblePoints = allPoints.length > MAX_NODES_PER_FRAME
          ? allPoints.slice(allPoints.length - MAX_NODES_PER_FRAME)
          : allPoints;
        const nodeOffset = allPoints.length - visiblePoints.length;

        // 链式连接：Topic -> N0 -> N1 -> N2 ...
        // 第一个节点从 Topic 分出，后续节点串联，关系标注在连线上
        const edgeLines: string[] = [];
        visiblePoints.forEach((p, i) => {
          const nodeIdx = i + nodeOffset;
          const rel = p.relation || '展开';
          if (i === 0) {
            // 第一个可见节点：从 Topic 或前一个隐藏节点连接
            if (nodeOffset > 0) {
              // 滑动窗口：用省略号节点连接
              edgeLines.push(` ${topicNodeId} -->|"更多"| N${nodeIdx}["${p.text}"]`);
            } else {
              edgeLines.push(` ${topicNodeId} -->|"${rel}"| N${nodeIdx}["${p.text}"]`);
            }
          } else {
            const prevIdx = i - 1 + nodeOffset;
            edgeLines.push(` N${prevIdx} -->|"${rel}"| N${nodeIdx}["${p.text}"]`);
          }
        });
        const edges = edgeLines.join('\n');

        // topic 首帧：所有节点都标 new（新图）
        // topic 内后续帧：只标当前新增节点为 new
        const classLines = kpIdx === 0
          ? visiblePoints.map((_, i) => ` class N${i + nodeOffset} new`).join('\n')
          : ` class N${kpIdx} new`;

        frames.push({
          start: kpStart,
          element: {
            diagram: {
              content: m(`flowchart TD\n ${topicNodeId}["${topic.title}"]\n${edges}\n\n class ${topicNodeId} new\n${classLines}`),
            },
          },
        });
      }
    }

    // 总结帧：使用 LLM 提取的核心知识点
    const lastTs = timestamps[timestamps.length - 1];
    if (lastTs && lastTs.end > 10) {
      const summaryStart = Math.max(lastTs.start - 5, frames[frames.length - 1]?.start + 5 || 0);
      const summaryPoints = plan.summaryPoints || [];
      if (summaryPoints.length > 0) {
        // 链式：A --> S0 --> S1 --> S2 ...
        const summaryEdges: string[] = [];
        summaryPoints.forEach((p, i) => {
          if (i === 0) {
            summaryEdges.push(` A -->|"${i + 1}"| S${i}["${p}"]`);
          } else {
            summaryEdges.push(` S${i - 1} -->|"${i + 1}"| S${i}["${p}"]`);
          }
        });
        const summaryClasses = summaryPoints.map((_, i) => ` class S${i} new`).join('\n');
        frames.push({
          start: summaryStart,
          element: {
            diagram: {
              content: m(`flowchart TD\n A["${chapter.title} · 要点回顾"]\n${summaryEdges.join('\n')}\n\n class A new\n${summaryClasses}`),
            },
          },
        });
      } else {
        frames.push({
          start: summaryStart,
          element: {
            diagram: {
              content: m(`flowchart TD\n A["${chapter.title} · 要点回顾"]\n A --> B["课后复习"]\n\n class A new\n class B new`),
            },
          },
        });
      }
    }

    const maxTime = lastTs?.end || 999;
    return frames.filter((f) => f.start < maxTime);
  }

  // 降级路径：规则-based 帧生成（content 由 m() 包裹，不含 config/classDef）
  console.log(`[audio-course-generator] ${chapter.id} 使用规则降级生成帧`);

  const tasks = chapter.subSections
    .map((s) => extractTaskName(s.title))
    .filter((n) => n.length > 0);

  // 按约 15 秒一组分组句子（ finer granularity ）
  const GROUP_INTERVAL = 15;
  const groups: { start: number; sentences: SentenceTimestamp[] }[] = [];
  let currentGroup: SentenceTimestamp[] = [];
  let groupStartTime = timestamps[1]?.start || 0;

  for (let i = 1; i < timestamps.length; i++) {
    const ts = timestamps[i];
    if (ts.start - groupStartTime >= GROUP_INTERVAL && currentGroup.length > 0) {
      groups.push({ start: groupStartTime, sentences: currentGroup });
      currentGroup = [];
      groupStartTime = ts.start;
    }
    currentGroup.push(ts);
  }
  if (currentGroup.length > 0) {
    groups.push({ start: groupStartTime, sentences: currentGroup });
  }

  // 关系词推断：根据文本特征选择关系
  const inferRelation = (text: string, idx: number): string => {
    if (idx === 0) return '展开';
    if (/包括|包含|分为|分类|种类/.test(text)) return '包含';
    if (/例如|比如|如|例/.test(text)) return '举例';
    if (/首先|然后|接着|最后|步骤|流程/.test(text)) return '步骤';
    if (/对比|区别|不同|相反/.test(text)) return '对比';
    if (/定义|是指|是|指/.test(text)) return '定义';
    if (/作用|功能|用于|能够/.test(text)) return '功能';
    if (/注意|需要|必须|应该/.test(text)) return '注意';
    return '展开';
  };

  groups.forEach((group, groupIdx) => {
    const groupText = group.sentences.map((s) => s.text).join('');

    if (groupIdx === 0 && tasks.length > 0) {
      // 链式：A --> T0 --> T1 --> T2 ...
      const taskEdges: string[] = [];
      tasks.slice(0, 5).forEach((t, i) => {
        if (i === 0) {
          taskEdges.push(` A -->|"包含"| T${i}["${t}"]`);
        } else {
          taskEdges.push(` T${i - 1} -->|"包含"| T${i}["${t}"]`);
        }
      });
      const classLines = tasks
        .slice(0, 5)
        .map((_, i) => ` class T${i} new`)
        .join('\n');
      frames.push({
        start: Math.round(group.start),
        element: {
          diagram: {
            content: m(`flowchart TD\n A["${chapter.title}"]\n${taskEdges.join('\n')}\n\n class A new\n${classLines}`),
          },
        },
      });
      return;
    }

    const segments = groupText
      .split(/[，。！？；：、\s\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 4 && s.length <= 20)
      .slice(0, 5);

    if (segments.length === 0) {
      const summary = groupText.slice(0, 15).trim();
      frames.push({
        start: Math.round(group.start),
        element: {
          diagram: {
            content: m(`flowchart TD\n A["${chapter.title}"]\n A -->|"展开"| B["${summary}…"]\n\n class B new`),
          },
        },
      });
      return;
    }

    // 链式：A --> N0 --> N1 --> N2 ...
    const nodeEdges: string[] = [];
    segments.forEach((s, i) => {
      const rel = inferRelation(s, i);
      if (i === 0) {
        nodeEdges.push(` A -->|"${rel}"| N${i}["${s}"]`);
      } else {
        nodeEdges.push(` N${i - 1} -->|"${rel}"| N${i}["${s}"]`);
      }
    });
    const classLines = segments
      .map((_, i) => ` class N${i} new`)
      .join('\n');

    frames.push({
      start: Math.round(group.start),
      element: {
        diagram: {
          content: m(`flowchart TD\n A["${chapter.title}"]\n${nodeEdges.join('\n')}\n\n class A new\n${classLines}`),
        },
      },
    });
  });

  // 最后一帧：总结帧
  const lastTs = timestamps[timestamps.length - 1];
  if (lastTs && lastTs.end > 10) {
    frames.push({
      start: Math.max(lastTs.start - 5, frames[frames.length - 1]?.start + 5 || 0),
      element: {
        diagram: {
          content: m(`flowchart TD\n A["${chapter.title} · 要点回顾"]\n A -->|"总结"| B["课后复习"]\n\n class A new\n class B new`),
        },
      },
    });
  }

  const maxTime = lastTs?.end || 999;
  return frames.filter((f) => f.start < maxTime);
}

/* ------------------------------------------------------------------ */
// 音频稿生成：通用 prompt + Coze

// 目标 10-15 分钟，取 12 分钟 = 720 秒
// 中文 TTS 语速约 3.5 字/秒，720 * 3.5 = 2520 字
// 但 Coze/DeepSeek 倾向于生成较短文本，所以目标字数设高一些
const DURATION_SECONDS = 720;
const SPEECH_RATE_CPS = 3.5;
const TARGET_MIN_CHARS = 3000; // 最低字数保证 10 分钟+
const TARGET_IDEAL_CHARS = 4200; // 理想字数约 12-15 分钟

function estimateCharCount(): number {
  return TARGET_IDEAL_CHARS;
}

async function generateScript(
  chapter: Chapter,
  taskRawContent: string,
  promptFilePath?: string,
): Promise<string> {
  const tasks = chapter.subSections
    .map((s) => extractTaskName(s.title))
    .filter((n) => n.length > 0);

  // 给更多原文上下文，帮助模型生成更详细的内容
  const contentContext = taskRawContent
    ? `\n\n=== 原文内容 ===\n${taskRawContent.slice(0, 12000)}`
    : '';

  const targetChars = estimateCharCount();
  const taskCount = tasks.length;
  const perTaskChars = Math.floor(targetChars / Math.max(taskCount, 1));

  // 加载外部 prompt 模板（如有）
  let promptTemplate: string | null = null;
  if (promptFilePath && existsSync(promptFilePath)) {
    promptTemplate = await readFile(promptFilePath, 'utf-8');
  }

  let prompt: string;
  if (promptTemplate) {
    prompt = promptTemplate
      .replace(/\{\{chapterSection\}\}/g, chapter.section)
      .replace(/\{\{chapterTitle\}\}/g, chapter.title)
      .replace(/\{\{taskCount\}\}/g, String(taskCount))
      .replace(/\{\{taskList\}\}/g, tasks.join('、'))
      .replace(/\{\{chapterSummary\}\}/g, chapter.summary)
      .replace(/\{\{contentContext\}\}/g, contentContext)
      .replace(/\{\{targetChars\}\}/g, String(targetChars))
      .replace(/\{\{targetMinChars\}\}/g, String(TARGET_MIN_CHARS))
      .replace(/\{\{durationMinutes\}\}/g, String(Math.floor(DURATION_SECONDS / 60)))
      .replace(/\{\{perTaskChars\}\}/g, String(perTaskChars));
  } else {
    prompt = buildDefaultScriptPrompt(chapter, tasks, taskCount, contentContext, targetChars, perTaskChars);
  }

  const result = await callCoze([{ role: 'user', content: prompt }]);

  if (result && result.length > 50) {
    console.log(`[audio-course-generator] ${chapter.id} 使用 Coze 生成讲稿 (${result.length} 字)`);

    // 字数不足时自动补写
    if (result.length < TARGET_MIN_CHARS) {
      console.log(`[audio-course-generator] ${chapter.id} 字数不足 (${result.length} < ${TARGET_MIN_CHARS})，追加补充...`);
      const supplementPrompt = `你之前写的讲稿只有 ${result.length} 字，远不够 ${targetChars} 字的要求。请在现有讲稿基础上继续扩展，补充更多详细讲解、案例分析和知识点展开。

现有讲稿：
${result.slice(0, 2000)}

请直接输出补充的内容（不要重复已有内容），我会拼接到原讲稿后面。补充内容至少 ${targetChars - result.length} 字。保持同样的口语化风格，纯文本。`;

      const supplement = await callCoze([{ role: 'user', content: supplementPrompt }]);
      if (supplement && supplement.length > 100) {
        const combined = result + '\n' + supplement;
        console.log(`[audio-course-generator] ${chapter.id} 补写后总字数: ${combined.length}`);
        return combined;
      }
    }

    return result;
  }

  // 规则降级：模板生成讲稿
  console.log(`[audio-course-generator] ${chapter.id} Coze 失败，使用规则模板`);

  const taskList = tasks.slice(0, 5).join('、');
  const moreTasks = tasks.length > 5 ? `等${tasks.length}个任务` : '';

  const script = `同学们好，今天我们来学习${chapter.title}。${chapter.title}涵盖了${taskList}${moreTasks}等核心内容。${chapter.summary.replace(/。$/, '')}。在学习过程中，大家要重点关注核心概念和关键论点。建议大家先通读原文，理解整体框架，然后逐个任务深入学习。以上就是${chapter.title}的要点，记得课后复习，我们下节课再见。`;

  return script;
}

/** 构建 fallback 讲稿 prompt（通用教材，不绑定特定书籍类型） */
function buildDefaultScriptPrompt(
  chapter: Chapter,
  tasks: string[],
  taskCount: number,
  contentContext: string,
  targetChars: number,
  perTaskChars: number,
): string {
  return `你是一位资深教材讲解专家和电台主持人，正在录制一档 12-15 分钟的音频课程节目。你需要为以下教材章节撰写完整的音频讲稿。

## 课程信息
- 模块：${chapter.section} ${chapter.title}
- 包含 ${taskCount} 个任务：${tasks.join('、')}
- 模块摘要：${chapter.summary}

## 原文参考${contentContext}

## 撰写要求（极其重要，请逐条遵守）

1. **字数硬性要求**：讲稿总字数必须达到 ${targetChars} 字以上（最低 ${TARGET_MIN_CHARS} 字）。这对应约 ${Math.floor(DURATION_SECONDS / 60)} 分钟的朗读时长。字数不够是最严重的错误。

2. **内容结构**：按以下结构展开，每个部分都要充实详细：
   - 开场白（约 100 字）：问候 + 本节概要
   - 逐个任务讲解（每个任务 ${perTaskChars} 字以上）：
     - 任务背景和意义
     - 核心概念定义
     - 关键操作步骤或要点
     - 案例或实际应用举例
     - 易混淆点提醒
   - 知识串联与总结（约 200 字）
   - 课后学习建议（约 100 字）
   - 结束语

3. **风格**：口语化、亲切自然，像电台主持人娓娓道来。多用"我们来看""大家注意""这里有个关键点""举个例子"等过渡语。

4. **格式**：纯文本，绝对不要出现 Markdown 格式、标题符号、列表符号、加粗等，可以直接朗读。

5. **开头**：同学们好，今天我们来学习${chapter.title}
6. **结尾**：以上就是${chapter.title}的全部内容，记得课后复习，我们下节课再见

请现在开始撰写，确保字数达到 ${targetChars} 字以上。`;
}

/* ------------------------------------------------------------------ */
// 课程生成（全书级别：每个 chapter 一节）

async function generateLesson(
  chapter: Chapter,
  index: number,
  bookId: string,
  sourceParsed: SourceParsed | null,
  promptFile?: string,
): Promise<VisualSequenceLesson> {
  const lessonId = `audio-l${index + 1}`;

  console.log(`[audio-course-generator] 处理模块 ${index + 1}: ${chapter.title}`);

  // 1. 查找原文内容
  const taskRawContent = findTaskRawContent(sourceParsed, chapter.title, chapter.subSections[0]?.title || '');

  // 2. 生成音频稿
  const script = await generateScript(chapter, taskRawContent, promptFile);

  // 2.5 保存朗读稿到 audio-scripts/ 目录（供人审稿）
  const scriptDir = pathJoin(PROJECT_ROOT, 'books', bookId, 'audio-scripts');
  await mkdir(scriptDir, { recursive: true });
  const scriptPath = pathJoin(scriptDir, `${lessonId}-${chapter.title.replace(/[/\\?%*:|"<>]/g, '_')}.txt`);
  await writeFile(scriptPath, script, 'utf-8');
  console.log(`[audio-course-generator] 朗读稿已保存: ${scriptPath}`);

  // 3. 生成音频文件
  const audioFileName = `${lessonId}.mp3`;
  const audioAbsPath = `${getBookAssetsPath(bookId)}/audio/${audioFileName}`;
  const audioRelPath = `/audio/${audioFileName}`;

  ensureFileDir(audioAbsPath);
  await generateLocalTts(script, audioAbsPath);
  const actualDuration = await getAudioDuration(audioAbsPath);
  console.log(`[audio-course-generator] 音频已生成: ${audioAbsPath} (${actualDuration}s)`);

  // 4. ASR 对齐获取真实时间戳（降级到估算）
  let timestamps: SentenceTimestamp[];
  const asrResult = await performASR(audioAbsPath);
  if (asrResult) {
    timestamps = asrResult;
    console.log(`[audio-course-generator] ASR 时间戳: ${timestamps.length} 句, 0-${actualDuration}s`);
  } else {
    timestamps = estimateTimestamps(script, actualDuration);
    console.log(`[audio-course-generator] 估算时间戳(降级): ${timestamps.length} 句, 0-${actualDuration}s`);
  }

  // 5. 基于时间戳生成与音频对齐的 Mermaid 帧
  const frames = await generateAlignedFrames(chapter, timestamps, script, actualDuration);
  console.log(`[audio-course-generator] 生成 ${frames.length} 帧与音频对齐`);

  // 6. 构建课程数据
  return {
    id: lessonId,
    title: `${chapter.title}`,
    moduleTitle: `${chapter.section}：${chapter.title}`,
    durationSeconds: actualDuration,
    audioUrl: audioRelPath,
    visualSequence: {
      audioUrl: audioRelPath,
      dialog: { id: lessonId },
      frames,
    },
  };
}

/* ------------------------------------------------------------------ */
// 并发控制

async function runWithConcurrency<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  limit: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current], current);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/* ------------------------------------------------------------------ */
// TS 文件生成

function generateAudioCourseTs(lessons: VisualSequenceLesson[]): string {
  return `import type { VisualSequenceLesson } from '../../../src/types/audio';

const MERMAID_CONFIG = \`${escapeTsString(MERMAID_CONFIG)}\`;

const CLASS_DEFS = \`${escapeTsString(CLASS_DEFS)}\`;

function m(content: string): string {
  return MERMAID_CONFIG + content + CLASS_DEFS;
}

export const audioCourseLessons: VisualSequenceLesson[] = [
${lessons.map((l) => lessonToString(l)).join(',\n')}
];
`;
}

function lessonToString(l: VisualSequenceLesson): string {
  const framesStr = l.visualSequence.frames
    .map((f) => {
      return `        {
          start: ${f.start},
          element: {
            diagram: {
              content: m(\`${escapeTsString(f.element.diagram.content)}\`),
            },
          },
        }`;
    })
    .join(',\n');

  return `  {
    id: '${l.id}',
    title: '${escapeTsString(l.title)}',
    moduleTitle: '${escapeTsString(l.moduleTitle)}',
    durationSeconds: ${l.durationSeconds},
    audioUrl: '${escapeTsString(l.audioUrl)}',
    visualSequence: {
      audioUrl: '${escapeTsString(l.visualSequence.audioUrl)}',
      dialog: { id: '${l.visualSequence.dialog.id}' },
      frames: [
${framesStr}
      ],
    },
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
// LangGraph 工作流

const generateLessonTask = task(
  'generateLessonTask',
  async (params: {
    chapter: Chapter;
    index: number;
    bookId: string;
    sourceParsed: SourceParsed | null;
    promptFile?: string;
  }): Promise<VisualSequenceLesson> => {
    return generateLesson(params.chapter, params.index, params.bookId, params.sourceParsed, params.promptFile);
  },
);

const audioCourseWorkflow = entrypoint(
  { name: 'audioCourseWorkflow' },
  async (params: { bookId: string; concurrency: number; promptFile?: string }) => {
    console.log(`[audio-course-generator] bookId=${params.bookId}, concurrency=${params.concurrency}`);

    // 1. 加载 bookInfo
    const bookInfo = await loadBookInfo(params.bookId);
    console.log(`[audio-course-generator] 书名: ${bookInfo.title}`);
    console.log(`[audio-course-generator] 共 ${bookInfo.chapters.length} 个模块`);

    // 2. 加载 sourceParsed（用于获取原文内容）
    const sourceParsed = await loadSourceParsed(params.bookId);
    if (sourceParsed) {
      console.log(`[audio-course-generator] 从 sourceParsed.ts 加载到 ${sourceParsed.modules.length} 个模块`);
    }

    // 3. LangGraph fan-out：并发生成所有章节音频
    console.log(`[audio-course-generator] 开始并发生成音频课程...`);
    const rawResults = await runWithConcurrency(
      bookInfo.chapters,
      (chapter, index) => generateLessonTask({ chapter, index, bookId: params.bookId, sourceParsed, promptFile: params.promptFile }),
      params.concurrency,
    );
    const lessons = await Promise.all(rawResults);

    console.log(`[audio-course-generator] 共生成 ${lessons.length} 节音频课程`);

    // 4. 写入 TS 文件
    const outputPath = getBookDataPath(params.bookId, 'audioCourse.ts');
    ensureFileDir(outputPath);
    const tsContent = generateAudioCourseTs(lessons);
    await writeFile(outputPath, tsContent, 'utf-8');
    console.log(`[audio-course-generator] 已写入: ${outputPath}`);

    // 5. 校验
    console.log('[audio-course-generator] 正在校验生成的 TS 文件...');
    const validation = await validateTsFile(outputPath);
    if (validation.valid) {
      console.log('[audio-course-generator] 校验通过');
    } else {
      console.error('[audio-course-generator] 校验失败:');
      validation.messages.forEach((m) => console.error(`  - ${m}`));
      return { success: false, errors: validation.messages };
    }

    return { success: true, errors: [] as string[] };
  },
);

/* ------------------------------------------------------------------ */
// 主流程

async function main(): Promise<void> {
  const { bookId, promptFile, concurrency } = parseArgs();

  const result = await audioCourseWorkflow.invoke({ bookId, concurrency, promptFile });

  if (!result.success) {
    process.exit(1);
  }
}

main();
