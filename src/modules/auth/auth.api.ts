import { apiClient } from "../../shared/api/apiClient";
import type { User } from "./auth.store";

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export async function loginApi(payload: { email: string; password: string }) {
  const res = await apiClient.post<AuthResponse>("/api/auth/login", payload);
  return res.data;
}

export async function registerApi(payload: { name: string; email: string; password: string }) {
  const res = await apiClient.post<AuthResponse>("/api/auth/register", payload);
  return res.data;
}

export async function meApi() {
  const res = await apiClient.get<{ user: User }>("/api/auth/me");
  return res.data;
}
