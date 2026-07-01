import type { ReactNode } from 'react';
import { X, ZoomIn, ZoomOut, Maximize, Search } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleFullscreen?: () => void;
  onSearch?: (q: string) => void;
}

export default function KnowledgeMapShell({
  title,
  subtitle,
  children,
  onBack,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  onSearch,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-100 text-stone-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-stone-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="返回"
          >
            <X size={18} />
            <span>关闭</span>
          </button>
          <div className="h-5 w-px bg-stone-200" />
          <div>
            <h1 className="text-base font-semibold font-serif text-stone-900">{title}</h1>
            {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSearch && (
            <div className="hidden md:flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-1.5">
              <Search size={14} className="text-stone-400" />
              <input
                type="text"
                placeholder="搜索作品、人物..."
                className="bg-transparent text-sm outline-none w-40 placeholder:text-stone-400"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          {onZoomIn && (
            <button
              onClick={onZoomIn}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="放大"
            >
              <ZoomIn size={18} />
            </button>
          )}
          {onZoomOut && (
            <button
              onClick={onZoomOut}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="缩小"
            >
              <ZoomOut size={18} />
            </button>
          )}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="全屏"
            >
              <Maximize size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Main canvas area */}
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
