"use client";

import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const AUTH_KEY = "auth-storage";

function hasStoredSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed?.state?.user ?? parsed?.user);
  } catch {
    return false;
  }
}

export default function LoginPage() {
  const [hasSession, setHasSession] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasSession(hasStoredSession());
  }, []);

  // During SSR / before hydration, render nothing to avoid flash
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-bg">
        <div className="h-8 w-8 rounded-full border-2 border-brand-default border-t-transparent animate-spin" />
      </div>
    );
  }

  return <LoginForm initialHasSession={hasSession} />;
}
