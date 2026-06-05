// components/profile/ProfileForm.tsx
"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  onSubmit: (data: { name: string }) => Promise<void>;
  isLoading: boolean;
}

export function ProfileForm({
  initialName,
  initialEmail,
  initialPhone,
  onSubmit,
  isLoading,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);

  const isDirty = name.trim() !== initialName.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;
    await onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Nguyễn Văn A"
      />

      <Input
        label="Email"
        type="email"
        value={initialEmail}
        readOnly
        disabled
        className="cursor-not-allowed opacity-60"
      />

      <Input
        label="Số điện thoại"
        type="tel"
        value={initialPhone}
        readOnly
        disabled
        className="cursor-not-allowed opacity-60"
      />

      <Button
        type="submit"
        loading={isLoading}
        fullWidth
        disabled={!isDirty || isLoading}
      >
        Lưu thay đổi
      </Button>
    </form>
  );
}
