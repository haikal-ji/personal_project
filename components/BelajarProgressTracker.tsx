'use client';

import { useState, useEffect } from 'react';

export const ALL_TOPIC_IDS = [
  'use-state',
  'server-client',
  'use-effect',
  'rahasia',
  'routing',
  'reusable-component',
];

interface BelajarProgressTrackerProps {
  minimal?: boolean;
}

export default function BelajarProgressTracker({
  minimal = false,
}: BelajarProgressTrackerProps) {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('belajar_completed_topics');
      if (saved) {
        setCompletedTopics(JSON.parse(saved));
      } else {
        setCompletedTopics([]);
      }
    } catch {
      setCompletedTopics([]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadProgress();

    const handleUpdate = () => loadProgress();
    window.addEventListener('belajar_progress_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('belajar_progress_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const total = ALL_TOPIC_IDS.length;
  const completedCount = completedTopics.filter((id) =>
    ALL_TOPIC_IDS.includes(id)
  ).length;
  const percentage = Math.round((completedCount / total) * 100);

  const handleResetAll = () => {
    if (confirm('Apakah kamu yakin ingin me-reset semua progress belajar?')) {
      localStorage.removeItem('belajar_completed_topics');
      setCompletedTopics([]);
      window.dispatchEvent(new Event('belajar_progress_updated'));
    }
  };

  if (!isClient) {
    return (
      <div className="h-6 w-32 bg-zinc-800/40 rounded-full animate-pulse" />
    );
  }

  if (minimal) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
          <span className="text-emerald-400">⚡</span>
          <span>
            {completedCount}/{total} Selesai
          </span>
        </div>
        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5 sm:p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🚀</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Learning Progress Tracker
            </h3>
            {percentage === 100 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-bounce">
                🎉 Selesai Semua!
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Kamu telah menyelesaikan{' '}
            <strong className="text-emerald-400 font-bold">
              {completedCount}
            </strong>{' '}
            dari <strong className="text-white">{total}</strong> modul interaktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-emerald-400">
              {percentage}%
            </span>
          </div>
          {completedCount > 0 && (
            <button
              onClick={handleResetAll}
              title="Reset progress"
              className="text-[11px] px-2.5 py-1 rounded-lg border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10 transition-all"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar with glowing fill */}
      <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700 rounded-full shadow-lg shadow-emerald-500/50"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
