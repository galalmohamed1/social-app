import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const authenticated = isAuthenticated();

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}