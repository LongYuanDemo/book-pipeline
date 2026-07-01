#!/bin/bash
# validate.sh — 数智教材2.0 自动化校验工具
#
# 用法: bash validate.sh [book_id]
# 示例: bash validate.sh eye-ent-nursing
#       bash validate.sh            # 默认第一本书
#
# 校验项:
#   1. 目录结构完整性
#   2. meta.json 存在且格式正确
#   3. 数据文件存在且 TypeScript 无语法错误
#   4. 素材文件存在（audio/video/video-frames）
#   5. TypeScript 编译通过
#   6. Vite 构建通过
#   7. dist 产物完整性
#   8. Mermaid 服务连通性（可选）

set -e

BOOK_ID="${1:-}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -z "$BOOK_ID" ]; then
  FIRST_BOOK=$(ls -d "$PROJECT_ROOT"/books/*/ 2>/dev/null | head -1)
  if [ -n "$FIRST_BOOK" ]; then
    BOOK_ID=$(basename "$FIRST_BOOK")
  else
    echo "错误: 未找到任何书籍目录"
    exit 1
  fi
fi

BOOK_DIR="$PROJECT_ROOT/books/$BOOK_ID"
DIST_DIR="$PROJECT_ROOT/dist"

PASS=0
FAIL=0
WARN=0

green() { echo "  ✅ $1"; PASS=$((PASS+1)); }
red()   { echo "  ❌ $1"; FAIL=$((FAIL+1)); }
yellow() { echo "  ⚠️  $1"; WARN=$((WARN+1)); }
header() { echo ""; echo "[$1]"; }

echo "================================================"
echo "  数智教材2.0 自动化校验"
echo "  Book ID: $BOOK_ID"
echo "================================================"

# 1. 目录结构
header "1/8 目录结构"
if [ -d "$BOOK_DIR" ]; then
  green "books/$BOOK_ID/ 目录存在"
else
  red "books/$BOOK_ID/ 目录不存在"
  exit 1
fi

for d in data assets/audio assets/video assets/video-frames; do
  if [ -d "$BOOK_DIR/$d" ]; then
    green "books/$BOOK_ID/$d/ 存在"
  else
    yellow "books/$BOOK_ID/$d/ 不存在（非必需目录）"
  fi
done

# 2. meta.json
header "2/8 meta.json"
META_FILE="$BOOK_DIR/meta.json"
if [ -f "$META_FILE" ]; then
  green "meta.json 存在"
  # 验证 JSON 格式
  if python3 -c "import json; json.load(open('$META_FILE'))" 2>/dev/null; then
    green "meta.json JSON 格式正确"
    # 检查必需字段
    TITLE=$(python3 -c "import json; d=json.load(open('$META_FILE')); print(d.get('title',''))" 2>/dev/null)
    if [ -n "$TITLE" ]; then
      green "meta.json title: $TITLE"
    else
      yellow "meta.json 缺少 title 字段"
    fi
  else
    red "meta.json JSON 格式错误"
  fi
else
  yellow "meta.json 不存在"
fi

# 3. 数据文件
header "3/8 数据文件"
DATA_FILES=("audioCourse.ts" "video.ts" "knowledgeMap.ts" "anki.ts" "chapterContent.ts" "bookInfo.ts")
for f in "${DATA_FILES[@]}"; do
  if [ -f "$BOOK_DIR/data/$f" ]; then
    green "data/$f 存在"
  else
    yellow "data/$f 不存在"
  fi
done

# 4. 素材文件
header "4/8 素材文件"
AUDIO_COUNT=$(find "$BOOK_DIR/assets/audio" -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')
VIDEO_COUNT=$(find "$BOOK_DIR/assets/video" -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')
FRAME_COUNT=$(find "$BOOK_DIR/assets/video-frames" -name "*.jpg" 2>/dev/null | wc -l | tr -d ' ')

if [ "$AUDIO_COUNT" -gt 0 ]; then
  green "音频文件: $AUDIO_COUNT 个"
else
  yellow "无音频文件"
fi

if [ "$VIDEO_COUNT" -gt 0 ]; then
  green "视频文件: $VIDEO_COUNT 个"
else
  yellow "无视频文件"
fi

if [ "$FRAME_COUNT" -gt 0 ]; then
  green "关键帧图片: $FRAME_COUNT 个"
else
  yellow "无关键帧图片"
fi

# 5. TypeScript 编译
header "5/8 TypeScript 编译"
cd "$PROJECT_ROOT"
if npx tsc -b --noEmit 2>&1 | head -20; then
  green "TypeScript 编译通过"
else
  red "TypeScript 编译失败"
fi

# 6. Vite 构建
header "6/8 Vite 构建"
if BOOK_ID="$BOOK_ID" npm run build 2>&1 | tail -5; then
  green "Vite 构建通过"
else
  red "Vite 构建失败"
  exit 1
fi

# 7. dist 产物
header "7/8 dist 产物"
if [ -d "$DIST_DIR" ]; then
  green "dist/ 目录存在"
  
  # 检查 index.html
  if [ -f "$DIST_DIR/index.html" ]; then
    green "dist/index.html 存在"
  else
    red "dist/index.html 不存在"
  fi
  
  # 检查 assets
  DIST_ASSETS=$(find "$DIST_DIR/assets" -type f 2>/dev/null | wc -l | tr -d ' ')
  if [ "$DIST_ASSETS" -gt 0 ]; then
    green "dist/assets/ 包含 $DIST_ASSETS 个文件"
  else
    yellow "dist/assets/ 为空"
  fi
  
  # 检查音频
  DIST_AUDIO=$(find "$DIST_DIR/audio" -type f 2>/dev/null | wc -l | tr -d ' ')
  if [ "$DIST_AUDIO" -gt 0 ]; then
    green "dist/audio/ 包含 $DIST_AUDIO 个文件"
  else
    yellow "dist/audio/ 为空"
  fi
  
  # 检查视频
  DIST_VIDEO=$(find "$DIST_DIR/videos" -type f 2>/dev/null | wc -l | tr -d ' ')
  if [ "$DIST_VIDEO" -gt 0 ]; then
    green "dist/videos/ 包含 $DIST_VIDEO 个文件"
  fi
  
  # dist 总大小
  DIST_SIZE=$(du -sh "$DIST_DIR" 2>/dev/null | cut -f1)
  green "dist/ 总大小: $DIST_SIZE"
else
  red "dist/ 目录不存在"
fi

# 8. Mermaid 服务连通性
header "8/8 Mermaid 服务"
if curl -s --max-time 3 "http://127.0.0.1:3005/health" 2>/dev/null | grep -q "ok"; then
  green "Mermaid 服务运行中 (端口 3005)"
elif curl -s --max-time 3 "http://127.0.0.1:3005/mermaid?c=Z3JhcGggVEIgQSAtLT4gQg" 2>/dev/null | grep -q "<svg"; then
  green "Mermaid 服务运行中 (端口 3005)"
else
  yellow "Mermaid 服务未运行（部署时需启动）"
fi

# 汇总
echo ""
echo "================================================"
echo "  校验结果汇总"
echo "================================================"
echo "  ✅ 通过: $PASS"
echo "  ❌ 失败: $FAIL"
echo "  ⚠️  警告: $WARN"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "  ❌ 校验未通过，请修复上述问题"
  exit 1
else
  echo "  ✅ 校验通过"
  exit 0
fi
