import { useEffect } from "react";
import { meApi } from "./auth.api";
import { useAuthStore } from "./auth.store";

/**
 * Loads the current user from the server when a token exists (important after refresh).
 * If token is invalid/expired, logs out.
 */
export function useLoadMe() {
  const token = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!token) return;

    meApi()
      .then((r) => setUser(r.user))
      .catch(() => logout());
  }, [token, setUser, logout]);
}
