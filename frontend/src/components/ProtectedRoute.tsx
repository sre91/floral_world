import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

interface DecodedToken {
  id: string;
  email: string;
  isAdmin?: boolean;
  exp: number;
}

const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;

    // If token expired → logout
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // If admin route but user not admin → go home
    if (adminOnly && !decoded.isAdmin) {
      return <Navigate to="/home" replace />;
    }

    // All good → show page
    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
