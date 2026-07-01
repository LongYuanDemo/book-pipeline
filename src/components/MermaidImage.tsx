import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidImageProps {
  mermaidCode: string;
  alt?: string;
}

let mermaidInitialized = false;
let renderId = 0;

export function MermaidImage({ mermaidCode, alt = 'Diagram for the lesson.' }: MermaidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mermaidCode) {
      setError(false);
      return;
    }

    if (!mermaidInitialized) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          flowchart: { useMaxWidth: false },
          securityLevel: 'loose',
        });
        mermaidInitialized = true;
      } catch (initErr) {
        console.error('Mermaid initialize error:', initErr);
        setError(true);
        return;
      }
    }

    const id = `mermaid-svg-${++renderId}`;
    let cancelled = false;

    mermaid
      .render(id, mermaidCode)
      .then(({ svg }) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setError(false);

        const svgEl = containerRef.current.querySelector('svg');
        if (!svgEl) return;

        // Fit to container: scale by the constraining dimension
        const vbAttr = svgEl.getAttribute('viewBox');
        if (vbAttr) {
          const parts = vbAttr.split(/\s+/);
          const intrinsicW = parseFloat(parts[2]) || 0;
          const intrinsicH = parseFloat(parts[3]) || 0;
          if (intrinsicW && intrinsicH) {
            const containerW = containerRef.current.clientWidth;
            const containerH = containerRef.current.clientHeight;
            const fitScale = Math.min(containerW / intrinsicW, containerH / intrinsicH, 1);
            svgEl.style.width = `${intrinsicW * fitScale}px`;
            svgEl.style.height = `${intrinsicH * fitScale}px`;
          }
        }
        svgEl.style.maxWidth = 'none';
        svgEl.style.maxHeight = 'none';
        svgEl.style.display = 'block';
        svgEl.style.margin = '0 auto';
        svgEl.setAttribute('role', 'img');
        svgEl.setAttribute('aria-label', alt);

        // Node fade-in animation for .new nodes
        const newNodes = svgEl.querySelectorAll('.new');
        newNodes.forEach((el, idx) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.opacity = '0';
          htmlEl.style.animation = `node-fade-in 0.4s ease-out ${idx * 0.25}s forwards`;
        });

        // Edge draw animation for edges connected to new nodes
        const newNodeNames = new Set<string>();
        newNodes.forEach((el) => {
          const elId = el.getAttribute('id') || '';
          const match = elId.match(/flowchart-([A-Za-z0-9_]+)-\d+/);
          if (match) newNodeNames.add(match[1]);
        });

        const edgeLabels = svgEl.querySelectorAll('g.edgeLabels > g.edgeLabel');
        const edgePaths = svgEl.querySelectorAll('g.edgePaths > path');
        let edgeIdx = 0;
        edgeLabels.forEach((labelEl) => {
          const labelG = labelEl.querySelector('g.label');
          const dataId = labelG?.getAttribute('data-id') || '';
          const parts = dataId.match(/^L_(.+?)_(.+?)_\d+$/);
          if (parts) {
            const source = parts[1];
            const target = parts[2];
            if (newNodeNames.has(source) || newNodeNames.has(target)) {
              const path = edgePaths[edgeIdx] as SVGPathElement | undefined;
              if (path) {
                path.setAttribute('pathLength', '1');
                path.style.strokeDasharray = '1';
                path.style.strokeDashoffset = '1';
                path.style.animation = `edge-draw 0.3s ease-out ${edgeIdx * 0.15 + 0.1}s forwards`;
              }
              const htmlLabel = labelEl as HTMLElement;
              htmlLabel.style.opacity = '0';
              htmlLabel.style.animation = `node-fade-in 0.3s ease-out ${edgeIdx * 0.15 + 0.2}s forwards`;
            }
          }
          edgeIdx++;
        });
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Mermaid render error:', err);
          setError(true);
        }
      });

    return () => { cancelled = true; };
  }, [mermaidCode, alt]);

  if (error) {
    return (
      <div className="flex items-center justify-center text-sm text-stone-400 py-8">
        图表渲染失败
      </div>
    );
  }

  return <div ref={containerRef} className="vsd-svg-container" />;
}
