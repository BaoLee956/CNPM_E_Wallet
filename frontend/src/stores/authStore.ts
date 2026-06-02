// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, type LoginCredentials, type RegisterData } from "@/services/authService";
import type { User } from "@/models/user";
import type { Wallet } from "@/models/wallet";
import { useToast } from "@/hooks/useToast"; 

interface AuthState {
  user: User | null;
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  updateWallet: (wallet: Wallet) => void;
  updateUser: (user: User) => void;
  setHasHydrated: (val: boolean) => void;
  refreshWallet: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      wallet: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      _hasHydrated: false,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, wallet } = await authService.login(credentials);
          set({ user, wallet, isAuthenticated: true, isLoading: false });
          useToast.getState().showToast("Đăng nhập thành công!", "success");
        } catch (error: any) {
          const message = error.message;
          set({ error: message, isLoading: false });
          useToast.getState().showToast(message, "error");
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user, wallet } = await authService.register(data);
          set({ user, wallet, isAuthenticated: true, isLoading: false });
          useToast.getState().showToast("Đăng ký thành công!", "success");
        } catch (error: any) {
          const message = error.message;
          set({ error: message, isLoading: false });
          useToast.getState().showToast(message, "error");
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        await authService.logout();
        set({
          user: null,
          wallet: null,
          isAuthenticated: false,
          isLoading: false,
        });
        useToast.getState().showToast("Đã đăng xuất", "info");
      },

      checkAuth: async () => {
        set({ isLoading: true });
        const isValid = await authService.verifyToken();
        if (isValid) {
          const [user, wallet] = await Promise.all([
            authService.getCurrentUser(),
            authService.getCurrentWallet(),
          ]);
          set({
            user,
            wallet,
            isAuthenticated: !!user,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            wallet: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      refreshWallet: async () => {
        const wallet = await walletService.getWallet();
        if (wallet) set({ wallet });
      },

      clearError: () => set({ error: null }),
      updateWallet: (wallet) => set({ wallet }),
      updateUser: (user) => set({ user }),
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        wallet: state.wallet,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);