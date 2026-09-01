'use client';

import { useState, useEffect } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TopicQuizProps {
  topicId: string;
  topicTitle: string;
  color?: 'emerald' | 'indigo' | 'purple' | 'amber' | 'blue' | 'rose';
  questions: QuizQuestion[];
}

export default function TopicQuiz({
  topicId,
  topicTitle,
  color = 'emerald',
  questions,
}: TopicQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('belajar_completed_topics');
      if (saved) {
        const completedList: string[] = JSON.parse(saved);
        if (completedList.includes(topicId)) {
          setIsCompleted(true);
        }
      }
    } catch {
      // ignore JSON error
    }
  }, [topicId]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted && isCompleted) return;
    const next = [...selectedAnswers];
    next[qIdx] = optIdx;
    setSelectedAnswers(next);
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = questions.every(
      (q, idx) => selectedAnswers[idx] === q.correctIndex
    );

    if (allCorrect) {
      markCompleted(true);
    }
  };

  const markCompleted = (completed: boolean) => {
    try {
      const saved = localStorage.getItem('belajar_completed_topics');
      let completedList: string[] = saved ? JSON.parse(saved) : [];
      if (completed) {
        if (!completedList.includes(topicId)) {
          completedList.push(topicId);
        }
      } else {
        completedList = completedList.filter((id) => id !== topicId);
      }
      localStorage.setItem('belajar_completed_topics', JSON.stringify(completedList));
      setIsCompleted(completed);
      window.dispatchEvent(new Event('belajar_progress_updated'));
    } catch {
      // ignore
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setSubmitted(false);
    markCompleted(false);
  };

  const colorThemes = {
    emerald: {
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      btn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      accent: 'text-emerald-400',
      selected: 'border-emerald-500/80 bg-emerald-500/10 text-emerald-200',
    },
    indigo: {
      border: 'border-indigo-500/30',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      btn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      accent: 'text-indigo-400',
      selected: 'border-indigo-500/80 bg-indigo-500/10 text-indigo-200',
    },
    purple: {
      border: 'border-purple-500/30',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      btn: 'bg-purple-600 hover:bg-purple-500 text-white',
      accent: 'text-purple-400',
      selected: 'border-purple-500/80 bg-purple-500/10 text-purple-200',
    },
    amber: {
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      btn: 'bg-amber-600 hover:bg-amber-500 text-black font-bold',
      accent: 'text-amber-400',
      selected: 'border-amber-500/80 bg-amber-500/10 text-amber-200',
    },
    blue: {
      border: 'border-blue-500/30',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      btn: 'bg-blue-600 hover:bg-blue-500 text-white',
      accent: 'text-blue-400',
      selected: 'border-blue-500/80 bg-blue-500/10 text-blue-200',
    },
    rose: {
      border: 'border-rose-500/30',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      btn: 'bg-rose-600 hover:bg-rose-500 text-white',
      accent: 'text-rose-400',
      selected: 'border-rose-500/80 bg-rose-500/10 text-rose-200',
    },
  };

  const theme = colorThemes[color] || colorThemes.emerald;
  const allAnswered = selectedAnswers.every((a) => a !== -1);
  const correctCount = submitted
    ? questions.reduce(
        (acc, q, idx) => (selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc),
        0
      )
    : 0;

  return (
    <div
      className={`w-full max-w-5xl mt-12 p-6 sm:p-8 rounded-3xl border ${theme.border} bg-zinc-900/60 backdrop-blur-md shadow-2xl transition-all`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${theme.badge}`}
          >
            <span>🎯</span> Mini Challenge / Kuis
          </span>
          <h3 className="text-xl font-extrabold text-white mt-2">
            Uji Pemahaman: {topicTitle}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Jawab pertanyaan di bawah untuk memastikan kamu memahami konsep modul ini.
          </p>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow-lg shadow-emerald-500/10">
            <span>✓</span> Topik Selesai
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isAnswered = selectedAnswers[qIdx] !== -1;
          const isCorrect = selectedAnswers[qIdx] === q.correctIndex;

          return (
            <div
              key={qIdx}
              className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <p className="text-sm font-semibold text-zinc-100">{q.question}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedAnswers[qIdx] === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let optionStyle =
                    'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850';

                  if (isThisSelected && !submitted) {
                    optionStyle = theme.selected;
                  } else if (submitted) {
                    if (isThisCorrect) {
                      optionStyle =
                        'border-emerald-500/80 bg-emerald-500/20 text-emerald-200 font-semibold';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle =
                        'border-rose-500/80 bg-rose-500/20 text-rose-200 line-through';
                    } else {
                      optionStyle = 'opacity-40 border-zinc-800 bg-zinc-900/30 text-zinc-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && (
                        <span className="text-emerald-400 font-bold">✓</span>
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <span className="text-rose-400 font-bold">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when submitted */}
              {submitted && (
                <div
                  className={`mt-3 p-3 rounded-xl text-xs border ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <p className="font-semibold mb-0.5">
                    {isCorrect ? '🎉 Benar!' : '💡 Penjelasan:'}
                  </p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          {submitted && (
            <p className="text-xs text-zinc-300">
              Skor: <strong className="text-white">{correctCount}</strong> dari{' '}
              <strong className="text-white">{questions.length}</strong> benar (
              {Math.round((correctCount / questions.length) * 100)}%)
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {submitted ? (
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all border border-zinc-700 cursor-pointer"
            >
              🔄 Ulangi Kuis
            </button>
          ) : (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleCheck}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                allAnswered
                  ? theme.btn
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
              }`}
            >
              {allAnswered ? 'Cek Jawaban & Selesaikan ✨' : 'Pilih Semua Jawaban Dulu'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
