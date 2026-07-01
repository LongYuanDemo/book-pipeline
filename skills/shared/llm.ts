/**
 * LLM 调用封装
 * 统一走 callCoze 链路：DeepSeek → Coze
 */

import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getBookLogsPath } from './paths.ts';
import { callCoze } from './coze.ts';

/**
 * 记录 prompt/output 到教材日志目录
 */
function logLLM(bookId: string, prompt: string, output: string): void {
  const logDir = getBookLogsPath(bookId);
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFile = join(logDir, `llm-${timestamp}.log`);

  const content = [
    `=== Prompt (${new Date().toISOString()}) ===`,
    prompt,
    '',
    `=== Output (${new Date().toISOString()}) ===`,
    output,
    '',
  ].join('\n');

  appendFileSync(logFile, content, 'utf-8');
}

/**
 * 调用 LLM 生成内容
 * 链路：DeepSeek → Coze
 * @param prompt 输入 prompt
 * @param bookId 用于日志记录的教材标识（可选）
 * @returns 模型生成的文本
 */
export async function callLLM(prompt: string, bookId?: string): Promise<string> {
  const result = await callCoze([{ role: 'user', content: prompt }]);
  const output = result || '';
  if (bookId) {
    logLLM(bookId, prompt, output || '[LLM 无返回]');
  }
  return output;
}
