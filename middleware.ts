import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware ini jalan di SERVER, SEBELUM request sampai ke halaman manapun
// yang cocok dengan `matcher` di bawah. Cocok untuk: cek login, redirect,
// logging, atau ubah response sebelum sampai ke halaman.
export function middleware(request: NextRequest) {
  // Ini akan muncul di TERMINAL tempat `npm run dev` jalan (bukan di browser),
  // karena middleware jalan di server.
  console.log('[middleware] ada request masuk ke:', request.nextUrl.pathname);

  const isLoginPage = request.nextUrl.pathname === '/belajar/rahasia/login';
  const sudahLogin = request.cookies.has('demo_login');

  // Kalau mau akses halaman rahasia TAPI belum "login" (belum ada cookie-nya)
  // dan bukan lagi di halaman login itu sendiri → paksa redirect ke login.
  if (!isLoginPage && !sudahLogin) {
    const loginUrl = new URL('/belajar/rahasia/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Kalau lolos pengecekan, lanjutkan request seperti biasa.
  return NextResponse.next();
}

// `matcher` menentukan middleware ini HANYA jalan untuk path yang cocok pola ini.
// Tanpa ini, middleware akan jalan di SETIAP request (termasuk halaman lain,
// gambar, dll) yang tidak perlu dicek.
export const config = {
  matcher: ['/belajar/rahasia/:path*'],
};
