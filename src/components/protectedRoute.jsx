import { useSession } from "../context/SessionContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-500 via-blue-600 to-indigo-800">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
