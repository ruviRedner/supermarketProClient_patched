import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, type UserRole } from "../../modules/auth/auth.store";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredRole?: UserRole;
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (requiredRole && !user) return null;

  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" replace />;

  return children;
}
