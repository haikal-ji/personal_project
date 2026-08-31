'use client';

import { useRouter } from 'next/navigation';
import BelajarNav from '@/components/BelajarNav';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Set cookie sederhana untuk simulasi "sudah login" (berlaku 1 jam)
    document.cookie = 'demo_login=yes; path=/; max-age=3600';
    router.push('/belajar/rahasia');
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/rahasia"
        topicTitle="Middleware & Protected Route"
        topicBadge="Access Intercepted"
        badgeColor="amber"
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="p-8 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md text-center shadow-2xl shadow-amber-500/10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
            🔒
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Redirected by Middleware
          </span>

          <h2 className="text-2xl font-extrabold text-white mb-2">Akses Terkunci</h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
            Middleware mendeteksi bahwa browser Anda <strong>belum memiliki cookie autentikasi</strong> (<code className="text-amber-300 font-mono">demo_login</code>), sehingga rute otomatis dialihkan ke halaman login ini.
          </p>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-left mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Target Rute:</span>
              <span className="text-zinc-200">/belajar/rahasia</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Response:</span>
              <span className="text-amber-400 font-bold">307 Temporary Redirect</span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            🔑 Klik untuk Login (Set Demo Cookie)
          </button>
        </div>
      </div>
    </div>
  );
}
