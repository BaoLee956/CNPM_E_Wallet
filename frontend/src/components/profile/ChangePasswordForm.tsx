// components/profile/ChangePasswordForm.tsx
"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/useToast";

interface ChangePasswordFormProps {
  onSubmit: (data: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export function ChangePasswordForm({
  onSubmit,
  isLoading,
}: ChangePasswordFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ type: "error", message: "New passwords do not match" });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        type: "error",
        message: "Password must be at least 6 characters",
      });
      return;
    }
    try {
      await onSubmit({ oldPassword, newPassword });
      toast({ type: "success", message: "Password changed successfully" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast({
        type: "error",
        message: err instanceof Error ? err.message : "Change failed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Current Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
        placeholder="••••••"
      />
      <Input
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        placeholder="••••••"
        hint="At least 6 characters"
      />
      <Input
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="••••••"
      />
      <Button type="submit" variant="secondary" loading={isLoading} fullWidth>
        Change Password
      </Button>
    </form>
  );
}
