# Paradigm Selection Rules

## Detection Dimensions

| Dimension | Keywords | Weight |
|-----------|----------|--------|
| Time density | 年份, 朝代, 时期, century, dynasty, era | ×1.0 |
| Person density | 人名, 角色, 称谓, person, character | ×1.0 |
| Place density | 地名, 国家, 方位, place, country, region | ×1.0 |
| Process density | 步骤, 工序, 操作, 实验, step, process, procedure | ×1.0 |
| Adaptation density | 翻译, 改编, 译本, 影视, 跨文化, translation, adaptation | ×1.0 |
| Concept hierarchy | 目录深度, 分类词, 包含关系, hierarchy depth | ×0.5 |
| Comparison density | 比较, 对比, 影响, 接受, compare, contrast, influence | ×0.5 |

Density = (keyword matches) / (total word count). Calculated per-module, averaged across all modules.

## Paradigm Mapping

### adaptation-flow
- **Trigger**: adaptation_density > 0.3 AND time_density > 0.2
- **Use case**: Translation studies, comparative literature, cross-media adaptation
- **Example**: 《文本的越境与跨界》
- **Layout**: Horizontal swim lanes by culture/medium, time flows left-to-right
- **Entity types**: work, person, concept, medium, place, culture

### metro
- **Trigger**: time_density > 0.4 AND person_density > 0.3
- **Use case**: History, literary history, philosophy history
- **Example**: 《史记》《中国文学史》
- **Layout**: Linear timeline with branch lines (metro map style)
- **Entity types**: event, person, work, place, dynasty

### network
- **Trigger**: person_density > 0.4
- **Use case**: Character biography, novel, drama
- **Example**: 《红楼梦人物关系》
- **Layout**: Force-directed graph with clustering by faction/family
- **Entity types**: person, place, work, relationship, faction

### process-flow
- **Trigger**: process_density > 0.4
- **Use case**: Engineering, experiment, operation manual, skill training
- **Example**: 《数控加工实训》
- **Layout**: Vertical swim lanes by process stage
- **Entity types**: step, tool, material, process, safety, standard

### spatial-map
- **Trigger**: place_density > 0.4
- **Use case**: Geography, tourism, architecture, migration history
- **Example**: 《世界地理》
- **Layout**: Geographic projection or grid by coordinates
- **Entity types**: place, route, region, landmark, resource

### tree
- **Trigger**: concept_hierarchy_depth >= 4 AND has progressive relations
- **Use case**: STEM, computer science, linguistics
- **Example**: 《数据结构》《现代汉语语法》
- **Layout**: Reingold-Tilford hierarchical tree
- **Entity types**: concept, principle, method, case, formula

### skill-tree
- **Trigger**: clear skill dependencies AND gamification suitable
- **Use case**: Programming, language learning, sports training
- **Example**: 《Python 入门》《日语 N1》
- **Layout**: Prerequisite DAG with XP-based positioning
- **Entity types**: skill, level, achievement, prerequisite, challenge

### radial (fallback)
- **Trigger**: None of the above conditions met
- **Use case**: General textbooks, modular skill training
- **Example**: General purpose
- **Layout**: Polar coordinates, angle by module, radius by level
- **Entity types**: module, task, knowledge_point, concept

## Visual Style Guide

| Paradigm | Color scheme | Edge style |
|----------|-------------|------------|
| adaptation-flow | Multi-color lanes (culture circles) | Solid + dashed |
| metro | Metro line colors | Solid lines |
| network | Cluster colors | Solid + curved |
| process-flow | Process stage colors | Solid arrows |
| spatial-map | Map palette (green/blue/brown) | Dashed routes |
| tree | Cool tones (blue/teal/slate) | Solid hierarchy |
| skill-tree | Progress colors (bronze/silver/gold) | Solid + locked |
| radial | Warm/stone tones | Solid + dashed |
