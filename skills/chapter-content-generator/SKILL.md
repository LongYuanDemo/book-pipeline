---
name: chapter-content-generator
description: 从教材 Markdown 生成交互式章节内容，包含 AI 增强模块（知识拓展、背景信息、操作要点、注意事项）和随堂测验。自动适配任意书籍结构。参考 Kimi V4 阅读体验和 NotebookLM 交互设计。
---

# 章节内容生成器

将教材 Markdown 转化为带 AI 增强和交互的富阅读页面，集成到数智教材2.0 前端。

## 设计理念

### 教育学基础
基于"主动学习"理念，在关键节点插入不同类型的交互模块，引导用户从被动阅读转向主动思考：

1. **阅读前**：任务导入 + 背景介绍 → 激发兴趣
2. **阅读中**：知识拓展 + 操作要点 + 注意事项 → 加深理解
3. **阅读后**：随堂测验 + 知识巩固 + 学习建议 → 检验效果

### AI 增强模块类型

| 类型 | 标识色 | 图标 | 插入时机 | 作用 |
|------|--------|------|----------|------|
| `info` | 蓝色 | Info | 知识链接后 | AI 知识拓展：补充科学原理、背景知识 |
| `tip` | 绿色 | Lightbulb | 关键步骤处 | 操作要点/实用建议 |
| `culture` | 琥珀色 | Heart | 任务导入处 | 背景介绍：历史、文化、行业关联 |
| `warning` | 橙色 | AlertCircle | 关键步骤处 | 注意事项：易错点预警 |

### 交互模块

| 类型 | 插入时机 | 作用 |
|------|----------|------|
| `quiz` | 知识巩固后 | 随堂测验：4选1，即时反馈 + AI解释 |
| `steps` | 任务目标/制作步骤/知识巩固 | 编号列表 |
| `tips` | 要点处 | 要点清单 |

## 数据格式

输出文件：`books/{bookId}/data/chapterContent.ts`

```typescript
export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'steps' | 'tips' | 'quiz' | 'callout' | 'ingredients' | 'evaluation';
  content?: string;
  items?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;    // 正确选项索引
    explanation: string;
  };
  callout?: {
    variant: 'info' | 'tip' | 'culture' | 'warning';
    title: string;
    body: string;
  };
  ingredients?: {
    main: string[];
    seasoning: string[];
  };
}

export interface TaskContent {
  taskId: string;    // 对应 bookData.ts 中 subSection.id
  title: string;
  module: string;
  blocks: ContentBlock[];
}

export const chapterContents: Record<string, TaskContent> = { ... };
```

## 解析规则

### 从教材 MD 识别章节结构

自动适配书籍的标题层级结构，不依赖特定前缀：

```
## 章节标题
### 小节标题     → paragraph + 对应 callout
正文段落         → paragraph
关键概念         → info callout（AI拓展）
重要论证/步骤    → tip callout（要点提示）
背景信息         → culture callout
注意事项         → warning callout
```

如书籍有"任务X"前缀结构，则按"任务导入→任务目标→知识链接→任务实施→制作要点→知识巩固"映射 ContentBlock。
如书籍无前缀结构，则按 H2/H3 层级自动拆分段落并插入对应 callout。

### AI 增强内容生成规则

1. **info（知识拓展）**：基于正文内容，补充背景知识、理论渊源、跨学科关联
2. **tip（要点提示）**：补充方法论、操作建议、实用技巧
3. **culture（背景介绍）**：补充历史语境、文化关联、行业背景
4. **warning（注意事项）**：标注常见误解、易错点、易混淆概念

### 随堂测验生成规则

- 每个任务至少 1 道测验题
- 4 选项，1 正确，3 干扰项
- 干扰项来自常见误解或相似概念
- 解释说明正确答案为什么对、错误选项为什么错

## Pipeline

```
书籍 MD → 识别模块/章节结构 → 逐章节解析内容 → 在关键节点插入 AI 增强模块 → 生成随堂测验 → 输出 chapterContent.ts → 集成到前端
```

### 步骤

1. **解析书籍 MD**：识别章节标题和小节结构
2. **提取原始内容**：将每个小节内容映射到 ContentBlock
3. **生成 AI 增强模块**：在合适位置插入 callout 块
4. **生成测验题**：基于章节核心知识点创建 quiz 块
5. **输出 TS 文件**：写入 `books/{bookId}/data/chapterContent.ts`
6. **前端验证**：点击章节目录中的任务，验证渲染效果

## 前端集成（当前真实契约）

阅读页 `src/pages/ChapterContent.tsx` **不再渲染 `chapterContent.ts`**，而是：

- **原文**：`sourceParsed.ts` 的 `rawHtml`（按 `task.id === subSectionId` 定位，需 book-info 已对齐 id）
- **AI 增强浮层**：`aiEnhancement.ts`（按 `subSectionId` 取，`headingHint` 对齐正文标题）
- **实体高亮**：`knowledgeMap.ts` 的 `enrichedEntities`（按 `refs[].chapter === subSectionId` 命中）

> `chapterContent.ts`（本 Skill 的 ContentBlock 产物）现为**流水线中间产物**，被
> anki-card-generator / knowledge-map-generator / video-keyframe-extractor 消费，不直接上前端阅读页。

- 路由：App.tsx 中 `view === 'chapter-content'`
- 入口：Home 页章节目录 → 点击任务 → 打开阅读页
- 导航：ChapterList 的 subSection 按钮 → `onOpenTask(sub.id)`

## 批量制作

对于新书：
1. 读取书籍 MD
2. 识别章节结构（标题、小节）
3. 逐章节生成 ContentBlock 数组
4. 在关键节点插入 AI 增强模块和测验
5. 覆写 `chapterContent.ts`
6. 验证前端渲染

```bash
# 默认（使用通用 fallback prompt）
npx tsx skills/chapter-content-generator/scripts/generate-chapter-content.ts \
  --book-id eye-ent-nursing

# 使用 Agent 生成的自定义 prompt（推荐，按教材类型自适应）
npx tsx skills/chapter-content-generator/scripts/generate-chapter-content.ts \
  --book-id eye-ent-nursing \
  --prompt-file /tmp/chapter-content-prompt.txt
```

## Skills 范式架构说明

本 Skill 遵循 Skills 范式设计：
- **SKILL.md 是唯一真相源**：callout 类型、quiz 规则、增强模块定义都在本文档定义
- **TS 脚本只做 I/O**：文件读写、LLM 调用、JSON 解析、ContentBlock 组装，不包含业务逻辑
- **Agent 读 SKILL.md 后自适应**：根据教材类型生成 prompt，通过 `--prompt-file` 传入脚本
- **Prompt 不硬编码在 TS 中**：所有业务 prompt 由 Agent 动态生成，脚本只负责执行

### Agent 执行流程

1. 读取本 SKILL.md，理解 callout 类型和 quiz 规则
2. 读取 `bookInfo.ts`，判断教材类型（医学/文学/工程/通用）
3. 按教材类型生成 enhancement prompt 文件
4. 调用 `generate-chapter-content.ts` 传入 `--prompt-file`
5. 脚本执行 LLM 调用，输出 `chapterContent.ts`
6. Agent 验证输出质量（blocks 数量、callout 多样性、quiz 覆盖率）

### Prompt 模板占位符

- `{{moduleTitle}}` — 模块标题
- `{{taskTitle}}` — 任务标题
- `{{contentPreview}}` — 原文内容节选（前 6000 字符）
- `{{headingList}}` — 子标题列表

如未提供 `--prompt-file`，脚本使用通用 fallback prompt（适用于大多数教材）。

## 质量门（AI 增强内容质量，非仅存在性）

`enhancement-gate.ts` 把知识图谱阶段确立的"阻塞式质量门"范式复用到 AI 增强：`aiEnhancement.ts` 必须达标才算合格交付物。治理"通用元提示稀释""缺少易错点/安全提示"等内容质量问题。

**门槛指标**（默认阈值见 `enhancement-gate.ts` 的 `DEFAULT_ENHANCEMENT_THRESHOLDS`）：

| 指标 | 默认门槛 | 含义 |
|------|----------|------|
| warning 数 | ≥ 1 | 全书至少 1 个易错点/安全风险 callout |
| 含 warning 任务占比 | ≥ 0.3 | 安全相关学科强制项 |
| 通用标题占比 | ≤ 0.4 | 正文 callout 用"AI 学习提示"等套话的比例 |
| 标题去重率 | ≥ 0.3 | 正文 callout 标题的独立度（防千篇一律） |
| 含 quiz 任务占比 | ≥ 0.8 | 随堂测验覆盖 |
| 占位/降级 callout | = 0 | "本节内容待AI增强"等降级内容 |

**命令行用法**：

```bash
# 独立评估（不阻塞）
npx tsx skills/chapter-content-generator/scripts/enhancement-gate.ts --book-id <bookId>

# 阻塞模式：门未过退出码 1
npx tsx skills/chapter-content-generator/scripts/enhancement-gate.ts --book-id <bookId> --gate

# 生成时启用阻塞门（门未过则整步失败）
npx tsx skills/chapter-content-generator/scripts/generate-ai-enhancement.ts --book-id <bookId> --strict
```

**根因治理（prompt）**：生成 prompt 已移除"AI 学习提示"这类会被逐字复制的示例标题，改为要求"用概括该段要点的具体标题、同一任务内不重复"，并将"每任务至少 1 个 warning"设为硬性要求。质量门是兜底强制，prompt 是源头改善，两者配合。

## 交互设计参考

- **Kimi V4**：简洁的阅读界面，内容居中，舒适的行距
- **NotebookLM**：随堂测验即时反馈，AI 解释面板
- **教材原书**：保留"导入—知识—实践—巩固"的闭环结构
