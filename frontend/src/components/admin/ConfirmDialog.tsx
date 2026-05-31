"use client";

import { useEffect } from "react";
import { AlertTriangle, ShieldOff, ShieldCheck, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = variant === "danger";
  const confirmColor = isDanger
    ? "bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30"
    : "bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30";
  const iconBg = isDanger ? "bg-rose-500/20" : "bg-amber-500/20";
  const iconColor = isDanger ? "text-rose-400" : "text-amber-400";
  const Icon = isDanger ? ShieldOff : ShieldCheck;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm animate-in zoom-in-95 fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
              <h2 className="text-sm font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onCancel}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 pb-5">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 h-10 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 ${confirmColor}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Processing...
                </span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
