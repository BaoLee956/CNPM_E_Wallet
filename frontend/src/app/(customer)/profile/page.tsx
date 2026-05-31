// app/customer/profile/page.tsx
"use client";

import { CustomerPage } from "@/components/ui/CustomerLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
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
  const { user, updating, changingPassword, updateProfile, changePassword } =
    useProfile();
  const { wallet, isLoading: authLoading } = useAuth();

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

      {/* Edit Profile Card */}
      <Card title="Profile Information">
        <ProfileForm
          initialName={user?.name || ""}
          initialEmail={user?.email || ""}
          initialPhone={user?.phone || ""}
          onSubmit={updateProfile}
          isLoading={updating}
        />
      </Card>

      {/* Change Password Card */}
      <Card title="Change Password">
        <ChangePasswordForm
          onSubmit={changePassword}
          isLoading={changingPassword}
        />
      </Card>
    </CustomerPage>
  );
}
