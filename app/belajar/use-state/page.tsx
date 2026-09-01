'use client';

import { useState } from 'react';
import BelajarNav from '@/components/BelajarNav';
import TopicQuiz, { QuizQuestion } from '@/components/TopicQuiz';

const USE_STATE_QUIZ: QuizQuestion[] = [
  {
    question:
      'Apa yang terjadi saat fungsi setter (misal: setCount) dipanggil di React?',
    options: [
      'Halaman me-reload ulang browser dari awal',
      'React me-render ulang (re-render) komponen dengan nilai state terbaru',
      'Hanya mengubah variabel di memori tanpa memperbarui tampilan layar',
      'Data otomatis disimpan permanen ke server database',
    ],
    correctIndex: 1,
    explanation:
      'Fungsi setter memberi tahu React bahwa data telah berubah, sehingga React otomatis me-render ulang komponen terkait agar UI tetap sinkron.',
  },
  {
    question:
      'Direktif apa yang wajib ditulis di baris paling atas file Next.js App Router jika menggunakan useState?',
    options: [
      "'use server'",
      "'use client'",
      "'use effect'",
      "Tidak memerlukan direktif apapun",
    ],
    correctIndex: 1,
    explanation:
      "Hook interaktif seperti useState hanya bisa dijalankan di browser (Client Component), sehingga wajib menyertakan 'use client' di baris paling awal.",
  },
];

export default function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [themeColor, setThemeColor] = useState<'emerald' | 'blue' | 'purple' | 'amber'>('emerald');

  const colorClasses = {
    emerald: 'from-emerald-500/20 text-emerald-400 border-emerald-500/30',
    blue: 'from-blue-500/20 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 text-purple-400 border-purple-500/30',
    amber: 'from-amber-500/20 text-amber-400 border-amber-500/30',
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/use-state"
        topicTitle="Belajar useState (State Management)"
        topicBadge="React Hook"
        badgeColor="emerald"
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Contoh 1: Counter */}
        <div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-emerald-500/5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Contoh 1: Reaktif Counter
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Local State</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">State Nilai Angka</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Nilai <code className="text-emerald-400 font-mono">count</code> otomatis memicu render ulang komponen setiap kali <code className="text-emerald-400 font-mono">setCount()</code> dipanggil.
            </p>

            {/* Big number showcase */}
            <div className="p-6 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 text-center shadow-inner my-2">
              <span className="text-xs uppercase font-mono text-zinc-500 tracking-wider">Current Count</span>
              <p className="text-6xl font-black font-mono tracking-tight text-white my-1">
                {count}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${count > 0 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : count < 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                  {count > 0 ? 'Positif (+)' : count < 0 ? 'Negatif (-)' : 'Nol (Zero)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-3">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setCount((c) => c - 5)}
                className="py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
              >
                -5
              </button>
              <button
                onClick={() => setCount((c) => c - 1)}
                className="py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
              >
                -1
              </button>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                +1
              </button>
              <button
                onClick={() => setCount((c) => c + 5)}
                className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                +5
              </button>
            </div>

            <button
              onClick={() => setCount(0)}
              className="w-full py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-medium transition-all cursor-pointer"
            >
              Reset ke 0
            </button>
          </div>
        </div>

        {/* Contoh 2: Input Terkontrol */}
        <div className="p-6 sm:p-8 rounded-3xl border border-teal-500/30 bg-gradient-to-b from-teal-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-teal-500/5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Contoh 2: Controlled Input
              </span>
              <span className="text-[11px] font-mono text-zinc-500">2-Way Binding</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Input Teks Terkontrol</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Nilai form disinkronkan langsung ke memori state React secara instan.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5">
                  Ketik Nama Anda:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Haikal..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-zinc-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white text-sm outline-none transition-all"
                />
              </div>

              {/* Live Preview Card */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-teal-500/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-xl font-bold text-white shadow-md">
                  {name ? name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Live Preview:</p>
                  <p className="text-base font-bold text-white truncate max-w-[200px]">
                    {name || 'Nama belum diisi'}
                  </p>
                  <p className="text-[10px] text-teal-400 font-mono mt-0.5">
                    {name.length} karakter tersimpan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-500">State sync status:</span>
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active in memory
            </span>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <TopicQuiz
        topicId="use-state"
        topicTitle="useState Hook"
        color="emerald"
        questions={USE_STATE_QUIZ}
      />
    </div>
  );
}
