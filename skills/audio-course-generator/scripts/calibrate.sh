#!/bin/bash
# calibrate.sh — 校准音频时间戳 + 拼接分段音频
#
# 用法: bash calibrate.sh <chapter_id> <segments_dir> <output_dir>
# 示例: bash calibrate.sh ch01 tts_segments/ch01 output/ch01
#
# 前提:
#   - segments_dir 中有 frame_000.wav, frame_001.wav, ... 文件
#   - segments_dir 中有 frame_000.txt, frame_001.txt, ... 文件（用于字数统计）
#   - 已安装 ffprobe 和 ffmpeg
#   - 已生成预估 JSON 文件（含 frames 数组和 Mermaid 内容）

set -e

CHAPTER_ID="$1"
SEGMENTS_DIR="$2"
OUTPUT_DIR="$3"

if [ -z "$CHAPTER_ID" ] || [ -z "$SEGMENTS_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "用法: bash calibrate.sh <chapter_id> <segments_dir> <output_dir>"
  echo "示例: bash calibrate.sh ch01 tts_segments/ch01 output/ch01"
  exit 1
fi

echo "=== 音频课程校准工具 ==="
echo "章节 ID: $CHAPTER_ID"
echo "分段目录: $SEGMENTS_DIR"
echo "输出目录: $OUTPUT_DIR"
echo ""

# 创建输出目录
mkdir -p "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/frames"

# 收集所有音频分段（按顺序）
WAV_FILES=($(ls "$SEGMENTS_DIR"/frame_*.wav 2>/dev/null | sort))
TXT_FILES=($(ls "$SEGMENTS_DIR"/frame_*.txt 2>/dev/null | sort))

WAV_COUNT=${#WAV_FILES[@]}
TXT_COUNT=${#TXT_FILES[@]}

if [ "$WAV_COUNT" -eq 0 ]; then
  echo "错误: 在 $SEGMENTS_DIR 中未找到 frame_*.wav 文件"
  exit 1
fi

echo "找到 $WAV_COUNT 个音频分段, $TXT_COUNT 个文本分段"
echo ""

# 检测每段音频时长并累加
echo "--- 各段时长 ---"
TIMESTAMPS=()
CUMULATIVE=0
INITIAL_DELAY=5.0  # 初始引导延迟（秒）

# 第一帧的 start 时间（引导语之后）
TIMESTAMPS+=("$INITIAL_DELAY")

for i in "${!WAV_FILES[@]}"; do
  WAV_FILE="${WAV_FILES[$i]}"
  DURATION=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$WAV_FILE")
  echo "  frame_$(printf '%03d' $i).wav → ${DURATION}s"

  if [ "$i" -gt 0 ]; then
    CUMULATIVE=$(echo "$CUMULATIVE + $DURATION" | bc -l)
    # 加上初始延迟
    START=$(echo "$CUMULATIVE + $INITIAL_DELAY" | bc -l)
    TIMESTAMPS+=("$START")
  else
    CUMULATIVE=$DURATION
  fi
done

echo ""
echo "--- 校准后的时间戳 ---"
for i in "${!TIMESTAMPS[@]}"; do
  TS="${TIMESTAMPS[$i]}"
  # 格式化为 2 位小数
  TS_FORMATTED=$(printf "%.2f" "$TS")
  echo "  frame_$(printf '%03d' $i) → start: ${TS_FORMATTED}s"
done

# 用 ffmpeg 拼接所有音频分段
echo ""
echo "--- 拼接音频 ---"
CONCAT_LIST="$OUTPUT_DIR/concat_list.txt"
> "$CONCAT_LIST"
for WAV_FILE in "${WAV_FILES[@]}"; do
  echo "file '$(cd "$(dirname "$WAV_FILE")" && pwd)/$(basename "$WAV_FILE")'" >> "$CONCAT_LIST"
done

OUTPUT_WAV="$OUTPUT_DIR/${CHAPTER_ID}.wav"
ffmpeg -y -f concat -safe 0 -i "$CONCAT_LIST" -c copy "$OUTPUT_WAV" 2>/dev/null
echo "拼接完成: $OUTPUT_WAV"

# 获取总时长
TOTAL_DURATION=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$OUTPUT_WAV")
echo "总时长: ${TOTAL_DURATION}s"

# 清理临时文件
rm -f "$CONCAT_LIST"

echo ""
echo "=== 校准完成 ==="
echo "音频文件: $OUTPUT_WAV"
echo "时间戳已计算，请用以下值更新 JSON 文件中的 frames[].start"
echo ""
echo "时间戳列表（JSON 数组格式）:"
echo "["
for i in "${!TIMESTAMPS[@]}"; do
  TS_FORMATTED=$(printf "%.2f" "${TIMESTAMPS[$i]}")
  if [ "$i" -lt $((${#TIMESTAMPS[@]} - 1)) ]; then
    echo "  $TS_FORMATTED,"
  else
    echo "  $TS_FORMATTED"
  fi
done
echo "]"
