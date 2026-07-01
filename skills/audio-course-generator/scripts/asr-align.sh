#!/bin/bash
# asr-align.sh — 用 mlx-whisper 对音频做 ASR，输出句子级时间戳 JSON
#
# 用法: bash asr-align.sh <audio_file> [output_json]
# 示例: bash asr-align.sh books/<bookId>/assets/audio/l1.mp3 output/asr-l1.json
#
# 前提:
#   - 已安装 mlx-whisper (pip install mlx-whisper)
#   - 模型: mlx-community/whisper-large-v3-turbo
#
# 输出: JSON 文件，包含 sentences 数组，每个元素 {text, start, end}

set -e

AUDIO_FILE="$1"
OUTPUT_JSON="${2:-output/asr-$(basename "${AUDIO_FILE%.*}").json}"

if [ -z "$AUDIO_FILE" ]; then
  echo "用法: bash asr-align.sh <audio_file> [output_json]"
  echo "示例: bash asr-align.sh books/<bookId>/assets/audio/l1.mp3 output/asr-l1.json"
  exit 1
fi

if [ ! -f "$AUDIO_FILE" ]; then
  echo "错误: 音频文件不存在: $AUDIO_FILE"
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT_JSON")"

echo "=== ASR 对齐工具 ==="
echo "音频文件: $AUDIO_FILE"
echo "输出文件: $OUTPUT_JSON"
echo ""

MODEL="mlx-community/whisper-large-v3-turbo"

python3 -c "
import json
import mlx_whisper

result = mlx_whisper.transcribe(
    '$AUDIO_FILE',
    path_or_hf_repo='$MODEL',
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

with open('$OUTPUT_JSON', 'w', encoding='utf-8') as f:
    json.dump({'sentences': sentences}, f, ensure_ascii=False, indent=2)

print(f'ASR 完成: {len(sentences)} 个句子')
for s in sentences[:5]:
    print(f'  [{s[\"start\"]:.1f}-{s[\"end\"]:.1f}] {s[\"text\"][:40]}...')
if len(sentences) > 5:
    print(f'  ... 共 {len(sentences)} 句')
"

echo ""
echo "=== ASR 完成 ==="
echo "输出: $OUTPUT_JSON"
