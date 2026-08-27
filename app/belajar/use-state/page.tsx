'use client'; // WAJIB ada ini di baris paling atas, karena kita pakai useState (interaktif)

import { useState } from 'react';

export default function UseStateDemo() {
  // useState mengembalikan 2 hal:
  // 1. nilai saat ini (count)
  // 2. fungsi untuk mengubah nilai itu (setCount)
  const [count, setCount] = useState(0);

  // Contoh kedua: useState untuk input teks
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-2xl font-bold text-black dark:text-white">Belajar useState</h1>

      {/* Contoh 1: Counter */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-600 dark:text-zinc-400">Contoh 1: Counter</p>
        <p className="text-5xl font-bold text-black dark:text-white">{count}</p>
        <div className="flex gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
          >
            − Kurangi
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* Contoh 2: Input teks yang nilainya "diingat" oleh state */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-sm">
        <p className="text-zinc-600 dark:text-zinc-400">Contoh 2: Input Terkontrol</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ketik nama kamu..."
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white"
        />
        <p className="text-black dark:text-white">
          Halo, <span className="font-bold">{name || '...'}</span>! ({name.length} karakter)
        </p>
      </div>
    </div>
  );
}
