import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
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

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const isAuthError = status === 401 || status === 403;

    if (isAuthError && typeof window !== 'undefined') {
      removeToken();
      // Clear admin session and redirect to admin login
      sessionStorage.removeItem('admin_session');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Re-export removeToken so services can call it on logout
export { removeToken };

export default http;