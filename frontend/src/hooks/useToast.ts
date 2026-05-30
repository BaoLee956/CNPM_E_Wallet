// hooks/useToast.ts
import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type = "info", duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));