import { createContext, useContext, useState } from "react";
import { loginApi, logoutApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (data) => {
    setLoading(true);

    try {
      const res = await loginApi(data);

      console.log(res.data); // Check the response

      // Change these lines based on your API response
      const token = res.data.data.token;

      localStorage.setItem("accessToken", token);
      setUser(res.data.data);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Invalid email or password",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {}

    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);