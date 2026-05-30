"use client";
import { useState } from "react";

/* ============================================================
   AdminLayout — sidebar + topbar shell for admin pages
   ============================================================ */

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  currentPath?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export function AdminLayout({
  children,
  navItems,
  currentPath = "",
  userName = "Admin",
  userRole = "Administrator",
  onLogout,
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg">
      {/* Sidebar */}
      <aside
        className={[
          "flex flex-col shrink-0 transition-all duration-200 ease-in-out",
          "border-r border-subtle bg-surface-base",
          collapsed ? "w-14" : "w-56",
        ].join(" ")}
      >
        {/* Logo area */}
        <div className="flex h-14 shrink-0 items-center border-b border-subtle px-3 gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-default">
            <WalletIcon className="text-white" size={15} />
          </div>
          {!collapsed && (
            <span className="font-bold text-sm tracking-tight text-primary truncate">
              E-Wallet Admin
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const active =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  "flex items-center gap-2.5 rounded-lg px-2 h-9",
                  "text-sm font-medium transition-colors duration-100",
                  "group relative",
                  active
                    ? "bg-brand-subtle text-brand-text"
                    : "text-secondary hover:bg-surface-sunken hover:text-primary",
                ].join(" ")}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge != null && (
                      <span className="ml-auto text-2xs font-semibold bg-brand-default text-white rounded-full px-1.5 py-0.5 min-w-4.5 text-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && (
                  <span className="pointer-events-none absolute left-12 z-50 rounded-md bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                    {item.label}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="shrink-0 border-t border-subtle p-2 space-y-1">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2 h-8 text-xs text-tertiary hover:text-secondary hover:bg-surface-sunken transition-colors"
          >
            <span
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            >
              <ChevronLeftIcon size={14} />
            </span>
            {!collapsed && <span>Collapse</span>}
          </button>

          <div
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${collapsed ? "justify-center" : ""}`}
          >
            <div className="h-7 w-7 shrink-0 rounded-full bg-brand-default flex items-center justify-center text-white text-xs font-bold uppercase">
              {userName[0]}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary truncate">
                  {userName}
                </p>
                <p className="text-2xs text-tertiary truncate">{userRole}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-subtle bg-surface-base px-6 gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs w-full hidden sm:block">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-tertiary">
                <SearchIcon size={14} />
              </span>
              <input
                type="search"
                placeholder="Search..."
                className="input-base pl-8 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:bg-surface-sunken transition-colors">
              <BellIcon size={16} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-secondary hover:bg-surface-sunken hover:text-danger transition-colors"
              >
                <LogoutIcon size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

/* Page wrapper */
export function AdminPage({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-6 space-y-6 max-w-7xl mx-auto ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h1 className="text-xl font-bold text-primary">{title}</h1>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-secondary">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* Icons (giữ nguyên) */
function WalletIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <rect
        x="1"
        y="4"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 4V3a2 2 0 0 1 4 0v1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="11" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}
function ChevronLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M9 3L5 7l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BellIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2a5 5 0 0 0-5 5v2l-1 2h12l-1-2V7a5 5 0 0 0-5-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 13a1.5 1.5 0 0 0 3 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LogoutIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 5l3 3-3 3M13 8H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
