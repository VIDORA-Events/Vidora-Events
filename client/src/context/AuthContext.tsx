import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types/index.js';
import { adminGetMe, adminLogin, adminLogout } from '../services/api.js';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await adminGetMe();
        if (res.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Unauthenticated session, normal in public view
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await adminLogin(credentials);
    if (res.success && res.data.user) {
      setUser(res.data.user);
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

