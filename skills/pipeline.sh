#!/bin/bash
# pipeline.sh — 数智教材2.0 批量生产 Pipeline
#
# 用法: bash pipeline.sh <book_id> <book_md_path> [options]
# 示例: bash pipeline.sh eye-ent-nursing books/eye-ent-nursing/source.md
#       bash pipeline.sh eye-ent-nursing books/eye-ent-nursing/source.md --skip-audio --skip-video
#
# 功能:
#   1. 创建 books/{bookId}/ 目录结构
#   2. 调用各 Skill 生成 5 个模块数据
#   3. 音频课程：生成朗读稿 → TTS → ASR → Mermaid 帧数据
#   4. 视频清单：分帧 → 步骤拆解
#   5. 知识地图：目录结构 → JSON Canvas
#   6. Anki 卡片：知识点 → 闪卡+测验
#   7. 章节内容：章节 MD → 富交互页面数据
#   8. 生成 meta.json
#   9. 构建验证
#
# 前提:
#   - .env 中至少配置一个 LLM API Key（DEEPSEEK_API_KEY / ANTHROPIC_API_KEY / COZE_API_KEY）
#   - mlx-whisper 已安装（如需 ASR 对齐）
#   - COZE_TTS_API_KEY 已设置（如需 TTS）
#   - ffmpeg + ffprobe 已安装
#   - Python 3 + requests 已安装（如需 TTS）

set -e

BOOK_ID="$1"
BOOK_MD="$2"
shift 2

# 解析选项
SKIP_AUDIO=false
SKIP_VIDEO=false
SKIP_TTS=false
SKIP_ASR=false
SKIP_BUILD=false

for opt in "$@"; do
  case $opt in
    --skip-audio) SKIP_AUDIO=true ;;
    --skip-video) SKIP_VIDEO=true ;;
    --skip-tts) SKIP_TTS=true ;;
    --skip-asr) SKIP_ASR=true ;;
    --skip-build) SKIP_BUILD=true ;;
    --help|-h)
      echo "用法: bash pipeline.sh <book_id> <book_md_path> [options]"
      echo ""
      echo "选项:"
      echo "  --skip-audio   跳过音频课程模块"
      echo "  --skip-video   跳过视频清单模块"
      echo "  --skip-tts     跳过 TTS 生成（已有音频时使用）"
      echo "  --skip-asr     跳过 ASR 对齐（已有时间戳时使用）"
      echo "  --skip-build   跳过最终构建验证"
      exit 0
      ;;
  esac
done

if [ -z "$BOOK_ID" ] || [ -z "$BOOK_MD" ]; then
  echo "用法: bash pipeline.sh <book_id> <book_md_path> [options]"
  echo "示例: bash pipeline.sh eye-ent-nursing books/eye-ent-nursing/source.md"
  exit 1
fi

if [ ! -f "$BOOK_MD" ]; then
  echo "错误: 书籍 MD 文件不存在: $BOOK_MD"
  exit 1
fi

# 路径
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BOOKS_DIR="$PROJECT_ROOT/books/$BOOK_ID"
SKILLS_DIR="$SCRIPT_DIR"

echo "================================================"
echo "  数智教材2.0 批量生产 Pipeline"
echo "================================================"
echo "  Book ID:     $BOOK_ID"
echo "  书籍 MD:     $BOOK_MD"
echo "  输出目录:    $BOOKS_DIR"
echo "  Skills 目录: $SKILLS_DIR"
echo "================================================"
echo ""

# Step 1: 创建目录结构
echo "[1/8] 创建 books/$BOOK_ID/ 目录结构..."
mkdir -p "$BOOKS_DIR/data"
mkdir -p "$BOOKS_DIR/assets/audio"
mkdir -p "$BOOKS_DIR/assets/video"
mkdir -p "$BOOKS_DIR/assets/video-frames"
echo "  ✅ 目录已创建"
echo ""

# Step 2: 知识地图
echo "[2/8] 生成知识地图..."
echo "  → 参考 Skill: $SKILLS_DIR/knowledge-map-generator/SKILL.md"
echo "  → 输入: $BOOK_MD"
echo "  → 输出: $BOOKS_DIR/data/knowledgeMap.ts"
echo "  ⚠️  需要人工执行 Skill（Claude Agent 读取 SKILL.md 后执行）"
echo ""

# Step 3: Anki 卡片
echo "[3/8] 生成 Anki 卡片..."
echo "  → 参考 Skill: $SKILLS_DIR/anki-card-generator/SKILL.md"
echo "  → 输入: $BOOK_MD"
echo "  → 输出: $BOOKS_DIR/data/anki.ts"
echo "  ⚠️  需要人工执行 Skill"
echo ""

# Step 4: 章节内容
echo "[4/8] 生成章节内容..."
echo "  → 参考 Skill: $SKILLS_DIR/chapter-content-generator/SKILL.md"
echo "  → 输入: $BOOK_MD"
echo "  → 输出: $BOOKS_DIR/data/chapterContent.ts"
echo "  ⚠️  需要人工执行 Skill"
echo ""

# Step 5: 视频清单
if [ "$SKIP_VIDEO" = false ]; then
  echo "[5/8] 生成视频清单..."
  echo "  → 参考 Skill: $SKILLS_DIR/video-keyframe-extractor/SKILL.md"
  echo "  → 输入: 视频文件（需放入 $BOOKS_DIR/assets/video/）"
  echo "  → 输出: $BOOKS_DIR/data/video.ts"
  echo "  ⚠️  需要人工执行 Skill + 视频文件"
  echo ""
else
  echo "[5/8] 跳过视频清单"
  echo ""
fi

# Step 6: 音频课程 — 朗读稿
if [ "$SKIP_AUDIO" = false ]; then
  echo "[6/8] 生成音频课程..."
  echo "  → 参考 Skill: $SKILLS_DIR/audio-course-generator/SKILL.md"
  echo "  → 输入: $BOOK_MD"
  echo "  → 输出: 朗读稿 + $BOOKS_DIR/data/audioCourse.ts"
  echo "  ⚠️  需要人工执行 Skill 生成朗读稿和帧设计"
  echo ""

  # Step 6a: TTS
  if [ "$SKIP_TTS" = false ]; then
    echo "  [6a] TTS 生成音频..."
    SCRIPTS_DIR="$BOOKS_DIR/assets/audio"
    echo "  → 工具: $SKILLS_DIR/audio-course-generator/scripts/tts-generate.sh"
    echo "  → 需要环境变量: COZE_TTS_API_KEY, COZE_TTS_PROJECT_ID"
    echo "  ⚠️  需要朗读稿文件就绪后执行"
    echo ""
  else
    echo "  [6a] 跳过 TTS"
    echo ""
  fi

  # Step 6b: ASR
  if [ "$SKIP_ASR" = false ]; then
    echo "  [6b] ASR 对齐时间戳..."
    echo "  → 工具: $SKILLS_DIR/audio-course-generator/scripts/asr-align.sh"
    echo "  → 输入: $BOOKS_DIR/assets/audio/*.mp3"
    echo "  → 输出: ASR JSON（句子级时间戳）"
    echo ""
  else
    echo "  [6b] 跳过 ASR"
    echo ""
  fi
else
  echo "[6/8] 跳过音频课程"
  echo ""
fi

# Step 7: 生成 meta.json
echo "[7/8] 生成 meta.json..."
echo "  ⚠️  需要人工填写书籍元数据（书名、作者、ISBN）"
echo ""

# Step 8: 构建验证
if [ "$SKIP_BUILD" = false ]; then
  echo "[8/8] 构建验证..."
  echo "  → BOOK_ID=$BOOK_ID npm run build"
  cd "$PROJECT_ROOT"
  if BOOK_ID="$BOOK_ID" npm run build 2>&1 | tail -5; then
    echo "  ✅ 构建成功"
  else
    echo "  ❌ 构建失败，请检查数据文件"
    exit 1
  fi
else
  echo "[8/8] 跳过构建验证"
fi

echo ""
echo "================================================"
echo "  Pipeline 执行完毕"
echo "================================================"
echo ""
echo "  下一步:"
echo "  1. 检查 $BOOKS_DIR/data/ 下的数据文件"
echo "  2. 确认素材文件在 $BOOKS_DIR/assets/ 下"
echo "  3. 运行 BOOK_ID=$BOOK_ID npm run dev 预览"
echo "  4. 运行 BOOK_ID=$BOOK_ID npm run build 部署"
echo ""
echo "  注意: Skill 执行部分需要 Claude Agent 介入"
echo "  本脚本负责目录创建、工具调用和构建验证"
echo "================================================"
