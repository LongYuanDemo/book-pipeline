import { useState, useRef, useEffect, useCallback, useMemo, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X, Search, Globe, BookOpen, Film, Music } from 'lucide-react';
import type { CanvasData, AdaptationWork } from '@book/data/knowledgeMap.ts';

interface Props {
  data: CanvasData;
  onBack: () => void;
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  translation: <BookOpen className="w-3 h-3" />,
  adaptation: <Film className="w-3 h-3" />,
  influence: <Globe className="w-3 h-3" />,
  remake: <Film className="w-3 h-3" />,
  citation: <Music className="w-3 h-3" />,
};

const TYPE_LABEL: Record<string, string> = {
  translation: '翻译',
  adaptation: '改编',
  influence: '影响',
  remake: '重拍',
  citation: '引用',
};

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  '1': { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
  '2': { bg: '#fff7ed', border: '#f97316', text: '#9a3412' },
  '3': { bg: '#fefce8', border: '#eab308', text: '#854d0e' },
  '4': { bg: '#f0fdf4', border: '#22c55e', text: '#166534' },
  '5': { bg: '#ecfeff', border: '#06b6d4', text: '#155e75' },
};

function nodeColor(color?: string) {
  if (!color) return { bg: '#ffffff', border: '#d1d5db', text: '#374151' };
  return COLOR_MAP[color] || { bg: '#ffffff', border: '#d1d5db', text: '#374151' };
}

function renderNodeText(text: string): string {
  return text.replace(/^#+\s*/gm, '').replace(/\*\*/g, '');
}

export default function AdaptationFlow({ data, onBack }: Props) {
  const { nodes, edges, adaptationFlow } = data;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedWork, setSelectedWork] = useState<AdaptationWork | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const pinchDist = useRef(0);

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const workMap = useMemo(() => {
    const map = new Map<string, AdaptationWork>();
    adaptationFlow?.works.forEach((w) => map.set(w.id, w));
    return map;
  }, [adaptationFlow]);

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    nodes.forEach((n) => {
      const text = (n.text || '').toLowerCase();
      if (text.includes(q)) matches.add(n.id);
    });
    return matches;
  }, [searchQuery, nodes]);

  const bounds = useMemo(() => ({
    minX: Math.min(...nodes.map((n) => n.x)),
    minY: Math.min(...nodes.map((n) => n.y)),
    maxX: Math.max(...nodes.map((n) => n.x + n.width)),
    maxY: Math.max(...nodes.map((n) => n.y + n.height)),
  }), [nodes]);

  const contentW = bounds.maxX - bounds.minX;
  const contentH = bounds.maxY - bounds.minY;

  const fitToScreen = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    if (contentW <= 0 || contentH <= 0) return;

    const padding = 80;
    const scaleX = (cw - padding * 2) / contentW;
    const scaleY = (ch - padding * 2) / contentH;
    const newScale = Math.min(scaleX, scaleY, 1);

    const offsetX = (cw - contentW * newScale) / 2 - bounds.minX * newScale;
    const offsetY = (ch - contentH * newScale) / 2 - bounds.minY * newScale;

    setScale(newScale);
    setPan({ x: offsetX, y: offsetY });
  }, [contentW, contentH, bounds.minX, bounds.minY]);

  useEffect(() => {
    fitToScreen();
  }, [fitToScreen]);

  useEffect(() => {
    const handler = () => fitToScreen();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [fitToScreen]);

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (e.button !== 0) return;
    dragging.current = true;
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: ReactTouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDist.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      dragging.current = true;
      setIsDragging(true);
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e: ReactTouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (pinchDist.current > 0) {
        const ratio = dist / pinchDist.current;
        setScale((s) => Math.max(0.15, Math.min(2.5, s * ratio)));
      }
      pinchDist.current = dist;
    } else if (e.touches.length === 1 && dragging.current) {
      const dx = e.touches[0].clientX - lastPos.current.x;
      const dy = e.touches[0].clientY - lastPos.current.y;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragging.current = false;
    setIsDragging(false);
    pinchDist.current = 0;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.max(0.15, Math.min(2.5, s * delta)));
  }, []);

  const connectedEdges = hoveredNode
    ? edges.filter((e) => e.fromNode === hoveredNode || e.toNode === hoveredNode)
    : [];
  const connectedNodeIds = new Set<string>();
  connectedEdges.forEach((e) => {
    connectedNodeIds.add(e.fromNode);
    connectedNodeIds.add(e.toNode);
  });

  const zoomBy = (factor: number) => {
    setScale((s) => Math.max(0.15, Math.min(2.5, s * factor)));
  };

  const selectedNode = selectedWork ? nodeMap.get(selectedWork.id) || null : null;

  return (
    <div className="w-full h-full bg-[#faf8f5] flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-[#faf8f5]/95 to-[#faf8f5]/70 backdrop-blur-sm border-b border-stone-200/50">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors">
            <X className="w-5 h-5" />
            <span>关闭</span>
          </button>
          <div className="text-center">
            <h1 className="text-sm font-semibold text-stone-800 font-serif">跨文化文本旅行图</h1>
            <p className="text-[10px] text-stone-500">{data.rationale}</p>
          </div>
          <div className="text-xs text-stone-400 tabular-nums">{Math.round(scale * 100)}%</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-1.5 bg-white rounded-lg border border-stone-200 px-2.5 py-1.5">
            <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索作品、作者、媒介…"
              className="flex-1 text-xs outline-none bg-transparent text-stone-700 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </header>

      {selectedWork && selectedNode && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-md max-h-[60vh] overflow-y-auto animate-[slideDown_0.2s_ease-out]">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="inline-block text-[10px] font-bold text-white rounded px-1.5 py-0.5 mb-1" style={{ backgroundColor: '#8b5cf6' }}>
                  {selectedWork.culture} · {selectedWork.medium}
                </span>
                <h3 className="font-bold text-stone-900 text-base">{selectedWork.title}</h3>
                {selectedWork.author && <p className="text-xs text-stone-500">{selectedWork.author}</p>}
                {selectedWork.year && <p className="text-xs text-stone-400">{selectedWork.year}</p>}
              </div>
              <button onClick={() => setSelectedWork(null)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {selectedWork.summary && (
              <p className="text-sm text-stone-600 leading-relaxed">{selectedWork.summary}</p>
            )}
            {edges.filter((e) => e.fromNode === selectedWork.id || e.toNode === selectedWork.id).length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-400 mb-1.5">文本旅行</p>
                <div className="flex flex-wrap gap-1.5">
                  {edges
                    .filter((e) => e.fromNode === selectedWork.id || e.toNode === selectedWork.id)
                    .map((e) => {
                      const otherId = e.fromNode === selectedWork.id ? e.toNode : e.fromNode;
                      const other = workMap.get(otherId);
                      if (!other) return null;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelectedWork(other)}
                          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          {e.type && TYPE_ICON[e.type]}
                          {e.type && <span className="text-[9px] text-stone-400">{TYPE_LABEL[e.type]}</span>}
                          {other.title}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        ref={canvasRef}
        className="flex-1 relative overflow-hidden touch-none"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          backgroundImage: 'linear-gradient(to right, #e7e5e4 1px, transparent 1px), linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onClick={() => setSelectedWork(null)}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            width: contentW,
            height: contentH,
            left: 0,
            top: 0,
          }}
        >
          <svg
            className="absolute pointer-events-none"
            style={{ left: bounds.minX - 50, top: bounds.minY - 50, width: contentW + 100, height: contentH + 100 }}
          >
            {edges.map((edge) => {
              const from = nodeMap.get(edge.fromNode);
              const to = nodeMap.get(edge.toNode);
              if (!from || !to) return null;
              const fx = from.x + from.width / 2 - (bounds.minX - 50);
              const fy = from.y + from.height / 2 - (bounds.minY - 50);
              const tx = to.x + to.width / 2 - (bounds.minX - 50);
              const ty = to.y + to.height / 2 - (bounds.minY - 50);
              const isHighlighted = hoveredNode && (edge.fromNode === hoveredNode || edge.toNode === hoveredNode);
              const isSearchMatch = searchMatches.size > 0 && (searchMatches.has(edge.fromNode) || searchMatches.has(edge.toNode));
              return (
                <g key={edge.id}>
                  <line
                    x1={fx}
                    y1={fy}
                    x2={tx}
                    y2={ty}
                    stroke={isHighlighted ? '#7c3aed' : '#a8a29e'}
                    strokeWidth={isHighlighted ? 3 : 1.5}
                    opacity={hoveredNode ? (isHighlighted ? 0.9 : 0.12) : isSearchMatch ? 0.8 : searchMatches.size > 0 ? 0.15 : 0.6}
                    style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                    markerEnd="url(#arrowhead)"
                  />
                  {edge.label && (
                    <text
                      x={(fx + tx) / 2}
                      y={(fy + ty) / 2 - 6}
                      textAnchor="middle"
                      className="text-[10px]"
                      fill={isHighlighted ? '#7c3aed' : '#78716c'}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#a8a29e" />
              </marker>
            </defs>
          </svg>

          {nodes.map((node) => {
            const c = nodeColor(node.color);
            const isTitle = node.id === 'adaptation-title';
            const isLane = node.id.startsWith('lane-');
            const isWork = !isTitle && !isLane;
            const work = isWork ? workMap.get(node.id) : null;
            const isSelected = selectedWork?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const isDimmed = (hoveredNode && !connectedNodeIds.has(node.id) && !isHovered) ||
                             (searchMatches.size > 0 && !searchMatches.has(node.id));
            const isSearchHit = searchMatches.size > 0 && searchMatches.has(node.id);

            return (
              <div
                key={node.id}
                className={`absolute flex items-center justify-center text-center transition-all ${
                  isTitle ? 'rounded-2xl' : isLane ? 'rounded-lg' : 'rounded-xl'
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                  backgroundColor: isLane ? 'transparent' : c.bg,
                  border: isLane ? 'none' : `2px solid ${isSelected ? c.border : isHovered ? c.border : isSearchHit ? c.border : c.border + '60'}`,
                  boxShadow: isSelected
                    ? `0 0 0 3px ${c.border}30, 0 4px 12px rgba(0,0,0,0.08)`
                    : isSearchHit
                    ? `0 0 0 3px ${c.border}40, 0 2px 8px rgba(0,0,0,0.06)`
                    : isHovered
                    ? `0 0 0 2px ${c.border}20, 0 2px 8px rgba(0,0,0,0.06)`
                    : isWork ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  opacity: isDimmed ? 0.2 : 1,
                  transform: isHovered || isSelected ? 'scale(1.03)' : 'scale(1)',
                  cursor: isWork || isTitle ? 'pointer' : 'default',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (work) setSelectedWork(work);
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isWork && work && (
                  <div className="flex flex-col items-center">
                    <span className="font-medium leading-tight" style={{ color: c.text, fontSize: '13px' }}>
                      {renderNodeText(node.text || work.title)}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{work.culture}</span>
                  </div>
                )}
                {(isTitle || isLane) && (
                  <span className="font-medium leading-tight" style={{ color: c.text, fontSize: isTitle ? '15px' : '12px' }}>
                    {renderNodeText(node.text || '')}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-6 right-4 flex flex-col gap-2 z-10">
          <button onClick={() => zoomBy(1.2)} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors border border-stone-200">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={() => zoomBy(0.8)} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors border border-stone-200">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button onClick={fitToScreen} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors border border-stone-200">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {!selectedWork && !isDragging && (
          <div className="absolute bottom-6 left-4 z-10 text-xs text-stone-500 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-stone-200">
            横轴 ≈ 时间 · 纵轴 ≈ 文化圈层 · 拖拽平移 · 滚轮缩放
          </div>
        )}
      </div>
    </div>
  );
}
