// models/settings.ts
import type { ID, Timestamps } from "./common";

export interface SystemSetting extends Timestamps {
  id: ID;
  key: string;
  value: any; // JSON value
  description?: string;
  isPublic: boolean; // client có thể đọc
}