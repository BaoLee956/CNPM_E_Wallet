// app/page.tsx
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-surface-bg">
      {/* Fixed header */}
      <LandingHeader />
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-brand-default/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-brand-default/5 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-[85dvh] flex-col items-center justify-center px-4 text-center">
        <div className="relative mx-auto max-w-3xl">
          {/* Badge with glow */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-default/20 bg-brand-subtle/80 px-4 py-1.5 text-xs font-semibold text-brand-default shadow-lg shadow-brand-default/10 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              Secure & Instant
            </span>
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-in-up text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Your Digital Wallet,
            <span className="relative mt-2 block bg-linear-to-r from-brand-default via-brand-500 to-brand-900 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
            Send, receive, and manage your money instantly. Zero fees,
            bank-level security, and a seamless experience designed for you.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/login"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-brand-default px-6 py-3 text-sm font-semibold shadow-lg shadow-brand-default/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-default/40"
            >
              <span className="relative z-10 flex items-center gap-2 text-white">
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
              <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl border border-default bg-surface-base px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:border-brand-default/40 hover:bg-surface-sunken hover:shadow-md"
            >
              Create Account
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-tertiary">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-500" />
              Bank-Grade Security
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              99.99% Uptime
            </span>
            <a
              href="/login"
              className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Shield size={14} />
              Admin Portal
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-default">
            <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-tertiary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-16">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-surface-base" />
      </div>

      {/* Features Section */}
      <section className="bg-surface-base py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Why choose us?
            </h2>
            <p className="mt-3 text-secondary">
              Simple, fast, and secure transactions — every time
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Instant Transfer",
                desc: "Send money to any bank in seconds, not days. Real-time processing 24/7.",
                gradient: "from-amber-500/20 to-orange-500/20",
                iconColor: "text-amber-500",
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                desc: "Enterprise encryption and multi-layer protection keep your funds safe.",
                gradient: "from-emerald-500/20 to-teal-500/20",
                iconColor: "text-emerald-500",
              },
              {
                icon: Users,
                title: "Loved by Millions",
                desc: "Join millions of satisfied users who trust us with their daily finances.",
                gradient: "from-blue-500/20 to-indigo-500/20",
                iconColor: "text-blue-500",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group relative overflow-hidden rounded-2xl border border-subtle bg-surface-base p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-default/5"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-sunken shadow-inner transition-colors group-hover:bg-surface-base">
                    <feat.icon className={`h-7 w-7 ${feat.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-primary">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Social Proof Section */}
      <section className="border-t border-subtle bg-surface-sunken/50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "10M+", label: "Active Users" },
              { value: "$5B+", label: "Processed Monthly" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="border-t border-subtle bg-surface-base py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-primary">
            Ready to get started?
          </h2>
          <p className="mt-2 text-secondary">
            Join millions of users who trust us with their money.
          </p>
          <Link
            href="/auth/register"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-default px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-default/25 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand-default/35 hover:scale-[1.02]"
          >
            Create Free Account <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
