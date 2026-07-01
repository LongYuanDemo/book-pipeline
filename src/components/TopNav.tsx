import { BookOpen, Bot, User, Layers, Headphones, Network, ClipboardList, BookText } from 'lucide-react';
import type { ViewType, ToolType } from '@book/data/bookInfo.ts';
import { TOOLS, MODULES } from '@book/data/bookInfo.ts';

const mainTabs: { key: ViewType; label: string; icon: typeof BookOpen }[] = [
  { key: 'home', label: '图书', icon: BookOpen },
  { key: 'agent', label: '智能体', icon: Bot },
  ...(MODULES.bookSkill ? [{ key: 'book-skill' as ViewType, label: 'Book to Skill', icon: BookText }] : []),
];

const toolIconMap: Record<string, typeof Layers> = {
  anki: Layers,
  audio: Headphones,
  mindmap: Network,
  checklist: ClipboardList,
};

const toolTabs: { key: ToolType; label: string; icon: typeof Layers }[] = TOOLS.map((t) => ({
  key: t.key,
  label: t.label === '视频清单' ? '视频清单' : t.label,
  icon: toolIconMap[t.key] || Layers,
}));

const profileTab = { key: 'profile' as ViewType, label: '我的', icon: User };

interface Props {
  active: ViewType;
  onNavigate: (view: ViewType) => void;
}

export default function TopNav({ active, onNavigate }: Props) {
  const isToolActive = (key: string) => {
    if (key === 'audio') return active === 'audio' || active === 'audio-player';
    return active === key;
  };

  return (
    <header className="hidden md:block bg-white border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-lg text-stone-900 font-serif">数智教材</div>
        <nav className="flex items-center gap-1">
          {mainTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active === tab.key
                  ? 'text-stone-900 font-semibold bg-stone-100'
                  : 'text-stone-500 hover:bg-stone-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          <div className="w-px h-5 bg-stone-200 mx-1" />
          {toolTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key as ViewType)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isToolActive(tab.key)
                  ? 'text-stone-900 font-semibold bg-stone-100'
                  : 'text-stone-500 hover:bg-stone-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          <div className="w-px h-5 bg-stone-200 mx-1" />
          <button
            onClick={() => onNavigate(profileTab.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              active === profileTab.key
                ? 'text-stone-900 font-semibold bg-stone-100'
                : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            <profileTab.icon className="w-4 h-4" />
            {profileTab.label}
          </button>
        </nav>
      </div>
    </header>
  );
}
