// hooks/useProfile.ts
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { profileService, UpdateProfileData, ChangePasswordData } from "@/services/profileService";

export function useProfile() {
  const { user, updateUser, refreshWallet } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      if (!user?.id) return;
      setUpdating(true);
      setError(null);
      try {
        const updated = await profileService.updateProfile(user.id, data);
        updateUser(updated); 
        await refreshWallet();
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Update failed");
        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [user, updateUser, refreshWallet]
  );

  const changePassword = useCallback(
    async (data: ChangePasswordData) => {
      if (!user?.id) return;
      setChangingPassword(true);
      setError(null);
      try {
        await profileService.changePassword(user.id, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Password change failed");
        throw err;
      } finally {
        setChangingPassword(false);
      }
    },
    [user]
  );

  return {
    user, 
    updating,
    changingPassword,
    error,
    updateProfile,
    changePassword,
  };
}