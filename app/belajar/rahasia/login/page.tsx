'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Set cookie sederhana untuk simulasi "sudah login" (berlaku 1 jam)
    document.cookie = 'demo_login=yes; path=/; max-age=3600';
    router.push('/belajar/rahasia');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-zinc-50 dark:bg-black">
      <div className="p-8 rounded-xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 text-center max-w-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-yellow-600 dark:text-yellow-500 mb-2">
          Halaman Login (contoh)
        </p>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">🔒 Kamu belum login</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Middleware mendeteksi kamu tidak punya cookie <code>demo_login</code>,
          jadi kamu otomatis diarahkan (redirect) ke halaman ini.
        </p>
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium"
        >
          Login (simulasi)
        </button>
      </div>
    </div>
  );
}
