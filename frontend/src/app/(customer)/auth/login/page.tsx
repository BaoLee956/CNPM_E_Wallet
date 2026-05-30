// app/auth/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - E-Wallet",
  description: "Access your e-wallet account",
};

export default function LoginPage() {
  return <LoginForm />;
}
