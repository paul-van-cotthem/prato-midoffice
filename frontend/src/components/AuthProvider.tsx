import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Consultant';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('prato_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Mock authentication - credentials loaded from environment variables.
    // Set VITE_MOCK_ADMIN_EMAIL and VITE_MOCK_ADMIN_PASSWORD in your .env file.
    const mockEmail = import.meta.env.VITE_MOCK_ADMIN_EMAIL;
    const mockPassword = import.meta.env.VITE_MOCK_ADMIN_PASSWORD;
    if (email === mockEmail && pass === mockPassword) {
      const mockUser: User = {
        id: 'u-001',
        email,
        name: 'Prato Administrator',
        role: 'Admin'
      };
      setUser(mockUser);
      localStorage.setItem('prato_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prato_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
