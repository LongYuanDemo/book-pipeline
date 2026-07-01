/**
 * 扣子 (Coze) API 客户端
 *
 * 通过 Coze 的 Bot API 调用 LLM，支持流式响应。
 * 用于替代 Kimi coding 端点（thinking-only 模式不适合结构化输出）。
 *
 * 环境变量：
 *   COZE_API_KEY  — 扣子个人访问令牌 (pat_xxx)
 *   COZE_BOT_ID   — 智能体 ID
 */

import { config } from 'dotenv';
import { callDeepSeek } from './deepseek.ts';

// 加载 .env 文件
config();

const COZE_BASE_URL = 'https://api.coze.cn/v3/chat';
const DEFAULT_TIMEOUT = 300_000; // 5 分钟
const MAX_RETRIES = 2;

function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    console.warn(`[Coze] 环境变量 ${key} 未配置`);
    return '';
  }
  return val;
}

interface CozeChatOptions {
  botId?: string;
  userId?: string;
  timeout?: number;
}

/**
 * 单次调用 Coze Bot（不含重试）
 */
async function callCozeOnce(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  botId: string,
  userId: string,
  timeout: number,
): Promise<string | null> {
  const additionalMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
    content_type: 'text' as const,
  }));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(COZE_BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: botId,
        user_id: userId,
        stream: true,
        auto_save_history: false,
        additional_messages: additionalMessages,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.warn(`[Coze] API 请求失败: ${res.status} ${res.statusText} - ${body}`);
      return null;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      console.warn('[Coze] 无法读取响应流');
      return null;
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let answerContent = '';
    let currentEvent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('event:')) {
          currentEvent = line.slice(6).trim();
          continue;
        }
        if (line.startsWith('data:')) {
          const jsonStr = line.slice(5).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const data = JSON.parse(jsonStr);
            if (currentEvent === 'conversation.message.delta' && data.type === 'answer' && data.content) {
              answerContent += data.content;
            }
          } catch {
            // 忽略解析失败的行
          }
        }
      }
    }

    if (!answerContent) {
      console.warn('[Coze] 响应中未找到有效内容');
      return null;
    }

    return answerContent.trim();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn(`[Coze] 请求超时 (${timeout}ms)`);
    } else {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[Coze] 调用异常: ${message}`);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 调用扣子 Bot 发起对话，返回完整的回复文本。
 * 内置重试逻辑，超时或失败后自动重试。
 *
 * @param messages 消息列表，格式同 OpenAI: [{role, content}]
 * @param options 可选参数: botId, userId, timeout
 * @returns 回复文本，失败返回 null
 */
export async function callCoze(
  messages: Array<{ role: string; content: string }>,
  options?: CozeChatOptions,
): Promise<string | null> {
  // 优先 DeepSeek
  const deepseekResult = await callDeepSeek(messages);
  if (deepseekResult) return deepseekResult;

  // 最终降级 Coze
  const apiKey = getEnv('COZE_API_KEY');
  const botId = options?.botId || getEnv('COZE_BOT_ID');

  if (!apiKey || !botId) {
    console.warn('[Coze] API Key 或 Bot ID 未配置，跳过');
    return null;
  }

  const userId = options?.userId || 'pipeline';
  const timeout = options?.timeout || DEFAULT_TIMEOUT;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    if (attempt > 1) {
      console.log(`[Coze] 第 ${attempt} 次重试...`);
      // 指数退避
      await new Promise((r) => setTimeout(r, 2000 * (attempt - 1)));
    }

    const result = await callCozeOnce(messages, apiKey, botId, userId, timeout);
    if (result) return result;

    console.warn(`[Coze] 第 ${attempt} 次调用失败`);
  }

  console.warn(`[Coze] ${MAX_RETRIES + 1} 次调用全部失败`);
  return null;
}
