// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Danh sách route cần bảo vệ (yêu cầu đăng nhập)
const protectedRoutes = ['/home', '/transfer', '/history', '/profile'];

// Các route dành cho auth (nếu đã đăng nhập thì không vào được)
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = !!token;

  // 1. Nếu đã đăng nhập và cố gắng vào auth routes -> redirect về home
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 2. Nếu chưa đăng nhập và cố gắng vào protected routes -> redirect về login
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/auth/login', request.url);
    // Giữ lại redirect_uri để sau login quay lại trang muốn truy cập
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Mọi trường hợp khác: cho phép tiếp tục
  return NextResponse.next();
}

// Chỉ chạy middleware trên các route cần quan tâm (tối ưu hiệu năng)
export const config = {
  matcher: [
    '/home/:path*',
    '/transfer/:path*',
    '/history/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
  ],
};