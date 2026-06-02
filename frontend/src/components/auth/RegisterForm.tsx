// components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, User, UserPlus, Phone } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    clearError();
    try {
      await register({ name, phoneNumber, email, password });
      router.push("/home");
    } catch (err) {
      // error handled by store
    }
  };

  return (
    <Card padding="lg" className="w-full shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-display text-2xl md:text-3xl text-primary">
          Get Started
        </h1>
        <p className="text-secondary text-sm mt-1">
          Create your e-wallet account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          iconLeft={<User size={16} />}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="0912345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          iconLeft={<Phone size={16} />}
          required
        />

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
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconLeft={<Lock size={16} />}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          iconLeft={<Lock size={16} />}
          error={passwordError}
          required
        />

        {(error || passwordError) && (
          <div className="text-danger text-sm bg-danger-light/20 p-2 rounded-lg text-center">
            {error || passwordError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          iconLeft={<UserPlus size={18} />}
        >
          Create Account
        </Button>

        <div className="text-center text-sm text-secondary">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-brand-default hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}
