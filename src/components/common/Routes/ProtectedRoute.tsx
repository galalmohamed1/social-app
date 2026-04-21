import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import PageLoader from "@/components/common/PageLoader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authenticated = isAuthenticated();

  if (authenticated === null) {
    return <PageLoader />;
  }

  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}