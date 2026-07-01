import { useState, useMemo } from 'react';
import { Check, X, ChevronLeft, ChevronRight, RotateCcw, Shuffle, Lightbulb, Sparkles, BookOpen, Brain, Trophy, Mic, Send } from 'lucide-react';
import { ankiDeck } from '@book/data/anki.ts';
import { bookData } from '@book/data/bookInfo.ts';

interface Props {
  onBack: () => void;
}

type Mode = 'flashcard' | 'quiz' | 'feynman';
type CardStatus = 'unseen' | 'got_it' | 'missed_it';

type FeynmanState = 'writing' | 'evaluating' | 'result';

export default function Anki({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>('flashcard');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardStatuses, setCardStatuses] = useState<Record<string, CardStatus>>({});
  const [showExplain, setShowExplain] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[] | null>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});

  // Feynman state
  const [feynmanIndex, setFeynmanIndex] = useState(0);
  const [feynmanText, setFeynmanText] = useState('');
  const [feynmanState, setFeynmanState] = useState<FeynmanState>('writing');
  const [feynmanScores, setFeynmanScores] = useState<Record<string, 'pass' | 'review'>>({});

  const flashcards = ankiDeck.flashcards;
  const quizQuestions = ankiDeck.quizQuestions;
  const feynmanCards = ankiDeck.feynmanCards || [];

  const orderedCards = useMemo(() => {
    if (!shuffledOrder) return flashcards;
    return shuffledOrder.map((i) => flashcards[i]);
  }, [shuffledOrder, flashcards]);

  const currentCard = orderedCards[cardIndex];
  const currentQuiz = quizQuestions[quizIndex];
  const currentFeynmanCard = feynmanCards[feynmanIndex];

  const gotItCount = Object.values(cardStatuses).filter((s) => s === 'got_it').length;
  const missedCount = Object.values(cardStatuses).filter((s) => s === 'missed_it').length;
  const seenCount = gotItCount + missedCount;

  const quizCorrectCount = Object.values(quizResults).filter(Boolean).length;

  const shuffle = () => {
    const indices = flashcards.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledOrder(indices);
    setCardIndex(0);
    setFlipped(false);
    setShowExplain(false);
  };

  const rateCard = (status: 'got_it' | 'missed_it') => {
    setCardStatuses((prev) => ({ ...prev, [currentCard.id]: status }));
    if (cardIndex < orderedCards.length - 1) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
      setShowExplain(false);
    }
  };

  const nextCard = () => {
    if (cardIndex < orderedCards.length - 1) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
      setShowExplain(false);
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setFlipped(false);
      setShowExplain(false);
    }
  };

  const restart = () => {
    setCardIndex(0);
    setFlipped(false);
    setShowExplain(false);
    setCardStatuses({});
    setShuffledOrder(null);
  };

  const answerQuiz = (optionId: string) => {
    if (quizAnswered) return;
    setSelectedOption(optionId);
    setQuizAnswered(true);
    const correct = currentQuiz.options.find((o) => o.id === optionId)?.correct ?? false;
    setQuizResults((prev) => ({ ...prev, [currentQuiz.id]: correct }));
  };

  const nextQuiz = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setQuizResults({});
  };

  // Feynman functions
  const submitFeynman = () => {
    if (!feynmanText.trim()) return;
    setFeynmanState('evaluating');
    setTimeout(() => {
      const text = feynmanText.toLowerCase();
      const keyWords = currentFeynmanCard.keyPoint.split(/[，。、；：,;: ]+/).filter((w) => w.length >= 2);
      const hitPoints = keyWords.filter((w) => text.includes(w.toLowerCase()));
      const ratio = hitPoints.length / Math.max(keyWords.length, 1);
      const passed = ratio >= 0.4 || text.length >= 30;
      setFeynmanScores((prev) => ({ ...prev, [currentFeynmanCard.id]: passed ? 'pass' : 'review' }));
      setFeynmanState('result');
    }, 800);
  };

  const nextFeynman = () => {
    if (feynmanIndex < feynmanCards.length - 1) {
      setFeynmanIndex(feynmanIndex + 1);
      setFeynmanText('');
      setFeynmanState('writing');
    }
  };

  const restartFeynman = () => {
    setFeynmanIndex(0);
    setFeynmanText('');
    setFeynmanState('writing');
    setFeynmanScores({});
  };

  const feynmanPassCount = Object.values(feynmanScores).filter((s) => s === 'pass').length;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto w-full">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-base font-semibold text-gray-900">记忆卡组</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">{bookData.title}</span>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex px-4 pb-2 gap-2 max-w-2xl mx-auto w-full overflow-x-auto">
          <button
            onClick={() => { setMode('flashcard'); setFlipped(false); setShowExplain(false); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === 'flashcard' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-gray-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            闪卡 ({flashcards.length})
          </button>
          <button
            onClick={() => { setMode('quiz'); setSelectedOption(null); setQuizAnswered(false); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === 'quiz' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-gray-600'
            }`}
          >
            <Brain className="w-4 h-4" />
            测验 ({quizQuestions.length})
          </button>
          <button
            onClick={() => { setMode('feynman'); setFeynmanState('writing'); setFeynmanText(''); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === 'feynman' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-gray-600'
            }`}
          >
            <Mic className="w-4 h-4" />
            费曼复述 ({feynmanCards.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full pb-24 md:pb-6">
        {mode === 'flashcard' && (
          <>
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{cardIndex + 1}/{orderedCards.length}</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-800 rounded-full transition-all duration-300"
                  style={{ width: `${(seenCount / orderedCards.length) * 100}%` }}
                />
              </div>
              <span className="flex items-center gap-1 text-emerald-600">
                <Check className="w-3 h-3" />{gotItCount}
              </span>
              <span className="flex items-center gap-1 text-red-500">
                <X className="w-3 h-3" />{missedCount}
              </span>
            </div>

            {/* Flashcard */}
            <div
              className="relative cursor-pointer select-none"
              style={{ perspective: '1000px' }}
              onClick={() => setFlipped(!flipped)}
            >
              <div
                className="relative transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : '',
                }}
              >
                {/* Front */}
                <div
                  className="rounded-3xl p-8 min-h-72 flex flex-col"
                  style={{
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, #1c1917, #292524)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-stone-300">
                      {currentCard.chapter}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl font-bold text-white leading-relaxed text-center font-serif">
                      {currentCard.question}
                    </p>
                  </div>
                  <p className="text-center text-xs text-stone-400 mt-4">点击翻转查看答案</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-3xl p-8 min-h-72 flex flex-col bg-white border-2 border-stone-200"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-xs text-stone-500 font-semibold mb-2">答案</div>
                  <p className="text-lg font-bold text-gray-900 leading-relaxed mb-4">{currentCard.answer}</p>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mt-auto">
                    <p className="text-xs text-amber-800 font-medium mb-1">关键点</p>
                    <p className="text-sm text-amber-900 leading-relaxed">{currentCard.keyPoint}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Explain panel */}
            {showExplain && currentCard.explanation && (
              <div className="mt-4 rounded-2xl bg-violet-50 border border-violet-200 p-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-bold text-violet-900">AI 深度解释</span>
                </div>
                <p className="text-sm text-violet-800 leading-relaxed">{currentCard.explanation}</p>
              </div>
            )}

            {/* Controls */}
            <div className="mt-6 space-y-3">
              {!flipped ? (
                <button
                  onClick={() => setFlipped(true)}
                  className="w-full py-3.5 bg-stone-800 text-white rounded-2xl font-semibold active:scale-[0.98] transition-transform"
                >
                  显示答案
                </button>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => rateCard('missed_it')}
                      className="py-3.5 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    >
                      <X className="w-4 h-4" />
                      不会
                    </button>
                    <button
                      onClick={() => rateCard('got_it')}
                      className="py-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    >
                      <Check className="w-4 h-4" />
                      会了
                    </button>
                  </div>
                  {currentCard.explanation && (
                    <button
                      onClick={() => setShowExplain(!showExplain)}
                      className="w-full py-2.5 rounded-xl border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    >
                      <Sparkles className="w-4 h-4" />
                      {showExplain ? '收起解释' : 'AI 解释'}
                    </button>
                  )}
                </>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={prevCard}
                  disabled={cardIndex === 0}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={shuffle}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                    title="洗牌"
                  >
                    <Shuffle className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={restart}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                    title="重新开始"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={nextCard}
                  disabled={cardIndex === orderedCards.length - 1}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Completion summary */}
            {seenCount === orderedCards.length && (
              <div className="mt-6 rounded-2xl bg-stone-800 p-6 text-center text-white">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                <p className="font-bold text-lg">练习完成！</p>
                <p className="text-sm text-stone-300 mt-1">会了 {gotItCount} 张 · 不会 {missedCount} 张</p>
                <button
                  onClick={restart}
                  className="mt-4 px-6 py-2.5 bg-white text-stone-800 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                >
                  再来一轮
                </button>
              </div>
            )}
          </>
        )}

        {mode === 'quiz' && (
          <>
            {/* Quiz progress */}
            <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{quizIndex + 1}/{quizQuestions.length}</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-800 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(quizResults).length / quizQuestions.length) * 100}%` }}
                />
              </div>
              <span className="text-emerald-600 font-medium">✓ {quizCorrectCount}</span>
            </div>

            {/* Quiz card */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                  {currentQuiz.chapter}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-relaxed mb-6">{currentQuiz.question}</h3>

              <div className="space-y-3">
                {currentQuiz.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const showCorrect = quizAnswered && option.correct;
                  const showWrong = quizAnswered && isSelected && !option.correct;

                  return (
                    <button
                      key={option.id}
                      onClick={() => answerQuiz(option.id)}
                      disabled={quizAnswered}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        showCorrect
                          ? 'border-emerald-400 bg-emerald-50'
                          : showWrong
                          ? 'border-red-400 bg-red-50'
                          : isSelected
                          ? 'border-stone-400 bg-stone-50'
                          : 'border-gray-200 hover:border-stone-300 hover:bg-stone-50'
                      } ${quizAnswered ? 'cursor-default' : 'active:scale-[0.99]'}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          showCorrect
                            ? 'bg-emerald-500 text-white'
                            : showWrong
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {showCorrect ? <Check className="w-4 h-4" /> : showWrong ? <X className="w-4 h-4" /> : option.id.toUpperCase()}
                      </div>
                      <span className={`text-sm ${quizAnswered && (showCorrect || showWrong) ? 'font-medium' : 'text-gray-700'}`}>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hint */}
              {currentQuiz.hint && !quizAnswered && (
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>提示：{currentQuiz.hint}</span>
                </div>
              )}

              {/* AI Explain */}
              {quizAnswered && (
                <div className="mt-4 rounded-xl bg-violet-50 border border-violet-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-bold text-violet-900">
                      {quizResults[currentQuiz.id] ? '回答正确！' : '回答错误'}
                    </span>
                  </div>
                  <p className="text-sm text-violet-800 leading-relaxed">{currentQuiz.explanation}</p>
                </div>
              )}
            </div>

            {/* Quiz controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={restartQuiz}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium active:scale-95 transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                重新开始
              </button>
              {quizIndex < quizQuestions.length - 1 ? (
                <button
                  onClick={nextQuiz}
                  disabled={!quizAnswered}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-semibold disabled:opacity-30 active:scale-95 transition-transform"
                >
                  下一题
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="rounded-xl bg-stone-800 px-6 py-2.5 text-white text-sm font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  {quizCorrectCount}/{quizQuestions.length} 正确
                </div>
              )}
            </div>
          </>
        )}

        {mode === 'feynman' && (
          <>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{feynmanIndex + 1}/{feynmanCards.length}</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-800 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(feynmanScores).length / feynmanCards.length) * 100}%` }}
                />
              </div>
              <span className="text-emerald-600 font-medium">✓ {feynmanPassCount}</span>
            </div>

            {/* Question card */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-4 h-4 text-stone-600" />
                <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                  {currentFeynmanCard.chapter}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 leading-relaxed">{currentFeynmanCard.question}</p>
            </div>

            {/* Writing phase */}
            {feynmanState === 'writing' && (
              <>
                <div className="rounded-2xl border-2 border-stone-200 bg-white p-4">
                  <p className="text-xs text-stone-400 mb-2">用自己的话解释这个知识点，就像教一个完全不懂的人</p>
                  <textarea
                    value={feynmanText}
                    onChange={(e) => setFeynmanText(e.target.value)}
                    placeholder="开始你的复述…"
                    rows={5}
                    className="w-full text-sm text-stone-800 outline-none resize-none leading-relaxed"
                    autoFocus
                  />
                </div>
                <button
                  onClick={submitFeynman}
                  disabled={!feynmanText.trim()}
                  className="mt-3 w-full py-3.5 bg-stone-800 text-white rounded-2xl font-semibold disabled:opacity-30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  提交复述
                </button>
              </>
            )}

            {/* Evaluating phase */}
            {feynmanState === 'evaluating' && (
              <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6 text-center">
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-violet-600 animate-pulse" />
                <p className="text-sm text-violet-700 font-medium">AI 正在校对你的复述…</p>
              </div>
            )}

            {/* Result phase */}
            {feynmanState === 'result' && (
              <>
                {/* User's answer */}
                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 mb-3">
                  <p className="text-xs text-stone-400 mb-2">你的复述</p>
                  <p className="text-sm text-stone-700 leading-relaxed">{feynmanText}</p>
                </div>

                {/* AI evaluation */}
                <div className={`rounded-2xl border-2 p-4 mb-3 ${
                  feynmanScores[currentFeynmanCard.id] === 'pass'
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-amber-200 bg-amber-50'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className={`w-4 h-4 ${
                      feynmanScores[currentFeynmanCard.id] === 'pass' ? 'text-emerald-600' : 'text-amber-600'
                    }`} />
                    <span className={`text-sm font-bold ${
                      feynmanScores[currentFeynmanCard.id] === 'pass' ? 'text-emerald-900' : 'text-amber-900'
                    }`}>
                      {feynmanScores[currentFeynmanCard.id] === 'pass' ? '复述合格' : '建议复习'}
                    </span>
                  </div>

                  {/* Reference answer */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-stone-500 mb-1">参考答案</p>
                    <p className="text-sm text-stone-800 leading-relaxed">{currentFeynmanCard.answer}</p>
                  </div>

                  {/* Key point */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-stone-500 mb-1">关键点</p>
                    <p className="text-sm text-stone-700 leading-relaxed">{currentFeynmanCard.keyPoint}</p>
                  </div>

                  {/* Explanation if available */}
                  {currentFeynmanCard.explanation && (
                    <div>
                      <p className="text-xs font-medium text-stone-500 mb-1">深度解释</p>
                      <p className="text-sm text-stone-600 leading-relaxed">{currentFeynmanCard.explanation}</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={restartFeynman}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium active:scale-95 transition-transform"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重新开始
                  </button>
                  {feynmanIndex < flashcards.length - 1 ? (
                    <button
                      onClick={nextFeynman}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-semibold active:scale-95 transition-transform"
                    >
                      下一题
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="rounded-xl bg-stone-800 px-6 py-2.5 text-white text-sm font-semibold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      {feynmanPassCount}/{feynmanCards.length} 合格
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
