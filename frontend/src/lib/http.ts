// lib/http.ts
import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth-token';
import { useToast } from '@/hooks/useToast';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 (unauthorized) – chuyển hướng đăng nhập
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    // Lấy message lỗi từ response (ưu tiên message từ backend)
    let message = 'Có lỗi xảy ra, vui lòng thử lại';
    if (error.response) {
      const data = error.response.data;
      // Backend có thể trả về dạng { message: ... } hoặc { error: ... } hoặc { detail: ... }
      message = data?.message || data?.error || data?.detail || message;
    } else if (error.request) {
      message = 'Không thể kết nối đến máy chủ';
    } else {
      message = error.message || message;
    }

    // Hiển thị toast lỗi (trừ khi lỗi 401 đã redirect, vẫn có thể show thông báo)
    if (error.response?.status !== 401) { // tránh toast trùng với redirect
      const { showToast } = useToast.getState();
      showToast(message, 'error');
    }

    return Promise.reject(error);
  }
);

export default http;