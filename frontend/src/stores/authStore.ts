// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authService,
  type LoginCredentials,
  type RegisterData,
  type AuthResponse,
} from "@/services/authService";
import type { User } from "@/models/user";
import type { Wallet } from "@/models/wallet";

interface AuthState {
  user: User | null;
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  updateWallet: (wallet: Wallet) => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, wallet } = await authService.login(credentials);
          set({ user, wallet, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user, wallet } = await authService.register(data);
          set({ user, wallet, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
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
      },

      checkAuth: async () => {
        set({ isLoading: true });
        const isValid = await authService.verifyToken();
        if (isValid) {
          const user = await authService.getCurrentUser();
          const wallet = await authService.getCurrentWallet();
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

  clearError: () => set({ error: null }),
  updateWallet: (wallet) => set({ wallet }),
  updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        wallet: state.wallet,
      }),
    }
  )
);