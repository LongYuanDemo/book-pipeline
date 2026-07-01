import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  pcWide?: boolean;
  fixedHeight?: boolean;
}

export default function MobileContainer({ children, className = '', pcWide = false, fixedHeight = false }: Props) {
  return (
    <div className={`${fixedHeight ? 'h-screen' : 'min-h-screen'} w-full flex justify-center bg-stone-200`}>
      <div
        className={`w-full max-w-md ${pcWide ? 'md:max-w-6xl' : 'md:max-w-2xl'} ${fixedHeight ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-stone-50 shadow-xl relative flex flex-col ${className}`}
        style={fixedHeight ? { height: '100vh' } : { minHeight: '100vh' }}
      >
        {children}
      </div>
    </div>
  );
}
