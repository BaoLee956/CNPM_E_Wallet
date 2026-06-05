"use client";

import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

const styles: Record<ToastType, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-rose-600 text-white",
  info: "bg-indigo-600 text-white",
};

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
};

interface AdminToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export function AdminToast({ message, type = "info", onClose }: AdminToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
      <div
        className={[
          "flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl",
          "animate-in slide-in-from-bottom-4 fade-in duration-300",
          styles[type],
        ].join(" ")}
      >
        <span className="shrink-0">{icons[type]}</span>
        <span className="text-sm font-medium whitespace-nowrap">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
