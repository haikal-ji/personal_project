'use client'; // Ini file KHUSUS interaktif → harus Client Component

import { useState } from 'react';

export default function ClientClock() {
  // Jam ini diambil SEKALI saat komponen ini pertama kali muncul DI BROWSER
  const [clientTime] = useState(() => new Date().toLocaleTimeString('id-ID'));
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Client Component
      </p>
      <p className="text-zinc-700 dark:text-zinc-300 text-sm text-center">
        Jam ini dihitung di <strong>browser kamu</strong> saat halaman pertama dimuat:
      </p>
      <p className="text-2xl font-bold text-black dark:text-white">{clientTime}</p>

      <button
        onClick={() => setClickCount(clickCount + 1)}
        className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium"
      >
        Klik aku ({clickCount}x)
      </button>
      <p className="text-xs text-zinc-500 text-center max-w-xs">
        Klik tombol ini TIDAK akan mengubah data dari server di atas —
        karena ini murni interaksi di browser (client-side).
      </p>
    </div>
  );
}
