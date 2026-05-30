// models/session.ts
import type { ID, Timestamps } from "./common";

export interface UserSession extends Timestamps {
  id: ID;
  userId: ID;
  token: string; // refresh token hoặc session id
  deviceInfo?: string;
  ipAddress?: string;
  expiresAt: string;
  isRevoked: boolean;
  revokedAt?: string;
}