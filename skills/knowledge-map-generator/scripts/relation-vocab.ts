/**
 * 知识地图关系类型词表（Canonical relation vocabulary）
 *
 * 单一真相源：质量门（evaluate-quality）用它判定"外来/未知关系类型"，
 * 前端 RELATION_STYLES 按此表镜像样式，确保每种关系都有颜色+标签，
 * 不再落到灰色默认样式。
 *
 * 新增关系类型时，先在此登记，再在前端 KnowledgeMapOverview 的
 * RELATION_STYLES 中补对应样式。
 */

/** 通用/结构类关系（各领域教材通用） */
export const GENERAL_RELATION_TYPES = [
  'composition', // 包含
  'part-of', // 组成
  'prerequisite', // 前置
  'progressive', // 递进/推进
  'parallel', // 并列/同类
  'application', // 应用
  'causal', // 因果
  'influence', // 影响
  'derivation', // 衍生
  'extension', // 延伸
  'citation', // 引用
  'contrast', // 对比
] as const;

/** 文学/翻译类专有关系（仅 adaptation-flow 类教材合法） */
export const LITERATURE_RELATION_TYPES = [
  'adaptation', // 改编
  'translation', // 翻译
  'remake', // 重拍
] as const;

/** 词表全集：不在此集合内的关系类型判为"未知类型" */
export const CANONICAL_RELATION_TYPES: readonly string[] = [
  ...GENERAL_RELATION_TYPES,
  ...LITERATURE_RELATION_TYPES,
];

const CANONICAL_SET = new Set(CANONICAL_RELATION_TYPES);

export function isCanonicalRelationType(type: string): boolean {
  return CANONICAL_SET.has(type);
}

/**
 * 找出一组关系里出现的、不在词表内的类型（去重）。
 * 质量门据此报"未知关系类型"问题。
 */
export function findForeignRelationTypes(types: Iterable<string>): string[] {
  const foreign = new Set<string>();
  for (const t of types) {
    if (t && !CANONICAL_SET.has(t)) foreign.add(t);
  }
  return [...foreign];
}
