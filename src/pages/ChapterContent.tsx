import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { ChevronLeft, Check, X, Lightbulb, Sparkles, BookOpen, FlaskConical, AlertCircle, Info, Heart, List, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { bookData } from '@book/data/bookInfo.ts';
import { sourceParsed } from '@book/data/sourceParsed.ts';
import { knowledgeMapData } from '@book/data/knowledgeMap.ts';
import { aiEnhancements, type TaskEnhancement, type AIEnhancementItem } from '@book/data/aiEnhancement.ts';
import CanvasChat from '../components/CanvasChat.tsx';

interface EntityHighlight {
  id: string;
  title: string;
  type: string;
  gloss?: string;
  desc?: string;
  summary?: string;
  culture?: string;
  medium?: string;
  count?: number;
  aliases?: string[];
  refs?: { chapter: string; title: string; pn: string }[];
}

interface Props {
  taskId: string;
  onBack: () => void;
  onNavigateTask?: (taskId: string) => void;
}

const calloutStyles = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Info, iconColor: 'text-blue-600', titleColor: 'text-blue-900', bodyColor: 'text-blue-800' },
  tip: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: Lightbulb, iconColor: 'text-emerald-600', titleColor: 'text-emerald-900', bodyColor: 'text-emerald-800' },
  culture: { bg: 'bg-amber-50', border: 'border-amber-200', icon: Heart, iconColor: 'text-amber-600', titleColor: 'text-amber-900', bodyColor: 'text-amber-800' },
  warning: { bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertCircle, iconColor: 'text-orange-600', titleColor: 'text-orange-900', bodyColor: 'text-orange-800' },
};

const ENTITY_TYPE_COLORS: Record<string, string> = {
  work: '#8b5cf6',
  person: '#ec4899',
  concept: '#3b82f6',
  location: '#10b981',
  medium: '#f59e0b',
  culture: '#ef4444',
  disease: '#dc2626',
  drug: '#0ea5e9',
  procedure: '#8b5cf6',
  anatomy: '#14b8a6',
  organization: '#6366f1',
  event: '#f97316',
  theory: '#6366f1',
};

function getEntityTypeColor(type: string): string {
  return ENTITY_TYPE_COLORS[type] || '#6b7280';
}

/** Build entity highlight index for a given taskId from knowledgeMapData */
function buildEntityIndex(taskId: string): EntityHighlight[] {
  const entities = knowledgeMapData.enrichedEntities;
  if (!entities || entities.length === 0) return [];
  return entities.filter((e: any) => {
    if (!e.refs || e.refs.length === 0) return false;
    return e.refs.some((r: any) => r.chapter === taskId);
  });
}

/** Post-process HTML to wrap entity mentions in <mark> tags */
function highlightEntitiesInHtml(html: string, entities: EntityHighlight[]): string {
  if (entities.length === 0) return html;

  const sortedEntities = [...entities].sort((a, b) => b.title.length - a.title.length);
  let result = html;

  for (const entity of sortedEntities) {
    const terms = [entity.title, ...(entity.aliases || [])].filter((t) => t.length >= 2);
    if (terms.length === 0) continue;

    const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(?<!<[^>]*)(${escapedTerms.join('|')})(?![^<]*>)`, 'g');

    const color = getEntityTypeColor(entity.type);
    result = result.replace(regex, (match) => {
      return `<mark data-entity-id="${entity.id}" data-entity-type="${entity.type}" style="background: ${color}1a; border-bottom: 1.5px dashed ${color}66; color: inherit; cursor: pointer; border-radius: 2px; padding: 0 1px;">${match}</mark>`;
    });
  }

  return result;
}

/** Add Purple Numbers (§N) to each <p> tag for paragraph-level referencing */
function addParagraphNumbers(html: string): string {
  let pnCounter = 0;
  return html.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, (_match, attrs: string, content: string) => {
    pnCounter++;
    const pnId = `pn-${pnCounter}`;
    const pnMarker = `<span class="purple-number" data-pn="${pnCounter}" id="${pnId}" style="color: #b8a070; font-size: 0.7em; font-weight: 600; margin-right: 4px; cursor: pointer; user-select: none; opacity: 0.5; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">§${pnCounter}</span>`;
    return `<p${attrs}>${pnMarker}${content}</p>`;
  });
}

/** 从 sourceParsed 中按 taskId 查找 rawHtml */
function findRawHtml(taskId: string): { rawHtml: string; title: string; moduleTitle: string } | null {
  for (const mod of sourceParsed.modules) {
    for (const task of mod.tasks) {
      if (task.id === taskId) {
        const rawHtml = (task as any).rawHtml || task.rawContent;
        if (rawHtml) return { rawHtml, title: task.title, moduleTitle: mod.title };
      }
    }
  }
  // 按 bookInfo → sourceParsed 顺序映射
  const chapters = bookData.chapters;
  for (let ci = 0; ci < chapters.length; ci++) {
    const subs = chapters[ci].subSections;
    const si = subs.findIndex(s => s.id === taskId);
    if (si !== -1) {
      const moduleIdx = ci + 1;
      const taskKey = `module${moduleIdx + 1}-task${si + 1}`;
      for (const mod of sourceParsed.modules) {
        for (const task of mod.tasks) {
          if (task.id === taskKey) {
            const rawHtml = (task as any).rawHtml || task.rawContent;
            if (rawHtml) return { rawHtml, title: task.title, moduleTitle: mod.title };
          }
        }
      }
    }
  }
  return null;
}

/** 从 HTML 中提取标题用于导航 — 优先从语义化 <h2>/<h3>/<h4> 提取，降级到 <p> 模式匹配 */
function extractHeadings(html: string): { text: string; offset: number; level: number }[] {
  const headings: { text: string; offset: number; level: number }[] = [];

  // 优先：从语义化标签提取
  const hRegex = /<h([234])\b[^>]*>([\s\S]*?)<\/h[234]>/gi;
  let match: RegExpExecArray | null;
  while ((match = hRegex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (text) {
      headings.push({ text, offset: match.index, level: parseInt(match[1]) });
    }
  }

  if (headings.length > 0) return headings;

  // 降级：从 <p> 中模式匹配（兼容旧数据）
  const titleKeywords = [
    '学习目标', '案例导学', '知识链接', '素质拓展', '考点提示',
    '目标检测', '素质目标', '知识目标', '能力目标',
    '本章小结', '复习思考', '思考题', '案例分析',
    '知识拓展', '临床链接', '护理警示', '护理提示',
  ];

  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (!text || text.length > 60) continue;

    let level = 0;
    if (/^第[一二三四五六七八九十\d]+[节章]\s*.{0,40}$/.test(text)) level = 2;
    else if (titleKeywords.includes(text)) level = 3;
    else if (/^[一二三四五六七八九十]+[、.．]\s*.{0,40}$/.test(text) && !text.includes('。')) level = 3;
    else if (/^[（(][一二三四五六七八九十]+[)）]\s*.{0,40}$/.test(text) && !text.includes('。')) level = 4;
    else if (/^\d+[、.．]\s*.{0,40}$/.test(text) && !text.includes('。')) level = 4;
    else if (/^[（(]\d+[)）]\s*.{0,40}$/.test(text) && !text.includes('。')) level = 4;

    if (level > 0) {
      headings.push({ text, offset: match.index, level });
    }
  }
  return headings;
}

export default function ChapterContent({ taskId, onBack, onNavigateTask }: Props) {
  const sourceData = useMemo(() => findRawHtml(taskId), [taskId]);
  const enhancement = aiEnhancements[taskId] as TaskEnhancement | undefined;

  const entityIndex = useMemo(() => buildEntityIndex(taskId), [taskId]);
  const highlightedHtml = useMemo(() => {
    if (!sourceData) return '';
    const withEntities = highlightEntitiesInHtml(sourceData.rawHtml, entityIndex);
    return addParagraphNumbers(withEntities);
  }, [sourceData, entityIndex]);

  const [activeEntity, setActiveEntity] = useState<EntityHighlight | null>(null);
  const [entityPopoverPos, setEntityPopoverPos] = useState<{ x: number; y: number } | null>(null);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const htmlContainerRef = useRef<HTMLDivElement>(null);

  const headings = useMemo(() => {
    if (!sourceData) return [];
    return extractHeadings(sourceData.rawHtml);
  }, [sourceData]);

  const nextSection = useMemo(() => {
    const allSubs = bookData.chapters.flatMap((ch) => ch.subSections);
    const idx = allSubs.findIndex((s) => s.id === taskId);
    if (idx === -1 || idx >= allSubs.length - 1) return null;
    return allSubs[idx + 1];
  }, [taskId]);

  // 滚动监听 — 高亮当前 heading
  useEffect(() => {
    if (!htmlContainerRef.current || headings.length === 0) return;
    const container = htmlContainerRef.current;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      let current = 0;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offset <= scrollTop + 100) {
          current = i;
        } else {
          break;
        }
      }
      setActiveHeading(headings[current]?.text || null);
      setActiveSectionIdx(current);
    };
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [headings]);

  const scrollToHeading = (offset: number) => {
    if (htmlContainerRef.current) {
      htmlContainerRef.current.scrollTo({ top: offset - 20, behavior: 'smooth' });
    }
  };

  if (!sourceData) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-stone-300" />
          <p className="text-stone-500 mb-2">该任务内容正在制作中</p>
          <button onClick={onBack} className="text-sm text-stone-600 underline">返回目录</button>
        </div>
      </div>
    );
  }

  const handleQuiz = (quizId: string, optionIndex: number) => {
    if (quizAnswers[quizId] !== undefined) return;
    setQuizAnswers({ ...quizAnswers, [quizId]: optionIndex });
  };

  const handleEntityClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'MARK' && target.dataset.entityId) {
      e.preventDefault();
      e.stopPropagation();
      const entityId = target.dataset.entityId;
      const entity = entityIndex.find((en) => en.id === entityId);
      if (entity) {
        const rect = target.getBoundingClientRect();
        setActiveEntity(entity);
        setEntityPopoverPos({ x: rect.left + rect.width / 2, y: rect.bottom + 4 });
      }
    } else if (target.classList.contains('purple-number') && target.dataset.pn) {
      e.preventDefault();
      e.stopPropagation();
      const pn = target.dataset.pn;
      const url = `${window.location.pathname}#pn-${pn}`;
      navigator.clipboard?.writeText(url).catch(() => {});
    } else {
      setActiveEntity(null);
      setEntityPopoverPos(null);
    }
  }, [entityIndex]);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setToolbarPos(null);
      return;
    }
    const text = selection.toString().trim();
    if (text.length < 2) {
      setToolbarPos(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = contentRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    if (rect.bottom < containerRect.top || rect.top > containerRect.bottom) {
      setToolbarPos(null);
      return;
    }
    setSelectedText(text);
    setToolbarPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  }, []);

  const openChat = () => {
    if (!selectedText) return;
    setChatOpen(true);
    setToolbarPos(null);
    window.getSelection()?.removeAllRanges();
  };

  // 当前 section 的 AI 增强
  const currentSectionEnhancement = enhancement?.sections.find(
    (s: AIEnhancementItem) => headings[activeSectionIdx]?.text?.includes(s.headingHint) || s.headingHint.includes(headings[activeSectionIdx]?.text || '')
  );

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col bg-stone-50">
      {/* Header */}
      <div className="shrink-0 bg-white/95 backdrop-blur border-b border-stone-100 z-20">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-stone-100">
            <ChevronLeft className="w-5 h-5 text-stone-700" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-400">{sourceData.moduleTitle}</p>
            <h1 className="text-sm font-semibold text-stone-900 truncate">{sourceData.title}</h1>
          </div>
          <button
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className="hidden md:block p-2 rounded-full active:bg-stone-100"
            title={aiPanelOpen ? '收起AI面板' : '展开AI面板'}
          >
            {aiPanelOpen
              ? <PanelRightClose className="w-5 h-5 text-stone-500" />
              : <PanelRightOpen className="w-5 h-5 text-stone-500" />}
          </button>
          {/* Mobile AI panel toggle — shows panel as overlay drawer */}
          <button
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className="md:hidden p-2 rounded-full active:bg-stone-100"
            title="AI助手"
          >
            <Sparkles className="w-5 h-5 text-violet-500" />
          </button>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex-1 flex overflow-hidden" ref={contentRef} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
        {/* Left: Original HTML content */}
        <div className="flex-1 overflow-y-auto" ref={htmlContainerRef}>
          {/* Raw HTML content */}
          <div
            className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-24 text-sm text-stone-700 leading-7 select-text
              [&_p]:mb-4 [&_p]:leading-7
              [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-6 [&_h2]:mb-3
              [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-stone-800 [&_h3]:mt-5 [&_h3]:mb-2
              [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-stone-700 [&_h4]:mt-4 [&_h4]:mb-2
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
              [&_th]:border [&_th]:border-stone-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-stone-100 [&_th]:font-semibold [&_th]:text-stone-800
              [&_td]:border [&_td]:border-stone-200 [&_td]:px-3 [&_td]:py-2
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-3
              [&_figure]:my-4
              [&_figcaption]:text-xs [&_figcaption]:text-stone-400 [&_figcaption]:text-center [&_figcaption]:mt-1
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
              [&_li]:mb-1
              [&_mark]:rounded [&_mark]:px-0.5 [&_mark]:transition-colors [&_mark]:cursor-pointer
              [&_.purple-number]:select-none"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            onClick={handleEntityClick}
          />

          {/* Floating TOC button */}
          {headings.length > 0 && (
            <>
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="fixed bottom-20 md:bottom-6 left-6 z-30 w-10 h-10 rounded-full bg-stone-900 text-stone-50 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                title="目录"
              >
                <List size={18} />
              </button>

              {tocOpen && (
                <div className="fixed bottom-32 md:bottom-20 left-6 z-30 w-72 max-h-[60vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-stone-200 p-3">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-semibold text-stone-500">目录</span>
                    <button onClick={() => setTocOpen(false)} className="text-stone-400 hover:text-stone-600">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {headings.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          scrollToHeading(h.offset);
                          setTocOpen(false);
                        }}
                        className={`w-full text-left text-sm rounded-lg px-2 py-1.5 transition-colors ${
                          activeHeading === h.text
                            ? 'bg-stone-900 text-stone-50 font-medium'
                            : 'text-stone-600 hover:bg-stone-50'
                        } ${h.level === 2 ? 'font-semibold' : ''} ${h.level >= 4 ? 'pl-5 text-xs' : h.level === 3 ? 'pl-3' : ''}`}
                      >
                        {h.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Next section */}
          {nextSection && onNavigateTask && (
            <div className="max-w-3xl mx-auto px-4 md:px-6 pb-24">
              <button
                onClick={() => {
                  onNavigateTask(nextSection.id);
                }}
                className="w-full flex items-center justify-between rounded-2xl bg-stone-900 text-stone-50 px-5 py-4 active:scale-[0.98] transition-transform"
              >
                <div className="text-left">
                  <p className="text-xs text-stone-400">下一节</p>
                  <p className="text-sm font-semibold mt-0.5">{nextSection.title}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          )}
        </div>

        {/* Right: AI Enhancement Panel — hidden on mobile, shown as overlay drawer */}
        {aiPanelOpen && (
          <div className="hidden md:block w-[380px] shrink-0 border-l border-stone-200 bg-white overflow-y-auto">
            {enhancement ? (
              <div className="p-4 space-y-4">
                {/* Sticky panel header — 章节信息固定不随滚动消失 */}
                <div className="sticky top-0 -mx-4 px-4 pt-4 pb-3 bg-white border-b border-stone-100 z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-bold text-stone-900">AI 学习助手</span>
                  </div>
                  <div className="text-xs text-stone-400 leading-relaxed">
                    <p className="truncate">{sourceData.moduleTitle}</p>
                    <p className="font-semibold text-stone-600 truncate">{sourceData.title}</p>
                  </div>
                </div>

                {/* Intro */}
                <CalloutCard
                  variant={enhancement.intro.variant}
                  title={enhancement.intro.title}
                  body={enhancement.intro.body}
                />

                {/* Section enhancements */}
                {enhancement.sections.map((sec: AIEnhancementItem, i: number) => (
                  <SectionEnhancementCard
                    key={i}
                    section={sec}
                    quizAnswer={quizAnswers[`sec-${i}`]}
                    onQuiz={(optIdx) => handleQuiz(`sec-${i}`, optIdx)}
                    isActive={currentSectionEnhancement?.headingHint === sec.headingHint}
                  />
                ))}

                {/* Outro */}
                <CalloutCard
                  variant={enhancement.outro.variant}
                  title={enhancement.outro.title}
                  body={enhancement.outro.body}
                />

                {/* Outro quiz */}
                {enhancement.outroQuiz && (
                  <QuizCard
                    quiz={enhancement.outroQuiz}
                    quizAnswer={quizAnswers['outro']}
                    onQuiz={(optIdx) => handleQuiz('outro', optIdx)}
                  />
                )}
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-4">
                  <Sparkles className="w-4 h-4 text-stone-300" />
                  <span className="text-sm font-bold text-stone-400">AI 学习助手</span>
                </div>
                <div className="text-center py-12">
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-stone-200" />
                  <p className="text-xs text-stone-400">本节 AI 增强内容待生成</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text selection toolbar */}
      {toolbarPos && selectedText && (
        <div
          className="fixed z-30"
          style={{
            left: toolbarPos.x,
            top: toolbarPos.y,
            transform: 'translate(-50%, -100%)',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <button
            onClick={openChat}
            className="flex items-center gap-1.5 bg-stone-900 text-stone-50 rounded-xl px-3 py-2 text-sm font-medium shadow-lg active:scale-95 transition-transform"
          >
            <Sparkles size={14} />
            向 AI 提问
          </button>
          <div className="flex justify-center -mt-1">
            <div className="w-2.5 h-2.5 bg-stone-900 rotate-45" />
          </div>
        </div>
      )}

      {/* Entity popover */}
      {activeEntity && entityPopoverPos && (
        <div
          className="fixed z-40"
          style={{
            left: entityPopoverPos.x,
            top: entityPopoverPos.y,
            transform: 'translateX(-50%)',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div className="w-72 rounded-2xl bg-white shadow-xl border border-stone-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: getEntityTypeColor(activeEntity.type) }}
                />
                <span className="text-sm font-bold text-stone-900">{activeEntity.title}</span>
              </div>
              <button
                onClick={() => { setActiveEntity(null); setEntityPopoverPos(null); }}
                className="text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 font-medium">
                {activeEntity.type}
              </span>
              {activeEntity.culture && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500">
                  {activeEntity.culture}
                </span>
              )}
              {activeEntity.count !== undefined && activeEntity.count > 0 && (
                <span className="text-[10px] text-stone-400">出现 {activeEntity.count} 次</span>
              )}
            </div>
            {activeEntity.gloss && (
              <p className="text-xs text-stone-600 leading-relaxed mb-1">{activeEntity.gloss}</p>
            )}
            {activeEntity.summary && (
              <p className="text-xs text-stone-500 leading-relaxed">{activeEntity.summary}</p>
            )}
            {activeEntity.refs && activeEntity.refs.length > 0 && (
              <div className="mt-2 pt-2 border-t border-stone-100">
                <p className="text-[10px] text-stone-400 mb-1">引用位置</p>
                <div className="flex flex-wrap gap-1">
                  {activeEntity.refs.filter(r => r.chapter === taskId).map((ref, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const pnMatch = ref.pn.match(/\d+/);
                        if (pnMatch) {
                          const el = htmlContainerRef.current?.querySelector(`#pn-${pnMatch[0]}`);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                    >
                      {ref.pn}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile AI panel overlay */}
      {aiPanelOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setAiPanelOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {enhancement ? (
              <div className="p-4 space-y-4">
                <div className="sticky top-0 -mx-4 px-4 pt-4 pb-3 bg-white border-b border-stone-100 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-violet-600" />
                      <span className="text-sm font-bold text-stone-900">AI 学习助手</span>
                    </div>
                    <button onClick={() => setAiPanelOpen(false)} className="text-stone-400 hover:text-stone-600">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="text-xs text-stone-400 leading-relaxed">
                    <p className="truncate">{sourceData.moduleTitle}</p>
                    <p className="font-semibold text-stone-600 truncate">{sourceData.title}</p>
                  </div>
                </div>
                <CalloutCard
                  variant={enhancement.intro.variant}
                  title={enhancement.intro.title}
                  body={enhancement.intro.body}
                />
                {enhancement.sections.map((sec: AIEnhancementItem, i: number) => (
                  <SectionEnhancementCard
                    key={i}
                    section={sec}
                    quizAnswer={quizAnswers[`sec-${i}`]}
                    onQuiz={(optIdx) => handleQuiz(`sec-${i}`, optIdx)}
                    isActive={currentSectionEnhancement?.headingHint === sec.headingHint}
                  />
                ))}
                <CalloutCard
                  variant={enhancement.outro.variant}
                  title={enhancement.outro.title}
                  body={enhancement.outro.body}
                />
                {enhancement.outroQuiz && (
                  <QuizCard
                    quiz={enhancement.outroQuiz}
                    quizAnswer={quizAnswers['outro']}
                    onQuiz={(optIdx) => handleQuiz('outro', optIdx)}
                  />
                )}
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-300" />
                    <span className="text-sm font-bold text-stone-400">AI 学习助手</span>
                  </div>
                  <button onClick={() => setAiPanelOpen(false)} className="text-stone-400 hover:text-stone-600">
                    <X size={18} />
                  </button>
                </div>
                <div className="text-center py-12">
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-stone-200" />
                  <p className="text-xs text-stone-400">本节 AI 增强内容待生成</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Canvas Chat Panel */}
      {chatOpen && (
        <CanvasChat
          selectedText={selectedText}
          chapterTitle={sourceData.title}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
// AI Enhancement UI Components

function CalloutCard({ variant, title, body }: {
  variant: 'info' | 'tip' | 'culture' | 'warning';
  title: string;
  body: string;
}) {
  const s = calloutStyles[variant];
  const Icon = s.icon;
  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} p-3`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-4 h-4 ${s.iconColor}`} />
        <span className={`text-sm font-bold ${s.titleColor}`}>{title}</span>
      </div>
      <p className={`text-sm ${s.bodyColor} leading-relaxed`}>{body}</p>
    </div>
  );
}

function SectionEnhancementCard({
  section,
  quizAnswer,
  onQuiz,
  isActive,
}: {
  section: AIEnhancementItem;
  quizAnswer: number | undefined;
  onQuiz: (optionIndex: number) => void;
  isActive: boolean;
}) {
  return (
    <div className={`rounded-xl border p-3 transition-all ${isActive ? 'border-violet-300 bg-violet-50/30' : 'border-stone-200 bg-stone-50/50'}`}>
      {/* Section heading hint */}
      <div className="flex items-center gap-1.5 mb-2">
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-xs font-medium text-stone-500">{section.headingHint}</span>
      </div>

      {/* Callout */}
      <CalloutCard
        variant={section.callout.variant}
        title={section.callout.title}
        body={section.callout.body}
      />

      {/* Quiz */}
      {section.quiz && (
        <div className="mt-2">
          <QuizCard
            quiz={section.quiz}
            quizAnswer={quizAnswer}
            onQuiz={onQuiz}
          />
        </div>
      )}
    </div>
  );
}

function QuizCard({
  quiz,
  quizAnswer,
  onQuiz,
}: {
  quiz: { question: string; options: string[]; answer: number; explanation: string };
  quizAnswer: number | undefined;
  onQuiz: (optionIndex: number) => void;
}) {
  const answered = quizAnswer !== undefined;
  const correct = quiz.answer;

  return (
    <div className="rounded-xl bg-violet-50 border border-violet-200 p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <FlaskConical className="w-3.5 h-3.5 text-violet-600" />
        <span className="text-xs font-bold text-violet-900">随堂测验</span>
      </div>
      <p className="text-sm font-medium text-stone-800 mb-3">{quiz.question}</p>
      <div className="space-y-1.5">
        {quiz.options.map((opt, i) => {
          const isSelected = quizAnswer === i;
          const isCorrect = i === correct;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => onQuiz(i)}
              disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center gap-2 text-xs ${
                showCorrect
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-medium'
                  : showWrong
                  ? 'border-red-400 bg-red-50 text-red-900'
                  : 'border-violet-200 bg-white text-stone-700 hover:border-violet-300'
              } ${answered ? 'cursor-default' : 'active:scale-[0.99]'}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                showCorrect ? 'bg-emerald-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-violet-100 text-violet-600'
              }`}>
                {showCorrect ? <Check className="w-3 h-3" /> : showWrong ? <X className="w-3 h-3" /> : String.fromCharCode(65 + i)}
              </div>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-2 flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-violet-800 leading-relaxed">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
