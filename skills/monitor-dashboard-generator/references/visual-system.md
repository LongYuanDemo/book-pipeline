# 视觉系统规范

所有项目的看板使用同一套视觉系统，确保开发者在不同项目间切换时认知零成本。

## 竞品参考

| 产品 | 学什么 | 已应用 |
|------|--------|--------|
| **Dagster (Dagit UI)** | Asset Graph 节点状态色、stale 传播 | 状态矩阵 + 依赖阻塞链 |
| **Apache Airflow** | DAG × Task 状态矩阵、hover tooltip | 矩阵行=实体 列=模块 格子=状态 |
| **Linear** | KPI 卡片、自定义状态 pill | KPI 卡片 + 状态 pill |
| **GitHub Insights** | 统计卡片 icon+数字+标签 | KPI 卡片布局 |
| **Vercel Dashboard** | 状态 badge 胶囊样式 | 状态 pill 组件 |

## 设计风格

现代工程仪表盘风格——浅色背景、卡片式布局、SVG 图标系统、环形进度指示器。
参照 Linear/GitHub Insights 的信息密度，参照 Vercel/Notion 的配色克制。

## 字体

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
```

## CSS 变量

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  --bg-page: #f7f7f5;
  --bg-card: #ffffff;
  --bg-hover: #f1f1ef;
  --bg-soft: #fafaf8;
  --border: #e9e9e7;
  --border-light: #f0f0ee;
  --radius: 8px;
  --radius-sm: 4px;
  --text-1: #1a1a18;
  --text-2: #6b6a63;
  --text-3: #9b9a93;
  --text-4: #c4c4c0;
  --c-complete: #2d4a3e;
  --c-complete-bg: #edf5f0;
  --c-partial: #b0573f;
  --c-partial-bg: #faf3ef;
  --c-gap: #c0392b;
  --c-gap-bg: #fdf0ee;
  --c-notrun: #9b9a93;
  --c-notrun-bg: #f4f4f2;
  --c-disabled: #c4c4c0;
  --c-disabled-bg: #f7f7f5;
  --shadow-card: 0 1px 2px rgba(0,0,0,0.03), 0 0 0 1px var(--border);
}
```

## 状态色板

| 状态 | 前景色 | 背景色 | SVG 图标 | 含义 |
|------|--------|--------|----------|------|
| complete | `#2d4a3e` | `#edf5f0` | check | 模块输出达标 |
| partial | `#b0573f` | `#faf3ef` | alert-triangle | 有输出但不完整 |
| empty | `#c0392b` | `#fdf0ee` | x | 无输出，需执行 |
| not-run | `#9b9a93` | `#f4f4f2` | minus | 可选模块，未运行 |
| disabled | `#c4c4c0` | `#f7f7f5` | circle | 项目配置中未开启 |

## SVG 图标系统

所有图标使用 inline SVG（Lucide 风格），不依赖外部图标库。

```javascript
const I = {
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" ...><polyline points="20 6 9 17 4 12"/></svg>',
  alert:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ...><path d="M10.29 3.86..."/>...</svg>',
  x:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" ...><line x1="18" y1="6" x2="6" y2="18"/>...</svg>',
  minus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" ...><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/></svg>',
  book:   '<svg viewBox="0 0 24 24" ...>...</svg>',
  layers: '<svg viewBox="0 0 24 24" ...>...</svg>',
  copy:   '<svg viewBox="0 0 24 24" ...>...</svg>',
  search: '<svg viewBox="0 0 24 24" ...>...</svg>',
};
```

**禁止使用 emoji**——emoji 在不同系统渲染不一致，无法继承 currentColor，无法缩放。

## 页面布局

```
┌──────────────────────────────────────────────────┐
│ Header: 项目图标 + 标题 + 副标题                   │
├──────────────────────────────────────────────────┤
│ KPI Cards: [✓完成] [▲部分] [✗缺口] [📚实体] [🗂模块]│
├──────────────────────────────────────────────────┤
│ Discovery Bar: 🔍 自动发现 · 8模块 · 6书籍 · ...   │
├──────────────────────────────────────────────────┤
│ Toolbar: [全部 6] [有缺口 4]                       │
├──────────────────────────────────────────────────┤
│ 状态矩阵                                          │
│ ┌────────┬────┬────┬────┬────┬──────┬────┐       │
│ │ 实体    │模块1│模块2│... │模块N│ 进度  │待办│       │
│ ├────────┼────┼────┼────┼────┼──────┼────┤       │
│ │ 实体A   │ ●  │ ▲  │ ●  │ —  │ ⊙75% │ 3  │       │
│ │ 实体B   │ ●  │ ●  │ ●  │ ●  │ ⊙100%│ 0  │       │
│ └────────┴────┴────┴────┴────┴──────┴────┘       │
├──────────────────────────────────────────────────┤
│ [展开] 需要关注: 问题卡片（左边框色 + 图标 + 命令）│
│ [展开] ─────────────── 分隔线 ───────────────     │
│ [展开] 全部模块: 紧凑表格（模块名 | pill | 详情）  │
│ [展开] Review 待办: checkbox 样式                  │
│ [展开] 执行历史: 日期 → 动作 → 结果               │
└──────────────────────────────────────────────────┘
```

## 组件规范

### KPI 卡片
- 卡片式：白底 + `shadow-card` + `radius: 8px`
- 布局：左侧 36×36 圆角图标 + 右侧数字+标签
- 图标背景使用对应状态色 bg，图标使用对应状态色 fg
- 数字 20px bold，标签 11px `--text-3`
- 固定 5 个：完成数、部分数、缺口数、实体数、模块数

### 状态矩阵
- 行 = 项目实体（如书籍、服务、模块组）
- 列 = 模块
- 单元格 = 圆形状态点（24×24，背景色=状态 fg，内嵌白色 SVG 图标）
- hover 缩放 1.15x
- 列头 11px `--text-3`，模块中文名
- 行头：实体名（13px bold）+ 实体 ID（10px mono `--text-4`）

### 环形进度
- SVG `stroke-dasharray` 实现，28px 默认尺寸
- 背景环 `--border-light`，前景环按进度着色
- 中心文字 9px mono bold
- 颜色：≥80% complete、≥40% partial、<40% gap

### 待办徽章
- 胶囊样式，`border-radius: 11px`
- 有待办时 gap 色，无待办时灰色

### 展开详情（分层信息架构）

**第一层：需要关注**（actionable first，最重要）
- 仅展示 empty/partial 状态的模块
- 卡片式：白底 + 左边框 3px 状态色
- 内容：图标 + 模块名 + 缺口描述 + 修复命令行 + 复制按钮
- 命令行：mono 字体，灰底，ellipsis 溢出
- 复制按钮：点击后 1.5s 反馈动画（变绿）

**分隔线**

**第二层：全部模块**
- 紧凑表格（不重复卡片布局）
- 列：模块名 | 状态 pill | 详情
- 状态 pill：胶囊 + 色点 + 文字

**第三层：Review 待办**
- checkbox 样式（14×14 圆角方框）
- 来自 `pipeline-status.md` 手动标注

**第四层：执行历史**
- 单行：日期 → 动作 → 结果
- 日期 mono 字体

### Discovery Bar
- 单行卡片，搜索图标 + 等宽字体 tag
- 展示自动发现的元信息：模块数、实体数、扫描路径

### Toolbar
- 胶囊按钮，active 时深色填充
- 两个按钮：全部 N / 有缺口 N

## 交互

- 点击矩阵行 → 展开该实体的详情面板
- 筛选按钮 → 只看有缺口的实体
- 每条问题卡片 → 附带 copy 按钮，点击复制修复命令到剪贴板
- 状态点 hover → title tooltip 显示状态+详情
- 同一时间只展开一个实体

## 禁止

- emoji 图标（用 SVG 替代）
- 渐变背景（header 图标除外）
- 圆角 > 8px（pill 组件除外）
- 装饰性动画（hover 缩放和 copy 反馈除外）
- 深色模式（暂不支持）
- 外部 CSS/JS 依赖（必须单文件自包含）
