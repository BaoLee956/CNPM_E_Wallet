"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, AlertTriangle, Clock, ShieldAlert, X, CheckCircle2 } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";

const typeConfig = {
  warning: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    icon: AlertTriangle,
  },
  error: {
    bg: "bg-rose-500/20",
    text: "text-rose-400",
    icon: ShieldAlert,
  },
  info: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    icon: Clock,
  },
  success: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    icon: CheckCircle2,
  },
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    markAllNotificationsRead,
    dismissNotification,
    clearNotifications,
  } = useAdminStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-slate-900" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="h-5 min-w-5 flex items-center justify-center px-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-bold text-rose-400">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
            {notifications.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-500">
                No notifications
              </div>
            ) : (
              notifications.map((n) => {
                const cfg = typeConfig[n.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    className={[
                      "flex items-start gap-3 px-4 py-3 transition-colors",
                      n.read ? "opacity-50" : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "shrink-0 flex h-8 w-8 items-center justify-center rounded-xl mt-0.5",
                        cfg.bg,
                      ].join(" ")}
                    >
                      <Icon size={14} className={cfg.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-200 leading-snug">
                          {n.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(n.id);
                          }}
                          className="shrink-0 flex h-5 w-5 items-center justify-center rounded text-slate-600 hover:text-slate-400 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-800">
              <button
                onClick={clearNotifications}
                className="w-full text-center text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
