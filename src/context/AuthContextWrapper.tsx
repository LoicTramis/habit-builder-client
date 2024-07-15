import { createContext, useState, useEffect } from "react";
import service from "../service/api.ts";

export const AuthContext = createContext(null);

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token: string): void => localStorage.setItem("authToken", token);

  const removeToken = () => localStorage.removeItem("authToken");

  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }
      const response = await service.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);

      console.log(error);
    }
  }

  const disconnect = () => {
    removeToken();
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  const contextValues = {
    user,
    storeToken,
    removeToken,
    authenticateUser,
    isLoading,
    isLoggedIn,
    disconnect,
  };

  return (
    <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
  )
}

export default AuthContextWrapper;
