import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}

export default function TopBar({ title, onBack, right }: Props) {
  return (
    <div className="sticky top-0 z-30 flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-200">
      {onBack && (
        <button
          onClick={onBack}
          className="p-1 -ml-1 rounded-full transition-colors active:bg-stone-200"
        >
          <ChevronLeft size={22} className="text-stone-500" />
        </button>
      )}
      <div className="flex-1 text-base font-bold text-stone-900 truncate font-serif">
        {title}
      </div>
      {right}
    </div>
  );
}
