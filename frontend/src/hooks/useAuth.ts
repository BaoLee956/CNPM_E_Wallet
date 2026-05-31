// hooks/useAuth.ts
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { walletService } from "@/services/walletService";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    wallet,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
    updateWallet,
    updateUser,
  } = useAuthStore();

  const refreshWallet = async () => {
    const freshWallet = await walletService.getWallet();
    if (freshWallet) updateWallet(freshWallet);
    return freshWallet;
  };

  const redirectToDashboard = () => router.push("/home");
  const redirectToLogin = () => router.push("/auth/login");

  return {
    user,
    wallet,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
    refreshWallet,
    redirectToDashboard,
    redirectToLogin,
    updateWallet,
    updateUser,
  };
}