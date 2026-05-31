// hooks/useRequireAuth.ts
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  useEffect(() => {

    if (!hasHydrated) return;

    if (!auth.isAuthenticated) {
      auth.checkAuth();
    }
  }, [hasHydrated]);

  return { ...auth, isLoading: !hasHydrated || auth.isLoading };
}