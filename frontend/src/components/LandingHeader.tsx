"use client";

export function LandingHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-10 flex items-center justify-between px-6 py-4 bg-surface-bg/80 backdrop-blur-sm border-b border-subtle">
      <span className="text-sm font-bold text-primary">E-Wallet</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            localStorage.removeItem("auth-storage");
            sessionStorage.removeItem("admin_session");
            window.location.href = "/";
          }}
          className="text-xs text-secondary hover:text-danger transition-colors"
        >
          Sign Out
        </button>
        <a
          href="/auth/login"
          className="text-xs font-semibold text-brand-default hover:underline"
        >
          Sign In
        </a>
      </div>
    </header>
  );
}
