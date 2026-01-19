import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../modules/auth/auth.store";

export function RequireAuthLayout() {
  const token = useAuthStore((s) => s.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
