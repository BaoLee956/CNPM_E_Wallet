// services/authService.ts
import type { User } from "@/models/user";
import type { Wallet } from "@/models/wallet";
import { setCookie, deleteCookie } from "@/utils/cookie";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  wallet: Wallet;
  token: string;
}

type MockUserRecord = {
  user: User;
  wallet: Wallet;
  password: string;
};

const MOCK_USERS_KEY = "mock_users";
const TOKEN_KEY = "ewallet_token";
const USER_KEY = "ewallet_user";
const WALLET_KEY = "ewallet_wallet";

// Helper: load mock users from localStorage
function loadMockUsers(): Record<string, MockUserRecord> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  if (stored) return JSON.parse(stored);

  // Default user - đầy đủ theo model User và Wallet
  const defaultUser: User = {
    id: "1",
    email: "user@example.com",
    phoneNumber: "0912345678",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=1aaba3&color=fff",
    role: "customer",
    isEmailVerified: true,
    isPhoneVerified: false,
    twoFactorEnabled: false,
    twoFactorSecret: undefined,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  };

  const defaultWallet: Wallet = {
    id: "wallet_1",
    userId: "1",
    balance: 1250000,
    currency: "VND",
    accountNumber: "198273645901",
    isActive: true,
    dailyLimit: 10000000,
    monthlyLimit: 100000000,
    currentDailyUsage: 0,
    currentMonthlyUsage: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const initial: Record<string, MockUserRecord> = {
    "user@example.com": {
      user: defaultUser,
      wallet: defaultWallet,
      password: "123456",
    },
  };
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(initial));
  return initial;
}

function saveMockUsers(users: Record<string, MockUserRecord>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

class AuthService {
  private getMockUsers(): Record<string, MockUserRecord> {
    return loadMockUsers();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const users = this.getMockUsers();
    const record = users[credentials.email];
    if (record && record.password === credentials.password) {
      // Cập nhật lastLoginAt
      const updatedUser = {
        ...record.user,
        lastLoginAt: new Date().toISOString(),
      };
      record.user = updatedUser;
      users[credentials.email] = record;
      saveMockUsers(users);

      const response = {
        user: updatedUser,
        wallet: record.wallet,
        token: `mock-jwt-${Date.now()}`,
      };
      this.setSession(response);
      return response;
    }
    throw new Error("Invalid email or password");
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const users = this.getMockUsers();
    if (users[data.email]) {
      throw new Error("Email already exists");
    }

    const now = new Date().toISOString();
    const newUser: User = {
      id: String(Date.now()),
      email: data.email,
      phoneNumber: undefined,
      name: data.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=1aaba3&color=fff`,
      role: "customer",
      isEmailVerified: false,
      isPhoneVerified: false,
      twoFactorEnabled: false,
      twoFactorSecret: undefined,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    const newWallet: Wallet = {
      id: `wallet_${Date.now()}`,
      userId: newUser.id,
      balance: 0,
      currency: "VND",
      accountNumber: Math.floor(Math.random() * 1000000000000).toString().padStart(12, "0"),
      isActive: true,
      dailyLimit: 10000000,
      monthlyLimit: 100000000,
      currentDailyUsage: 0,
      currentMonthlyUsage: 0,
      createdAt: now,
      updatedAt: now,
    };

    const newRecord: MockUserRecord = {
      user: newUser,
      wallet: newWallet,
      password: data.password,
    };

    users[data.email] = newRecord;
    saveMockUsers(users);

    const response = { user: newUser, wallet: newWallet, token: `mock-jwt-${Date.now()}` };
    this.setSession(response);
    return response;
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.clearSession();
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  async getCurrentWallet(): Promise<Wallet | null> {
    if (typeof window === "undefined") return null;
    const walletStr = localStorage.getItem(WALLET_KEY);
    return walletStr ? JSON.parse(walletStr) : null;
  }

  async verifyToken(): Promise<boolean> {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    localStorage.setItem(WALLET_KEY, JSON.stringify(response.wallet));
    setCookie('auth_token', response.token);
    setCookie('user_id', response.user.id);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(WALLET_KEY);
    deleteCookie('auth_token');
    deleteCookie('user_id');
  }
}

export const authService = new AuthService();