'use client'; // Bắt buộc thêm dòng này ở đầu file nếu dùng hook của Zustand trong Next.js App Router

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore'; // Kiểm tra lại đường dẫn import đúng với thư mục của bạn

export default function LandingHeader() {
  // Lấy trạng thái từ Store
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      {/* 1. Phần Logo bên trái (Giữ nguyên code cũ của bạn) */}
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">E-Wallet</Link>
      </div>

      {/* 2. Phần Cụm nút góc trên bên phải */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // --- LOGIC KHI ĐÃ ĐĂNG NHẬP ---
          <>
            <Link 
              href="/home" 
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>
            <button 
              onClick={() => {
                logout();
                // Có thể thêm router.push('/') nếu muốn ép chuyển hướng về trang chủ
              }} 
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          // --- LOGIC KHI CHƯA ĐĂNG NHẬP ---
          <>
            <Link 
              href="/auth/login" 
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}