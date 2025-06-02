
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: 'admin1',
    name: 'Admin User',
    role: 'admin'
  });

  const login = (username: string, password: string): boolean => {
    // Simple mock authentication
    if (username === 'admin' && password === 'admin') {
      setUser({ id: 'admin1', name: 'Admin User', role: 'admin' });
      return true;
    } else if (username === 'user' && password === 'user') {
      setUser({ id: 'user1', name: 'Normal User', role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
