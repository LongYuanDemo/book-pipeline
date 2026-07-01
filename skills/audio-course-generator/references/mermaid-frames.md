# 音频课 Mermaid 帧设计详解

> 本文档是 audio-course-generator 的参考细节（SKILL.md Step 6 的展开）。
> 讲 Topic 分组、知识点级颗粒度对齐、渐进式动画、Mermaid 配置模板。

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

