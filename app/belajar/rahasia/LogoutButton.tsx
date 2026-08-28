'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus cookie dengan cara set tanggal kedaluwarsanya ke masa lalu
    document.cookie = 'demo_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/belajar/rahasia/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium"
    >
      Logout
    </button>
  );
}
