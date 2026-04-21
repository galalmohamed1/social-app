import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function AuthRedirect() {
  return <Navigate to={isAuthenticated() ? "/" : "/auth"} replace />;
}