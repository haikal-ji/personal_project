'use client';

import { useEffect, useState } from 'react';
import BelajarNav from '@/components/BelajarNav';

export default function UseEffectDemo() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <BelajarNav
        currentTopic="/belajar/use-effect"
        topicTitle="Belajar useEffect (Side Effects)"
        topicBadge="React Hook"
        badgeColor="purple"
      />

      {/* Main Demos Grid */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <LiveClockCard />
        <WatchCounterCard />
        <FetchExampleCard />
      </div>

      {/* Deep-Dive Guide Box */}
      <div className="relative z-10 w-full max-w-5xl p-6 sm:p-8 rounded-3xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>🧠</span> 3 Pola Utama Dependency Array
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold mb-2">
              useEffect(fn, [])
            </span>
            <p className="font-sans text-zinc-400 text-[11px] leading-relaxed">
              <strong>Array Kosong:</strong> Hanya dieksekusi 1 kali saat komponen pertama kali terpasang (*mount*). Wajib sertakan fungsi pembersih (*cleanup*) jika ada timer/listener.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold mb-2">
              useEffect(fn, [state])
            </span>
            <p className="font-sans text-zinc-400 text-[11px] leading-relaxed">
              <strong>Ada Dependency:</strong> Dijalankan sekali saat awal dan berulang setiap kali nilai variabel di dalam array tersebut mengalami perubahan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold mb-2">
              return () =&gt; cleanup()
            </span>
            <p className="font-sans text-zinc-400 text-[11px] leading-relaxed">
              <strong>Cleanup Function:</strong> Mencegah <em>memory leak</em> dengan menghentikan <code className="text-zinc-200">setInterval</code>, unsubscribe WebSocket, atau membatalkan request saat komponen di-unmount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 1: useEffect dengan dependency array KOSONG [ ]
// ─────────────────────────────────────────────────────────────
function LiveClockCard() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('id-ID'));
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);

    // Fungsi cleanup saat komponen dilepas / isRunning berubah
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="relative p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-purple-500/5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-purple-400 animate-pulse' : 'bg-zinc-600'}`} />
            Contoh 1: [ ] Setup Timer
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Live Clock</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">Interval & Cleanup</h3>
        <p className="text-xs text-zinc-400 mb-6">
          Memasang timer 1 detik sekali secara otomatis tanpa klik tombol.
        </p>

        {/* Digital Clock Display */}
        <div className="p-6 rounded-2xl bg-zinc-950/90 border border-purple-500/20 text-center shadow-inner my-2">
          <p className="text-4xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-indigo-300">
            {time}
          </p>
          <span className="text-[10px] uppercase font-mono text-purple-400/70 tracking-widest mt-1 block">
            WIB Indonesia
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
          }`}
        >
          {isRunning ? '⏸️ Hentikan Timer (Test Cleanup)' : '▶️ Jalankan Kembali'}
        </button>

        <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
          {isRunning
            ? 'Timer berjalan via setInterval dan dibersihkan oleh return () => clearInterval.'
            : 'Timer dihentikan. Memori aman dari kebocoran.'}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 2: useEffect dengan dependency array BERISI [count]
// ─────────────────────────────────────────────────────────────
function WatchCounterCard() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState<string[]>(['Komponen dipasang pertama kali.']);

  useEffect(() => {
    if (count !== 0) {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString('id-ID')}] Count berubah jadi ${count}`,
        ...prev.slice(0, 4),
      ]);
    }
  }, [count]);

  return (
    <div className="relative p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-amber-500/5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Contoh 2: [count] Watch
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Reactor</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">State Watcher</h3>
        <p className="text-xs text-zinc-400 mb-4">
          Efek berjalan setiap kali nilai variabel <code className="text-amber-400">count</code> berubah.
        </p>

        {/* Counter controls */}
        <div className="flex items-center justify-between gap-2 p-3 bg-zinc-950/80 rounded-2xl border border-amber-500/20 mb-4">
          <div className="pl-2">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Nilai Count</span>
            <span className="text-2xl font-black text-white font-mono">{count}</span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              -
            </button>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-amber-500/20"
            >
              + Tambah
            </button>
          </div>
        </div>

        {/* Real-time Log stream */}
        <div className="space-y-1.5 bg-zinc-950/90 rounded-xl p-3 border border-zinc-800 text-[11px] font-mono max-h-36 overflow-y-auto">
          <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Log Aktivitas useEffect</span>
            <button
              onClick={() => setLogs([])}
              className="text-zinc-500 hover:text-zinc-300 underline lowercase text-[10px]"
            >
              clear
            </button>
          </div>
          {logs.map((log, i) => (
            <p key={i} className="text-amber-300/80 truncate">
              › {log}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800/80">
        <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
          Tiap tombol ditekan, React mendeteksi perubahan <code className="text-zinc-300">count</code> dan mengeksekusi callback.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 3: useEffect untuk fetch data di Client Component
// ─────────────────────────────────────────────────────────────
function FetchExampleCard() {
  const [data, setData] = useState<{ id: number; title: string; category: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    const sampleProducts = [
      { id: 101, title: 'MacBook Pro M3 Max', category: 'Laptops' },
      { id: 102, title: 'Sony WH-1000XM5', category: 'Audio' },
      { id: 103, title: 'Keychron Q1 Pro Mechanical', category: 'Peripherals' },
    ];

    const timer = setTimeout(() => {
      const randomItem = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      setData(randomItem);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [fetchKey]);

  return (
    <div className="relative p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-emerald-500/5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Contoh 3: Async Fetch
          </span>
          <span className="text-[11px] font-mono text-zinc-500">API Client</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">Fetch Data di Client</h3>
        <p className="text-xs text-zinc-400 mb-4">
          Simulasi memuat data asynchronous di browser dengan indikator loading.
        </p>

        {/* Data Box */}
        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 min-h-[110px] flex flex-col justify-center items-center text-center my-2">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-zinc-400 font-mono">Memuat data dari API...</span>
            </div>
          ) : (
            <div className="w-full text-left">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {data?.category}
              </span>
              <p className="text-sm font-bold text-white mt-1.5">{data?.title}</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Product ID: #{data?.id}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-3">
        <button
          onClick={() => setFetchKey((k) => k + 1)}
          disabled={loading}
          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Sedang Fetching...' : 'Fetch Ulang Data (Simulasi)'}
        </button>

        <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
          Di Client Component, useEffect digunakan untuk trigger request API setelah DOM siap.
        </p>
      </div>
    </div>
  );
}
