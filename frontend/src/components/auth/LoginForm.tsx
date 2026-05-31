// components/auth/LoginForm.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, LogIn, LogOut } from "lucide-react";

const AUTH_STORAGE_KEY = "auth-storage";

function getStoredAuth(): { user: unknown; wallet: unknown } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.state ?? parsed;
  } catch {
    return null;
  }
}

interface LoginFormProps {
  initialHasSession?: boolean;
}

export function LoginForm({ initialHasSession = false }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/home";
  const { login, isLoading, error, clearError, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkStoredAuth = useCallback(() => {
    const stored = getStoredAuth();
    return !!(stored?.user);
  }, []);

  // Use initial value from server-rendered prop, then verify on client
  const [hasExistingSession, setHasExistingSession] = useState(initialHasSession);

  useEffect(() => {
    // Re-check on client in case localStorage changed since SSR
    setHasExistingSession(checkStoredAuth());
  }, [checkStoredAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, password });
      router.push(redirectTo);
    } catch {
      // error handled in store
    }
  };

  const handleLogout = async () => {
    await logout();
    setHasExistingSession(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Card padding="lg" className="w-full shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-display text-2xl md:text-3xl text-primary">
          Welcome Back
        </h1>
        <p className="text-secondary text-sm mt-1">
          Sign in to your e-wallet account
        </p>
      </div>

      {hasExistingSession ? (
        // Already authenticated notice
        <div className="space-y-4">
          <div className="bg-brand-subtle/50 border border-brand-border rounded-2xl p-5 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-subtle mb-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-default"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-primary">
              You are already signed in
            </h3>
            <p className="text-xs text-secondary mt-1">
              You have an active session. Sign out to use a different account.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/home" className="flex-1">
              <Button variant="primary" size="lg" fullWidth>
                Go to Home
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleLogout}
              iconLeft={<LogOut size={16} />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        // Login form
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Mail size={16} />}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={<Lock size={16} />}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="text-danger text-sm bg-danger-light/20 p-2 rounded-lg text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            iconLeft={<LogIn size={18} />}
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-brand-default hover:underline font-medium"
            >
              Create account
            </Link>
          </div>
        </form>
      )}
    </Card>
  );
}
