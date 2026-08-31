import ClientClock from '@/components/ClientClock';
import BelajarNav from '@/components/BelajarNav';

export default async function ServerClientDemo() {
  // Simulasi load data di server (query database / API rahasia)
  await new Promise((resolve) => setTimeout(resolve, 200));

  const serverTime = new Date().toLocaleTimeString('id-ID');
  const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/server-client"
        topicTitle="Server vs Client Component"
        topicBadge="Next.js App Router"
        badgeColor="indigo"
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Server Component Card */}
        <div className="relative p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-indigo-500/5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Server Component (Default)
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Node / Edge Server</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Render di Server</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Jam ini dihitung sekali di <strong>server</strong> saat halaman diminta oleh browser:
            </p>

            <div className="p-6 rounded-2xl bg-zinc-950/90 border border-indigo-500/20 text-center shadow-inner my-2">
              <p className="text-3xl font-black font-mono tracking-tight text-indigo-300">
                {serverTime}
              </p>
              <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider mt-1 block">
                Server Timestamp (WIB)
              </span>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase font-mono mb-1">Random Server Fact:</span>
              <p className="text-indigo-200/90 italic">&quot;{randomFact}&quot;</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80">
            <p className="text-[11px] text-zinc-500 leading-relaxed text-center">
              🔄 <strong>Refresh halaman (F5)</strong> untuk meminta render server baru. Jam server dan fakta akan otomatis berganti.
            </p>
          </div>
        </div>

        {/* Client Component Card (Embedded) */}
        <div className="flex flex-col">
          <ClientClock />
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="relative z-10 w-full max-w-5xl p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>⚖️</span> Perbandingan Fitur & Kapabilitas
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Fitur</th>
                <th className="py-2.5 px-3 text-indigo-400">Server Component</th>
                <th className="py-2.5 px-3 text-sky-400">Client Component (&apos;use client&apos;)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Tempat Render</td>
                <td className="py-2.5 px-3 text-zinc-400">Hanya di Server</td>
                <td className="py-2.5 px-3 text-zinc-400">Server (prerender) + Browser Hydration</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Database / Secret API Keys</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">✅ Sangat Aman</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">❌ Berisiko bocor ke browser</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Interaktivitas (onClick, form)</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">❌ Tidak didukung</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">✅ Didukung penuh</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">React Hooks (useState, useEffect)</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">❌ Tidak bisa dipakai</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">✅ Bisa dipakai</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Ukuran JavaScript Bundle</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">✅ 0 KB ke browser</td>
                <td className="py-2.5 px-3 text-zinc-400">Termasuk dalam bundle client</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const FACTS = [
  'Next.js dibuat oleh tim Vercel.',
  'Server Component tidak mengirim dependensi JavaScript-nya ke browser.',
  'App Router menggunakan struktur folder hierarkis untuk routing.',
  'React 19 mengintegrasikan Server Components secara langsung sebagai standar web.',
];
