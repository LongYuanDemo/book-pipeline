/**
 * TTS 生成模块
 * 使用扣子 Coze 音频生成 API (stream_run 工作流)
 */

import { execFile } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';
import { config } from 'dotenv';

config();

const execFileAsync = promisify(execFile);

/* ------------------------------------------------------------------ */
// 环境变量

function getEnv(key: string): string {
  return process.env[key] || '';
}

const COZE_TTS_ENDPOINT = getEnv('COZE_TTS_ENDPOINT') || 'https://sw6svvkbjd.coze.site/stream_run';
const COZE_TTS_API_KEY = getEnv('COZE_TTS_API_KEY');
const COZE_TTS_PROJECT_ID = getEnv('COZE_TTS_PROJECT_ID') || '7656634526076190766';

/* ------------------------------------------------------------------ */
// Coze TTS — 调用 stream_run 工作流生成音频

/**
 * 生成随机 session_id
 */
function generateSessionId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 21; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

/**
 * 从 SSE 响应中提取音频 URL
 * Coze workflow stream_run 返回 SSE 流：
 *   1. tool_request 事件 — 调用 text_to_speech 工具
 *   2. tool_response 事件 — 工具返回结果，包含音频 URL
 *   3. answer 事件 — 流式文本回复（描述性文字）
 * 
 * 音频 URL 在 tool_response.result 中，格式为纯文本包含 URL
 */
function extractAudioFromSse(sseText: string): { url?: string } {
  const blocks = sseText.split('\n\n');

  for (const block of blocks) {
    const dataLines = block
      .split('\n')
      .filter((l) => l.startsWith('data:'))
      .map((l) => l.slice(5).trim());
    if (dataLines.length === 0) continue;
    const dataText = dataLines.join('\n');

    try {
      const parsed = JSON.parse(dataText);

      // 优先：tool_response 事件中的 result 字段
      if (parsed?.type === 'tool_response' && parsed?.content?.tool_response?.result) {
        const result = parsed.content.tool_response.result;
        const resultStr = typeof result === 'string' ? result : JSON.stringify(result);
        const urlMatch = resultStr.match(/https?:\/\/[^\s"'<>]+\.(?:mp3|wav|m4a|aac|ogg)[^\s"'<>]*/i);
        if (urlMatch) {
          return { url: urlMatch[0] };
        }
      }
    } catch {
      // 非 JSON，跳过
    }
  }

  // 降级：在整个 SSE 文本中搜索音频 URL
  const rawUrlMatch = sseText.match(/https?:\/\/[^\s"'<>]+\.(?:mp3|wav|m4a|aac|ogg)[^\s"'<>]*/i);
  if (rawUrlMatch) return { url: rawUrlMatch[0] };

  console.warn('[Coze TTS] 未能从 SSE 响应中提取音频 URL');
  return {};
}

/**
 * 调用扣子 Coze 音频生成工作流（含重试）
 * @param text 朗读文本
 * @param outputPath 输出 MP3 文件绝对路径
 * @returns 成功返回 true，失败返回 false
 */
export async function generateCozeTts(
  text: string,
  outputPath: string,
): Promise<boolean> {
  if (!COZE_TTS_API_KEY) {
    console.warn('[Coze TTS] COZE_TTS_API_KEY 未配置，跳过');
    return false;
  }

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 1) {
      console.log(`[Coze TTS] 第 ${attempt} 次重试...`);
      await new Promise((r) => setTimeout(r, 3000 * (attempt - 1)));
    }

    const ok = await generateCozeTtsOnce(text, outputPath);
    if (ok) return true;
  }

  console.warn(`[Coze TTS] ${MAX_RETRIES} 次调用全部失败`);
  return false;
}

/**
 * 单次调用 Coze TTS
 */
async function generateCozeTtsOnce(
  text: string,
  outputPath: string,
): Promise<boolean> {
  const sessionId = generateSessionId();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600_000); // 10 分钟超时

  try {
    const payload = {
      content: {
        query: {
          prompt: [
            {
              type: 'text',
              content: { text },
            },
          ],
        },
      },
      type: 'query',
      session_id: sessionId,
      project_id: COZE_TTS_PROJECT_ID,
    };

    console.log(`[Coze TTS] 请求音频生成 (text: ${text.length} chars, session: ${sessionId})`);

    const res = await fetch(COZE_TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COZE_TTS_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.warn(`[Coze TTS] API 请求失败: ${res.status} ${res.statusText} - ${errBody.slice(0, 500)}`);
      return false;
    }

    if (!res.body) {
      console.warn('[Coze TTS] 无响应体');
      return false;
    }

    // 读取 SSE 流
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });
    }
    sseBuffer += decoder.decode(); // flush

    // 从 SSE 响应中提取音频
    const audio = extractAudioFromSse(sseBuffer);

    if (audio.url) {
      // 下载音频文件
      console.log(`[Coze TTS] 获取到音频 URL: ${audio.url}`);
      const audioRes = await fetch(audio.url);
      if (!audioRes.ok) {
        console.warn(`[Coze TTS] 下载音频失败: ${audioRes.status}`);
        return false;
      }
      const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, audioBuffer);
      console.log(`[Coze TTS] 音频已保存: ${outputPath} (${audioBuffer.length} bytes)`);
      return true;
    }

    console.warn('[Coze TTS] 未提取到音频数据');
    return false;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn('[Coze TTS] 请求超时');
    } else {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[Coze TTS] 调用异常: ${message}`);
    }
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

/* ------------------------------------------------------------------ */
// 统一入口

/**
 * 生成 TTS 音频，使用扣子 Coze 音频生成 API。
 * @param text 要朗读的文本
 * @param outputPath 输出 MP3 文件的绝对路径
 * @returns 返回输出路径
 * @throws 出错时抛出清晰错误
 */
export async function generateLocalTts(
  text: string,
  outputPath: string,
): Promise<string> {
  const ok = await generateCozeTts(text, outputPath);
  if (!ok) {
    throw new Error('[TTS] Coze 音频生成失败，请检查 COZE_TTS_API_KEY 配置');
  }
  return outputPath;
}

/* ------------------------------------------------------------------ */
// MP3 时长解析（纯 JS，不依赖 ffprobe）

/**
 * 从 MP3 文件 Buffer 解析时长（秒）
 * 支持 CBR 和 VBR，通过遍历 MP3 帧头计算
 */
function parseMp3Duration(buffer: Buffer): number {
  // 跳过 ID3v2 标签
  let offset = 0;
  if (buffer.length > 10 && buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) {
    const size = (buffer[6] & 0x7f) * 0x200000 + (buffer[7] & 0x7f) * 0x4000 + (buffer[8] & 0x7f) * 0x80 + (buffer[9] & 0x7f);
    offset = 10 + size;
  }

  // 比特率表 [version][layer][index]
  // version: 3=MPEG1, 2=MPEG2, 0=MPEG2.5
  // layer: 3=Layer I, 2=Layer II, 1=Layer III
  const bitrateTables: Record<number, Record<number, number[]>> = {
    3: { // MPEG1
      3: [0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,0],
      2: [0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,0],
      1: [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0],
    },
    2: { // MPEG2
      3: [0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,0],
      2: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0],
      1: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0],
    },
    0: { // MPEG2.5
      3: [0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,0],
      2: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0],
      1: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0],
    },
  };

  // 采样率表 [version][index]
  const sampleRateTables: Record<number, number[]> = {
    3: [44100, 48000, 32000, 0],   // MPEG1
    2: [22050, 24000, 16000, 0],   // MPEG2
    0: [11025, 12000, 8000, 0],    // MPEG2.5
  };

  let totalFrames = 0;
  let totalDuration = 0;
  let pos = offset;

  while (pos + 4 < buffer.length) {
    if (buffer[pos] !== 0xff || (buffer[pos + 1] & 0xe0) !== 0xe0) {
      pos++;
      continue;
    }

    const b1 = buffer[pos + 1];
    const b2 = buffer[pos + 2];
    const b3 = buffer[pos + 3];

    // MPEG version (bits 12-11 of header → bits 4-3 of byte1)
    const mpegVersion = (b1 >> 3) & 0x3;
    // Layer (bits 10-9 → bits 2-1 of byte1, inverted)
    const layer = 4 - ((b1 >> 1) & 0x3);
    if (layer === 4) { pos++; continue; }

    // Bitrate index (bits 7-4 → high nibble of byte2)
    const bitrateIdx = (b2 >> 4) & 0xf;
    // Sample rate index (bits 3-2 → bits 3-2 of byte2)
    const sampleRateIdx = (b2 >> 2) & 0x3;
    // Padding (bit 1 → bit 1 of byte2)
    const padding = (b2 >> 1) & 0x1;

    if (bitrateIdx === 0 || bitrateIdx === 0xf) { pos++; continue; }

    const bitrateTable = bitrateTables[mpegVersion]?.[layer];
    const sampleRateTable = sampleRateTables[mpegVersion];
    if (!bitrateTable || !sampleRateTable) { pos++; continue; }

    const bitrate = bitrateTable[bitrateIdx] * 1000;
    const sampleRate = sampleRateTable[sampleRateIdx];
    if (!bitrate || !sampleRate) { pos++; continue; }

    // 帧大小和每帧采样数取决于 layer 和 version
    let samplesPerFrame: number;
    let frameSize: number;

    if (layer === 3) {
      // Layer I: 384 samples, frameSize = floor(12 * bitrate / sampleRate) + padding*4
      samplesPerFrame = 384;
      frameSize = Math.floor((12 * bitrate) / sampleRate) * 4 + padding * 4;
    } else if (layer === 2) {
      // Layer II: 1152 samples
      samplesPerFrame = 1152;
      frameSize = Math.floor((144 * bitrate) / sampleRate) + padding;
    } else {
      // Layer III: MPEG1=1152, MPEG2/2.5=576
      samplesPerFrame = (mpegVersion === 3) ? 1152 : 576;
      frameSize = Math.floor((144 * bitrate) / sampleRate) + padding;
    }

    if (frameSize <= 0) { pos++; continue; }

    totalFrames++;
    totalDuration += samplesPerFrame / sampleRate;
    pos += frameSize;
  }

  if (totalFrames === 0) {
    return Math.round((buffer.length * 8) / 128000);
  }

  return Math.round(totalDuration);
}

/**
 * 获取音频文件时长（秒）。优先用 ffprobe，降级到纯 JS MP3 解析。
 * @param audioPath 音频文件绝对路径
 * @returns 时长秒数
 */
export async function getAudioDuration(audioPath: string): Promise<number> {
  // 尝试 ffprobe
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      audioPath,
    ]);
    const duration = parseFloat(stdout.trim());
    if (!Number.isNaN(duration) && duration > 0) {
      return Math.round(duration);
    }
  } catch {
    // ffprobe 不可用，降级
  }

  // macOS afinfo fallback
  try {
    const { stdout } = await execFileAsync('afinfo', [audioPath]);
    const match = stdout.match(/estimated duration:\s*([\d.]+)/);
    if (match) {
      const duration = parseFloat(match[1]);
      if (!Number.isNaN(duration) && duration > 0) {
        return Math.round(duration);
      }
    }
  } catch {
    // afinfo 不可用，降级
  }

  // 纯 JS MP3 解析
  const { readFileSync } = await import('fs');
  const buffer = readFileSync(audioPath);
  const duration = parseMp3Duration(buffer);
  console.log(`[TTS] 纯JS解析MP3时长: ${duration}s (文件大小: ${buffer.length} bytes)`);
  return duration;
}
