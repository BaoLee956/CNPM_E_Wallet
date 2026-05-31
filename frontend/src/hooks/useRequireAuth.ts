// hooks/useRequireAuth.ts
"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Gọi checkAuth một lần khi mount để đồng bộ trạng thái auth từ token thực.
 * Dùng ở các page cần biết trạng thái đăng nhập (home, transfer, history...).
 *
 * Trả về { isAuthenticated, isLoading, user, wallet } để page sử dụng.
 */
export function useRequireAuth() {
  const auth = useAuth();

  useEffect(() => {
    // Chỉ gọi khi chưa xác định trạng thái (tránh gọi lại sau khi đã auth)
    if (!auth.isAuthenticated && !auth.isLoading) {
      auth.checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth;
}