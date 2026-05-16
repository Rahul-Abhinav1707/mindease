import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("mindease-token"));
  const [isLoading, setIsLoading] = useState(Boolean(token));

  const persistSession = useCallback((session, remember = true) => {
    setUser(session.user);
    setToken(session.token);
    if (remember) {
      localStorage.setItem("mindease-token", session.token);
      sessionStorage.removeItem("mindease-token");
    } else {
      sessionStorage.setItem("mindease-token", session.token);
      localStorage.removeItem("mindease-token");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mindease-token");
    sessionStorage.removeItem("mindease-token");
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const savedToken = localStorage.getItem("mindease-token") || sessionStorage.getItem("mindease-token");
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authService.me();
        setUser(data.user);
        setToken(savedToken);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, [logout]);

  const register = async (payload) => {
    const data = await authService.register(payload);
    persistSession(data);
    return data;
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    persistSession(data, payload.remember);
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      register,
      login,
      logout
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
