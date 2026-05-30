// app/auth/register/page.tsx
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - E-Wallet",
  description: "Register for a new e-wallet account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
