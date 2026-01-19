import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;

  // After login/register
  setAuth: (payload: { user: User; accessToken: string }) => void;

  // After /api/auth/me (refresh)
  setUser: (user: User) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: localStorage.getItem("accessToken"),

      setAuth: ({ user, accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        set({ user, accessToken });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: "supermarketpro-auth",
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken }),
    }
  )
);
