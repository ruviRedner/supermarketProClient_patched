import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../modules/auth/auth.store";

export function AdminOnlyLayout() {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);

  if (!token) return <Navigate to="/login" replace />;

  // Token exists but /me is still loading after refresh
  if (!user) return null;

  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
