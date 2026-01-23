import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"
            role="status"
            aria-label="লোড হচ্ছে"
          >
            <span className="sr-only">লোড হচ্ছে...</span>
          </div>
          <p className="text-gray-600 font-medium">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
