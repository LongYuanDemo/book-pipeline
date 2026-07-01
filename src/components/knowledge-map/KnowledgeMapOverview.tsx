import { useState, useMemo, useRef, useEffect } from 'react';
import {
  ChevronLeft, ChevronDown, ChevronRight as ChevronRightIcon, Search, Network, X,
  BookOpen, ArrowRight, TrendingUp, Hash, Quote,
  Layers,
} from 'lucide-react';
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink } from 'd3';
import type { CanvasData, AdaptationWork, AdaptationRelation } from '@book/data/knowledgeMap.ts';
import { bookData } from '@book/data/bookInfo.ts';

interface Props {
  data: CanvasData;
  onBack: () => void;
}

interface EnrichedEntity {
  id: string;
  title: string;
  type: string;
  gloss?: string;
  desc?: string;
  summary?: string;
  count?: number;
  refs?: { chapter: string; title: string; pn: string }[];
  culture?: string;
  medium?: string;
  author?: string;
  year?: number | string;
  aliases?: string[];
  occurrences?: { taskId: string; pn: string; offset?: number; length?: number }[];
}

interface EnrichedRelation {
  from: string;
  to: string;
  type: string;
  label?: string;
  reason?: string;
}

const TYPE_LABELS: Record<string, string> = {
  concept: '概念', work: '作品', person: '人物', medium: '媒介',
  location: '地点', culture: '文化', all: '全部',
  disease: '疾病', drug: '药物', procedure: '操作', anatomy: '解剖',
  organization: '机构', event: '事件', theory: '理论',
};

const TYPE_COLORS: Record<string, string> = {
  concept: '#2c5282',
  work: '#6b46c1',
  person: '#2E8B57',
  medium: '#B8860B',
  location: '#8B0000',
  culture: '#8B4513',
  disease: '#dc2626',
  drug: '#0ea5e9',
  procedure: '#8b5cf6',
  anatomy: '#14b8a6',
  organization: '#6366f1',
  event: '#f97316',
  theory: '#6366f1',
};

function getTypeLabel(type: string): string {
  return TYPE_LABELS[type] || type;
}

function getTypeColor(type: string): string {
  return TYPE_COLORS[type] || '#6b7280';
}

const RELATION_STYLES: Record<string, { color: string; label: string }> = {
  adaptation: { color: '#6b46c1', label: '改编' },
  translation: { color: '#2c5282', label: '翻译' },
  influence: { color: '#B8860B', label: '影响' },
  remake: { color: '#8B0000', label: '重拍' },
  citation: { color: '#666', label: '引用' },
  composition: { color: '#2E8B57', label: '构成' },
  derivation: { color: '#8B4513', label: '衍生' },
  extension: { color: '#4a90d9', label: '延伸' },
};

const PAPER_BG = '#faf6f0';
const PAPER_BORDER = '#e8dcc8';
const INK_COLOR = '#3d3528';
const INK_LIGHT = '#7a6f5f';
const ACCENT_GOLD = '#B8860B';

function renderText(text: string): string {
  return text.replace(/^#+\s*/gm, '').replace(/\*\*/g, '').trim();
}

function inferTypeFromMedium(medium: string): string {
  const m = medium.toLowerCase();
  if (m.includes('人') || m.includes('者') || m.includes('导演') || m.includes('作家')) return 'person';
  if (m.includes('概念') || m.includes('理论')) return 'concept';
  if (m.includes('媒介') || m.includes('介质')) return 'medium';
  if (m.includes('地点') || m.includes('区域')) return 'location';
  return 'work';
}

export default function KnowledgeMapOverview({ data, onBack }: Props) {
  const { nodes, edges, adaptationFlow, enrichedEntities, enrichedRelations } = data;
  const [view, setView] = useState<'chapters' | 'graph' | 'index' | 'tree'>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [expandedTreeNodes, setExpandedTreeNodes] = useState<Set<string>>(new Set());

  const entities: EnrichedEntity[] = useMemo(() => {
    if (enrichedEntities && enrichedEntities.length > 0) return enrichedEntities;
    if (adaptationFlow) {
      return adaptationFlow.works.map((w: AdaptationWork) => ({
        id: w.id, title: w.title,
        type: (w as any).type || inferTypeFromMedium(w.medium || ''),
        summary: w.summary, culture: w.culture, medium: w.medium,
        author: w.author, year: w.year,
      }));
    }
    return nodes.filter((n) => n.type !== 'group').map((n) => ({
      id: n.id, title: renderText(n.text || n.label || n.id),
      type: 'concept', culture: n.color || '',
    }));
  }, [enrichedEntities, adaptationFlow, nodes]);

  const relations: EnrichedRelation[] = useMemo(() => {
    if (enrichedRelations && enrichedRelations.length > 0) return enrichedRelations;
    if (adaptationFlow) {
      return adaptationFlow.relations.map((r: AdaptationRelation) => ({
        from: r.from, to: r.to, type: r.type, label: r.label, reason: (r as any).reason,
      }));
    }
    return edges.map((e) => ({ from: e.fromNode, to: e.toNode, type: e.type || 'influence', label: e.label }));
  }, [enrichedRelations, adaptationFlow, edges]);

  const entityMap = useMemo(() => new Map(entities.map((e) => [e.id, e])), [entities]);

  const refToChapter = useMemo(() => {
    const map = new Map<string, string>();
    const chapters = (bookData as any).chapters || [];
    for (const ch of chapters) {
      map.set(ch.id, ch.id);
      if (ch.sourceModuleId) map.set(ch.sourceModuleId, ch.id);
      for (const sub of ch.subSections || []) {
        map.set(sub.id, ch.id);
        if (sub.sourceModuleId) map.set(sub.sourceModuleId, ch.id);
      }
    }
    return map;
  }, []);

  const getEntityChapter = (e: EnrichedEntity): string | null => {
    if (!e.refs || e.refs.length === 0) return null;
    for (const ref of e.refs) {
      const chId = refToChapter.get(ref.chapter);
      if (chId) return chId;
    }
    return null;
  };

  const entitiesByChapter = useMemo(() => {
    const map = new Map<string, EnrichedEntity[]>();
    for (const e of entities) {
      if (e.id === 'center-work') continue;
      const chId = getEntityChapter(e);
      if (chId) {
        if (!map.has(chId)) map.set(chId, []);
        map.get(chId)!.push(e);
      }
    }
    return map;
  }, [entities, refToChapter]);

  const unassignedEntities = useMemo(() => {
    return entities.filter(e => {
      if (e.id === 'center-work') return false;
      return !getEntityChapter(e);
    });
  }, [entities, refToChapter]);

  const chapters = (bookData as any).chapters || [];

  const chapterEntities = useMemo(() => {
    if (!selectedChapter) return [];
    let ents: EnrichedEntity[];
    if (selectedChapter === '__all__') {
      ents = entities.filter(e => e.id !== 'center-work');
    } else if (selectedChapter === '__unassigned__') {
      ents = unassignedEntities;
    } else {
      ents = entitiesByChapter.get(selectedChapter) || [];
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      ents = ents.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.summary?.toLowerCase().includes(q) ||
        e.gloss?.toLowerCase().includes(q)
      );
    }
    return [...ents].sort((a, b) => (b.count || 0) - (a.count || 0));
  }, [selectedChapter, entitiesByChapter, entities, unassignedEntities, searchQuery]);

  const chapterRelations = useMemo(() => {
    if (!selectedChapter) return [];
    const entIds = new Set(chapterEntities.map(e => e.id));
    return relations.filter(r => {
      if (r.from === 'center-work' || r.to === 'center-work') return false;
      return entIds.has(r.from) && entIds.has(r.to);
    });
  }, [relations, chapterEntities]);

  const relationsForEntity = useMemo(() => {
    if (!selectedEntityId) return [];
    return relations.filter((r) => r.from === selectedEntityId || r.to === selectedEntityId);
  }, [relations, selectedEntityId]);

  const selectedEntity = selectedEntityId ? entityMap.get(selectedEntityId) : null;

  const getChapterTitle = (chId: string): string => {
    if (chId === '__all__') return '全局知识图谱';
    if (chId === '__unassigned__') return '导言与通用概念';
    const ch = chapters.find((c: any) => c.id === chId);
    return ch?.title || chId;
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of entities) {
      if (e.id === 'center-work') continue;
      const t = e.type || 'concept';
      counts[t] = (counts[t] || 0) + 1;
    }
    return counts;
  }, [entities]);

  const cultureTree = useMemo(() => {
    const tree: Record<string, Record<string, EnrichedEntity[]>> = {};
    for (const e of entities) {
      if (e.id === 'center-work') continue;
      const culture = e.culture || '其他';
      const type = e.type || 'concept';
      if (!tree[culture]) tree[culture] = {};
      if (!tree[culture][type]) tree[culture][type] = [];
      tree[culture][type].push(e);
    }
    for (const culture of Object.keys(tree)) {
      for (const type of Object.keys(tree[culture])) {
        tree[culture][type].sort((a, b) => (b.count || 0) - (a.count || 0));
      }
    }
    return tree;
  }, [entities]);

  const toggleTreeNode = (key: string) => {
    setExpandedTreeNodes((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredIndexEntities = useMemo(() => {
    let ents = entities.filter((e) => e.id !== 'center-work');
    if (typeFilter) {
      ents = ents.filter((e) => (e.type || 'concept') === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      ents = ents.filter((e) =>
        e.title.toLowerCase().includes(q) ||
        e.summary?.toLowerCase().includes(q) ||
        e.gloss?.toLowerCase().includes(q)
      );
    }
    return [...ents].sort((a, b) => (b.count || 0) - (a.count || 0));
  }, [entities, typeFilter, searchQuery]);

  const handleBack = () => {
    if (view === 'graph') {
      setView('chapters');
      setSelectedChapter(null);
      setSearchQuery('');
    } else if (view === 'index' || view === 'tree') {
      setTypeFilter(null);
      setSearchQuery('');
      setView('chapters');
    } else {
      onBack();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: PAPER_BG, color: INK_COLOR }} className="font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap');
        .km-card { background: #fffdf8; border: 1px solid ${PAPER_BORDER}; border-radius: 12px; }
        .km-section-title { font-family: 'Noto Serif SC', serif; font-weight: 700; color: ${INK_COLOR}; border-left: 3px solid ${ACCENT_GOLD}; padding-left: 10px; }
        .km-entity-card:hover { border-color: ${ACCENT_GOLD}; box-shadow: 0 2px 12px rgba(184,134,11,0.12); }
        .km-chapter-card:hover { border-color: ${ACCENT_GOLD}; box-shadow: 0 4px 16px rgba(184,134,11,0.15); transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b" style={{ borderColor: PAPER_BORDER }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 py-3">
          <button onClick={handleBack} className="p-2 -ml-2 rounded-full active:bg-stone-200/50">
            <ChevronLeft className="w-5 h-5" style={{ color: INK_LIGHT }} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold truncate" style={{ fontFamily: 'Noto Serif SC, serif', color: INK_COLOR }}>
              {view === 'graph' ? getChapterTitle(selectedChapter || '') : view === 'index' ? '实体索引' : view === 'tree' ? '分类树' : '知识地图'}
            </h1>
            <p className="text-xs truncate" style={{ color: INK_LIGHT }}>
              {view === 'graph'
                ? `${chapterEntities.length} 个实体 · ${chapterRelations.length} 条关系`
                : view === 'index'
                ? `${typeFilter ? getTypeLabel(typeFilter) : '全部类型'} · ${filteredIndexEntities.length} 个实体`
                : view === 'tree'
                ? `${Object.keys(cultureTree).length} 个分类 · ${entities.length - 1} 个实体`
                : `${entities.length} 个知识实体 · ${chapters.length} 个章节`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 md:px-4 py-4 md:py-6 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-6">
        {/* ===== Tab Navigation ===== */}
        {view !== 'graph' && (
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => { setView('chapters'); setTypeFilter(null); setSearchQuery(''); }}
              className="shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-all"
              style={{
                background: view === 'chapters' ? INK_COLOR : 'transparent',
                color: view === 'chapters' ? '#fff' : INK_LIGHT,
                border: `1px solid ${view === 'chapters' ? INK_COLOR : PAPER_BORDER}`,
              }}
            >章节浏览</button>
            <button
              onClick={() => { setView('index'); setTypeFilter(null); }}
              className="shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-all"
              style={{
                background: view === 'index' ? INK_COLOR : 'transparent',
                color: view === 'index' ? '#fff' : INK_LIGHT,
                border: `1px solid ${view === 'index' ? INK_COLOR : PAPER_BORDER}`,
              }}
            >实体索引</button>
            <button
              onClick={() => { setView('tree'); setExpandedTreeNodes(new Set()); }}
              className="shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-all"
              style={{
                background: view === 'tree' ? INK_COLOR : 'transparent',
                color: view === 'tree' ? '#fff' : INK_LIGHT,
                border: `1px solid ${view === 'tree' ? INK_COLOR : PAPER_BORDER}`,
              }}
            >分类树</button>
          </div>
        )}

        {/* ===== Layer 1: Chapter Overview ===== */}
        {view === 'chapters' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: INK_LIGHT }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索知识实体..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none"
                style={{ borderColor: PAPER_BORDER, background: '#fffdf8', color: INK_COLOR }}
              />
            </div>

            {searchQuery.trim() ? (
              <div className="space-y-2">
                <p className="text-xs" style={{ color: INK_LIGHT }}>
                  搜索结果：{entities.filter(e => e.id !== 'center-work' && (e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.summary?.toLowerCase().includes(searchQuery.toLowerCase()) || e.gloss?.toLowerCase().includes(searchQuery.toLowerCase()))).length} 个实体
                </p>
                {entities.filter(e =>
                  e.id !== 'center-work' && (
                    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    e.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    e.gloss?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                ).slice(0, 20).map(e => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEntityId(e.id)}
                    className="km-entity-card w-full flex items-center gap-3 p-3 text-left rounded-lg border transition-all"
                    style={{ borderColor: PAPER_BORDER }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: getTypeColor(e.type || 'concept') }} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate" style={{ color: INK_COLOR }}>{e.title}</h4>
                      {e.gloss && <p className="text-xs truncate" style={{ color: INK_LIGHT }}>{e.gloss}</p>}
                    </div>
                    {e.count !== undefined && e.count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0" style={{ background: `${ACCENT_GOLD}15`, color: ACCENT_GOLD }}>
                        <Hash className="w-2.5 h-2.5" />{e.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold km-section-title">章节知识图谱</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {chapters.map((ch: any) => {
                    const chEntities = entitiesByChapter.get(ch.id) || [];
                    const topEntities = [...chEntities].sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 5);
                    return (
                      <button
                        key={ch.id}
                        onClick={() => { setSelectedChapter(ch.id); setView('graph'); }}
                        className="km-chapter-card km-card p-5 text-left transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold truncate" style={{ fontFamily: 'Noto Serif SC, serif', color: INK_COLOR }}>{ch.title}</h3>
                            <p className="text-xs mt-1" style={{ color: INK_LIGHT }}>{chEntities.length} 个知识实体</p>
                          </div>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${TYPE_COLORS.concept}12` }}>
                            <Network className="w-5 h-5" style={{ color: TYPE_COLORS.concept }} />
                          </div>
                        </div>
                        {ch.summary && (
                          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: INK_LIGHT }}>{ch.summary}</p>
                        )}
                        {topEntities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {topEntities.map(e => (
                              <span key={e.id} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: '#f5ede0', color: INK_COLOR }}>
                                {e.title}
                              </span>
                            ))}
                            {chEntities.length > 5 && (
                              <span className="text-[10px] px-2 py-0.5" style={{ color: INK_LIGHT }}>+{chEntities.length - 5}</span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => { setSelectedChapter('__all__'); setView('graph'); }}
                    className="km-chapter-card km-card p-5 text-left transition-all"
                    style={{ background: `linear-gradient(135deg, #fffdf8 0%, #f5ede0 100%)` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base font-bold" style={{ fontFamily: 'Noto Serif SC, serif', color: INK_COLOR }}>全局知识图谱</h3>
                        <p className="text-xs mt-1" style={{ color: INK_LIGHT }}>{entities.length} 个实体 · 全部关系</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT_GOLD}15` }}>
                        <Layers className="w-5 h-5" style={{ color: ACCENT_GOLD }} />
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: INK_LIGHT }}>查看所有章节的跨章节概念关联</p>
                  </button>

                  {unassignedEntities.length > 0 && (
                    <button
                      onClick={() => { setSelectedChapter('__unassigned__'); setView('graph'); }}
                      className="km-chapter-card km-card p-5 text-left transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base font-bold" style={{ fontFamily: 'Noto Serif SC, serif', color: INK_COLOR }}>导言与通用概念</h3>
                          <p className="text-xs mt-1" style={{ color: INK_LIGHT }}>{unassignedEntities.length} 个实体</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${TYPE_COLORS.work}12` }}>
                          <BookOpen className="w-5 h-5" style={{ color: TYPE_COLORS.work }} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {unassignedEntities.slice(0, 5).map(e => (
                          <span key={e.id} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: '#f5ede0', color: INK_COLOR }}>
                            {e.title}
                          </span>
                        ))}
                        {unassignedEntities.length > 5 && (
                          <span className="text-[10px] px-2 py-0.5" style={{ color: INK_LIGHT }}>+{unassignedEntities.length - 5}</span>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== Layer 2c: Classification Tree ===== */}
        {view === 'tree' && (
          <div className="space-y-2">
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: INK_LIGHT }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索分类中的实体..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none"
                style={{ borderColor: PAPER_BORDER, background: '#fffdf8', color: INK_COLOR }}
              />
            </div>
            {Object.entries(cultureTree).sort(([a], [b]) => a.localeCompare(b)).map(([culture, types]) => {
              const cultureKey = `culture-${culture}`;
              const isExpanded = expandedTreeNodes.has(cultureKey);
              const allEnts = Object.values(types).flat();
              const filteredEnts = searchQuery.trim()
                ? allEnts.filter((e) =>
                    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    e.gloss?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : allEnts;
              if (searchQuery.trim() && filteredEnts.length === 0) return null;

              return (
                <div key={cultureKey} className="km-card overflow-hidden">
                  <button
                    onClick={() => toggleTreeNode(cultureKey)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-left"
                  >
                    {isExpanded
                      ? <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: INK_LIGHT }} />
                      : <ChevronRightIcon className="w-4 h-4 flex-shrink-0" style={{ color: INK_LIGHT }} />}
                    <span className="text-sm font-bold" style={{ color: INK_COLOR, fontFamily: 'Noto Serif SC, serif' }}>{culture}</span>
                    <span className="text-xs ml-auto" style={{ color: INK_LIGHT }}>{filteredEnts.length} 个实体</span>
                  </button>
                  {isExpanded && (
                    <div className="pl-8 pb-3 space-y-2">
                      {Object.entries(types).sort(([a], [b]) => a.localeCompare(b)).map(([type, ents]) => {
                        const typeKey = `${cultureKey}-type-${type}`;
                        const isTypeExpanded = expandedTreeNodes.has(typeKey);
                        const typeFiltered = searchQuery.trim()
                          ? ents.filter((e) =>
                              e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              e.gloss?.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                          : ents;
                        if (typeFiltered.length === 0) return null;
                        const color = getTypeColor(type);

                        return (
                          <div key={typeKey}>
                            <button
                              onClick={() => toggleTreeNode(typeKey)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-left rounded-lg hover:bg-stone-50"
                            >
                              {isTypeExpanded
                                ? <ChevronDown className="w-3 h-3 flex-shrink-0" style={{ color: INK_LIGHT }} />
                                : <ChevronRightIcon className="w-3 h-3 flex-shrink-0" style={{ color: INK_LIGHT }} />}
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                              <span className="text-xs font-medium" style={{ color: INK_COLOR }}>{getTypeLabel(type)}</span>
                              <span className="text-[10px] ml-auto" style={{ color: INK_LIGHT }}>{typeFiltered.length}</span>
                            </button>
                            {isTypeExpanded && (
                              <div className="pl-8 py-1 space-y-1">
                                {typeFiltered.map((e) => (
                                  <button
                                    key={e.id}
                                    onClick={() => setSelectedEntityId(e.id)}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left rounded-lg hover:bg-stone-50 transition-colors"
                                  >
                                    <span className="text-sm font-medium truncate" style={{ color: INK_COLOR }}>{e.title}</span>
                                    {e.gloss && <span className="text-xs truncate flex-1" style={{ color: INK_LIGHT }}>{e.gloss}</span>}
                                    {e.count !== undefined && e.count > 0 && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0" style={{ background: `${ACCENT_GOLD}15`, color: ACCENT_GOLD }}>
                                        <Hash className="w-2.5 h-2.5" />{e.count}
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {Object.keys(cultureTree).length === 0 && (
              <div className="km-card p-8 text-center text-sm" style={{ color: INK_LIGHT }}>暂无分类数据</div>
            )}
          </div>
        )}

        {/* ===== Layer 2b: Entity Type Index ===== */}
        {view === 'index' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: INK_LIGHT }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索实体名称、释义..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none"
                style={{ borderColor: PAPER_BORDER, background: '#fffdf8', color: INK_COLOR }}
              />
            </div>

            {/* Type filter chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTypeFilter(null)}
                className="px-3 py-1.5 text-xs font-medium rounded-full transition-all"
                style={{
                  background: !typeFilter ? INK_COLOR : 'transparent',
                  color: !typeFilter ? '#fff' : INK_LIGHT,
                  border: `1px solid ${!typeFilter ? INK_COLOR : PAPER_BORDER}`,
                }}
              >全部</button>
              {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                  className="px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5"
                  style={{
                    background: typeFilter === type ? getTypeColor(type) : 'transparent',
                    color: typeFilter === type ? '#fff' : INK_COLOR,
                    border: `1px solid ${typeFilter === type ? getTypeColor(type) : PAPER_BORDER}`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: getTypeColor(type) }} />
                  {getTypeLabel(type)} ({count})
                </button>
              ))}
            </div>

            {/* Entity cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredIndexEntities.map((e, eIdx) => {
                const color = getTypeColor(e.type || 'concept');
                return (
                  <button
                    key={`${e.id}-${eIdx}`}
                    onClick={() => setSelectedEntityId(e.id)}
                    className="km-entity-card flex items-start gap-3 p-3 text-left rounded-lg border transition-all"
                    style={{ borderColor: PAPER_BORDER }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold truncate" style={{ color: INK_COLOR }}>{e.title}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: `${color}15`, color }}>
                          {getTypeLabel(e.type || 'concept')}
                        </span>
                      </div>
                      {e.gloss && <p className="text-xs truncate mt-0.5" style={{ color: INK_LIGHT }}>{e.gloss}</p>}
                      {e.refs && e.refs.length > 0 && (
                        <p className="text-[10px] mt-1" style={{ color: INK_LIGHT }}>引用 {e.refs.length} 处</p>
                      )}
                    </div>
                    {e.count !== undefined && e.count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0" style={{ background: `${ACCENT_GOLD}15`, color: ACCENT_GOLD }}>
                        <Hash className="w-2.5 h-2.5" />{e.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {filteredIndexEntities.length === 0 && (
              <div className="km-card p-8 text-center text-sm" style={{ color: INK_LIGHT }}>未找到匹配的实体</div>
            )}
          </div>
        )}

        {/* ===== Layer 2: Chapter Graph ===== */}
        {view === 'graph' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: INK_LIGHT }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="在本章中搜索..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border outline-none"
                style={{ borderColor: PAPER_BORDER, background: '#fffdf8', color: INK_COLOR }}
              />
            </div>

            <ForceGraph
              entities={chapterEntities}
              relations={chapterRelations}
              onSelectEntity={(id) => setSelectedEntityId(id)}
              selectedId={selectedEntityId}
            />

            <div className="space-y-2">
              <h3 className="text-sm font-bold km-section-title">实体列表</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {chapterEntities.slice(0, 40).map((e, eIdx) => {
                  return (
                    <button
                      key={`${e.id}-${eIdx}`}
                      onClick={() => setSelectedEntityId(e.id)}
                      className="km-entity-card flex items-start gap-3 p-3 text-left rounded-lg border transition-all"
                      style={{ borderColor: PAPER_BORDER }}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: getTypeColor(e.type || 'concept') }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold truncate" style={{ color: INK_COLOR }}>{e.title}</h4>
                          {e.count !== undefined && e.count > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0" style={{ background: `${ACCENT_GOLD}15`, color: ACCENT_GOLD }}>
                              <Hash className="w-2.5 h-2.5" />{e.count}
                            </span>
                          )}
                        </div>
                        {e.gloss && <p className="text-xs truncate mt-0.5" style={{ color: INK_LIGHT }}>{e.gloss}</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
              {chapterEntities.length > 40 && (
                <p className="text-xs text-center py-2" style={{ color: INK_LIGHT }}>仅显示前 40 个，共 {chapterEntities.length} 个实体</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== Layer 3: Entity Detail Panel ===== */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end" onClick={() => setSelectedEntityId(null)}>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="relative bg-white rounded-t-3xl sm:rounded-3xl sm:rounded-tr-none max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            style={{ background: '#fffdf8', border: `1px solid ${PAPER_BORDER}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: PAPER_BORDER }}>
              <h3 className="text-base font-bold truncate" style={{ fontFamily: 'Noto Serif SC, serif', color: INK_COLOR }}>{selectedEntity.title}</h3>
              <button onClick={() => setSelectedEntityId(null)} className="p-1.5 rounded-full hover:bg-stone-100">
                <X className="w-4 h-4" style={{ color: INK_LIGHT }} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${getTypeColor(selectedEntity.type || 'concept')}20`, color: getTypeColor(selectedEntity.type || 'concept') }}>
                  {getTypeLabel(selectedEntity.type || 'concept')}
                </span>
                {selectedEntity.count !== undefined && selectedEntity.count > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ background: `${ACCENT_GOLD}15`, color: ACCENT_GOLD }}>
                    <TrendingUp className="w-3 h-3" />出现{selectedEntity.count}次
                  </span>
                )}
              </div>

              {selectedEntity.gloss && (
                <div>
                  <h4 className="text-xs font-semibold mb-1" style={{ color: ACCENT_GOLD }}>释义</h4>
                  <p className="text-sm font-medium" style={{ color: INK_COLOR }}>{selectedEntity.gloss}</p>
                </div>
              )}

              {(selectedEntity.desc || selectedEntity.summary) && (
                <div>
                  <h4 className="text-xs font-semibold mb-1.5" style={{ color: INK_LIGHT }}>简介</h4>
                  <p className="text-sm leading-relaxed" style={{ color: INK_COLOR }}>{selectedEntity.desc || selectedEntity.summary}</p>
                </div>
              )}

              {selectedEntity.refs && selectedEntity.refs.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold mb-2" style={{ color: INK_LIGHT }}>章节引用 ({selectedEntity.refs.length})</h4>
                  <div className="space-y-1.5">
                    {selectedEntity.refs.map((ref, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center gap-2 p-2 rounded-lg text-left"
                        style={{ background: '#f5ede0' }}
                      >
                        <Quote className="w-3 h-3 flex-shrink-0" style={{ color: INK_LIGHT }} />
                        <span className="text-xs font-medium truncate flex-1" style={{ color: INK_COLOR }}>{ref.title}</span>
                        <span className="text-[10px] flex-shrink-0" style={{ color: INK_LIGHT }}>{ref.pn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {relationsForEntity.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold mb-2" style={{ color: INK_LIGHT }}>关联 ({relationsForEntity.length})</h4>
                  <div className="space-y-2">
                    {relationsForEntity.map((r, i) => {
                      const isFrom = r.from === selectedEntityId;
                      const otherId = isFrom ? r.to : r.from;
                      const other = entityMap.get(otherId);
                      const style = RELATION_STYLES[r.type] || { color: '#666', label: r.type };
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedEntityId(otherId)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg transition-colors text-left"
                          style={{ background: '#f5ede0' }}
                        >
                          {!isFrom && <ArrowRight className="w-3 h-3 flex-shrink-0 rotate-180" style={{ color: INK_LIGHT }} />}
                          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${style.color}15`, color: style.color }}>
                            {r.label || style.label}
                          </span>
                          <span className="text-sm font-medium truncate flex-1" style={{ color: INK_COLOR }}>
                            {other?.title || otherId}
                          </span>
                          {isFrom && <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: INK_LIGHT }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
// ForceGraph - d3-force powered interactive graph

interface SimNode {
  id: string;
  title: string;
  type: string;
  count?: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function ForceGraph({
  entities,
  relations,
  onSelectEntity,
  selectedId,
}: {
  entities: EnrichedEntity[];
  relations: EnrichedRelation[];
  onSelectEntity: (id: string) => void;
  selectedId: string | null;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 600, height: 400 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDims({ width: entry.contentRect.width, height: Math.max(350, Math.min(500, entry.contentRect.width * 0.6)) });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    for (const e of entities) types.add(e.type || 'concept');
    return types;
  }, [entities]);

  const filteredEntities = useMemo(() => {
    if (activeTypes.size === 0) return entities;
    return entities.filter((e) => activeTypes.has(e.type || 'concept'));
  }, [entities, activeTypes]);

  const filteredRelations = useMemo(() => {
    if (activeTypes.size === 0) return relations;
    const entIds = new Set(filteredEntities.map((e) => e.id));
    return relations.filter((r) => entIds.has(r.from) && entIds.has(r.to));
  }, [relations, filteredEntities, activeTypes]);

  const { simNodes, simLinks } = useMemo(() => {
    if (filteredEntities.length === 0) return { simNodes: [] as SimNode[], simLinks: [] as any[] };

    const MAX_NODES = 80;
    let displayEnts = filteredEntities;
    if (filteredEntities.length > MAX_NODES) {
      const connCount = new Map<string, number>();
      for (const r of relations) {
        connCount.set(r.from, (connCount.get(r.from) || 0) + 1);
        connCount.set(r.to, (connCount.get(r.to) || 0) + 1);
      }
      displayEnts = [...filteredEntities]
        .sort((a, b) => (connCount.get(b.id) || 0) - (connCount.get(a.id) || 0) || (b.count || 0) - (a.count || 0))
        .slice(0, MAX_NODES);
    }

    const displayIds = new Set(displayEnts.map(e => e.id));

    const seen = new Set<string>();
    const nodes: SimNode[] = displayEnts.filter(e => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    }).map(e => ({
      id: e.id, title: e.title, type: e.type || 'concept', count: e.count,
      x: dims.width / 2 + (Math.random() - 0.5) * 100,
      y: dims.height / 2 + (Math.random() - 0.5) * 100,
      vx: 0, vy: 0,
    }));

    const links = filteredRelations
      .filter(r => displayIds.has(r.from) && displayIds.has(r.to))
      .map(r => ({ source: r.from, target: r.to, type: r.type, label: r.label }));

    const sim = forceSimulation(nodes as any)
      .force('charge', forceManyBody().strength(-60))
      .force('center', forceCenter(dims.width / 2, dims.height / 2))
      .force('collide', forceCollide(18))
      .force('link', forceLink(links).id((d: any) => d.id).distance(60).strength(0.3))
      .stop();

    for (let i = 0; i < 300; i++) sim.tick();

    return { simNodes: nodes, simLinks: links };
  }, [filteredEntities, filteredRelations, dims]);

  const highlightedNodeIds = useMemo(() => {
    if (!hoveredId && !selectedId) return null;
    const id = hoveredId || selectedId;
    const connected = new Set<string>([id!]);
    for (const r of filteredRelations) {
      if (r.from === id) connected.add(r.to);
      if (r.to === id) connected.add(r.from);
    }
    return connected;
  }, [hoveredId, selectedId, filteredRelations]);

  if (filteredEntities.length === 0) {
    return <div className="km-card p-8 text-center text-sm" style={{ color: INK_LIGHT }}>暂无实体数据</div>;
  }

  const isTruncated = filteredEntities.length > simNodes.length;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.max(0.3, Math.min(3, z * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragStart(null);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="km-card p-4 overflow-hidden">
      {/* Type filter chips */}
      {availableTypes.size > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            onClick={() => setActiveTypes(new Set())}
            className="text-[10px] px-2 py-1 rounded-full transition-all"
            style={{
              background: activeTypes.size === 0 ? INK_COLOR : 'transparent',
              color: activeTypes.size === 0 ? '#fff' : INK_LIGHT,
              border: `1px solid ${activeTypes.size === 0 ? INK_COLOR : PAPER_BORDER}`,
            }}
          >全部</button>
          {Array.from(availableTypes).sort().map((type) => {
            const isActive = activeTypes.has(type);
            const color = getTypeColor(type);
            return (
              <button
                key={type}
                onClick={() => {
                  setActiveTypes((prev) => {
                    const next = new Set(prev);
                    if (next.has(type)) next.delete(type);
                    else next.add(type);
                    return next;
                  });
                }}
                className="text-[10px] px-2 py-1 rounded-full transition-all flex items-center gap-1"
                style={{
                  background: isActive ? color : 'transparent',
                  color: isActive ? '#fff' : INK_COLOR,
                  border: `1px solid ${isActive ? color : PAPER_BORDER}`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {getTypeLabel(type)}
              </button>
            );
          })}
        </div>
      )}

      {isTruncated && (
        <div className="text-xs mb-2 px-2 py-1.5 rounded-lg" style={{ background: '#f5ede0', color: INK_LIGHT }}>
          显示前 {simNodes.length} 个核心实体（共 {filteredEntities.length} 个）
        </div>
      )}
      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: dragStart ? 'grabbing' : 'grab' }}
      >
        <svg viewBox={`0 0 ${dims.width} ${dims.height}`} className="w-full" style={{ minHeight: 350 }}>
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {simLinks.map((link: any, i) => {
              const source = simNodes.find(n => n.id === (link.source.id || link.source));
              const target = simNodes.find(n => n.id === (link.target.id || link.target));
              if (!source || !target) return null;
              const style = RELATION_STYLES[link.type] || { color: '#999', label: link.type };
              const isHighlighted = highlightedNodeIds &&
                highlightedNodeIds.has(source.id) && highlightedNodeIds.has(target.id);
              return (
                <line
                  key={i}
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                  stroke={style.color}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={highlightedNodeIds ? (isHighlighted ? 0.5 : 0.05) : 0.2}
                />
              );
            })}

            {simNodes.map((n, idx) => {
              const color = getTypeColor(n.type);
              const isHighlighted = !highlightedNodeIds || highlightedNodeIds.has(n.id);
              const isSelected = selectedId === n.id;
              const r = 6 + Math.min(10, (n.count || 0) / 2);
              return (
                <g
                  key={`${n.id}-${idx}`}
                  transform={`translate(${n.x}, ${n.y})`}
                  onClick={(e) => { e.stopPropagation(); onSelectEntity(n.id); }}
                  onMouseEnter={() => setHoveredId(n.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: 'pointer', opacity: isHighlighted ? 1 : 0.25, transition: 'opacity 0.2s' }}
                >
                  <circle
                    r={r}
                    fill={color}
                    fillOpacity={isSelected ? 1 : 0.75}
                    stroke={isSelected ? ACCENT_GOLD : 'white'}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    y={r + 11}
                    textAnchor="middle"
                    fontSize={9}
                    fill={INK_COLOR}
                    style={{ pointerEvents: 'none', fontFamily: 'Noto Serif SC, serif' }}
                  >
                    {n.title.length > 8 ? n.title.slice(0, 7) + '…' : n.title}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Zoom controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 border-t" style={{ borderColor: PAPER_BORDER }}>
        <div className="flex flex-wrap gap-3">
          {Array.from(availableTypes).sort().map((type) => {
            const color = getTypeColor(type);
            return (
              <div key={type} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-xs" style={{ color: INK_LIGHT }}>{getTypeLabel(type)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ color: INK_LIGHT }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.max(0.3, z * 0.8))} className="text-xs px-2 py-1 rounded-lg border" style={{ borderColor: PAPER_BORDER, color: INK_LIGHT }}>−</button>
          <button onClick={() => setZoom((z) => Math.min(3, z * 1.25))} className="text-xs px-2 py-1 rounded-lg border" style={{ borderColor: PAPER_BORDER, color: INK_LIGHT }}>+</button>
          <button onClick={resetView} className="text-xs px-2 py-1 rounded-lg border" style={{ borderColor: PAPER_BORDER, color: INK_LIGHT }}>重置</button>
        </div>
      </div>
    </div>
  );
}
