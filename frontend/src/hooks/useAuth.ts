// hooks/useAuth.ts
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

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
    refreshWallet,
  } = useAuthStore();

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
    redirectToDashboard,
    redirectToLogin,
    updateWallet,
    updateUser,
    refreshWallet,
  };
}
