import { useEffect, useMemo, useRef } from 'react';
import mermaid from 'mermaid';
import type { ProgressiveMermaidData } from '../types/audio';

interface Props {
  data: ProgressiveMermaidData;
  currentTime: number;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#E8F0F8',
    primaryTextColor: '#1E3A5F',
    primaryBorderColor: '#A3C3E3',
    lineColor: '#94A3B8',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: '14px',
  },
  flowchart: {
    curve: 'basis',
    padding: 24,
    useMaxWidth: true,
    htmlLabels: true,
  },
});

export default function ProgressiveMermaidGraph({ data, currentTime }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastNodesRef = useRef<Set<string>>(new Set());
  const renderIdRef = useRef(0);

  const { visible, def } = useMemo(() => {
    const visible = new Set<string>();
    let focusId = data.timeline[0]?.focusNodeId ?? data.nodes[0]?.id;

    for (const step of data.timeline) {
      if (currentTime >= step.time) {
        step.nodeIds.forEach((id) => visible.add(id));
        focusId = step.focusNodeId;
      }
    }

    let def = 'graph TD\n';
    for (const node of data.nodes) {
      if (visible.has(node.id)) {
        const cls = node.id === focusId ? 'focus' : 'spoken';
        def += `    ${node.id}["${node.label}"]:::${cls}\n`;
      }
    }
    for (const edge of data.edges) {
      if (visible.has(edge.from) && visible.has(edge.to)) {
        def += `    ${edge.from} --> ${edge.to}\n`;
      }
    }
    def += '    classDef focus fill:#1E3A5F,stroke:#1E3A5F,color:#FFFFFF,stroke-width:2px;\n';
    def += '    classDef spoken fill:#E8F0F8,stroke:#A3C3E3,color:#1E3A5F,stroke-width:1.5px;\n';

    return { visible, focusId, def };
  }, [data, currentTime]);

  useEffect(() => {
    if (!containerRef.current) return;

    const newlyVisible = new Set([...visible].filter((id) => !lastNodesRef.current.has(id)));
    lastNodesRef.current = new Set(visible);

    const renderId = ++renderIdRef.current;
    const container = containerRef.current;

    mermaid.render(`audio-course-graph-${renderId}`, def).then(({ svg }) => {
      if (!containerRef.current || renderId !== renderIdRef.current) return;
      container.innerHTML = svg;
      const svgEl = container.querySelector('svg');
      if (svgEl) {
        svgEl.style.maxWidth = '100%';
        svgEl.style.height = 'auto';
        const focusG = svgEl.querySelector('.node.focus');
        if (focusG) focusG.classList.add('node-focus-animation');
        newlyVisible.forEach((id) => {
          const g = svgEl.querySelector(`.node[id*="${id}"]`);
          if (g) g.classList.add('node-new');
        });
      }
    });

    return () => {
      renderIdRef.current += 1;
    };
  }, [def, visible]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[280px] md:min-h-[360px] flex items-center justify-center overflow-hidden"
    />
  );
}
