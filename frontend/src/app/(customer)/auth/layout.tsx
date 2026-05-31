// app/auth/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, checkAuth, isLoading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [hasHydrated, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-surface-bg flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-brand-default border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="min-h-dvh bg-surface-bg flex items-center justify-center p-4">
      <div className="w-full max-w-120 md:max-w-130 lg:max-w-140 transition-all">
        {children}
      </div>
    </div>
  );
}
