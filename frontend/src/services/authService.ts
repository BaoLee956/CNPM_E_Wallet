import http from '@/lib/http';
import { setToken, removeToken, getToken } from '@/utils/auth-token';
import type { User } from '@/models/user';
import type { Wallet } from '@/models/wallet';

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  wallet: Wallet;
  access_token: string;
  role: string;
}

interface LoginApiResponse {
  message: string;
  access_token: string;
  role: string;
}

interface RegisterApiResponse {
  message: string;
  user: {
    id: string;
    phoneNumber: string;
    name: string;
    role: string;
  };
  wallet: {
    id: string;
    accountNumber: string;
    balance: number;
  };
}

interface MeApiResponse {
  message: string;
  data: User & { wallets: Wallet[] };
}

interface WalletApiResponse {
  message: string;
  data: Wallet;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await http.post<LoginApiResponse>('/api/v1/auth/login', {
        phoneNumber: credentials.phoneNumber,
        password: credentials.password,
      });
      setToken(data.access_token);

      const user = await this.getCurrentUser();
      const wallet = await this.getCurrentWallet();
      if (!user || !wallet) throw new Error('Failed to fetch user data');

      return {
        user,
        wallet,
        access_token: data.access_token,
        role: data.role,
      };
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      await http.post<RegisterApiResponse>('/api/v1/auth/register', {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      });
      // Automatically login after registration
      const loginRes = await this.login({
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
      return loginRes;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async logout(): Promise<void> {
    removeToken();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await http.get<MeApiResponse>('/api/v1/auth/me');
      return data.data;
    } catch {
      return null;
    }
  }

  async getCurrentWallet(): Promise<Wallet | null> {
    try {
      const { data } = await http.get<WalletApiResponse>('/api/v1/wallets/me');
      return data.data;
    } catch {
      return null;
    }
  }

  async verifyToken(): Promise<boolean> {
    const token = getToken();   
    if (!token) return false;
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  private normalizeError(error: any): Error {
    const message = error.response?.data?.message;
    if (typeof message === 'string') return new Error(message);
    if (Array.isArray(message)) return new Error(message.join(', '));
    return new Error(error.message || 'Đã xảy ra lỗi, vui lòng thử lại');
  }
}

export const authService = new AuthService();

// No-op for backward compatibility
export const seedDefaultUser = () => {};