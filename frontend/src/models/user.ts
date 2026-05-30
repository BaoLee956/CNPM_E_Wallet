// models/user.ts
import type { ID, UserRole, Timestamps, SoftDelete } from "./common";

export interface User extends Timestamps, SoftDelete {
  id: ID;
  email: string;
  phoneNumber?: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: string;
  // optional 2FA fields
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
}