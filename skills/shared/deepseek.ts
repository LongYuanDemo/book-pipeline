/**
 * DeepSeek API 客户端 (OpenAI-compatible)
 *
 * 环境变量：
 *   DEEPSEEK_API_KEY — DeepSeek API Key
 *   DEEPSEEK_MODEL   — 模型名称 (默认 deepseek-v4-flash)
 */

import { config } from 'dotenv';

config();

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEFAULT_MODEL = 'deepseek-v4-flash';
const DEFAULT_TIMEOUT = 300_000; // 5 分钟
const MAX_RETRIES = 2;

function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    console.warn(`[DeepSeek] 环境变量 ${key} 未配置`);
    return '';
  }
  return val;
}

interface DeepSeekOptions {
  model?: string;
  temperature?: number;
  timeout?: number;
}

/**
 * 单次调用 DeepSeek（不含重试）
 */
async function callDeepSeekOnce(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  model: string,
  temperature: number,
  timeout: number,
): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(DEEPSEEK_BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: false,
        temperature,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.warn(`[DeepSeek] API 请求失败: ${res.status} ${res.statusText} - ${body}`);
      return null;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.warn('[DeepSeek] 响应中未找到有效内容');
      return null;
    }

    return content.trim();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn(`[DeepSeek] 请求超时 (${timeout}ms)`);
    } else {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[DeepSeek] 调用异常: ${message}`);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 调用 DeepSeek，返回完整回复文本。内置重试逻辑。
 */
export async function callDeepSeek(
  messages: Array<{ role: string; content: string }>,
  options?: DeepSeekOptions,
): Promise<string | null> {
  const apiKey = getEnv('DEEPSEEK_API_KEY');
  if (!apiKey) {
    console.warn('[DeepSeek] API Key 未配置，跳过');
    return null;
  }

  const model = options?.model || getEnv('DEEPSEEK_MODEL') || DEFAULT_MODEL;
  const temperature = options?.temperature ?? 0.7;
  const timeout = options?.timeout || DEFAULT_TIMEOUT;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    if (attempt > 1) {
      console.log(`[DeepSeek] 第 ${attempt} 次重试...`);
      await new Promise((r) => setTimeout(r, 2000 * (attempt - 1)));
    }

    const result = await callDeepSeekOnce(messages, apiKey, model, temperature, timeout);
    if (result) return result;

    console.warn(`[DeepSeek] 第 ${attempt} 次调用失败`);
  }

  console.warn(`[DeepSeek] ${MAX_RETRIES + 1} 次调用全部失败`);
  return null;
}
