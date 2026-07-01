---
description: 生成或刷新项目工程监控看板（运行发现脚本→扫描输出→生成HTML）
---

# 生成工程监控看板

## Step 1: 运行模块发现脚本

```bash
npx tsx skills/monitor-dashboard-generator/scripts/discover-modules.ts --root . > /tmp/discovery.json
```

读取 `/tmp/discovery.json`，确认 `modules` 和 `entities` 不为空。如果 `warnings` 有内容或模块数为 0，向用户确认模块列表。

## Step 2: 扫描输出文件 + 读取手动状态

发现脚本的 JSON 已包含 `entityData[]`，每个实体有：
- `files[]`：`data/` 目录下的文件列表
- `config`：`meta.json` 中的模块开关
- `manualStatus`：`pipeline-status.md` 解析出的手动状态（如有）

检查 JSON 中 `entityData` 是否完整覆盖所有实体。如果某个实体缺少 `manualStatus` 但项目中有 `pipeline-status.md`，手动补充解析。

## Step 3: 生成看板 HTML

基于发现脚本输出的 JSON，生成自包含的 `monitor-dashboard.html`：

1. 读取 `skills/monitor-dashboard-generator/references/visual-system.md` 获取视觉规范
2. 将 JSON 数据嵌入 `<script>` 标签作为 JS 对象
3. 实现核心组件：
   - KPI 卡片（完成/部分/缺口/实体数/模块数）
   - Discovery Bar（自动发现元信息）
   - 状态矩阵（行=实体，列=模块，格子=SVG 状态点）
   - 环形进度（SVG stroke-dasharray）
   - 展开详情（问题卡片优先 → 全部模块表格 → review 待办 → 执行历史）
   - 复制修复命令按钮
4. 状态计算逻辑：`computeStatus(entityId, moduleKey)` 函数
   - 检查 `config` 中模块是否启用 → disabled
   - 检查 `manualStatus` 是否有覆盖 → 优先使用
   - 检查 `files` 中是否有 `outputFile` → complete/empty
   - 检查依赖是否满足 → empty/not-run
5. 修复命令格式：`npx tsx skills/{skill-name}/scripts/generate-{key}.ts --book-id {entity-id}`

## Step 4: 验证

- 用浏览器打开 `monitor-dashboard.html` 确认渲染正常
- 状态矩阵覆盖所有模块和实体
- 筛选按钮和展开/折叠交互正常
- 每条缺口项有可复制的修复命令
