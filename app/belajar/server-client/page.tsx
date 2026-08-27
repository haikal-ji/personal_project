// TIDAK ada 'use client' di file ini → ini adalah SERVER COMPONENT (default Next.js)
// Artinya kode di bawah ini jalan di SERVER, bukan di browser.

import ClientClock from '@/components/ClientClock';

export default async function ServerClientDemo() {
  // Karena ini Server Component, kita bisa langsung pakai `await` di sini,
  // TANPA perlu useEffect atau useState. Ini yang membedakan dari Client Component.

  // Simulasi "kerja berat di server" (misal: query database, panggil API rahasia, dll)
  await new Promise((resolve) => setTimeout(resolve, 300)); // jeda 300ms

  const serverTime = new Date().toLocaleTimeString('id-ID');
  const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Server Component vs Client Component
      </h1>

      <div className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950/30">
        <p className="text-xs font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
          Server Component
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm text-center">
          Jam ini dihitung di <strong>server</strong> setiap kali halaman ini di-request ulang:
        </p>
        <p className="text-2xl font-bold text-black dark:text-white">{serverTime}</p>
        <p className="text-sm text-zinc-500 italic">&quot;{randomFact}&quot;</p>
        <p className="text-xs text-zinc-500 text-center max-w-xs">
          Coba refresh halaman ini (F5) — jam &amp; fakta di atas berubah.
          Tapi kalau kamu klik tombol di kotak biru bawah, jam di atas TETAP SAMA.
        </p>
      </div>

      {/* Ini kita "titipkan" komponen Client di dalam Server Component */}
      <ClientClock />

      <div className="max-w-md text-sm text-zinc-600 dark:text-zinc-400 text-center space-y-2">
        <p><strong>Coba lakukan ini:</strong></p>
        <p>1. Klik tombol biru beberapa kali → jam hijau di atas tidak berubah.</p>
        <p>2. Refresh halaman (F5) → jam hijau berubah, jam biru juga ikut berubah (karena semua ke-load ulang).</p>
      </div>
    </div>
  );
}

const FACTS = [
  'Next.js dibuat oleh Vercel.',
  'Server Component tidak mengirim JavaScript-nya ke browser.',
  'App Router menggunakan struktur folder untuk routing.',
  'React 19 memperkenalkan Server Components sebagai fitur stabil.',
];
