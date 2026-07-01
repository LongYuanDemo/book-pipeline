---
name: audio-course-generator
description: 从书籍内容批量生成音频课程。脚本优先，ASR 精准对齐，Topic 内渐进式展开 Mermaid 流程图，节点逐个渐入动画。支持 mlx-whisper 自动时间戳校准，输出可直接集成到产品前端。
---

# Audio Course Generator — 音频课程批量生成

从教材内容自动生成完整音频课程包：朗读稿 + 渐进式 Mermaid 流程图 + ASR 精准时间戳对齐 + 节点逐个渐入动画。

## 核心理念

1. **脚本优先**：先写自然朗读稿，再从稿子中提炼 Mermaid 帧。不是先设计图再凑稿子。
2. **纯朗读文本**：稿子是连续的口语化中文，不含标题、标注、Markdown、分隔符。像老师讲课一样自然。
3. **TTS 只用 Coze**：扣子 Coze TTS API 质量高、语速自然、支持长文本。**禁止使用本地小模型 TTS**（如 edge-tts、pyttsx3 等），质量不达标。脚本中 `generateLocalTts()` 实际内部调用的是 Coze TTS API，命名仅为历史遗留。
4. **ASR 是刚需**：Coze 返回音频后，**必须用 mlx-whisper 做 ASR 对齐**，得到句子级真实时间戳。这是秒级帧控制的基础——不靠字数估算，不靠匀速假设，只用真实音频识别结果。ASR 失败时降级到估算，但这是 fallback 而非正道。
5. **Topic 内渐进展开，Topic 间切换新图**：同一话题在一张图上逐步添加节点，话题转换时换新图。
6. **链式纵向布局，禁止星型发散**：节点必须串联 `T0 → N0 → N1 → N2`，而非从 Topic 向外辐射 `T0 → N0, T0 → N1, T0 → N2`。链式布局保证图宽恒定（1 个节点宽），图高随节点数增长，完美适配固定画布。星型布局会导致图宽 = N × 节点宽度，节点多时被压缩到看不清。
7. **单帧最多 6 个节点**：节点过多会导致 Mermaid 图拥挤、文字缩小、呈现效果差。超过 6 个时用滑动窗口保留最近 6 个节点，旧节点淡出。
8. **节点逐个渐入**：每帧渲染时，`.new` 节点逐个 fade-in + scale 动画出现，不是一次性全部呈现。箭头线条同步绘制动画。

## 产品集成

- 数据文件：`books/{bookId}/data/audioCourse.ts`
- 播放器：`src/pages/AudioCoursePlayer.tsx`
- Mermaid 渲染：`src/components/MermaidImage.tsx`（内联 SVG，支持节点动画）
- Mermaid 服务：`server/mermaid-server.ts`（端口 3005，mmdc 渲染）
- 音频目录：`books/{bookId}/assets/audio/`
- 类型定义：`src/types/audio.ts`（VisualSequenceLesson）
- CSS 动画：`src/index.css`（`node-reveal` + `edge-draw` keyframes）

## 工作流

```
教材内容
  ↓
Step 1: 解析章节，确定课程清单
  ↓
Step 2: 生成朗读稿（纯文本，自然口语，无格式标记）
  ↓
Step 3: 人审稿（唯一人工环节）
  ↓
Step 4: Coze TTS API 自动生成整段音频
  ↓
Step 5: ASR 对齐 — mlx-whisper 识别音频，输出句子级时间戳
  ↓
Step 6: 基于 ASR 时间戳 + 朗读稿，设计 Mermaid 帧（Topic 分组 + Topic 内渐进展开）
  ↓
Step 7: 更新 audioCourse.ts（audioUrl + frames + durationSeconds）
  ↓
Step 8: 验证 — 播放音频，Mermaid 帧随旁白同步切换，节点逐个渐入
```

## 详细步骤

### Step 1: 解析章节，确定课程清单

读取教材内容（`books/{bookId}/source.md` 或 `chapterContent.ts`），按模块拆分课程。

每课对应一个 `lN` ID，预估时长 3-5 分钟。

### Step 2: 生成朗读稿

**规则**：
- 纯口语化中文，像老师讲课一样自然
- **不含**任何标题、标注、备注、Markdown 符号、分隔标记
- 可以有语气词（"呢"、"啊"、"嘛"），但不过度
- 操作步骤用"先……然后……最后……"的口语化表达
- 段落之间自然过渡，不用"接下来"等生硬连接词
- 每课约 600-1000 字，对应 3-5 分钟音频

**输出**：`books/{bookId}/audio-scripts/audio-lN-标题.txt`

纯文本文件，只有朗读内容，没有任何标记。脚本自动保存，供人审稿。

### Step 3: 人审稿

人工审阅朗读稿，修改不顺口的地方。审稿要点：
- 朗读是否顺口（默读一遍，卡顿的地方改）
- 知识点是否准确（与教材一致）
- 是否有标题/标注残留（应全部删除）

### Step 4: Coze TTS 生成音频（只用 Coze，禁止本地 TTS）

**原则**：TTS 只用扣子 Coze API，质量高、语速自然。本地小模型 TTS 质量不达标，禁止使用。

通过扣子 Coze 音频生成工作流 (`stream_run`) 自动将朗读稿转为音频。

**环境变量**（`.env`）：
```
COZE_TTS_API_KEY=<your_token>
COZE_TTS_PROJECT_ID=7656634526076190766
COZE_TTS_ENDPOINT=https://sw6svvkbjd.coze.site/stream_run
```

**调用方式**：
- 主脚本 `generate-audio-course.ts` 自动调用 `skills/shared/tts.ts` 中的 `generateLocalTts()`
- `generateLocalTts()` 内部实际调用 `generateCozeTts()`，命名仅为历史遗留
- 独立调用：`bash skills/audio-course-generator/scripts/tts-generate.sh <稿文件> <输出mp3>`

**工作原理**：
1. 将朗读稿作为 `prompt.text` 发送到 Coze `stream_run` 端点
2. 解析 SSE 流式响应，提取音频 URL
3. 下载音频并保存为 MP3 文件
4. 用 `ffprobe` / `afinfo` / 纯 JS 解析获取实际时长（三级降级）

**输出**：`books/{bookId}/assets/audio/audio-lN.mp3`

### Step 5: ASR 对齐（脚本自动执行）

`generate-audio-course.ts` 在 TTS 生成音频后自动调用 mlx-whisper 进行 ASR 对齐，无需手动操作。

**实现**（`performASR()` 函数）：
1. 调用 `python3 -c` 执行 mlx-whisper Python 脚本
2. 模型：`mlx-community/whisper-large-v3-turbo`
3. 输出 JSON 格式的句子级时间戳 `[{text, start, end}, ...]`
4. 超时 5 分钟，失败时降级到 `estimateTimestamps()`（匀速估算）

**环境要求**：
- `pip3 install mlx-whisper`（Apple Silicon 专用，比 openai-whisper 快 3-5 倍）
- 首次运行会下载模型（~1.6GB），后续走缓存
- ASR 失败时自动降级到匀速估算，不中断流程

**帧时间戳校准**：
- LLM 提取的知识点 `startPercent` → 转换为目标时间 → 在 ASR 时间戳中找到最接近的句子 → 用真实 ASR 时间作为帧 `start`
- 这确保帧切换与音频实际内容对齐，而非匀速假设

### Step 6: 设计 Mermaid 帧

#### 6.1 Topic 分组原则

**核心原则 — Topic 内渐进展开，Topic 间切换新图**：

1. **同一 Topic 内**：围绕一个主题持续展开，在一张图上逐步添加节点（渐进式），让用户看到上下文关系和概念之间的联系
2. **Topic 切换时**：识别到稿子切换了话题，才换一张新图开始下一个主题的渐进式展开
3. **高信噪比**：只放核心概念和关键关系，不把所有细节都堆到图上
4. **箭头标签**：用 `-->|"标签"|` 在箭头上添加关系说明，增强信息密度

**Topic 识别方法**：
- 读 ASR 时间戳 + 朗读稿，识别话题转换点
- 一个 topic = 一个核心概念及其展开
- topic 边界通常在"总结"、"转入"、"接下来"等过渡语处

**示例（通用课程结构）**：
```
Topic 1 (0s): 标题帧
  帧1 (0s): A["课程主题"] --> B["核心维度1"] --> C["核心维度2"]

Topic 2 (20-53s): 核心概念展开（同一张图渐进展开）
  帧2 (20s): A["核心概念"] --> B["要点1"] --> C["要点2"]
  帧3 (37s): + C --> D["要点3"] --> E["要点4"] --> F["结论"]

Topic 3 (54-94s): 分类详解（同一张图，知识点级颗粒度）
  帧4 (54s): A["分类框架"]                              ← 标题
  帧5 (64s): + B["类别1"] C["类别2"] D["类别3"]         ← 名称
  帧6 (70s): + B --> B1["类别1特点"]                     ← 读到类别1
  帧7 (75s): + C --> C1["类别2特点"]                     ← 读到类别2
  帧8 (80s): + D --> D1["类别3特点"]                     ← 读到类别3

Topic 4 (95-138s): 应用/实践（同一张图渐进展开）
  帧9 (95s): A["应用场景"] --> B["案例1"] --> C["案例2"]
  帧10(113s): + A --> D["方法论总结"]

Topic 5 (139-168s): 核心要点回顾
  帧11(139s): A["要点回顾"] --> B["要点1"] --> C["要点2"] --> D["要点3"]
```

#### 6.2 知识点级颗粒度对齐

**核心标准 — 每个知识点对应一帧，读到什么出什么**：

帧的颗粒度不是"一个 topic 一帧"或"一段话一帧"，而是**每个知识点一帧**。当朗读到某个知识点时，对应的节点才出现在图上。

**操作方法**：
1. 拿到 ASR 句子级时间戳
2. 逐句对照朗读稿，标记每个知识点（概念、分类、特点、步骤等）的起始秒数
3. 每个知识点对应一帧，该帧只新增该知识点的节点
4. 已有节点保持不变（不标记 `new`），只新增节点标记 `new`

**颗粒度示例**：
```
ASR: [54.2] 可以分为三大类        → 帧: 出 A["分类框架"]
ASR: [63.9] 类别1、类别2、类别3   → 帧: 出 B/C/D 三个分类名
ASR: [70.2] 类别1的特点是...      → 帧: 出 B1["类别1特点"]
ASR: [74.5] 类别2则强调...        → 帧: 出 C1["类别2特点"]
ASR: [80.3] 类别3注重...          → 帧: 出 D1["类别3特点"]
```

**设计影响**：
- 一个 topic 可能拆成 5-10+ 帧（取决于知识点密度）
- 每帧通常只新增 1-3 个节点，动画简洁
- 用户感受：图随旁白"长出来"，读到哪出到哪

#### 6.3 渐进式展开动画

**节点逐个渐入**：每帧渲染时，标记为 `class X new` 的节点逐个 fade-in 出现，不是一次性全部呈现。

**实现机制**（`MermaidImage.tsx`）：
1. 从 Mermaid 服务获取 SVG
2. 内联渲染到 DOM（不用 `<img>`，以便操作 SVG 内部元素）
3. 查询所有 `.new` 节点，设置 `opacity: 0` 初始状态
4. 为每个节点设置 staggered animation：`node-fade-in 0.4s ease-out {idx * 0.25}s forwards`

**动画参数**：
- 节点渐入：0.4s，每个节点间隔 0.25s
- 缓动函数：`ease-out`
- 只用 opacity 渐入（不用 scale，SVG `<g>` 元素 transform 原点在 (0,0) 会导致节点位移）

**设计影响**：
- 每帧的 `.new` 节点数量不宜过多（3-6 个为宜），否则动画时间太长
- Topic 内渐进帧：只标记新增节点为 `new`，已有节点保持不变
- Topic 切换帧：所有节点都标记为 `new`（全新图）

#### 6.4 Mermaid 配置模板

```
---\nconfig:\n    look: handDrawn\n    theme: default\n    flowchart:\n        useMaxWidth: false\n---\n\n%%{init: {"themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n    A["核心概念"]\n    A -->|"关系"| B["要点1"]\n    A -->|"关系"| C["要点2"]\n\n    classDef default fill:#f8f9fa,stroke:#9aa0a6\n    classDef new fill:#e8f0fe,stroke:#4285f4\n    classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n\n    class A new\n    class B new\n    class C new
```

**CSS 样式说明**：
- `p {margin: 0; padding: 2px 6px}` — 修复文字被边框遮挡（不用负 margin）
- `.edgeLabel` — 箭头标签：透明背景、12px、灰色
- `classDef new` — 新节点蓝色高亮 `#e8f0fe / #4285f4`

**布局方向**：
- 概念展开用 `flowchart TD`（自上而下）
- 流程步骤用 `flowchart LR`（从左到右）

### Step 7: 更新数据文件

更新 `books/{bookId}/data/audioCourse.ts`：

```typescript
{
  id: '{bookId}-lN',
  title: '课程标题',
  moduleTitle: '模块X：XXX',
  durationSeconds: 168,  // ffprobe 测量的实际时长
  audioUrl: '/audio/{bookId}-lN.mp3',
  visualSequence: {
    audioUrl: '/audio/{bookId}-lN.mp3',
    dialog: { id: '{bookId}-lN-id' },
    frames: [
      { start: 0, element: { diagram: { content: m(`...`) } } },
      { start: 20, element: { diagram: { content: m(`...`) } } },
      // ... 每帧 start 来自 ASR 时间戳
    ],
  },
},
```

**数据结构要点**：
- `m()` 函数自动包裹 MERMAID_CONFIG + content + CLASS_DEFS
- Topic 内渐进帧：只在新节点上加 `class X new`，已有节点不加
- Topic 切换帧：所有节点都加 `class X new`

### Step 8: 验证

```bash
npm run build  # 确认无 TS 错误
npm run dev    # 启动前端
npx tsx server/mermaid-server.ts  # 启动 Mermaid 服务
```

浏览器打开播放器，播放音频，确认：
- Mermaid 帧随旁白同步切换
- 每帧展示的图与当前讲解内容对应
- **节点逐个渐入**：不是一次性出现，而是有节奏地逐个 fade-in
- **箭头绘制动画**：线条从起点到终点逐步绘制
- Topic 内渐进展开：同一张图上逐步添加新节点
- Topic 间切换：话题转换时换新图
- 无跳帧或延迟

## 文件路径约定

| 文件 | 路径 |
|------|------|
| 朗读稿 | `books/{bookId}/audio-scripts/{bookId}-lN-标题.txt` |
| 部署音频 | `books/{bookId}/assets/audio/{bookId}-lN.mp3` |
| 数据文件 | `books/{bookId}/data/audioCourse.ts` |
| Mermaid 渲染组件 | `src/components/MermaidImage.tsx` |
| CSS 动画 | `src/index.css`（`node-reveal` + `edge-draw`） |
| Mermaid 服务 | `server/mermaid-server.ts` |
| TTS 脚本 | `skills/audio-course-generator/scripts/tts-generate.sh` |
| TTS 模块 | `skills/shared/tts.ts`（Coze stream_run API） |
| 校准脚本 | `skills/audio-course-generator/scripts/calibrate.sh` |

## 自动化路线

| 阶段 | 人工 | 自动 |
|------|------|------|
| **当前** | 仅审稿 | 脚本生成 + Coze TTS API + ASR 对齐 + Mermaid 设计 + 数据集成 |
| **终态** | 抽检审稿 | 全流程自动 |

## 用法

```bash
# 默认（使用通用 fallback prompt）
npx tsx skills/audio-course-generator/scripts/generate-audio-course.ts \
  --book-id eye-ent-nursing

# 使用 Agent 生成的自定义 prompt（推荐，按教材类型自适应）
npx tsx skills/audio-course-generator/scripts/generate-audio-course.ts \
  --book-id eye-ent-nursing \
  --prompt-file /tmp/audio-script-prompt.txt
```

## Skills 范式架构说明

本 Skill 遵循 Skills 范式设计：
- **SKILL.md 是唯一真相源**：讲稿结构、风格要求、字数规则在本文档定义
- **TS 脚本只做 I/O**：文件读写、LLM 调用、TTS 生成、TS 校验，不包含业务逻辑
- **Agent 读 SKILL.md 后自适应**：根据教材类型生成讲稿 prompt，通过 `--prompt-file` 传入
- **Prompt 不硬编码在 TS 中**：所有业务 prompt 由 Agent 动态生成，脚本只负责执行

### Agent 执行流程

1. 读取本 SKILL.md，理解讲稿结构和风格要求
2. 读取 `bookInfo.ts`，判断教材类型
3. 按教材类型生成讲稿 prompt 文件
4. 调用 `generate-audio-course.ts` 传入 `--prompt-file`
5. 脚本执行 LLM → TTS → 帧生成，输出 `audioCourse.ts`
6. Agent 验证输出质量（音频时长、帧数量、讲稿字数）

### Prompt 模板占位符

- `{{chapterSection}}` — 模块编号
- `{{chapterTitle}}` — 模块标题
- `{{taskCount}}` — 任务数量
- `{{taskList}}` — 任务列表（顿号分隔）
- `{{chapterSummary}}` — 模块摘要
- `{{contentContext}}` — 原文内容上下文
- `{{targetChars}}` — 目标字数
- `{{targetMinChars}}` — 最低字数
- `{{durationMinutes}}` — 目标时长（分钟）
- `{{perTaskChars}}` — 每个任务的目标字数

如未提供 `--prompt-file`，脚本使用通用 fallback prompt（适用于大多数教材）。

## 关键设计决策

1. **脚本优先**：先有稿子再设计图，图服务于内容，不是内容迁就图
2. **TTS 只用 Coze**：扣子 Coze TTS 质量高，是唯一的 TTS 方案。本地小模型 TTS 禁止使用
3. **ASR 是刚需**：Coze 返回音频后，必须用 mlx-whisper 做 ASR 对齐，得到真实句子级时间戳。这是秒级帧控制的基础。字数估算只是 fallback
4. **整段 TTS + ASR 对齐**：一次性生成整段音频更自然，用 ASR 做帧对齐，比分段 TTS 拼接更流畅
5. **Topic 内渐进展开**：同一话题在一张图上逐步添加节点，保持上下文关系
6. **链式纵向布局**：节点串联 `T0 → N0 → N1`，图宽恒定适配固定画布，禁止星型发散
7. **单帧最多 6 个节点**：超过时滑动窗口保留最近 6 个，避免图拥挤
8. **Topic 间切换新图**：话题转换时换新图，避免图过大
9. **节点逐个渐入动画**：`.new` 节点 staggered fade-in + scale，不是一次性呈现
10. **箭头绘制动画**：线条 strokeDasharray 动画，从起点到终点逐步绘制
11. **纯朗读稿**：无 `===FRAME===` 等标记，直接可粘贴到 TTS 工具
12. **MP3 格式**：128kbps 人声足够，体积仅 WAV 的 1/4
13. **内联 SVG 渲染**：MermaidImage 从 `<img>` 改为内联 SVG，以便操作 DOM 元素做动画
