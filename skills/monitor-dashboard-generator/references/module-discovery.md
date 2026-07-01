# 模块发现策略

Agent 拿到新项目后，必须先自动发现项目有哪些模块，而非硬编码。

## 发现优先级

### 1. Pipeline 脚本目录扫描

扫描常见目录名：`skills/`、`scripts/`、`pipeline/`、`tools/`、`src/modules/`

识别可执行脚本：
- `.ts` / `.js` / `.mjs` — Node.js 脚本
- `.py` — Python 脚本
- `.sh` — Shell 脚本

从脚本中提取模块信息：
- 文件名 → 模块 key（如 `generate-anki.ts` → `anki`）
- 文件头注释 → 模块描述
- 脚本中的 `--book-id` / `--module` 等参数 → 输入依赖
- 脚本中的输出路径 → 输出文件位置

### 2. 配置文件扫描

识别项目配置文件：
- `meta.json` / `config.yml` / `config.json` / `.env`
- 查找模块开关字段（如 `modules: { anki: true, video: false }`）
- 未启用的模块标记为 `disabled`

### 3. 输出目录扫描

扫描输出目录（如 `data/`、`dist/`、`output/`、`build/`）：
- 识别每个模块的输出文件
- 从文件存在性判断模块是否已执行
- 从文件内容判断输出是否达标

### 4. 文档扫描

读取项目文档：
- `AGENT.md` / `README.md` / `CLAUDE.md`
- 查找模块定义表格、依赖关系图、成功标准
- 提取模块间的依赖关系

### 5. 降级策略

如果以上方法都无法发现明确的模块结构：

1. 扫描 `package.json` 的 scripts 字段
2. 扫描 Makefile / justfile
3. 主动询问用户：
   > "我扫描了项目目录，发现以下可能的模块：[列表]。
   > 请确认这些是否需要监控，以及还有哪些模块需要加入看板。"

## 依赖关系识别

从以下来源提取模块间依赖：

- **脚本中的 import**：`import { ... } from '../shared/...'` → 共享工具依赖
- **脚本参数中的输入路径**：`--input books/{bookId}/data/bookInfo.ts` → 依赖 bookInfo
- **文档中的依赖图**：Mermaid flowchart / 依赖表格
- **输出文件名交叉引用**：模块 A 的输出被模块 B 的脚本引用

构建依赖图后，可计算阻塞链：
```
sourceParsed (empty) → bookInfo (blocked) → chapterContent (blocked) → ...
```

## Runtime/Agent 模块识别

某些模块不是数据文件，而是运行时服务。识别方法：

- 脚本中包含 `API_KEY` / `DEEPSEEK_API_KEY` 等环境变量引用
- 脚本中包含 `express()` / `app.listen()` / `server()` 等服务端代码
- 配置中有 `api` / `endpoint` / `webhook` 字段
- 目录名包含 `agent` / `bot` / `service`

对这类模块：
- **不发起实际请求**：看板不调用 API
- **检查运行条件**：API Key 是否配置、依赖数据是否存在、端点是否定义
- **展示就绪状态**：`bookInfo ✓ / source.md ✓ / API Key ✗`

## 多实体项目识别

有些项目有多个并行实体（如多本书、多个微服务）：

- 扫描 `books/` / `services/` / `packages/` 等目录
- 每个子目录作为一个实体
- 矩阵行 = 实体，列 = 模块
- 如果项目无多实体结构，矩阵退化为单行（项目级 × 模块）
