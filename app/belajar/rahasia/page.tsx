import Link from 'next/link';
import LogoutButton from './LogoutButton';

// Server Component ini TIDAK PERNAH dirender kalau middleware.ts tidak
// mengizinkan (yaitu kalau cookie demo_login tidak ada, middleware sudah
// redirect duluan sebelum sampai sini).
export default function RahasiaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-zinc-50 dark:bg-black">
      <div className="p-8 rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950/30 text-center max-w-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400 mb-2">
          Halaman Terproteksi
        </p>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">🔓 Selamat datang!</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Kamu bisa lihat halaman ini karena middleware mendeteksi
          kamu sudah &quot;login&quot; (ada cookie <code>demo_login</code>).
        </p>
        <LogoutButton />
      </div>
      <Link href="/belajar" className="text-sm text-blue-500 underline">
        ← Kembali
      </Link>
    </div>
  );
}
