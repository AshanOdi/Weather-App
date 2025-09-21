import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <div className="w-[70px] h-[70px]  border-[5px] border-gray-500 border-t-blue-900 rounded-full animate-spin"></div>
    );
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
