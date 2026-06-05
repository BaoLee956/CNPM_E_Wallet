// components/ui/Toast.tsx
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const toastStyles = {
  success: "bg-success text-white",
  error: "bg-danger text-white",
  warning: "bg-warning text-white",
  info: "bg-info text-white",
};

const toastIcons = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[
            "flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg",
            "animate-in slide-in-from-bottom-2 fade-in duration-200",
            toastStyles[toast.type],
          ].join(" ")}
        >
          {toastIcons[toast.type]}
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100 transition"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
