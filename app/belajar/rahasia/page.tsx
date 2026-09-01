import LogoutButton from './LogoutButton';
import BelajarNav from '@/components/BelajarNav';
import TopicQuiz, { QuizQuestion } from '@/components/TopicQuiz';

const MIDDLEWARE_QUIZ: QuizQuestion[] = [
  {
    question: 'Di mana `middleware.ts` Next.js dieksekusi?',
    options: [
      'Di browser klien setelah semua HTML selesai di-load',
      'Di Edge / Server sebelum request mencapai route handler atau halaman tujuan',
      'Di dalam file database SQL',
      'Hanya saat user melakukan klik tombol',
    ],
    correctIndex: 1,
    explanation:
      'Middleware berjalan di Edge/Server sebelum request sampai ke halaman, sehingga sangat ideal untuk autentikasi, redirect, dan pemeriksaan header/cookie.',
  },
  {
    question: 'Apa fungsi dari properti `config.matcher` pada middleware?',
    options: [
      'Menentukan tema warna website',
      'Membatasi URL / rute spesifik mana saja yang akan diproses oleh middleware',
      'Mengubah font tulisan di browser',
      'Menghapus cookie user secara otomatis',
    ],
    correctIndex: 1,
    explanation:
      'Matcher digunakan untuk memfilter rute tertentu (misal `/belajar/rahasia/:path*`) agar middleware tidak berjalan secara berlebihan pada aset statis atau rute publik.',
  },
];

export default function RahasiaPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Glow background */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/rahasia"
        topicTitle="Middleware & Protected Route"
        topicBadge="Next.js Middleware"
        badgeColor="amber"
      />

      <div className="relative z-10 w-full max-w-lg mb-8">
        <div className="p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md text-center shadow-2xl shadow-emerald-500/10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
            🔓
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Akses Diberikan (Authenticated)
          </span>

          <h2 className="text-2xl font-extrabold text-white mb-2">Selamat Datang di Area Rahasia!</h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
            Halaman ini terproteksi oleh <code className="text-amber-300 font-mono">middleware.ts</code>. Anda bisa melihat halaman ini karena terdapat cookie <code className="text-emerald-400 font-mono">demo_login=yes</code> di browser Anda.
          </p>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-left mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Status Guard:</span>
              <span className="text-emerald-400 font-bold">PASSED (200 OK)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Interceptor:</span>
              <span className="text-zinc-200">Edge Middleware</span>
            </div>
          </div>

          <LogoutButton />
        </div>
      </div>

      {/* Quiz Section */}
      <TopicQuiz
        topicId="rahasia"
        topicTitle="Next.js Middleware"
        color="amber"
        questions={MIDDLEWARE_QUIZ}
      />
    </div>
  );
}
