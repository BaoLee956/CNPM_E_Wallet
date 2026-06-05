"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, ChevronRight, Shield } from "lucide-react";
import { adminAuthService } from "@/services/admin/authService";
import { useAdminStore } from "@/stores/adminStore";

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`}
      style={{ animationDuration: `${6 + delay}s`, animationDelay: `${delay}s` }}
    />
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useAdminStore();

  useEffect(() => {
    // Clear any existing session
    localStorage.removeItem("auth-storage");
    sessionStorage.removeItem("admin_session");
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<"phone" | "password" | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    inputRef.current?.focus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await adminAuthService.login({ phoneNumber: phoneNumber.trim(), password });

      if (res.access_token) {
        // Save token
        localStorage.setItem("ewallet_token", res.access_token);

        // Try to get profile
        try {
          const me = await adminAuthService.getMe();
          adminAuthService.saveSession({
            id: me.id,
            name: me.name ?? "Admin",
            email: me.email ?? "",
            phoneNumber: me.phoneNumber ?? phoneNumber,
            role: me.role,
            access_token: res.access_token,
          });
        } catch {
          adminAuthService.saveSession({
            id: "",
            name: "Admin",
            email: "",
            phoneNumber,
            role: res.role,
            access_token: res.access_token,
          });
        }

        showToast("Login successful!", "success");
        router.push("/dashboard");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        "Invalid credentials. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isReady = mounted && phoneNumber.trim() && password.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden relative">

      <FloatingOrb className="w-[700px] h-[700px] bg-indigo-600/20 -top-64 -left-64" delay={0} />
      <FloatingOrb className="w-[500px] h-[500px] bg-purple-600/15 top-1/2 -right-40" delay={2} />
      <FloatingOrb className="w-[400px] h-[400px] bg-cyan-600/10 bottom-0 left-1/3" delay={4} />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`relative w-full max-w-md transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl" />
            <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 shadow-2xl shadow-indigo-500/40">
              <ShieldCheck size={30} className="text-white" />
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            E-Wallet Management System
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Online
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-[10px] font-semibold text-slate-400">
              <Lock size={9} />
              SSL Secured
            </span>
          </div>
        </div>

        {/* Main card */}
        <div className="relative">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 opacity-60 blur-sm" />
          <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl shadow-black/40">

            {/* Tabs */}
            <div className="flex items-center justify-center gap-1 mb-8 p-1 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30">
                <Shield size={12} className="text-indigo-400" />
                <span className="text-xs font-bold text-indigo-300">Admin</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Phone field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "phone" ? "text-indigo-400" : "text-slate-600"}`}>
                    <Mail size={15} />
                  </div>
                  <input
                    ref={inputRef}
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="0867674359"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all duration-200 ${
                      focusedField === "phone"
                        ? "border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10"
                        : "border-slate-700/70"
                    }`}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === "password" ? "text-indigo-400" : "text-slate-600"}`}>
                    <Lock size={15} />
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl bg-slate-800/60 border text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all duration-200 ${
                      focusedField === "password"
                        ? "border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10"
                        : "border-slate-700/70"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3">
                  <div className="shrink-0 h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                  <p className="text-xs text-rose-400 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !isReady}
                className={`relative w-full h-12 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden ${
                  isReady && !loading
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99]"
                    : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                }`}
              >
                {isReady && !loading && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ChevronRight size={15} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <a
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            <ChevronRight size={12} className="rotate-180" />
            Back to user portal
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
