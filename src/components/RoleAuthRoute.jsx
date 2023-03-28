import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export function RoleAuthRoute({ children, role }) {
  const userRole = useUserRole();

  if (userRole === role) return <>{children}</>;

  return <Navigate to="/login" />;
}
