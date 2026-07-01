import { BookOpen, Bot, User, BookText } from 'lucide-react';
import type { ViewType } from '@book/data/bookInfo.ts';
import { MODULES } from '@book/data/bookInfo.ts';

interface Props {
  active: ViewType;
  onNavigate: (view: ViewType) => void;
}

const tabs: { key: ViewType; label: string; icon: typeof BookOpen }[] = [
  { key: 'home', label: '图书', icon: BookOpen },
  { key: 'agent', label: '智能体', icon: Bot },
  ...(MODULES.bookSkill ? [{ key: 'book-skill' as ViewType, label: 'Skill', icon: BookText }] : []),
  { key: 'profile', label: '我的', icon: User },
];

export default function BottomNav({ active, onNavigate }: Props) {
  const isAudioActive = active === 'audio' || active === 'audio-player';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 pb-safe">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = tab.key === active || (tab.key === 'audio' && isAudioActive);
          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-stone-900' : 'text-stone-400'
              }`}
            >
              <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 2} />
              <span className={`text-[11px] mt-1 ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
