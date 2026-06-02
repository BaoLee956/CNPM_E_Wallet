// services/profileService.ts
import http from "@/lib/http";
import { User } from "@/models/user";

export interface UpdateProfileData {
  name: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const profileService = {
  async getProfile(): Promise<User> {
    const res = await http.get("/api/v1/customer/profile");
    return res.data.data;
  },

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const res = await http.put("/api/v1/customer/profile", data);
    return res.data.data;
  },

  async changePassword(data: ChangePasswordData): Promise<void> {
    await http.put("/api/v1/customer/password", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  },
};