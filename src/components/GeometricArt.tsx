export function HeroPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </linearGradient>
        </defs>
        <circle cx="320" cy="60" r="120" fill="url(#heroGrad)" opacity="0.3" />
        <circle cx="80" cy="240" r="100" fill="#D4A574" opacity="0.15" />
        <path d="M0 200 Q100 150 200 200 T400 180" stroke="#D4A574" strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="200" cy="150" r="6" fill="#D4A574" opacity="0.6" />
        <circle cx="260" cy="120" r="4" fill="#D4A574" opacity="0.5" />
        <circle cx="150" cy="180" r="5" fill="#D4A574" opacity="0.4" />
        <line x1="200" y1="150" x2="260" y2="120" stroke="#D4A574" strokeWidth="1" opacity="0.4" />
        <line x1="200" y1="150" x2="150" y2="180" stroke="#D4A574" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

export function AIAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-white">
        <circle cx="50" cy="38" r="18" fill="currentColor" opacity="0.9" />
        <path d="M22 78 Q50 58 78 78" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function UserAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-3/5 h-3/5 text-white">
        <circle cx="50" cy="36" r="16" fill="currentColor" />
        <path d="M20 80 Q50 62 80 80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function ChecklistIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-50">
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-primary-500">
        <rect x="20" y="20" width="80" height="80" rx="8" stroke="currentColor" strokeWidth="6" fill="none" />
        <path d="M35 55 L50 70 L85 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}
