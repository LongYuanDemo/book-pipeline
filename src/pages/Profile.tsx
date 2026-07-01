import { Trash2, Info, LogOut, Crown, BookOpen, Layers, GraduationCap, Headphones, ChevronRight } from 'lucide-react';
import { bookData } from '@book/data/bookInfo.ts';
import MobileContainer from '../components/design-system/MobileContainer.tsx';

export default function Profile() {
  const completedSubSections = bookData.chapters.reduce(
    (sum, ch) => sum + ch.subSections.filter((s) => s.completed).length,
    0
  );
  const totalSubSections = bookData.chapters.reduce(
    (sum, ch) => sum + ch.subSections.length,
    0
  );
  const progress = totalSubSections > 0 ? Math.round((completedSubSections / totalSubSections) * 100) : 0;

  const stats = [
    { icon: BookOpen, label: '已学小节', value: `${completedSubSections}/${totalSubSections}` },
    { icon: Layers, label: '闪卡掌握', value: `${bookData.ankiCards.length} 张` },
    { icon: Headphones, label: '音频课程', value: `${bookData.audioLessons.filter(l => l.progress > 0).length}/${bookData.audioLessons.length} 课` },
    { icon: GraduationCap, label: '测验正确率', value: '—' },
  ];

  return (
    <MobileContainer pcWide>
      <div className="min-h-full bg-stone-50 px-4 pt-5 pb-24 md:pb-6 md:px-6 md:pt-6">

        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-stone-200 mb-5">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-800 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-3/5 h-3/5 text-stone-200">
              <circle cx="50" cy="36" r="16" fill="currentColor" />
              <path d="M20 80 Q50 62 80 80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-stone-800">学员</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs text-amber-600 font-medium">VIP会员（剩余30天）</span>
            </div>
          </div>
        </div>

        {/* Learning Progress — single progress bar, no duplicate */}
        <div className="mb-5">
          <p className="text-xs text-stone-400 mb-2 px-1">学习进度</p>
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-3xl font-bold text-stone-800 font-serif">{progress}<span className="text-lg text-stone-400">%</span></p>
              <p className="text-sm text-stone-400">已学 {completedSubSections}/{totalSubSections} 小节</p>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-800 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Learning Stats — 2x2 grid with meaningful metrics */}
        <div className="mb-5">
          <p className="text-xs text-stone-400 mb-2 px-1">学习数据</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center mb-2">
                  <s.icon className="w-4 h-4 text-stone-600" />
                </div>
                <p className="text-xs text-stone-400">{s.label}</p>
                <p className="text-lg font-bold text-stone-800 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="mb-5">
          <p className="text-xs text-stone-400 mb-2 px-1">付费订阅</p>
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-stone-800">当前方案：VIP会员 ¥29/月</span>
            </div>
            <p className="text-xs text-stone-400 mb-3">无限AI对话、全部闪卡、音频课程、知识地图</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { name: '月度VIP', price: '¥29', save: '' },
                { name: '季度VIP', price: '¥79', save: '省¥8' },
                { name: '年度VIP', price: '¥249', save: '省¥99' },
              ].map((p) => (
                <div key={p.name} className="border border-amber-200 rounded-xl p-2 text-center">
                  <p className="text-xs text-stone-400">{p.name}</p>
                  <p className="text-base font-bold text-amber-700">{p.price}</p>
                  {p.save && <p className="text-[10px] text-amber-600">{p.save}</p>}
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 bg-stone-900 text-stone-50 rounded-xl text-sm font-medium active:scale-[0.98] transition-transform">
              升级VIP ¥29/月
            </button>
          </div>
        </div>

        {/* Other */}
        <div className="mb-5">
          <p className="text-xs text-stone-400 mb-2 px-1">设置</p>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            {[
              { icon: Trash2, label: '清除缓存', sub: '' },
              { icon: Info, label: '关于数智教材', sub: '版本号 v1.0.0' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-stone-100 last:border-0 active:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-stone-800">{item.label}</p>
                    {item.sub && <p className="text-xs text-stone-400">{item.sub}</p>}
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-300" />
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-3 bg-white border border-stone-200 text-stone-500 rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:bg-stone-50 transition-colors">
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </div>
    </MobileContainer>
  );
}
