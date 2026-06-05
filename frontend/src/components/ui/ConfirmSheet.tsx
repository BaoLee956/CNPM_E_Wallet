/**
 * frontend/src/components/ui/ConfirmSheet.tsx
 *
 * Bottom sheet dùng chung cho tất cả confirmation flows.
 * Dùng CSS transition thuần, không cần thư viện thêm.
 */

"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ConfirmSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function ConfirmSheet({
  open,
  onClose,
  children,
  title,
}: ConfirmSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Đóng khi bấm ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll khi sheet mở
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-out max-h-[90dvh] flex flex-col ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxWidth: "480px", margin: "0 auto" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-surface-sunken" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-subtle shrink-0">
            <h3 className="text-base font-bold text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-sunken text-secondary transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Content — scrollable */}
        <div className="overflow-y-auto overscroll-contain flex-1">
          {children}
        </div>
      </div>
    </>
  );
}
