// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'job_seeker' | 'employer';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      // Check if savedUser exists and is not "undefined" string
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [token, setToken] = useState<string | null>(() => {
    const token = localStorage.getItem('token');
    // Check if token is valid and not "undefined" string
    return token && token !== 'undefined' ? token : null;
  });

  const isLoggedIn = !!user; // Fix: Define isLoggedIn based on user existence

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
