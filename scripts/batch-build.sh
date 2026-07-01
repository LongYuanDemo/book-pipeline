#!/bin/bash
# batch-build.sh — 数智教材2.0 批量构建+校验脚本
#
# 用法: bash batch-build.sh [book_ids...]
# 示例: bash batch-build.sh eye-ent-nursing critical-care-nursing
#       bash batch-build.sh                    # 构建所有 books/ 下的书
#
# 功能:
#   1. 扫描 books/ 目录或使用指定的 bookId 列表
#   2. 逐个构建 + 校验
#   3. 汇总结果
#   4. 打包每本书为独立 zip

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BOOKS_DIR="$PROJECT_ROOT/books"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 获取书单
if [ $# -gt 0 ]; then
  BOOK_IDS=("$@")
else
  # 扫描 books/ 目录
  BOOK_IDS=()
  for d in "$BOOKS_DIR"/*/; do
    if [ -d "$d" ]; then
      BOOK_IDS+=("$(basename "$d")")
    fi
  done
fi

if [ ${#BOOK_IDS[@]} -eq 0 ]; then
  echo "未找到任何书籍，books/ 目录为空"
  exit 1
fi

echo "================================================"
echo "  数智教材2.0 批量构建"
echo "  书籍数量: ${#BOOK_IDS[@]}"
echo "  书单: ${BOOK_IDS[*]}"
echo "================================================"

PASS=0
FAIL=0
RESULTS=()

for BOOK_ID in "${BOOK_IDS[@]}"; do
  echo ""
  echo "────────────────────────────────────────"
  echo "  构建: $BOOK_ID"
  echo "────────────────────────────────────────"

  # 构建
  cd "$PROJECT_ROOT"
  if BOOK_ID="$BOOK_ID" npm run build 2>&1 | tail -3; then
    BUILD_OK=true
  else
    BUILD_OK=false
  fi

  # 校验
  if [ "$BUILD_OK" = true ]; then
    if bash "$SCRIPT_DIR/validate.sh" "$BOOK_ID" 2>&1 | grep -q "校验通过"; then
      VALIDATE_OK=true
    else
      VALIDATE_OK=false
    fi
  else
    VALIDATE_OK=false
  fi

  # 打包
  if [ "$VALIDATE_OK" = true ]; then
    ZIP_FILE="$PROJECT_ROOT/dist-${BOOK_ID}-${TIMESTAMP}.zip"
    cd "$PROJECT_ROOT"
    zip -r "$ZIP_FILE" dist/ -x "dist/.DS_Store" "dist/**/*.DS_Store" 2>/dev/null
    ZIP_SIZE=$(du -sh "$ZIP_FILE" | cut -f1)
    RESULTS+=("✅ $BOOK_ID → dist-${BOOK_ID}-${TIMESTAMP}.zip ($ZIP_SIZE)")
    PASS=$((PASS+1))
  else
    RESULTS+=("❌ $BOOK_ID → 构建或校验失败")
    FAIL=$((FAIL+1))
  fi
done

# 汇总
echo ""
echo "================================================"
echo "  批量构建结果"
echo "================================================"
for r in "${RESULTS[@]}"; do
  echo "  $r"
done
echo ""
echo "  ✅ 成功: $PASS"
echo "  ❌ 失败: $FAIL"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "  ❌ 部分书籍构建失败，请检查"
  exit 1
else
  echo "  ✅ 全部构建成功"
  exit 0
fi
