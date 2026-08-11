import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log("ProtectedRoute:", {
    isAuthenticated,
    loading,
  });
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;