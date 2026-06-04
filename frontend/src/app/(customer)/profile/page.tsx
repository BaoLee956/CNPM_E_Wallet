// app/customer/profile/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CustomerPage } from "@/components/ui/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ArrowUpRight, ArrowDownLeft, Landmark, Bell, Settings } from "lucide-react";

// Simple Avatar using initial letters
function Avatar({ name }: { name: string }) {
  const initial = name?.charAt(0)?.toUpperCase() || "U";
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-subtle text-brand-default text-xl font-semibold">
      {initial}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, updating, changingPassword, updateProfile, changePassword } =
    useProfile();
  const { wallet, isLoading: authLoading, logout } = useAuth();
  const { showToast } = useToast();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  if (authLoading) {
    return (
      <CustomerPage>
        <div className="space-y-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-surface-sunken" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-surface-sunken rounded" />
              <div className="h-4 w-48 bg-surface-sunken rounded" />
            </div>
          </div>
          <Card>
            <div className="space-y-3">
              <div className="h-4 w-24 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
            </div>
          </Card>
          <Card>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
              <div className="h-10 bg-surface-sunken rounded" />
            </div>
          </Card>
        </div>
      </CustomerPage>
    );
  }

  return (
    <CustomerPage>
      {/* Profile header with avatar */}
      <div className="flex items-center gap-4">
        <Avatar name={user?.name || ""} />
        <div>
          <h2 className="text-lg font-semibold text-primary">{user?.name}</h2>
          <p className="text-sm text-secondary">{user?.email}</p>
          <Badge variant="outline" size="sm" className="mt-1">
            Member since {new Date().getFullYear()}
          </Badge>
        </div>
      </div>

      {/* Wallet info card */}
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-secondary">
              Account Number
            </p>
            <p className="text-sm font-mono mt-0.5">
              {wallet?.accountNumber || "N/A"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase text-secondary">
              Balance
            </p>
            <p className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: wallet?.currency || "VND",
              }).format(wallet?.balance || 0)}
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/topup"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-sunken hover:bg-surface-hover transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <ArrowDownLeft size={20} />
            </div>
            <span className="text-sm font-medium text-primary">Nạp tiền</span>
          </Link>
          <Link
            href="/withdraw"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-sunken hover:bg-surface-hover transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-medium text-primary">Rút tiền</span>
          </Link>
          <Link
            href="/banks"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-sunken hover:bg-surface-hover transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center text-info">
              <Landmark size={20} />
            </div>
            <span className="text-sm font-medium text-primary">Ngân hàng</span>
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-sunken hover:bg-surface-hover transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <Bell size={20} />
            </div>
            <span className="text-sm font-medium text-primary">Thông báo</span>
          </Link>
        </div>
      </Card>

      {/* Edit Profile Card */}
      <Card title="Profile Information">
        <ProfileForm
          initialName={user?.name || ""}
          initialEmail={user?.email || ""}
          initialPhone={user?.phoneNumber || ""}
          onSubmit={async (data) => {
            try {
              await updateProfile(data);
              showToast("Cập nhật thông tin thành công", "success");
            } catch (error) {
              showToast(
                error instanceof Error ? error.message : "Cập nhật thất bại",
                "error",
              );
            }
          }}
          isLoading={updating}
        />
      </Card>

      {/* Change Password Section - Toggleable */}
      <div className="space-y-4">
        {!showChangePassword ? (
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Change Password
          </button>
        ) : (
          <Card title="Change Password">
            <ChangePasswordForm
              onSubmit={changePassword}
              isLoading={changingPassword}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowChangePassword(false)}
                className="text-sm text-secondary hover:text-primary"
              >
                Cancel
              </button>
            </div>
          </Card>
        )}
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button
          onClick={handleLogout}
          className="w-full inline-flex justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </CustomerPage>
  );
}
