// services/profileService.ts
import { User } from "@/models/user";

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const profileService = {
  async getProfile(userId: string): Promise<User> {
    await delay(800);
    // In a real app, fetch from API
    // For now, we'll rely on the auth store, but this simulates an API call
    const stored = localStorage.getItem(`user_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
    throw new Error("User not found");
  },

  async updateProfile(userId: string, data: UpdateProfileData): Promise<User> {
    await delay(600);
    // Get current user from localStorage (mock)
    const stored = localStorage.getItem(`user_${userId}`);
    if (!stored) throw new Error("User not found");

    const currentUser: User = JSON.parse(stored);
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));
    return updatedUser;
  },

  async changePassword(userId: string, data: ChangePasswordData): Promise<void> {
    await delay(600);
    // In mock, just validate that old password matches a stored hash
    // For demo, we store a dummy password hash in localStorage
    const storedHash = localStorage.getItem(`password_${userId}`);
    // Simple mock: if no stored hash, assume "oldPassword" is "current123"
    const isValid = storedHash
      ? storedHash === btoa(data.oldPassword)
      : data.oldPassword === "current123";

    if (!isValid) {
      throw new Error("Current password is incorrect");
    }
    // Save new password hash
    localStorage.setItem(`password_${userId}`, btoa(data.newPassword));
  },
};