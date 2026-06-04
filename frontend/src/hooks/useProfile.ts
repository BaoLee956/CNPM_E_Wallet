// hooks/useProfile.ts
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { profileService, UpdateProfileData, ChangePasswordData } from "@/services/profileService";
import { useAuthStore } from "@/stores/authStore";

export function useProfile() {
  const { user, isLoading } = useAuth();
  const updateUser = useAuthStore((s) => s.updateUser);
  const refreshWallet = useAuthStore((s) => s.refreshWallet);

  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      setUpdating(true);
      try {
        const updated = await profileService.updateProfile(data);
        // Sync ngược về global store để mọi component đều thấy data mới
        updateUser(updated as any);
        return updated;
      } finally {
        setUpdating(false);
      }
    },
    [updateUser]
  );

  const changePassword = useCallback(async (data: ChangePasswordData) => {
    setChangingPassword(true);
    try {
      await profileService.changePassword(data);
    } finally {
      setChangingPassword(false);
    }
  }, []);

  return {
    user,
    isLoading,
    updating,
    changingPassword,
    updateProfile,
    changePassword,
    refreshWallet,
  };
}