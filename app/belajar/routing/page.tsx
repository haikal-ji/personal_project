import Link from 'next/link';
import BelajarNav from '@/components/BelajarNav';
import TopicQuiz, { QuizQuestion } from '@/components/TopicQuiz';

const ROUTING_QUIZ: QuizQuestion[] = [
  {
    question:
      'Bagaimana cara membuat rute dinamis (dynamic route) seperti `/produk/123` di Next.js App Router?',
    options: [
      'Menuliskan konfigurasi route di file express.js',
      'Membuat nama folder dibungkus kurung siku, contoh: `app/produk/[id]/page.tsx`',
      'Membuat file bernama `[id].html` di folder public',
      'Menggunakan tanda tanya di URL seperti `?id=123`',
    ],
    correctIndex: 1,
    explanation:
      'Di Next.js App Router, nama folder dengan kurung siku `[id]` atau `[slug]` otomatis menangkap parameter dinamis URL dan meneruskannya ke komponen `page.tsx` via `params`.',
  },
  {
    question:
      'Mengapa disarankan menggunakan `<Link href="...">` daripada `<a href="...">` biasa?',
    options: [
      'Agar halaman me-refresh total setiap diklik',
      'Supaya terjadi navigasi instan di sisi klien (SPA) dengan prefetching tanpa reload penuh',
      'Hanya untuk mengubah warna teks menjadi biru',
      'Link HTML biasa sudah tidak didukung di browser modern',
    ],
    correctIndex: 1,
    explanation:
      'Komponen `<Link>` Next.js melakukan prefetching halaman dan transisi di sisi klien (SPA), sehingga navigasi terasa sangat cepat dan mulus tanpa reload browser.',
  },
];

export default function RoutingIntro() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/routing"
        topicTitle="Next.js App Router (File-system Routing)"
        topicBadge="Navigation"
        badgeColor="blue"
      />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8 mb-8">
        <div className="w-full p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md shadow-xl shadow-blue-500/5">
          <h2 className="text-xl font-bold text-white mb-2">Folder = URL Route</h2>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            Next.js menggunakan struktur folder di dalam <code className="text-blue-400 font-mono">app/</code> secara otomatis untuk membuat URL tanpa perlu konfigurasi router manual.
          </p>

          {/* Visual Folder Tree */}
          <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2 mb-6">
            <div className="flex items-center gap-2 text-zinc-500 text-[11px] border-b border-zinc-800/80 pb-2 mb-3">
              <span>📁 Struktur Folder di Disk</span>
              <span className="ml-auto">🌐 URL yang Terbentuk</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">app/belajar/routing/<span className="text-emerald-400">page.tsx</span></span>
              <span className="text-blue-400 font-bold">/belajar/routing</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">app/.../routing/produk/<span className="text-emerald-400">page.tsx</span></span>
              <span className="text-blue-400 font-bold">/belajar/routing/produk</span>
            </div>

            <div className="flex items-center justify-between bg-blue-500/10 -mx-2 px-2 py-1 rounded-lg border border-blue-500/20">
              <span className="text-zinc-200 font-semibold">app/.../produk/<span className="text-amber-400">[id]</span>/<span className="text-emerald-400">page.tsx</span></span>
              <span className="text-amber-300 font-bold">/belajar/routing/produk/:id</span>
            </div>
          </div>

          <Link
            href="/belajar/routing/produk"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Coba Demo Dynamic Route Produk</span>
            <span>→</span>
          </Link>
        </div>

        {/* Info pill */}
        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-center max-w-lg">
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            ⚡ Navigasi dilakukan dengan komponen <code className="text-blue-400 font-mono">&lt;Link href=&quot;...&quot;&gt;</code> sehingga terjadi transisi instan (*Single Page Application*) tanpa reload halaman penuh.
          </p>
        </div>
      </div>

      {/* Quiz Section */}
      <TopicQuiz
        topicId="routing"
        topicTitle="Next.js App Routing"
        color="blue"
        questions={ROUTING_QUIZ}
      />
    </div>
  );
}
