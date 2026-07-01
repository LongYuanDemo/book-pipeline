#!/bin/bash
# deploy.sh — 数智教材2.0 一键部署脚本
#
# 用法: bash deploy.sh <book_id> [mode]
# 示例: bash deploy.sh eye-ent-nursing zip       # 打包 dist 为 zip
#       bash deploy.sh eye-ent-nursing rsync     # rsync 到远程服务器
#       bash deploy.sh eye-ent-nursing local     # 仅本地构建+校验
#
# 功能:
#   1. 构建指定书籍
#   2. 自动校验
#   3. 打包 dist/ 为 zip 或 rsync 到远程
#
# 环境变量（rsync 模式）:
#   DEPLOY_HOST — 目标服务器（如 user@server.com）
#   DEPLOY_PATH — 目标路径（如 /opt/textbook）

set -e

BOOK_ID="${1:-}"
MODE="${2:-zip}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

if [ -z "$BOOK_ID" ]; then
  echo "用法: bash deploy.sh <book_id> [mode]"
  echo "示例: bash deploy.sh eye-ent-nursing zip"
  exit 1
fi

echo "================================================"
echo "  数智教材2.0 部署工具"
echo "  Book ID: $BOOK_ID"
echo "  模式:    $MODE"
echo "================================================"

# Step 1: 构建
echo ""
echo "[1/3] 构建中..."
cd "$PROJECT_ROOT"
BOOK_ID="$BOOK_ID" npm run build 2>&1 | tail -5
echo "  ✅ 构建完成"

# Step 2: 校验
echo ""
echo "[2/3] 校验中..."
if bash "$SCRIPT_DIR/validate.sh" "$BOOK_ID" 2>&1 | grep -q "校验通过"; then
  echo "  ✅ 校验通过"
else
  echo "  ❌ 校验失败，终止部署"
  exit 1
fi

# Step 3: 部署
echo ""
echo "[3/3] 部署中..."

case $MODE in
  zip)
    ZIP_FILE="$PROJECT_ROOT/dist-${BOOK_ID}-${TIMESTAMP}.zip"
    cd "$PROJECT_ROOT"
    # 打包 dist/ + server/ + package.json + 部署指南 + ecosystem.config.js
    zip -r "$ZIP_FILE" \
      dist/ \
      server/ \
      package.json \
      tsconfig.json \
      tsconfig.app.json \
      tsconfig.node.json \
      部署指南.md \
      -x "dist/.DS_Store" "dist/**/*.DS_Store" "server/.DS_Store" 2>/dev/null
    ZIP_SIZE=$(du -sh "$ZIP_FILE" | cut -f1)
    echo "  ✅ 打包完成: $ZIP_FILE ($ZIP_SIZE)"
    echo ""
    echo "  包含内容:"
    echo "    dist/          — 前端静态文件"
    echo "    server/         — Mermaid 渲染服务"
    echo "    package.json    — 依赖配置"
    echo "    部署指南.md      — 部署说明"
    echo ""
    echo "  上传方式:"
    echo "    scp $ZIP_FILE user@server:/opt/textbook/"
    echo "    ssh user@server 'cd /opt/textbook && unzip -o $(basename $ZIP_FILE)'"
    echo ""
    echo "  服务器首次部署:"
    echo "    cd /opt/textbook"
    echo "    PUPPETEER_SKIP_DOWNLOAD=true npm install --registry=https://registry.npmmirror.com"
    echo "    pm2 start server/mermaid-server.ts --interpreter npx --interpreter tsx --name mermaid-server"
    ;;

  rsync)
    if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_PATH" ]; then
      echo "  ❌ rsync 模式需要设置环境变量:"
      echo "     export DEPLOY_HOST=user@server.com"
      echo "     export DEPLOY_PATH=/opt/textbook"
      exit 1
    fi
    echo "  → rsync → $DEPLOY_HOST:$DEPLOY_PATH/"
    rsync -avz --delete --exclude='.DS_Store' --exclude='node_modules' \
      "$DIST_DIR/" "$DEPLOY_HOST:$DEPLOY_PATH/dist/"
    rsync -avz --exclude='.DS_Store' --exclude='node_modules' \
      "$PROJECT_ROOT/server/" "$DEPLOY_HOST:$DEPLOY_PATH/server/"
    rsync -avz "$PROJECT_ROOT/package.json" "$DEPLOY_HOST:$DEPLOY_PATH/package.json"
    rsync -avz "$PROJECT_ROOT/tsconfig.json" "$DEPLOY_HOST:$DEPLOY_PATH/tsconfig.json" 2>/dev/null || true
    rsync -avz "$PROJECT_ROOT/tsconfig.app.json" "$DEPLOY_HOST:$DEPLOY_PATH/tsconfig.app.json" 2>/dev/null || true
    rsync -avz "$PROJECT_ROOT/tsconfig.node.json" "$DEPLOY_HOST:$DEPLOY_PATH/tsconfig.node.json" 2>/dev/null || true
    echo "  ✅ rsync 完成"

    # 提示重启 Mermaid 服务
    echo ""
    echo "  ⚠️  请确认远程 Mermaid 服务运行中:"
    echo "    ssh $DEPLOY_HOST 'cd $DEPLOY_PATH && pm2 restart mermaid-server'"
    ;;

  local)
    echo "  ✅ 本地构建+校验完成，dist/ 已就绪"
    echo "  → 预览: cd $PROJECT_ROOT && npx vite preview --host 0.0.0.0"
    ;;

  *)
    echo "  ❌ 未知模式: $MODE"
    echo "  可用模式: zip, rsync, local"
    exit 1
    ;;
esac

echo ""
echo "================================================"
echo "  部署完成"
echo "================================================"
