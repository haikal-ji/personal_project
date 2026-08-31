'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus cookie dengan cara set tanggal kedaluwarsa ke masa lalu
    document.cookie = 'demo_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/belajar/rahasia/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-600/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout (Hapus Cookie & Test Guard)
    </button>
  );
}
