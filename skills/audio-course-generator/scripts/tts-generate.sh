#!/bin/bash
# tts-generate.sh — 调用扣子 Coze 音频生成 API 将朗读稿生成为音频
#
# 用法: bash tts-generate.sh <script_file> <output_mp3>
# 示例: bash tts-generate.sh scripts/l1.txt books/<bookId>/assets/audio/l1.mp3
#
# 前提:
#   - .env 中已配置 COZE_TTS_API_KEY 和 COZE_TTS_PROJECT_ID
#   - 或环境变量 COZE_TTS_API_KEY 已设置
#   - 朗读稿为纯文本，无 Markdown 标记
#
# 输出: MP3 音频文件

set -e

SCRIPT_FILE="$1"
OUTPUT_MP3="$2"

if [ -z "$SCRIPT_FILE" ] || [ -z "$OUTPUT_MP3" ]; then
  echo "用法: bash tts-generate.sh <script_file> <output_mp3>"
  echo "示例: bash tts-generate.sh scripts/l1.txt books/<bookId>/assets/audio/l1.mp3"
  exit 1
fi

if [ ! -f "$SCRIPT_FILE" ]; then
  echo "错误: 朗读稿文件不存在: $SCRIPT_FILE"
  exit 1
fi

# 加载 .env（如果存在）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
if [ -f "$PROJECT_ROOT/.env" ]; then
  export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
fi

mkdir -p "$(dirname "$OUTPUT_MP3")"

echo "=== TTS 生成工具 (Coze 音频生成) ==="
echo "朗读稿: $SCRIPT_FILE"
echo "输出: $OUTPUT_MP3"
echo ""

# 使用 Node.js 调用（复用 tts.ts 模块）
npx tsx -e "
import { generateLocalTts, getAudioDuration } from '${PROJECT_ROOT}/skills/shared/tts.ts';
import { readFileSync } from 'fs';

const text = readFileSync('${SCRIPT_FILE}', 'utf-8').trim();
const outputPath = '${OUTPUT_MP3}';

console.log('朗读稿字数:', text.length);
await generateLocalTts(text, outputPath);
const duration = await getAudioDuration(outputPath);
console.log('音频时长:', duration, '秒');
console.log('TTS 完成:', outputPath);
"
