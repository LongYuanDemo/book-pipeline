# Entity & Relation Types

Entity types are **not hardcoded** in the pipeline scripts. The LLM selects appropriate types based on textbook content. This document provides guidance for prompt generation.

## Base Relation Types

These 4 types are universally applicable across textbook categories:

| Type | Semantic | Direction |
|------|----------|-----------|
| prerequisite | A must be learned before B | A → B |
| parallel | A and B are siblings (same module) | A ↔ B |
| progressive | A is introductory, B is advanced | A → B |
| application | A is a tool or material used in B | A → B |

## Extended Relation Types by Category

### Literature / Translation Studies

| Type | Semantic |
|------|----------|
| translation | A is translated into B |
| adaptation | A is adapted as B |
| influence | A influences B |
| remake | B is a remake of A |
| citation | B cites A |

### Medical

Same 4 base types, but semantics oriented:
- prerequisite: disease → treatment pathway
- application: drug → procedure
- progressive: basic care → advanced care
- parallel: co-occurring conditions

### Engineering / Skills

| Type | Semantic |
|------|----------|
| application | tool → process |
| progressive | basic operation → advanced operation |
| parallel | concurrent procedures |

## Entity Type Catalog by Textbook Category

### Literature / Translation

| Type | Description | Example |
|------|-------------|---------|
| work | Original or translated work | 《源氏物语》 |
| person | Author, translator, character | 紫式部 |
| concept | Literary concept | 翻译策略 |
| medium | Media form | 电影, 漫画 |
| place | Geographic location | 京都 |
| culture | Cultural sphere | 日本文化 |

### Medical

| Type | Description | Example |
|------|-------------|---------|
| disease | Medical condition | 高血压 |
| drug | Medication | 硝苯地平 |
| procedure | Medical operation | 静脉穿刺 |
| anatomy | Body structure | 颈动脉 |
| concept | Medical concept | 休克 |
| person | Medical figure | 人物 |

### Engineering / Skills

| Type | Description | Example |
|------|-------------|---------|
| tool | Equipment or instrument | 车床 |
| process | Manufacturing process | 车削 |
| material | Raw material | 45号钢 |
| step | Operation step | 对刀 |
| safety | Safety rule | 戴护目镜 |
| standard | Quality standard | IT7 |

### General / Theory

| Type | Description | Example |
|------|-------------|---------|
| concept | Abstract concept | 熵 |
| principle | Fundamental law | 热力学第二定律 |
| method | Technique or approach | 归纳法 |
| case | Example case | 案例A |
| formula | Mathematical formula | F=ma |

### History

| Type | Description | Example |
|------|-------------|---------|
| event | Historical event | 淝水之战 |
| person | Historical figure | 谢安 |
| place | Location | 建康 |
| dynasty | Time period | 东晋 |
| work | Historical text | 《晋书》 |
| title | Official title | 刺史 |

## Enriched Entity Fields

All entity types share the same data structure:

```typescript
interface EnrichedEntity {
  id: string;           // unique identifier
  title: string;        // display name
  type: string;         // LLM-selected type (from catalog above)
  gloss?: string;       // brief definition
  desc?: string;        // longer description
  summary?: string;     // AI-generated summary
  count?: number;       // occurrence count
  culture?: string;     // cultural sphere (for adaptation-flow)
  medium?: string;      // media form (for adaptation-flow)
  aliases?: string[];   // alternative names
  refs: {               // where entity appears
    chapter: string;    // task ID (e.g. "ch1-2")
    title: string;      // chapter title
    pn: string;         // paragraph number (e.g. "§3")
  }[];
  occurrences?: {       // precise position for highlighting
    taskId: string;
    pn: string;
    offset: number;
    length: number;
  }[];
}
```

## Type Color Mapping (Frontend)

The frontend uses `getTypeColor()` and `getTypeLabel()` with fallback. Known types have explicit colors; unknown types fall back to `#6b7280` (gray) and use the raw type string as label.

| Type | Color | Label |
|------|-------|-------|
| person | #8b5cf6 | 人物 |
| place | #059669 | 地点 |
| work | #dc2626 | 作品 |
| concept | #2563eb | 概念 |
| event | #ea580c | 事件 |
| dynasty | #7c3aed | 朝代 |
| disease | #dc2626 | 疾病 |
| drug | #059669 | 药物 |
| procedure | #ea580c | 操作 |
| tool | #6b7280 | 工具 |
| process | #0891b2 | 流程 |
| step | #ca8a04 | 步骤 |
| (fallback) | #6b7280 | {raw type} |
