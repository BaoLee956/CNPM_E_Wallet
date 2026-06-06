"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { adminAuthService } from "@/services/admin/authService";
import { useAdminStore } from "@/stores/adminStore";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const { showToast } = useAdminStore();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    if (!newPassword) {
      errs.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (newPassword.length < 6) {
      errs.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (confirmPassword !== newPassword) {
      errs.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    if (newPassword && currentPassword && newPassword === currentPassword) {
      errs.newPassword = "Mật khẩu mới không được trùng mật khẩu cũ";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await adminAuthService.changePassword({ currentPassword, newPassword });
      showToast("Đổi mật khẩu thành công!", "success");
      onClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  const strength = newPassword.length === 0 ? 0
    : newPassword.length < 6 ? 1
    : newPassword.length < 10 ? 2
    : 3;

  const strengthLabel = ["", "Yếu", "Trung bình", "Mạnh"][strength];
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-emerald-500"][strength];

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30">
              <Lock size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Đổi mật khẩu</h2>
              <p className="text-xs text-slate-500">Cập nhật mật khẩu tài khoản admin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Mật khẩu hiện tại</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className={[
                  "w-full h-11 rounded-xl bg-slate-800 border text-sm text-white placeholder-slate-600",
                  "px-4 pr-11 outline-none transition-colors",
                  errors.currentPassword
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-700 focus:border-indigo-500",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle size={12} />{errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                className={[
                  "w-full h-11 rounded-xl bg-slate-800 border text-sm text-white placeholder-slate-600",
                  "px-4 pr-11 outline-none transition-colors",
                  errors.newPassword
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-700 focus:border-indigo-500",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {newPassword.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={[
                        "h-1 flex-1 rounded-full transition-colors duration-300",
                        i <= strength ? strengthColor : "bg-slate-700",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <p className={`text-[10px] font-medium ${strength === 3 ? "text-emerald-500" : strength === 2 ? "text-amber-500" : "text-rose-500"}`}>
                  {strengthLabel}
                </p>
              </div>
            )}
            {errors.newPassword && (
              <p className="text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle size={12} />{errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Xác nhận mật khẩu mới</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className={[
                  "w-full h-11 rounded-xl bg-slate-800 border text-sm text-white placeholder-slate-600",
                  "px-4 pr-11 outline-none transition-colors",
                  errors.confirmPassword
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-700 focus:border-indigo-500",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirmPassword.length > 0 && confirmPassword === newPassword && newPassword.length > 0 && (
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle size={12} />Mật khẩu khớp
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle size={12} />{errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 px-4 py-3">
              <AlertCircle size={14} className="text-rose-500 shrink-0" />
              <p className="text-xs text-rose-400">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-slate-700 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Đổi mật khẩu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
