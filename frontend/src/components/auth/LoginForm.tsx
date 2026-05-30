// components/auth/LoginForm.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/home";
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, password });
      router.push(redirectTo);
    } catch (err) {
      // error handled in store
    }
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
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-brand-default hover:underline font-medium"
          >
            Create account
          </Link>
        </div>
      </form>
    </Card>
  );
}
