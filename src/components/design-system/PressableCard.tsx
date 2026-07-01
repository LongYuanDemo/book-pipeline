import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function PressableCard({ children, onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white border border-stone-200 rounded-2xl p-4 transition-all active:scale-[0.98] active:bg-stone-100 ${className}`}
    >
      {children}
    </button>
  );
}
