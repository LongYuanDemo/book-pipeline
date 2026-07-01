import type { LucideIcon } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface Props {
  tools: Tool[];
  onClick: (id: string) => void;
}

export default function ToolGrid({ tools, onClick }: Props) {
  return (
    <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => onClick(t.id)}
          className="text-left bg-white border border-stone-200 rounded-2xl p-4 transition-all active:scale-[0.98] active:bg-stone-50"
        >
          <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center mb-2`}>
            <t.icon size={18} className={t.color} />
          </div>
          <div className="text-sm font-bold text-stone-800 font-serif">{t.name}</div>
          <div className="text-xs text-stone-500 mt-0.5 leading-4">{t.sub}</div>
        </button>
      ))}
    </div>
  );
}
