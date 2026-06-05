// lib/http.ts
import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;

    if (typeof d.message === 'string' && d.message.trim()) {
      return d.message.trim();
    }

    if (Array.isArray(d.message) && d.message.length > 0) {
      return (d.message as string[]).join('; ');
    }
  }

  return getDefaultMessage(status);
}

function getDefaultMessage(status: number): string {
  switch (status) {
    case 400: return 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại';
    case 401: return 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại';
    case 403: return 'Bạn không có quyền thực hiện thao tác này';
    case 404: return 'Không tìm thấy dữ liệu';
    case 409: return 'Dữ liệu đã tồn tại, vui lòng kiểm tra lại';
    case 422: return 'Dữ liệu không hợp lệ';
    case 429: return 'Quá nhiều yêu cầu, vui lòng thử lại sau';
    case 500: return 'Lỗi máy chủ, vui lòng thử lại sau';
    case 503: return 'Dịch vụ tạm thời không khả dụng';
    default: return 'Có lỗi xảy ra, vui lòng thử lại';
  }
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const message = error.code === 'ECONNABORTED'
        ? 'Yêu cầu quá thời gian, vui lòng thử lại'
        : 'Không thể kết nối đến máy chủ';
      return Promise.reject(new Error(message));
    }

    const { status, data } = error.response;
    const isAuthError = status === 401 || status === 403;

    if (isAuthError && typeof window !== 'undefined') {
      removeToken();
      sessionStorage.removeItem('admin_session');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    const message = extractErrorMessage(data, status);
    const richError = new Error(message);
    (richError as any).status = status;
    (richError as any).data = data;

    return Promise.reject(richError);
  }
);

export { removeToken };
export default http;
