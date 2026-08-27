'use client'; // useEffect juga cuma bisa di Client Component

import { useEffect, useState } from 'react';

export default function UseEffectDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-2xl font-bold text-black dark:text-white">Belajar useEffect</h1>
      <LiveClock />
      <WatchCounter />
      <FetchExample />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 1: useEffect dengan dependency array KOSONG [ ]
// → efeknya HANYA jalan SEKALI, saat komponen pertama kali muncul.
// Cocok untuk: setup yang cuma perlu dilakukan sekali (timer, subscribe, dll)
// ─────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('id-ID'));

  useEffect(() => {
    // Ini "efek samping": bikin interval yang jalan tiap 1 detik
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);

    // INI YANG PENTING: fungsi "cleanup".
    // React akan panggil ini saat komponen dilepas (unmount),
    // supaya interval-nya berhenti dan tidak bocor memori.
    return () => clearInterval(interval);
  }, []); // ← array kosong = jalan sekali saja saat mount

  return (
    <div className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/30 w-full max-w-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">
        Contoh 1: dependency array [ ]
      </p>
      <p className="text-3xl font-bold text-black dark:text-white">{time}</p>
      <p className="text-xs text-zinc-500 text-center">
        Jam ini update sendiri tiap detik, tanpa kamu klik apa-apa —
        karena setInterval dipasang sekali lewat useEffect.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 2: useEffect dengan dependency array BERISI [count]
// → efeknya jalan setiap kali `count` berubah (dan sekali di awal).
// Cocok untuk: bereaksi terhadap perubahan state tertentu.
// ─────────────────────────────────────────────────────────────
function WatchCounter() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    setLog((prev) => [...prev, `count berubah jadi ${count}`]);
  }, [count]); // ← jalan tiap kali `count` berubah

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/30 w-full max-w-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
        Contoh 2: dependency array [count]
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium"
      >
        Tambah ({count})
      </button>
      <div className="w-full text-xs bg-white dark:bg-black rounded-lg p-3 max-h-32 overflow-y-auto">
        {log.map((line, i) => (
          <p key={i} className="text-zinc-600 dark:text-zinc-400">{line}</p>
        ))}
      </div>
      <p className="text-xs text-zinc-500 text-center">
        Tiap kali tombol diklik, useEffect otomatis jalan lagi karena `count` ada di dependency array.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTOH 3: useEffect untuk fetch data di Client Component
// → beda dengan Server Component yang bisa langsung `await`,
//   di Client Component kita HARUS pakai useEffect untuk fetch data.
// ─────────────────────────────────────────────────────────────
function FetchExample() {
  const [data, setData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dari API (di dunia nyata ini `fetch('/api/...')`)
    const timer = setTimeout(() => {
      setData({ name: 'Data dari server (simulasi)' });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950/30 w-full max-w-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
        Contoh 3: fetch data di Client Component
      </p>
      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : (
        <p className="text-black dark:text-white font-medium">{data?.name}</p>
      )}
      <p className="text-xs text-zinc-500 text-center">
        Ini pola yang tadi kita bahas di topik Server vs Client —
        di sini WAJIB pakai useEffect + useState karena ini Client Component.
      </p>
    </div>
  );
}
