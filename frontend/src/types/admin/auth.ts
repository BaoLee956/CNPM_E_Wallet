// ============================================================
// Admin Auth Types — BE response shapes
// ============================================================

export interface AdminLoginRequest {
  phoneNumber: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  access_token: string;
  role: string;
}

export interface AdminMeResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  wallets?: {
    id: string;
    accountNumber: string;
    balance: number;
    currency: string;
    isActive: boolean;
  }[];
}

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  access_token: string;
}
