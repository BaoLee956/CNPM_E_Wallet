// components/profile/ProfileForm.tsx
"use client";

import { useState } from "react";
import { Button, Input, Card } from "@/components/ui";
import { useToast } from "@/hooks/useToast";

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
  }) => Promise<void>;
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
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ name, email, phone });
      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Update failed",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Your full name"
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
      />
      <Input
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+84 XXX XXX XXX"
      />
      <Button type="submit" loading={isLoading} fullWidth>
        Save Changes
      </Button>
    </form>
  );
}
