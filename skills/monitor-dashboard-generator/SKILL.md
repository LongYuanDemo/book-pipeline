---
name: monitor-dashboard-generator
description: 为任何项目自动生成自适应工程监控看板。替代 Linear、飞书等外部项目管理工具，由 Agent 和工程师共同维护项目状态。当用户需要项目状态可视化、工程进度监控、模块状态矩阵、或提到"看板""dashboard""监控面板"时触发。
---

# Monitor Dashboard Generator — 自适应工程看板生成器

为任何项目生成一个独立的 HTML 监控看板，实时反映工程进度和模块状态。

## 核心思想

看板不是外挂的第三方工具，而是项目自身的产物——和代码一起版本控制、一起演进。
状态的记录、更新、追加、覆盖、增删改，都由自适应面板维护。
一个工程师 + 一群 Agent 通过同一面板迅速同步当前项目状态。

详见 [references/philosophy.md](references/philosophy.md)。

## 执行流程

Agent 按以下三步执行，产出可直接打开的看板 HTML。

### Step 1: 运行发现脚本

```bash
npx tsx skills/monitor-dashboard-generator/scripts/discover-modules.ts --root .
```

脚本输出 JSON 到 stdout，包含：
- `modules[]`：发现的模块列表（key, name, scriptPath, deps, description）
- `entities[]`：项目实体列表（如 books/ 下的子目录）
- `configFiles[]`：配置文件路径
- `pipelineDocs[]`：项目文档路径

Agent 将输出重定向到临时文件备用：
```bash
npx tsx skills/monitor-dashboard-generator/scripts/discover-modules.ts --root . > /tmp/discovery.json
```

如果脚本输出 `warnings` 或模块数为 0，Agent 应主动询问用户补充模块信息。

发现策略详见 [references/module-discovery.md](references/module-discovery.md)。

### Step 2: 扫描输出文件 + 读取手动状态

Agent 根据发现脚本的 `entities[]` 和 `modules[]`，扫描每个实体的输出目录：

1. **输出文件存在性检查**：遍历 `entities/*/data/` 或对应输出目录，检查每个模块的输出文件是否存在
2. **配置开关检查**：读取 `meta.json` 等配置文件，确定模块是否启用
3. **手动状态覆盖**：读取 `pipeline-status.md`（如果存在），解析手动标注的模块状态、review 待办、执行历史
4. **内容质量检查**（可选）：对已存在的输出文件做基本质量检查（如文件大小 > 0、关键字段是否存在）

将收集到的数据整理为以下结构：
```javascript
const DASHBOARD_DATA = {
  modules: [...],      // 从 discovery.json 获取
  entities: [...],     // 从 discovery.json 获取
  files: { ... },      // 每个实体的输出文件列表
  config: { ... },     // 每个实体的模块开关
  manualStatus: { ... }, // 从 pipeline-status.md 解析
};
```

### Step 3: 生成看板 HTML

Agent 基于发现脚本输出的 JSON 和扫描结果，生成一个自包含的 HTML 文件：

- **入口**：`{project}-monitor.html`（项目根目录，独立文件）
- **自包含**：CSS + JS 全部内联，无外部依赖
- **数据嵌入**：将 Step 2 收集的数据作为 JS 对象嵌入 `<script>` 标签
- **视觉系统**：严格遵循 [references/visual-system.md](references/visual-system.md)
- **核心组件**：
  - KPI 卡片（完成/部分/缺口/实体数/模块数）
  - Discovery Bar（自动发现的元信息）
  - 状态矩阵（行=实体，列=模块，格子=SVG 状态点）
  - 环形进度（每行一个 SVG ring）
  - 展开详情（问题卡片优先 → 全部模块表格 → review 待办 → 执行历史）
  - 复制修复命令按钮（clipboard API + 反馈动画）

**生成要点**：
- SVG 图标必须 inline，禁止 emoji
- 状态计算逻辑嵌入 JS `computeStatus()` 函数
- 修复命令格式：`npx tsx skills/{skill-name}/scripts/generate-{key}.ts --book-id {entity-id}`
- 手动状态覆盖自动检测（`pipeline-status.md` 优先级 > 文件存在性检查）

### 验证

生成后 Agent 应验证：
- HTML 文件可被浏览器直接打开
- 状态矩阵覆盖所有已发现模块和实体
- 每条缺口项附带可执行的修复命令
- 筛选按钮和展开/折叠交互正常工作

## 适配不同项目类型

### Pipeline 类项目（如数智教材）

- 模块 = pipeline 各阶段 skill
- 状态 = 输出文件是否存在 + 内容是否达标
- 数据源 = `books/*/data/*.ts` + `pipeline-status.md`

### SaaS 类项目

- 模块 = 服务/功能模块
- 状态 = CI 通过率 + 部署环境状态 + API 健康检查
- 数据源 = CI 配置 + 环境变量 + API 端点

### Agent 类项目

- 模块 = agent 能力单元
- 状态 = 配置就绪性（API Key、依赖数据、端点可用性）
- 不发起实际请求，只检查运行条件

## 与项目 AGENT.md 的编排

在项目根目录 `AGENT.md` 中引用本 Skill，确保每次项目启动时自动检查看板是否存在且最新。

详见项目根目录 `AGENT.md` 中的"工程看板"章节。
