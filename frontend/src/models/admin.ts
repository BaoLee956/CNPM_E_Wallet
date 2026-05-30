// models/admin.ts
import type { ID, Timestamps, SoftDelete } from "./common";

export enum AdminRole {
  SUPER_ADMIN = "super_admin",
  OPERATOR = "operator",
  SUPPORT = "support",
  FINANCE = "finance",
}

export interface Admin extends Timestamps, SoftDelete {
  id: ID;
  userId: ID; // liên kết với bảng User (role=admin)
  role: AdminRole;
  permissions: string[]; // array of permission keys
}