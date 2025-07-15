import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'admin') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers = {
  students: [
    { id: 'priya-reddy', name: 'Priya Reddy', email: 'priya@demo.com', password: 'student123' },
    { id: 'arun-kumar', name: 'Arun Kumar', email: 'arun@demo.com', password: 'student123' },
    { id: 'lakshmi-naidu', name: 'Lakshmi Naidu', email: 'lakshmi@demo.com', password: 'student123' },
    { id: 'ravi-chandra', name: 'Ravi Chandra', email: 'ravi@demo.com', password: 'student123' },
    { id: 'meera-sharma', name: 'Meera Sharma', email: 'meera@demo.com', password: 'student123' },
    { id: 'kiran-rao', name: 'Kiran Rao', email: 'kiran@demo.com', password: 'student123' },
    { id: 'divya-patel', name: 'Divya Patel', email: 'divya@demo.com', password: 'student123' },
    { id: 'suresh-babu', name: 'Suresh Babu', email: 'suresh@demo.com', password: 'student123' },
  ],
  admins: [
    { id: 'admin-1', name: 'Administrator', email: 'admin@ganesh.com', password: 'admin123' },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ganesh-driving-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'admin'): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setLoading(false);
        return false;
      }
      const userObj = await response.json();
      if (userObj.role !== role) {
        setLoading(false);
        return false;
      }
      setUser(userObj);
      console.log('User set:', userObj);
      localStorage.setItem('ganesh-driving-user', JSON.stringify(userObj));
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ganesh-driving-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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