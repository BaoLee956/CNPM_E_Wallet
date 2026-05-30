"use client";

/* ============================================================
   CustomerLayout — mobile-first shell with bottom navigation
   ============================================================ */

interface CustomerNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface CustomerLayoutProps {
  children: React.ReactNode;
  navItems: CustomerNavItem[];
  currentPath?: string;
  headerTitle?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
}

export function CustomerLayout({
  children,
  navItems,
  currentPath = "",
  headerTitle,
  headerLeft,
  headerRight,
  noHeader = false,
  noNav = false,
}: CustomerLayoutProps) {
  return (
    <div className="flex flex-col h-dvh bg-surface-bg max-w-md mx-auto relative">
      {!noHeader && (
        <header className="flex h-14 shrink-0 items-center justify-between px-4 bg-surface-base border-b border-subtle z-10">
          <div className="flex items-center gap-2 w-10">{headerLeft}</div>
          {headerTitle && (
            <h1 className="text-sm font-semibold text-primary absolute left-1/2 -translate-x-1/2">
              {headerTitle}
            </h1>
          )}
          <div className="flex items-center gap-1 ml-auto">{headerRight}</div>
        </header>
      )}

      <main
        className={`flex-1 overflow-y-auto ${noNav ? "" : "pb-16"}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </main>

      {!noNav && (
        <nav className="absolute bottom-0 left-0 right-0 flex h-16 items-stretch bg-surface-base border-t border-subtle z-10">
          {navItems.map((item) => {
            const active =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "flex flex-1 flex-col items-center justify-center gap-0.5",
                  "text-2xs font-medium transition-colors duration-100",
                  active
                    ? "text-brand-default"
                    : "text-tertiary hover:text-secondary",
                ].join(" ")}
              >
                <span className="h-6 flex items-center">
                  {active && item.activeIcon ? item.activeIcon : item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}

/* ============================================================
   CustomerPage — consistent section padding for customer views
   ============================================================ */

export function CustomerPage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-4 py-4 space-y-4 ${className}`}>{children}</div>;
}

/* ============================================================
   WalletCard — the big balance card shown on home
   ============================================================ */

interface WalletCardProps {
  balance: string;
  accountName: string;
  accountNumber?: string;
  masked?: boolean;
  onToggleMask?: () => void;
  className?: string;
}

export function WalletCard({
  balance,
  accountName,
  accountNumber,
  masked = false,
  onToggleMask,
  className = "",
}: WalletCardProps) {
  return (
    <div
      className={[
        "relative rounded-2xl p-5 overflow-hidden",
        "bg-linear-to-br from-brand-500 to-brand-800",
        "text-white shadow-lg",
        className,
      ].join(" ")}
    >
      {/* Decorative circles */}
      <span className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
      <span className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative">
        <p className="text-xs font-medium text-white/70">Total Balance</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-3xl font-bold font-mono tracking-tight">
            {masked ? "••••••••" : balance}
          </p>
          {onToggleMask && (
            <button
              type="button"
              onClick={onToggleMask}
              className="text-white/70 hover:text-white transition-colors"
              aria-label={masked ? "Show balance" : "Hide balance"}
            >
              {masked ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xs text-white/60 uppercase tracking-wide">
              Account
            </p>
            <p className="text-sm font-semibold mt-0.5">{accountName}</p>
          </div>
          {accountNumber && (
            <div className="text-right">
              <p className="text-2xs text-white/60 uppercase tracking-wide">
                Number
              </p>
              <p className="text-sm font-mono mt-0.5">{accountNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Icons ---- */
function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <ellipse
        cx="8"
        cy="8"
        rx="6"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}
function EyeOffIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l12 12M6.5 6.5A2 2 0 0 0 9.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 4.5C2.8 5.4 2 6.7 2 8c0 2.2 2.7 4 6 4 1.1 0 2.1-.2 3-.6M12.5 11.5C13.5 10.6 14 9.3 14 8c0-2.2-2.7-4-6-4-.6 0-1.2.1-1.8.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
