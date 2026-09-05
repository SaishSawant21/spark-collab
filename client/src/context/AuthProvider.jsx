import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser, logoutUser } from "../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loadUser = async () => {
    try {
      const response = await fetchCurrentUser();
      setUser(response?.user || null);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadUser();
    }
  }, [isLoggedIn]);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider