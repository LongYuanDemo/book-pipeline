import type { ReactNode } from 'react';
import type { ViewType } from '@book/data/bookInfo.ts';
import BottomNav from './BottomNav.tsx';
import TopNav from './TopNav.tsx';

interface Props {
  active: ViewType;
  onNavigate: (view: ViewType) => void;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function AppShell({ active, onNavigate, fullWidth = false, children }: Props) {
  return (
    <div className="min-h-screen bg-stone-200 md:h-screen md:overflow-hidden flex flex-col">
      {/* PC top navigation — direct child for sticky to work */}
      <TopNav active={active} onNavigate={onNavigate} />

      {/* Main content area */}
      <main
        className={
          fullWidth
            ? 'w-full pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0 md:overflow-y-auto md:flex-1'
            : 'max-w-[1200px] mx-auto md:px-6 md:py-6 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0 md:overflow-y-auto md:flex-1'
        }
      >
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <BottomNav active={active} onNavigate={onNavigate} />
    </div>
  );
}
