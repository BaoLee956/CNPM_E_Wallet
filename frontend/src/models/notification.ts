// models/notification.ts
import type { ID, NotificationType, Timestamps } from "./common";

export interface Notification extends Timestamps {
  id: ID;
  userId: ID;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  readAt?: string;
  link?: string; // navigation link
  metadata?: Record<string, any>;
}