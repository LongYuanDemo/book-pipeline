import { useState } from 'react';
import { TOOLS, type ToolType, type ViewType } from '@book/data/bookInfo.ts';

interface Props {
  onNavigate: (view: ViewType) => void;
}

export default function DesktopToolsMenu({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = (key: ToolType) => {
    onNavigate(key);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <span>🧰 学习工具</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-2">
            {TOOLS.map((tool) => (
              <button
                key={tool.key}
                onClick={() => handleClick(tool.key)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
