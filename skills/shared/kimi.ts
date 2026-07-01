/**
 * Kimi LLM 客户端
 * 读取 .env 配置，提供调用封装，失败时返回 null 不中断流程
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// 加载 .env，并覆盖已存在的环境变量以确保使用项目配置
const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
config({ path: resolve(projectRoot, '.env'), override: true });

function parseEnvFile(filePath: string): Record<string, string> {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const result: Record<string, string> = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      // 去掉可能的引号
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

const envFromFile = parseEnvFile(resolve(projectRoot, '.env'));

export interface KimiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface KimiOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

function getKimiConfig(): { key: string; baseUrl: string } {
  // 优先从 .env 文件读取，避免被 Claude Code 运行时注入的旧 key 覆盖
  const key = envFromFile.KIMI_API_KEY?.trim() || process.env.KIMI_API_KEY?.trim() || '';
  const baseUrl = envFromFile.KIMI_BASE_URL?.trim() || process.env.KIMI_BASE_URL?.trim() || 'https://api.kimi.com/coding';
  return { key, baseUrl };
}

/**
 * 调用 Kimi API
 * 如果调用失败，返回 null 并打印警告，不中断流程
 */
export async function callKimi(
  messages: KimiMessage[],
  options: KimiOptions = {},
): Promise<string | null> {
  const { key, baseUrl } = getKimiConfig();
  if (!key) {
    console.warn('[Kimi] 警告: KIMI_API_KEY 未配置');
    return null;
  }

  const model = options.model || 'kimi-latest';
  // kimi-latest 只接受 temperature=1，避免传入其他值导致请求失败
  const temperature = model.startsWith('kimi-latest') ? 1 : (options.temperature ?? 0.7);
  const max_tokens = options.max_tokens ?? 8192;

  // 支持重试：长 prompt 首次可能超时或返回空，最多重试 1 次
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.warn(`[Kimi] API 请求失败 (attempt ${attempt + 1}): ${res.status} ${res.statusText} - ${body}`);
        if (attempt === 0) continue;
        return null;
      }

      const data = (await res.json()) as {
        choices?: {
          message?: {
            content?: string;
            reasoning_content?: string;
          };
        }[];
        error?: { message?: string };
      };

      const rawContent = data.choices?.[0]?.message?.content;
      const rawReasoning = data.choices?.[0]?.message?.reasoning_content;

      let answer = extractFinalAnswer(rawContent, rawReasoning);
      if (!answer) {
        console.warn(`[Kimi] 响应中未找到有效内容 (attempt ${attempt + 1})`);
        if (attempt === 0) continue;
        return null;
      }

      return answer.trim();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[Kimi] 调用异常 (attempt ${attempt + 1}): ${message}`);
      if (attempt === 0) continue;
      return null;
    }
  }
  return null;
}

/**
 * 从 content / reasoning_content 中提取最终答案
 * coding endpoint 的 kimi-latest 通常返回 content + reasoning_content，
 * 其中 content 可能为空或仅含片段，reasoning_content 包含思考过程。
 *
 * 提取策略：
 * 1. content 非空且是 JSON → 直接返回（JSON 不会被误判为 reasoning）
 * 2. content 非空且不像 reasoning → 直接返回
 * 3. content 为空但 reasoning_content 中包含 JSON → 从 reasoning 中提取 JSON
 * 4. 其他情况返回 undefined，由调用方降级
 */
function extractFinalAnswer(content?: string, reasoning?: string): string | undefined {
  const cleanContent = content?.trim();

  if (cleanContent) {
    // JSON 输出：验证是否完整
    if (looksLikeJson(cleanContent)) {
      try {
        JSON.parse(cleanContent);
        return cleanContent;
      } catch {
        // content 中的 JSON 不完整，继续尝试 reasoning
        console.log('[Kimi] content 中的 JSON 不完整，尝试从 reasoning_content 提取');
      }
    }
    // 非 JSON 输出：检查是否是 reasoning
    if (cleanContent.length >= 15 && !looksLikeJson(cleanContent) && !looksLikeReasoning(cleanContent)) {
      return cleanContent;
    }
  }

  // content 为空或不完整，尝试从 reasoning_content 中提取 JSON
  if (reasoning) {
    const jsonFromReasoning = extractJsonFromText(reasoning);
    if (jsonFromReasoning) {
      console.log('[Kimi] 从 reasoning_content 中提取到 JSON');
      return jsonFromReasoning;
    }
  }

  return undefined;
}

/** 检测文本是否以 JSON 结构开头 */
function looksLikeJson(text: string): boolean {
  const trimmed = text.trimStart();
  return trimmed.startsWith('{') || trimmed.startsWith('[');
}

/** 从任意文本中提取完整的 JSON 对象，优先选择包含 "entities" 键的 */
function extractJsonFromText(text: string): string | undefined {
  const candidates: { json: string; size: number; hasEntities: boolean }[] = [];

  let pos = 0;
  while (pos < text.length) {
    const start = text.indexOf('{', pos);
    if (start === -1) break;

    let depth = 0;
    let inString = false;
    let escape = false;
    let end = -1;

    for (let i = start; i < text.length; i++) {
      const ch = text[i];

      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === '"') {
        inString = !inString;
        continue;
      }
      if (inString) continue;

      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }

    if (end === -1) break;

    const candidate = text.slice(start, end + 1);
    try {
      JSON.parse(candidate);
      const hasEntities = candidate.includes('"entities"');
      candidates.push({ json: candidate, size: candidate.length, hasEntities });
    } catch {
      // not valid JSON, skip
    }

    pos = end + 1;
  }

  if (candidates.length === 0) return undefined;

  // 优先返回包含 "entities" 键的最大 JSON
  const withEntities = candidates.filter((c) => c.hasEntities);
  if (withEntities.length > 0) {
    withEntities.sort((a, b) => b.size - a.size);
    return withEntities[0].json;
  }

  // 否则返回最大的 JSON 对象
  candidates.sort((a, b) => b.size - a.size);
  return candidates[0].json;
}

function looksLikeReasoning(text: string): boolean {
  // 仅检查文本开头的 reasoning 标记，避免误杀包含这些词的合法内容
  const prefixes = [
    '用户要求',
    '我需要',
    '让我',
    '分析：',
    '思考过程',
    '可能的回复',
    '合适的回答',
    '字数检查',
    '确认字数',
  ];
  const textStart = text.slice(0, 100);
  if (prefixes.some((m) => textStart.startsWith(m) || textStart.includes('\n' + m))) return true;

  // 检测"1香2港3"式的逐字编号
  const digitCharPattern = /^(\d+[^\d\s]){5,}/;
  if (digitCharPattern.test(text)) return true;

  return false;
}

function isThinkingParagraph(p: string): boolean {
  const prefixes = [
    '用户',
    '我需要',
    '让我',
    '首先',
    '其次',
    '然后',
    '接下来',
    '最后',
    '综上',
    '因此',
    '所以',
    '分析：',
    '思考：',
    '可能的',
    '合适的',
    '字数',
    '尝试',
    '方案',
    '选项',
    '1.',
    '2.',
    '3.',
    '4.',
    '- ',
  ];
  return prefixes.some((prefix) => p.startsWith(prefix));
}
