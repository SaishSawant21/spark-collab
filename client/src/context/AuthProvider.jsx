import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser, logoutUser } from "../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await fetchCurrentUser();
      setUser(response?.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    isAuthenticated: !!user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider