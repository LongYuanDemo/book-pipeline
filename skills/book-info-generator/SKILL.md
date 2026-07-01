---
name: book-info-generator
description: 从教材 Markdown 源文件自动生成 bookInfo.ts，包含完整的 BookData 结构（章节、子章节、摘要）。支持职业技能教材和学术著作两种模式。当需要生成书籍元数据中枢（bookInfo.ts）、或为下游内容/闪卡/知识地图/音频等 Skill 准备章节结构时使用（本 Skill 同时会对齐 sourceParsed.ts 的 id 到子章节 id）。
---

# Book Info Generator — 书籍信息生成器

从教材 Markdown 源文件自动生成 `books/{bookId}/data/bookInfo.ts`，包含完整的 `BookData` 结构。

## 输入

- `--book-id`：教材唯一标识（如 `text-crossing-test`）
- `--source`：源 Markdown 文件路径（默认 `books/{bookId}/source.md`）

## 输出

- `books/{bookId}/data/bookInfo.ts`：符合项目 `BookData` interface 的 TypeScript 数据文件

## 数据结构

```typescript
export interface SubSection {
  id: string;        // 如 "ch1-1"
  title: string;     // 任务/节标题
  completed: boolean;
}

export interface Chapter {
  id: string;        // 如 "ch1"
  title: string;     // 模块标题
  section: string;   // 模块编号（如 "模块一"）
  status: 'completed' | 'learning' | 'not-started';
  subSections: SubSection[];
  summary: string;   // LLM 生成的结构化摘要
}

export interface BookData {
  title: string;
  chapters: Chapter[];
}
```

## 使用方式

```bash
npx tsx skills/book-info-generator/scripts/generate-book-info.ts \
  --book-id <bookId> \
  --source books/<bookId>/source.md
```

## 生成逻辑

1. **读取源 Markdown**，提取书名（优先第一个非结构化标题，回退到 H1，再回退到文件名）
2. **识别模块层级**：自动检测 Markdown 标题层级结构
   - H1/H2 中以"模块X"开头的标题（如有）
   - 无"模块"前缀时，H1 作为模块，H2 作为章节
   - 支持任意编号格式：中文数字、阿拉伯数字、罗马数字等
3. **识别任务/节**：
   - 以"任务X"或"第X节"开头的标题（如有）
   - 无上述前缀时，所有非模块的 H2 标题作为章节
   - 排除辅助标题（任务导入、任务目标等）和目录页格式
4. **生成章节 ID**：`ch1`, `ch1-1`, `ch1-2` 等
5. **调用 LLM 为每个模块生成结构化 summary**（1论点 + 3要点 + 1例子 + 1未涉及）
6. **输出符合 BookData 的 TS 文件**，并自动校验

## LLM 调用链

```
callLLM(prompt) → callCoze → 优先 DeepSeek（DEEPSEEK_API_KEY）→ 回退 Coze Bot（COZE_API_KEY + COZE_BOT_ID）
```

- `callLLM`（`skills/shared/llm.ts`）内部只调 `callCoze`；`callCoze` 先试 DeepSeek，失败再回退 Coze Bot。
- 目前**不含 Anthropic/Claude 直连**——如需接入需在 `shared/llm.ts` 增加分支。

## 降级处理

- LLM 调用失败：使用模块标题 + 任务数作为降级摘要
- 书名提取失败：使用文件名作为回退书名

## 用法

```bash
# 默认（使用通用 fallback prompt）
npx tsx skills/book-info-generator/scripts/generate-book-info.ts \
  --book-id eye-ent-nursing

# 使用 Agent 生成的自定义 prompt（推荐，按教材类型自适应）
npx tsx skills/book-info-generator/scripts/generate-book-info.ts \
  --book-id eye-ent-nursing \
  --prompt-file /tmp/book-info-prompt.txt
```

## Skills 范式架构说明

本 Skill 遵循 Skills 范式设计：
- **SKILL.md 是唯一真相源**：摘要格式（1论点+3要点+1例子+1未涉及）在本文档定义
- **TS 脚本只做 I/O**：文件读写、LLM 调用、TS 校验，不包含业务逻辑
- **Agent 读 SKILL.md 后自适应**：根据教材类型生成摘要 prompt，通过 `--prompt-file` 传入
- **Prompt 不硬编码在 TS 中**：所有业务 prompt 由 Agent 动态生成，脚本只负责执行

### Agent 执行流程

1. 读取本 SKILL.md，理解摘要格式规则
2. 读取 `source.md` 或 `sourceParsed.ts`，判断教材类型
3. 按教材类型生成 summary prompt 文件
4. 调用 `generate-book-info.ts` 传入 `--prompt-file`
5. 脚本执行 LLM 调用，输出 `bookInfo.ts`
6. Agent 验证输出质量（模块数量、摘要完整性）

### Prompt 模板占位符

- `{{moduleTitle}}` — 模块名称
- `{{taskList}}` — 包含任务列表（顿号分隔）

如未提供 `--prompt-file`，脚本使用通用 fallback prompt（适用于大多数教材）。

## 依赖

- `skills/shared/`：types, paths, validator, llm, markdown

## 下游消费

- `chapter-content-generator`：读取 `bookInfo.ts` 中的章节结构
- `anki-card-generator`：读取 `bookInfo.ts` 中的章节列表和 `sourceParsed.ts` 中的原始内容
- `knowledge-map-generator`：读取 `bookInfo.ts` 中的章节和子章节结构
- `audio-course-generator`：读取 `bookInfo.ts` 中的章节列表
- `video-keyframe-extractor`：读取 `bookInfo.ts` + `chapterContent.ts`
