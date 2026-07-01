# Plan: HTML 作为实时基准，Markdown 作为 LLM 模块输入

## 背景

当前数据流：
```
JSON (含完整HTML) → json-to-source.py (html_to_markdown 剥离表格/图片) → source.md → parse-source.ts → sourceParsed.ts (rawContent=降级Markdown)
```

两大问题：
1. `html_to_markdown()` 删除了 `<img>`、`<table>`、`<figure>` 等标签，前端图书内容丢失大量结构信息
2. 层级结构硬编码"模块X/任务X"，无法自适应不同教材的结构

## JSON 原始结构（事实基准）

每条 JSON item 的字段：
- `BookGuid`: 书籍唯一ID
- `BookName`: 书名
- `TitleID`: 内容块唯一ID
- `Title`: 标题（如"第一节 急危重症护理学概况"）
- `Chapter`: 所属章（如"第一章 急危重症护理学基础知识"，或"前言"、"附录"等）
- `Sequence`: 排序号（如"0002"、"0002-1"，同一 Title 可有多条）
- `Content`: 完整 HTML 内容

**关键发现**：
- 同一个 Title（如"第一节"）可以有多条 JSON item（Sequence 0002, 0002-1），说明一个节有多个内容片段
- Chapter 不只是"第X章"，还有"前言"、"附录一"、"参考文献"等
- 层级结构完全由 JSON 的 Chapter + Title + Sequence 字段决定，不应硬编码

## 目标架构

```
JSON (含完整HTML)
  ├→ sourceRaw.ts    (原始数据保全：JSON items 原样存储，零损失)
  ├→ sourceHtml.ts   (按 Chapter/Title 分组的 HTML，前端渲染基准)
  ├→ source.md       (Markdown，喂给 Coze 大模型的模块输入)
  └→ sourceParsed.ts (结构化索引，自适应层级，每个 Task 持有 rawHtml + rawMarkdown)
```

## 文件命名规范

| 文件 | 位置 | 用途 | 内容 |
|------|------|------|------|
| `sourceRaw.ts` | `books/{bookId}/data/` | 原始数据保全 | JSON items 原样，零处理，零损失 |
| `sourceHtml.ts` | `books/{bookId}/data/` | 前端渲染基准 | 按 Chapter/Title 分组的原始 HTML |
| `source.md` | `books/{bookId}/` | LLM 模块输入 | HTML→Markdown 转换，纯文本 |
| `sourceParsed.ts` | `books/{bookId}/data/` | 结构化索引 | 自适应层级 + rawHtml + rawMarkdown |

## 数据结构设计

### sourceRaw.ts（原始保全，零损失）
```typescript
export interface RawItem {
  titleId: string;      // TitleID
  title: string;        // Title
  chapter: string;      // Chapter
  sequence: string;     // Sequence
  content: string;      // 原始 HTML，不做任何处理
}
export interface RawBook {
  bookGuid: string;
  bookName: string;
  items: RawItem[];     // 按 Sequence 排序
}
export const sourceRaw: RawBook = { ... };
```

### sourceHtml.ts（前端渲染基准）
```typescript
export interface HtmlSection {
  titleId: string;
  title: string;        // Title
  sequence: string;
  html: string;         // 原始 HTML（可能多条 item 合并）
}
export interface HtmlChapter {
  chapter: string;      // Chapter 原文（如"第一章 xxx"或"前言"）
  sections: HtmlSection[];
}
export const sourceHtml: { bookName: string; chapters: HtmlChapter[] } = { ... };
```

### sourceParsed.ts（结构化索引，自适应层级）
```typescript
export interface Task {
  id: string;
  title: string;
  rawHtml: string;      // 原始 HTML（前端用）
  rawContent: string;   // Markdown（LLM 用）
  order: number;
}
export interface Module {
  id: string;
  title: string;        // Chapter 原文
  summary?: string;
  tasks: Task[];
}
```

**自适应层级**：不再硬编码"模块X/任务X"，而是：
1. 按 `Chapter` 字段分组 → Module
2. 按 `Title` 字段分组 → Task
3. 同一 Title 的多条 item（如 0002, 0002-1）→ HTML 合并到一个 Task
4. Module ID / Task ID 用序号自动生成（module1, module1-task1），不依赖标题格式

## 实施步骤

### Step 1: 新建 json-to-source.py v2，输出三个文件

重写 `scripts/json-to-source.py`，一次运行输出：
- `books/{bookId}/data/sourceRaw.ts` — JSON items 原样保全
- `books/{bookId}/data/sourceHtml.ts` — 按 Chapter/Title 分组的 HTML
- `books/{bookId}/source.md` — Markdown 版本（给 LLM）

核心逻辑：
1. 解析 JSON，按 BookName 过滤
2. 按 Sequence 排序
3. 按 Chapter 分组 → Module
4. 按 Title 分组 → Task（同 Title 多条 item 的 HTML 拼接）
5. 生成 sourceRaw.ts（零处理）
6. 生成 sourceHtml.ts（分组 HTML）
7. 生成 source.md（html_to_markdown 转换，仅用于 LLM 输入）

**不丢内容的保证**：
- sourceRaw.ts 存原始 JSON，零处理，永远可以回溯
- sourceHtml.ts 存完整 HTML，不删任何标签
- source.md 的 html_to_markdown 只用于 LLM，丢了表格图片无所谓，因为前端看的是 HTML

### Step 2: 重写 parse-source.ts，自适应层级 + 合并 rawHtml

- 不再从 source.md 解析 Markdown 标题来判断层级
- 直接 import sourceHtml.ts，用 Chapter/Title 结构作为层级
- import sourceRaw.ts 作为兜底
- Task 的 `rawHtml` 来自 sourceHtml.ts，`rawContent` 来自 source.md
- Module/Task ID 用序号生成，不依赖标题中的中文数字

### Step 3: 修改 chapter-content-generator，优先用 rawHtml

- `buildTaskSectionsFromSourceParsed()` 优先传 `rawHtml`
- 新增 HTML→blocks 解析器（用正则或简单 DOM 解析）：
  - `<h1>-<h6>` → heading block
  - `<p>` → paragraph block
  - `<img>` → image block
  - `<table>` → html block（保留原始 HTML 渲染）
  - `<ul>/<ol>/<li>` → steps/tips block
  - 其他 → html block（保留原始 HTML）
- 保留现有 Markdown 解析器作为降级

### Step 4: 修改 ChapterContent.tsx，支持 HTML block

- `ContentBlock` 新增 `type: 'html'` 类型
- `BlockRenderer` 中 html 类型用 `dangerouslySetInnerHTML` 渲染
- 添加基本 CSS 样式：表格边框、图片宽度、段落间距
- 降级：如果 chapterContent.ts 不存在，直接用 sourceHtml.ts 渲染

### Step 5: 验证

- 用 critical-care-nursing 重新跑 json-to-source.py → 生成 sourceRaw.ts + sourceHtml.ts + source.md
- 重新跑 parse-source.ts → sourceParsed.ts 包含 rawHtml，层级自适应
- 重新跑 chapter-content-generator → chapterContent.ts 包含 HTML blocks
- 前端验证：打开图书页面，确认表格/图片/格式正确显示
- 验证 audio-course-generator 仍正常工作（用的是 rawContent/Markdown）
- 对比 sourceRaw.ts 和原始 JSON，确认零损失

## 风险与降级

- **sourceHtml.ts 不存在**：parse-source.ts 降级为从 source.md 解析（现有逻辑）
- **sourceRaw.ts 不存在**：不影响运行，仅无法回溯
- **chapterContent.ts 不存在**：ChapterContent.tsx 降级显示 sourceParsed 的 rawHtml
- **rawHtml 为空**：降级用 rawContent（Markdown）解析 blocks
- **HTML 含恶意脚本**：sourceHtml.ts 的 HTML 来自教材 JSON，非用户输入，风险极低；可选添加 sanitize

## 不做的事

- 不改各 skill 的 LLM 输入格式（继续用 Markdown 的 rawContent）
- 不改 bookInfo.ts 的结构
- 不改 audioCourse.ts 的结构
- 不硬编码层级结构（模块X/任务X），完全自适应
