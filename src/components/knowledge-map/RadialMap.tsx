import { useState, useRef, useEffect, useCallback, useMemo, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X, ChevronRight, Search, Filter } from 'lucide-react';
import type { CanvasData, CanvasNode } from '@book/data/knowledgeMap.ts';

interface Props {
  data: CanvasData;
  onBack: () => void;
}

const EDGE_STYLE: Record<string, { dash: string; width: number; opacity: number }> = {
  prerequisite: { dash: '8 4', width: 2.5, opacity: 0.7 },
  parallel: { dash: 'none', width: 2, opacity: 0.5 },
  progressive: { dash: '10 3', width: 2.5, opacity: 0.7 },
  application: { dash: 'none', width: 2, opacity: 0.5 },
  alias: { dash: '2 3', width: 1.5, opacity: 0.4 },
  cross_ref: { dash: '6 3', width: 2, opacity: 0.5 },
};

const EDGE_LABEL: Record<string, string> = {
  prerequisite: '前置',
  parallel: '并列',
  progressive: '递进',
  application: '应用',
  alias: '别名',
  cross_ref: '引用',
};

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; light: string }> = {
  '1': { bg: '#fef2f2', border: '#ef4444', text: '#991b1b', light: '#fee2e2' },
  '2': { bg: '#fff7ed', border: '#f97316', text: '#9a3412', light: '#fed7aa' },
  '3': { bg: '#fefce8', border: '#eab308', text: '#854d0e', light: '#fef08a' },
  '4': { bg: '#f0fdf4', border: '#22c55e', text: '#166534', light: '#bbf7d0' },
  '5': { bg: '#ecfeff', border: '#06b6d4', text: '#155e75', light: '#a5f3fc' },
  '6': { bg: '#faf5ff', border: '#a855f7', text: '#6b21a8', light: '#e9d5ff' },
};

function nodeColor(color?: string) {
  if (!color) return { bg: '#ffffff', border: '#d1d5db', text: '#374151', light: '#f3f4f6' };
  return COLOR_MAP[color] || { bg: '#ffffff', border: '#d1d5db', text: '#374151', light: '#f3f4f6' };
}

function renderNodeText(text: string): string {
  return text.replace(/^#+\s*/gm, '').replace(/\*\*/g, '');
}

export default function RadialMap({ data, onBack }: Props) {
  const { nodes, edges, aliases } = data;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<CanvasNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const pinchDist = useRef(0);
  const touchStartPan = useRef({ x: 0, y: 0 });

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const moduleFilters = useMemo(() => {
    const groups = nodes.filter((n) => n.type === 'group' && n.color);
    return groups.map((g) => ({
      id: g.color!,
      label: g.label || renderNodeText(g.text || '模块'),
      color: COLOR_MAP[g.color!]?.border || '#6b7280',
    }));
  }, [nodes]);

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    nodes.forEach((n) => {
      if (n.type === 'group') return;
      const text = (n.text || '').toLowerCase();
      const label = (n.label || '').toLowerCase();
      if (text.includes(q) || label.includes(q)) {
        matches.add(n.id);
      }
      n.knowledgePoints?.forEach((kp) => {
        if (kp.title.toLowerCase().includes(q) || kp.summary?.toLowerCase().includes(q)) {
          matches.add(n.id);
        }
      });
    });
    aliases?.forEach((a) => {
      if (a.standard.toLowerCase().includes(q) || a.variant.toLowerCase().includes(q)) {
        nodes.forEach((n) => {
          if (n.text?.toLowerCase().includes(a.standard.toLowerCase()) ||
              n.text?.toLowerCase().includes(a.variant.toLowerCase())) {
            matches.add(n.id);
          }
        });
      }
    });
    return matches;
  }, [searchQuery, nodes, aliases]);

  const visibleNodeIds = useMemo(() => {
    if (!activeFilter) return null;
    const ids = new Set<string>();
    const groupNodes = nodes.filter((n) => n.type === 'group' && n.color === activeFilter);
    groupNodes.forEach((g) => {
      ids.add(g.id);
      nodes.forEach((n) => {
        if (n.type === 'text' && n.color === activeFilter &&
            n.x >= g.x && n.x <= g.x + g.width &&
            n.y >= g.y && n.y <= g.y + g.height) {
          ids.add(n.id);
        }
      });
    });
    ids.add('center');
    return ids;
  }, [activeFilter, nodes]);

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

    const padding = 60;
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
      touchStartPan.current = pan;
    } else if (e.touches.length === 1) {
      dragging.current = true;
      setIsDragging(true);
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [pan]);

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

  return (
    <div className="w-full h-full bg-stone-50 flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-white/95 to-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>关闭</span>
          </button>
          <h1 className="text-sm font-semibold text-stone-800 font-serif">知识地图</h1>
          <div className="text-xs text-stone-400 tabular-nums">{Math.round(scale * 100)}%</div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="flex-1 flex items-center gap-1.5 bg-white rounded-lg border border-stone-200 px-2.5 py-1.5 min-w-0">
            <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索节点…"
              className="flex-1 text-xs outline-none bg-transparent text-stone-700 placeholder:text-stone-400 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-600 flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          {moduleFilters.length > 0 && (
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs transition-colors flex-shrink-0 ${
                activeFilter || showSidebar
                  ? 'bg-stone-900 text-stone-50 border-stone-900'
                  : 'bg-white text-stone-500 border-stone-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">过滤</span>
            </button>
          )}
        </div>
        {showSidebar && moduleFilters.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <button
              onClick={() => setActiveFilter(null)}
              className={`text-xs rounded-full px-2.5 py-1 transition-colors ${
                !activeFilter ? 'bg-stone-900 text-stone-50' : 'bg-white border border-stone-200 text-stone-500'
              }`}
            >
              全部
            </button>
            {moduleFilters.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveFilter(activeFilter === m.id ? null : m.id)}
                className={`flex items-center gap-1 text-xs rounded-full px-2.5 py-1 transition-colors ${
                  activeFilter === m.id ? 'text-white' : 'bg-white border border-stone-200 text-stone-500'
                }`}
                style={activeFilter === m.id ? { backgroundColor: m.color } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeFilter === m.id ? 'white' : m.color }} />
                {m.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {selectedNode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-md max-h-[60vh] overflow-y-auto animate-[slideDown_0.2s_ease-out]">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColor(selectedNode.color).border }} />
                <h3 className="font-bold text-stone-900 text-base">
                  {selectedNode.label || renderNodeText(selectedNode.text || '')}
                </h3>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {selectedNode.text && (
              <p className="text-sm text-stone-600 leading-relaxed">{renderNodeText(selectedNode.text)}</p>
            )}
            {selectedNode.knowledgePoints && selectedNode.knowledgePoints.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-400 mb-2">知识点（{selectedNode.knowledgePoints.length}）</p>
                <div className="space-y-2">
                  {selectedNode.knowledgePoints.map((kp) => (
                    <div key={kp.id} className="rounded-lg bg-stone-50 px-3 py-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-white rounded px-1.5 py-0.5" style={{ backgroundColor: nodeColor(selectedNode.color).border }}>
                          {kp.type}
                        </span>
                        <span className="text-sm font-medium text-stone-800">{kp.title}</span>
                        {kp.difficulty && <span className="text-[10px] text-stone-400 ml-auto">难度 {kp.difficulty}/5</span>}
                      </div>
                      {kp.summary && <p className="text-xs text-stone-500 leading-relaxed">{kp.summary}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {edges.filter((e) => e.fromNode === selectedNode.id || e.toNode === selectedNode.id).length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-400 mb-1.5">关联节点</p>
                <div className="flex flex-wrap gap-1.5">
                  {edges
                    .filter((e) => e.fromNode === selectedNode.id || e.toNode === selectedNode.id)
                    .map((e) => {
                      const otherId = e.fromNode === selectedNode.id ? e.toNode : e.fromNode;
                      const other = nodeMap.get(otherId);
                      if (!other || other.type === 'group') return null;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelectedNode(other)}
                          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          {e.type && <span className="text-[9px] text-stone-400">{EDGE_LABEL[e.type]}</span>}
                          {renderNodeText(other.text || other.label || '')}
                          <ChevronRight className="w-3 h-3" />
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
          backgroundImage: 'radial-gradient(circle, #e7e5e4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onClick={() => setSelectedNode(null)}
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
              if (visibleNodeIds && !visibleNodeIds.has(edge.fromNode) && !visibleNodeIds.has(edge.toNode)) return null;
              const fx = from.x + from.width / 2 - (bounds.minX - 50);
              const fy = from.y + from.height / 2 - (bounds.minY - 50);
              const tx = to.x + to.width / 2 - (bounds.minX - 50);
              const ty = to.y + to.height / 2 - (bounds.minY - 50);
              const edgeColor = edge.color ? (COLOR_MAP[edge.color]?.border || '#cbd5e1') : '#cbd5e1';
              const isHighlighted = hoveredNode && (edge.fromNode === hoveredNode || edge.toNode === hoveredNode);
              const style = edge.type ? EDGE_STYLE[edge.type] : EDGE_STYLE.application;
              const isSearchMatch = searchMatches.size > 0 && (searchMatches.has(edge.fromNode) || searchMatches.has(edge.toNode));
              return (
                <line
                  key={edge.id}
                  x1={fx}
                  y1={fy}
                  x2={tx}
                  y2={ty}
                  stroke={edgeColor}
                  strokeWidth={isHighlighted ? style.width + 1 : style.width}
                  strokeDasharray={style.dash}
                  opacity={hoveredNode ? (isHighlighted ? 0.9 : 0.12) : isSearchMatch ? 0.8 : searchMatches.size > 0 ? 0.15 : style.opacity}
                  style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const c = nodeColor(node.color);
            if (node.type === 'group') {
              const isDimmed = (hoveredNode && !connectedNodeIds.has(node.id) && hoveredNode !== node.id) ||
                               (visibleNodeIds && !visibleNodeIds.has(node.id));
              return (
                <div
                  key={node.id}
                  className="absolute rounded-2xl border-2 border-dashed transition-opacity"
                  style={{
                    left: node.x,
                    top: node.y,
                    width: node.width,
                    height: node.height,
                    borderColor: c.border,
                    backgroundColor: c.bg + '30',
                    opacity: isDimmed ? 0.15 : 1,
                  }}
                >
                  {node.label && (
                    <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: c.border, color: 'white' }}>
                      {node.label}
                    </div>
                  )}
                </div>
              );
            }
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const isDimmed = (hoveredNode && !connectedNodeIds.has(node.id) && !isHovered) ||
                             (visibleNodeIds && !visibleNodeIds.has(node.id)) ||
                             (searchMatches.size > 0 && !searchMatches.has(node.id));
            const isSearchHit = searchMatches.size > 0 && searchMatches.has(node.id);
            return (
              <div
                key={node.id}
                className="absolute rounded-xl border-2 px-3 py-2 cursor-pointer flex items-center justify-center text-center transition-all"
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                  backgroundColor: c.bg,
                  borderColor: isSelected ? c.border : isHovered ? c.border : isSearchHit ? c.border : c.border + '60',
                  boxShadow: isSelected
                    ? `0 0 0 3px ${c.border}30, 0 4px 12px rgba(0,0,0,0.08)`
                    : isSearchHit
                    ? `0 0 0 3px ${c.border}40, 0 2px 8px rgba(0,0,0,0.06)`
                    : isHovered
                    ? `0 0 0 2px ${c.border}20, 0 2px 8px rgba(0,0,0,0.06)`
                    : '0 1px 3px rgba(0,0,0,0.04)',
                  opacity: isDimmed ? 0.2 : 1,
                  transform: isHovered || isSelected ? 'scale(1.03)' : 'scale(1)',
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <span className="font-medium leading-tight" style={{ color: c.text, fontSize: node.width > 400 ? '15px' : '13px' }}>
                  {node.text ? renderNodeText(node.text) : ''}
                </span>
                {node.knowledgePoints && node.knowledgePoints.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: c.border }}>
                    {node.knowledgePoints.length}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-4 md:bottom-6 right-3 md:right-4 flex flex-col gap-2 z-10">
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

        {!selectedNode && !isDragging && scale === 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-3 md:left-4 z-10 text-[10px] md:text-xs text-stone-400 bg-white/80 backdrop-blur-sm rounded-lg px-2.5 md:px-3 py-1.5 md:py-2 border border-stone-200">
            拖拽平移 · 滚轮/双指缩放 · 点击节点查看详情
          </div>
        )}
      </div>
    </div>
  );
}
