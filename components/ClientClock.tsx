'use client';

import { useState } from 'react';

export default function ClientClock() {
  // Jam ini diambil saat komponen muncul di browser
  const [clientTime] = useState(() => new Date().toLocaleTimeString('id-ID'));
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="relative overflow-hidden p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-b from-sky-500/10 via-sky-500/5 to-transparent backdrop-blur-md dark:bg-zinc-900/60 shadow-lg shadow-sky-500/5 w-full max-w-md">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
          Client Component
        </span>
        <span className="text-[11px] font-mono text-zinc-400">Rendered in Browser</span>
      </div>

      <p className="text-zinc-600 dark:text-zinc-300 text-xs text-center mb-2">
        Jam ini dieksekusi di <strong>browser kamu</strong> saat pertama kali dimuat:
      </p>

      <div className="py-4 my-2 text-center bg-white/60 dark:bg-zinc-950/60 rounded-xl border border-sky-200/50 dark:border-sky-900/50">
        <p className="text-3xl font-black font-mono tracking-tight text-sky-600 dark:text-sky-400">
          {clientTime}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 mt-4">
        <button
          onClick={() => setClickCount(clickCount + 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-md shadow-sky-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Klik Aku (Interaktif: {clickCount}x)
        </button>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
          💡 Klik tombol ini <strong>TIDAK</strong> mengubah data server di atas — karena ini state lokal yang terisolasi di sisi browser (*client-side*).
        </p>
      </div>
    </div>
  );
}
