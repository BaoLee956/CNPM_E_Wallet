// lib/http.ts
import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Trích xuất message lỗi từ response của NestJS.
 * Ưu tiên message từ BE — chỉ fallback về FE map khi BE không trả về gì.
 *
 * NestJS có thể trả về nhiều shape:
 *   - { message: "string", statusCode, error }   ← NotFoundException / BadRequestException manual
 *   - { message: ["field..."], statusCode, error } ← class-validator (ValidationPipe)
 *   - { statusCode, message, error }              ← HttpException default
 */
function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;

    // message string → dùng thẳng từ BE
    if (typeof d.message === 'string' && d.message.trim()) {
      return d.message.trim();
    }

    // message array (class-validator) → join, vẫn là message từ BE
    if (Array.isArray(d.message) && d.message.length > 0) {
      return (d.message as string[]).join('; ');
    }
  }

  // Không có message từ BE → mới dùng FE fallback
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
    default:  return 'Có lỗi xảy ra, vui lòng thử lại';
  }
}

http.interceptors.response.use(
  (response) => response,
  (error) => {

    // Không có response (mất mạng, timeout, CORS...) → show toast vì lỗi này không được store xử lý
    if (!error.response) {
      const message = error.code === 'ECONNABORTED'
        ? 'Yêu cầu quá thời gian, vui lòng thử lại'
        : 'Không thể kết nối đến máy chủ';
      return Promise.reject(new Error(message));
    }
    const { status, data } = error.response;

    // 401 → clear token + extract message từ BE (không redirect, để UI xử lý)
    if (status === 401) {
      removeToken();
      // Extract message từ BE trước, chỉ dùng default khi BE không trả về message
      const message = extractErrorMessage(data, status);
      return Promise.reject(new Error(message));
    }

    // Tất cả lỗi còn lại → extract message (không show toast ở đây để tránh duplicate, để store xử lý)
    const message = extractErrorMessage(data, status);

    // Gắn message vào error object để caller (hook/form) có thể dùng nếu cần
    const richError = new Error(message);
    (richError as any).status = status;
    (richError as any).data = data;

    return Promise.reject(richError);
  }
);

export default http;
