"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, ArrowLeftRight, BarChart3, ChevronLeft, Bell, LogOut, Settings } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import { AdminToast } from "@/components/ui/AdminToast";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { adminAuthService } from "@/services/admin/authService";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { toast, clearToast, adminName, adminEmail, notifications } = useAdminStore();

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (pathname.includes("/login")) return;
    const session = adminAuthService.getSession();
    const token = localStorage.getItem("ewallet_token");
    if (!session && !token) {
      router.replace("/login");
    }
  }, [pathname, router]);

  // Dark mode enforcement
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleLogout = () => {
    adminAuthService.clearSession();
    router.push("/login");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside
        className={[
          "flex flex-col shrink-0 transition-all duration-200 ease-in-out",
          "bg-slate-900 border-r border-slate-800",
          collapsed ? "w-16" : "w-60",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-800 px-3 gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="4" width="14" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="white" strokeWidth="1.5"/>
              <circle cx="11" cy="9" r="1" fill="white"/>
            </svg>
          </div>
          {!collapsed && (
            <div>
              <span className="font-bold text-sm text-white tracking-tight">E-Wallet</span>
              <p className="text-[10px] text-slate-500 font-medium">Admin Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 h-11",
                  "text-sm font-medium transition-all duration-150",
                  "group relative",
                  active
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent",
                ].join(" ")}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 z-50 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity shadow-xl border border-slate-700">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="shrink-0 border-t border-slate-800 p-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 h-9 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft
              size={14}
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>

          {/* Admin info */}
          <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl mt-1 ${collapsed ? "justify-center" : ""}`}>
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {adminName.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{adminName}</p>
                <p className="text-[10px] text-slate-500 truncate">{adminEmail}</p>
              </div>
            )}
          </div>

          {/* Settings — change password */}
          <button
            type="button"
            title={collapsed ? "Đổi mật khẩu" : undefined}
            onClick={() => setShowPasswordModal(true)}
            className={[
              "flex w-full items-center gap-2.5 rounded-xl px-3 h-9 text-xs text-slate-500",
              "hover:bg-slate-800 hover:text-slate-300 transition-colors",
              collapsed ? "justify-center" : "",
            ].join(" ")}
          >
            <Settings size={14} className="shrink-0" />
            {!collapsed && <span>Đổi mật khẩu</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm px-6 gap-4">
          <div />

          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="h-6 w-px bg-slate-700 mx-1" />
            <button
              onClick={handleLogout}
              className="flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950">{children}</main>
      </div>

      {/* Toast */}
      {toast && (
        <AdminToast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}
