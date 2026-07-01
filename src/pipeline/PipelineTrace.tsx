import { useState, useMemo } from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, Circle, ChevronRight,
  FileText, BookOpen, Layers, Brain, Network, Headphones, Video,
  Workflow, ArrowRight, ClipboardList, Clock, MessageSquare,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
// Color palette — 黛蓝 / 紫梅 / 赤陶 / 墨绿

const C = {
  黛蓝: '#3C6E7D',
  紫梅: '#6E5168',
  赤陶: '#B0573F',
  墨绿: '#2D4A3E',
  黛蓝亮: '#5A8A99',
  紫梅亮: '#8B7080',
  赤陶亮: '#C97556',
  墨绿亮: '#4A6B5C',
  文字暗: '#8a8a9a',
};

/* ------------------------------------------------------------------ */
// Data loading via import.meta.glob

const bookInfoModules = import.meta.glob('/books/*/data/bookInfo.ts', { eager: true });
const sourceParsedModules = import.meta.glob('/books/*/data/sourceParsed.ts', { eager: true });
const chapterContentModules = import.meta.glob('/books/*/data/chapterContent.ts', { eager: true });
const ankiModules = import.meta.glob('/books/*/data/anki.ts', { eager: true });
const knowledgeMapModules = import.meta.glob('/books/*/data/knowledgeMap.ts', { eager: true });
const audioCourseModules = import.meta.glob('/books/*/data/audioCourse.ts', { eager: true });
const videoModules = import.meta.glob('/books/*/data/video.ts', { eager: true });
const metaModules = import.meta.glob('/books/*/meta.json', { eager: true, query: '?raw', import: 'default' });
const statusModules = import.meta.glob('/books/*/pipeline-status.md', { eager: true, query: '?raw', import: 'default' });
const sourceMdModules = import.meta.glob('/books/*/source.md', { eager: true, query: '?raw', import: 'default' });

function extractBookId(path: string): string {
  const m = path.match(/\/books\/([^/]+)\//);
  return m ? m[1] : '';
}

function getMod<T>(mods: Record<string, any>, bookId: string): T | null {
  const key = Object.keys(mods).find((k) => extractBookId(k) === bookId);
  return key ? mods[key] : null;
}

/* ------------------------------------------------------------------ */
// Module definitions

interface ModuleDef {
  key: string;
  name: string;
  nameCn: string;
  icon: typeof FileText;
  color: string;
  outputFile: string;
  deps: string[];
  successCriteria: string;
}

const MODULES: ModuleDef[] = [
  {
    key: 'sourceParsed', name: 'source-parser', nameCn: '源文件解析',
    icon: FileText, color: C.黛蓝, outputFile: 'sourceParsed.ts', deps: [],
    successCriteria: '正确提取书名、模块结构、任务层级',
  },
  {
    key: 'bookInfo', name: 'book-info-generator', nameCn: '书籍信息',
    icon: BookOpen, color: C.紫梅, outputFile: 'bookInfo.ts', deps: ['sourceParsed'],
    successCriteria: 'bookData 导出，章节 ID 格式正确，每模块有 summary',
  },
  {
    key: 'chapterContent', name: 'chapter-content-generator', nameCn: '章节内容',
    icon: Layers, color: C.墨绿, outputFile: 'chapterContent.ts', deps: ['bookInfo'],
    successCriteria: '每个任务有 ContentBlock[]，至少 1 个 quiz，关键节点有 callout',
  },
  {
    key: 'anki', name: 'anki-card-generator', nameCn: '闪卡',
    icon: Brain, color: C.赤陶, outputFile: 'anki.ts', deps: ['bookInfo'],
    successCriteria: '每模块 ≥2 闪卡，≥1 测验题，每章 3-5 费曼卡片',
  },
  {
    key: 'knowledgeMap', name: 'knowledge-map-generator', nameCn: '知识图谱',
    icon: Network, color: C.黛蓝亮, outputFile: 'knowledgeMap.ts', deps: ['bookInfo'],
    successCriteria: '所有模块和任务有对应节点，中心→模块→任务有边连接',
  },
  {
    key: 'audioCourse', name: 'audio-course-generator', nameCn: '音频课程',
    icon: Headphones, color: C.紫梅亮, outputFile: 'audioCourse.ts', deps: ['bookInfo'],
    successCriteria: '课程数 == 模块数，每课 frames ≥4，有 Mermaid subgraph',
  },
  {
    key: 'video', name: 'video-keyframe-extractor', nameCn: '视频关键帧',
    icon: Video, color: C.赤陶亮, outputFile: 'video.ts', deps: ['chapterContent'],
    successCriteria: 'videoList 导出，每个视频有 VideoStep[]，图片路径正确',
  },
  {
    key: 'bookSkill', name: 'book-to-skill', nameCn: '技能助手',
    icon: MessageSquare, color: C.紫梅, outputFile: '— (runtime API)', deps: ['bookInfo', 'sourceParsed'],
    successCriteria: 'API 端点 /api/book-skill/chat 可用，DEEPSEEK_API_KEY 已配置，source.md 提供上下文',
  },
];

/* ------------------------------------------------------------------ */
// Status types

type Status = 'complete' | 'partial' | 'empty' | 'disabled' | 'not-run';

interface ModuleStatus {
  status: Status;
  current: number;
  expected: number;
  ratio: number;
  detail: string;
  gap: string | null;
}

interface BookStatus {
  bookId: string;
  title: string;
  modules: Record<string, ModuleStatus>;
  overallRatio: number;
  actionItems: string[];
  executionHistory: { date: string; action: string; result: string }[];
  reviewChecklist: string[];
  hasStatusFile: boolean;
}

/* ------------------------------------------------------------------ */
// Compute module status

function computeModuleStatus(
  modKey: string, bookInfo: any, sourceParsed: any,
  chapterContents: Record<string, any>, ankiDeck: any,
  knowledgeMapData: any, audioCourseLessons: any[], videoList: any[],
  moduleEnabled: boolean, bookSkillEnabled?: boolean, sourceMdExists?: boolean,
): ModuleStatus {
  if (!moduleEnabled) {
    return { status: 'disabled', current: 0, expected: 0, ratio: 0, detail: '本书未启用此模块', gap: null };
  }

  const chapterCount = bookInfo?.chapters?.length || 0;
  const taskCount = (sourceParsed?.modules || []).reduce((s: number, m: any) => s + (m.tasks?.length || 0), 0);

  switch (modKey) {
    case 'sourceParsed': {
      const moduleCount = sourceParsed?.modules?.length || 0;
      const tc = taskCount;
      return {
        status: moduleCount > 0 ? 'complete' : 'empty',
        current: tc, expected: tc, ratio: moduleCount > 0 ? 1 : 0,
        detail: `${moduleCount} 模块 / ${tc} 任务`,
        gap: moduleCount === 0 ? '源文件未解析，需运行 source-parser' : null,
      };
    }
    case 'bookInfo': {
      const cc = chapterCount;
      const subCount = (bookInfo?.chapters || []).reduce((s: number, c: any) => s + (c.subSections?.length || 0), 0);
      return {
        status: cc > 0 ? 'complete' : 'empty',
        current: cc, expected: cc, ratio: cc > 0 ? 1 : 0,
        detail: `${cc} 章 / ${subCount} 节`,
        gap: cc === 0 ? 'bookInfo.ts 未生成，需运行 book-info-generator' : null,
      };
    }
    case 'chapterContent': {
      const keys = Object.keys(chapterContents || {});
      const blockCount = keys.reduce((s, k) => s + (chapterContents[k]?.blocks?.length || 0), 0);
      const ratio = taskCount > 0 ? keys.length / taskCount : 0;
      const remaining = taskCount - keys.length;
      return {
        status: keys.length === 0 ? 'empty' : ratio >= 0.95 ? 'complete' : 'partial',
        current: keys.length, expected: taskCount, ratio,
        detail: `${keys.length}/${taskCount} 任务，${blockCount} blocks`,
        gap: remaining > 0 ? `还差 ${remaining} 个任务未生成内容` : null,
      };
    }
    case 'anki': {
      const fc = ankiDeck?.flashcards?.length || 0;
      const qc = ankiDeck?.quizQuestions?.length || 0;
      const fmc = ankiDeck?.feynmanCards?.length || 0;
      const total = fc + qc + fmc;
      const expected = chapterCount * 15;
      const ratio = expected > 0 ? Math.min(total / expected, 1) : 0;
      return {
        status: total === 0 ? 'empty' : ratio >= 0.9 ? 'complete' : 'partial',
        current: total, expected, ratio,
        detail: `${fc} 闪卡 / ${qc} 测验 / ${fmc} 费曼`,
        gap: total === 0 ? 'anki.ts 未生成，需运行 anki-card-generator' : ratio < 0.9 ? `卡片不足，预期 ~${expected}，当前 ${total}` : null,
      };
    }
    case 'knowledgeMap': {
      const nc = knowledgeMapData?.nodes?.length || 0;
      const ec = knowledgeMapData?.edges?.length || 0;
      const expected = chapterCount * 5;
      const ratio = expected > 0 ? Math.min(nc / expected, 1) : 0;
      const hasEnriched = (knowledgeMapData?.enrichedEntities?.length || 0) > 0;
      return {
        status: nc === 0 ? 'empty' : ratio >= 0.9 ? 'complete' : 'partial',
        current: nc, expected, ratio,
        detail: `${nc} 节点 / ${ec} 边${hasEnriched ? ' / 有 enriched' : ' / 无 enriched'}`,
        gap: nc === 0 ? 'knowledgeMap.ts 未生成' : !hasEnriched ? 'enrichedEntities 为空，实体未关联章节' : ratio < 0.9 ? `节点不足，预期 ~${expected}` : null,
      };
    }
    case 'audioCourse': {
      const al = (audioCourseLessons || []).length;
      const af = (audioCourseLessons || []).reduce((s, l) => s + (l.visualSequence?.frames?.length || 0), 0);
      const expected = chapterCount;
      const ratio = expected > 0 ? Math.min(al / expected, 1) : 0;
      return {
        status: al === 0 ? 'empty' : ratio >= 0.9 ? 'complete' : 'partial',
        current: al, expected, ratio,
        detail: `${al}/${expected} 课程 / ${af} 帧`,
        gap: al === 0 ? 'audioCourse.ts 未生成' : ratio < 0.9 ? `还差 ${expected - al} 个课程` : null,
      };
    }
    case 'video': {
      const vc = (videoList || []).length;
      const vs = (videoList || []).reduce((s, v) => s + (v.steps?.length || 0), 0);
      return {
        status: vc === 0 ? 'not-run' : 'complete',
        current: vc, expected: vc, ratio: vc > 0 ? 1 : 0,
        detail: `${vc} 视频 / ${vs} 步骤`,
        gap: vc === 0 ? 'video.ts 未生成（需先完成 chapterContent）' : null,
      };
    }
    case 'bookSkill': {
      if (!bookSkillEnabled) {
        return { status: 'disabled', current: 0, expected: 0, ratio: 0, detail: '本书未启用技能助手', gap: null };
      }
      const hasBookInfo = chapterCount > 0;
      const hasSource = !!sourceMdExists;
      const depsMet = hasBookInfo && hasSource;
      const parts: string[] = [];
      if (hasBookInfo) parts.push('bookInfo ✓'); else parts.push('bookInfo ✗');
      if (hasSource) parts.push('source.md ✓'); else parts.push('source.md ✗');
      parts.push('API: 需 DEEPSEEK_API_KEY');
      return {
        status: depsMet ? 'complete' : 'partial',
        current: depsMet ? 1 : 0, expected: 1, ratio: depsMet ? 1 : 0.5,
        detail: parts.join(' / '),
        gap: !hasBookInfo ? 'bookInfo.ts 未生成，技能助手无章节上下文' : !hasSource ? 'source.md 不存在，技能助手无教材内容' : null,
      };
    }
    default:
      return { status: 'not-run', current: 0, expected: 0, ratio: 0, detail: '—', gap: null };
  }
}

/* ------------------------------------------------------------------ */
// Parse pipeline-status.md

function parseStatusFile(content: string) {
  const lines = content.split('\n');
  const executionHistory: { date: string; action: string; result: string }[] = [];
  const reviewChecklist: string[] = [];
  const todos: string[] = [];

  let section = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## 执行历史')) { section = 'history'; continue; }
    if (trimmed.startsWith('## Review')) { section = 'review'; continue; }
    if (trimmed.startsWith('## 待办')) { section = 'todo'; continue; }
    if (trimmed.startsWith('## ') || trimmed.startsWith('---')) { section = ''; continue; }

    if (section === 'history' && trimmed.startsWith('|') && !trimmed.includes('---') && !trimmed.includes('日期')) {
      const parts = trimmed.split('|').map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 3) executionHistory.push({ date: parts[0], action: parts[1], result: parts[2] });
    }
    if (section === 'review' && trimmed.startsWith('- [ ]')) {
      reviewChecklist.push(trimmed.replace('- [ ] ', ''));
    }
    if (section === 'todo' && trimmed.match(/^\d+\./)) {
      todos.push(trimmed.replace(/^\d+\.\s*/, '').replace(/\[ \]/, '').trim());
    }
  }

  return { executionHistory, reviewChecklist, todos };
}

/* ------------------------------------------------------------------ */
// Build all book statuses

function buildBookStatuses(): BookStatus[] {
  const bookIds = Object.keys(bookInfoModules).map(extractBookId).filter(Boolean).sort();
  const statuses: BookStatus[] = [];

  for (const bookId of bookIds) {
    const bookInfo = getMod<any>(bookInfoModules, bookId)?.bookData;
    const sourceParsed = getMod<any>(sourceParsedModules, bookId)?.sourceParsed;
    const chapterContents = getMod<any>(chapterContentModules, bookId)?.chapterContents || {};
    const ankiDeck = getMod<any>(ankiModules, bookId)?.ankiDeck;
    const knowledgeMapData = getMod<any>(knowledgeMapModules, bookId)?.knowledgeMapData;
    const audioCourseLessons = getMod<any>(audioCourseModules, bookId)?.audioCourseLessons || [];
    const videoList = getMod<any>(videoModules, bookId)?.videoList || [];
    const meta = getMod<string>(metaModules, bookId);
    const statusRaw = getMod<string>(statusModules, bookId);
    const sourceMd = getMod<string>(sourceMdModules, bookId);
    const bookInfoMod = getMod<any>(bookInfoModules, bookId);
    const bookSkillEnabled = bookInfoMod?.MODULES?.bookSkill === true;

    let moduleEnabled: Record<string, boolean> = {};
    if (meta) {
      try { moduleEnabled = JSON.parse(meta).modules || {}; } catch {}
    }

    const modules: Record<string, ModuleStatus> = {};
    const actionItems: string[] = [];

    for (const mod of MODULES) {
      const enabled = moduleEnabled[mod.key] !== false;
      const ms = computeModuleStatus(
        mod.key, bookInfo, sourceParsed,
        chapterContents, ankiDeck, knowledgeMapData, audioCourseLessons, videoList, enabled,
        bookSkillEnabled, !!sourceMd,
      );
      modules[mod.key] = ms;
      if (ms.gap) actionItems.push(`【${mod.nameCn}】${ms.gap}`);
    }

    const enabledModules = MODULES.filter((m) => moduleEnabled[m.key] !== false);
    const overallRatio = enabledModules.length > 0
      ? enabledModules.reduce((s, m) => s + modules[m.key].ratio, 0) / enabledModules.length
      : 0;

    const parsed = statusRaw ? parseStatusFile(statusRaw) : { executionHistory: [], reviewChecklist: [], todos: [] };
    if (parsed.todos.length > 0) actionItems.push(...parsed.todos);

    statuses.push({
      bookId,
      title: bookInfo?.title || bookId,
      modules,
      overallRatio,
      actionItems,
      executionHistory: parsed.executionHistory,
      reviewChecklist: parsed.reviewChecklist,
      hasStatusFile: !!statusRaw,
    });
  }

  return statuses;
}

/* ------------------------------------------------------------------ */
// Status visual config

function statusVisual(status: Status) {
  switch (status) {
    case 'complete': return { icon: CheckCircle2, color: '#2d4a3e', bg: '#f0f5f1', label: '完成' };
    case 'partial': return { icon: AlertTriangle, color: '#b0573f', bg: '#faf3ef', label: '部分' };
    case 'empty': return { icon: XCircle, color: '#c0392b', bg: '#fdf0ee', label: '空' };
    case 'not-run': return { icon: Circle, color: '#9b9a93', bg: '#f4f4f2', label: '未执行' };
    case 'disabled': return { icon: Circle, color: '#c4c4c0', bg: '#f7f7f5', label: '未启用' };
  }
}

/* ------------------------------------------------------------------ */
// Main Component

export default function PipelineTrace() {
  const allStatuses = useMemo(() => buildBookStatuses(), []);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [filterGap, setFilterGap] = useState(false);

  const filteredStatuses = filterGap
    ? allStatuses.filter((b) => b.actionItems.length > 0)
    : allStatuses;

  const expanded = expandedBook ? allStatuses.find((b) => b.bookId === expandedBook) : null;

  const totalBooks = allStatuses.length;
  const totalModules = allStatuses.reduce((s, b) => s + MODULES.filter((m) => b.modules[m.key].status !== 'disabled').length, 0);
  const completeModules = allStatuses.reduce((s, b) => s + MODULES.filter((m) => b.modules[m.key].status === 'complete').length, 0);
  const partialModules = allStatuses.reduce((s, b) => s + MODULES.filter((m) => b.modules[m.key].status === 'partial').length, 0);
  const gapModules = allStatuses.reduce((s, b) => s + MODULES.filter((m) => ['empty', 'not-run'].includes(b.modules[m.key].status)).length, 0);
  const totalGaps = allStatuses.reduce((s, b) => s + b.actionItems.length, 0);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">
            <Workflow size={20} className="header-logo-icon" />
          </div>
          <div>
            <h1 className="header-title">Pipeline Monitor</h1>
            <p className="header-subtitle">数智教材2.0 — 工程进度监控台</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-item"><div className="stat-count" style={{ color: '#2d4a3e' }}>{completeModules}</div><div className="stat-label">完成</div></div>
          <div className="stat-item"><div className="stat-count" style={{ color: '#b0573f' }}>{partialModules}</div><div className="stat-label">部分</div></div>
          <div className="stat-item"><div className="stat-count" style={{ color: '#c0392b' }}>{gapModules}</div><div className="stat-label">缺口</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-count" style={{ color: '#3c6e7d' }}>{totalBooks}</div><div className="stat-label">书籍</div></div>
          <div className="stat-item"><div className="stat-count" style={{ color: '#6e5168' }}>{totalGaps}</div><div className="stat-label">待办</div></div>
        </div>
      </header>

      <div className="toolbar">
        <div className="toolbar-left">
          <ClipboardList size={14} />
          <span>模块状态矩阵 · {totalModules} 个模块 / {totalBooks} 本书</span>
        </div>
        <div className="toolbar-right">
          <button className={`filter-btn ${filterGap ? 'active' : ''}`} onClick={() => setFilterGap(!filterGap)}>
            <AlertTriangle size={12} /> 只看有缺口的
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="matrix-section">
          {/* Header row */}
          <div className="matrix-header">
            <div className="matrix-cell matrix-cell-book">书籍</div>
            {MODULES.map((m) => (
              <div key={m.key} className="matrix-cell matrix-cell-mod" title={m.successCriteria}>
                <m.icon size={13} style={{ color: m.color }} />
                <span>{m.nameCn}</span>
              </div>
            ))}
            <div className="matrix-cell matrix-cell-progress">总进度</div>
            <div className="matrix-cell matrix-cell-action">待办</div>
          </div>

          {/* Book rows */}
          {filteredStatuses.map((book) => {
            const isExpanded = expandedBook === book.bookId;
            return (
              <div key={book.bookId} className={`matrix-row-group ${isExpanded ? 'expanded' : ''}`}>
                <div
                  className={`matrix-row ${isExpanded ? 'row-active' : ''}`}
                  onClick={() => setExpandedBook(isExpanded ? null : book.bookId)}
                >
                  <div className="matrix-cell matrix-cell-book">
                    <ChevronRight size={14} className={`chevron ${isExpanded ? 'chevron-open' : ''}`} style={{ color: C.文字暗 }} />
                    <div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-id mono">{book.bookId}</div>
                    </div>
                  </div>
                  {MODULES.map((m) => {
                    const ms = book.modules[m.key];
                    const sv = statusVisual(ms.status);
                    const Icon = sv.icon;
                    return (
                      <div key={m.key} className="matrix-cell matrix-cell-status" title={ms.detail}>
                        <div className="status-indicator" style={{ background: sv.bg }}>
                          <Icon size={13} style={{ color: sv.color }} />
                        </div>
                        <span className="status-ratio mono" style={{ color: sv.color }}>
                          {ms.status === 'disabled' ? '—' : ms.status === 'complete' ? '100%' : `${Math.round(ms.ratio * 100)}%`}
                        </span>
                      </div>
                    );
                  })}
                  <div className="matrix-cell matrix-cell-progress">
                    <div className="progress-mini">
                      <div className="progress-mini-track">
                        <div className="progress-mini-fill" style={{ width: `${book.overallRatio * 100}%` }} />
                      </div>
                      <span className="progress-mini-text mono">{Math.round(book.overallRatio * 100)}%</span>
                    </div>
                  </div>
                  <div className="matrix-cell matrix-cell-action">
                    {book.actionItems.length > 0 ? (
                      <span className="action-badge" style={{ background: '#faf3ef', color: '#b0573f' }}>{book.actionItems.length} 项</span>
                    ) : (
                      <span className="action-badge" style={{ background: '#f0f5f1', color: '#2d4a3e' }}>无</span>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && expanded && (
                  <div className="detail-section">
                    <div className="detail-grid">
                      {MODULES.map((m) => {
                        const ms = book.modules[m.key];
                        const sv = statusVisual(ms.status);
                        const Icon = m.icon;
                        const StatusIcon = sv.icon;
                        return (
                          <div key={m.key} className="detail-mod-card" style={{ borderLeftColor: m.color }}>
                            <div className="detail-mod-header">
                              <div className="detail-mod-icon" style={{ background: `${m.color}25` }}>
                                <Icon size={14} style={{ color: m.color }} />
                              </div>
                              <div className="detail-mod-info">
                                <div className="detail-mod-name">{m.nameCn}</div>
                                <code className="detail-mod-file mono">{m.outputFile}</code>
                              </div>
                              <div className="detail-mod-status" style={{ background: sv.bg, color: sv.color }}>
                                <StatusIcon size={12} /> {sv.label}
                              </div>
                            </div>
                            <div className="detail-mod-body">
                              <div className="detail-mod-metric">{ms.detail}</div>
                              {ms.gap && (
                                <div className="detail-mod-gap">
                                  <AlertTriangle size={11} style={{ color: '#b0573f', flexShrink: 0, marginTop: 1 }} />
                                  <span>{ms.gap}</span>
                                </div>
                              )}
                              <div className="detail-mod-criteria">
                                <span className="detail-mod-criteria-label">成功标准:</span> {m.successCriteria}
                              </div>
                              {m.deps.length > 0 && (
                                <div className="detail-mod-deps">
                                  <span className="detail-mod-criteria-label">依赖:</span>{' '}
                                  {m.deps.map((d) => MODULES.find((mm) => mm.key === d)?.nameCn).join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {book.actionItems.length > 0 && (
                      <div className="action-section">
                        <h3 className="action-section-title">
                          <ClipboardList size={15} style={{ color: '#b0573f' }} /> 待办事项 ({book.actionItems.length})
                        </h3>
                        <div className="action-list">
                          {book.actionItems.map((item, i) => (
                            <div key={i} className="action-item">
                              <div className="action-item-num">{i + 1}</div>
                              <span className="action-item-text">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {book.reviewChecklist.length > 0 && (
                      <div className="review-section">
                        <h3 className="review-section-title">
                          <CheckCircle2 size={15} style={{ color: '#3c6e7d' }} /> Review 待办 ({book.reviewChecklist.length})
                        </h3>
                        <div className="review-list">
                          {book.reviewChecklist.map((item, i) => (
                            <div key={i} className="review-item">
                              <Circle size={14} style={{ color: '#c4c4c0', flexShrink: 0 }} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {book.executionHistory.length > 0 && (
                      <div className="history-section">
                        <h3 className="history-section-title">
                          <Clock size={15} style={{ color: '#6e5168' }} /> 执行历史 ({book.executionHistory.length})
                        </h3>
                        <div className="history-list">
                          {book.executionHistory.slice(-10).reverse().map((h, i) => (
                            <div key={i} className="history-item">
                              <span className="history-date mono">{h.date}</span>
                              <ArrowRight size={10} style={{ color: '#5a5a6a' }} />
                              <span className="history-action">{h.action}</span>
                              <span className="history-result">{h.result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!book.hasStatusFile && (
                      <div className="no-status-note">
                        <FileText size={14} style={{ color: '#9b9a93', flexShrink: 0 }} />
                        <span>本书无 pipeline-status.md，待办和历史为自动推断。建议创建状态文件以跟踪人工 Review。</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
