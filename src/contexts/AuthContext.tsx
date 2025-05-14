
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'student' | 'faculty' | 'admin' | null;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  institution?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Normally, this would be an API call
      // For now, we'll mock the authentication
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let mockUser: User;
      
      // Mock users for different roles
      if (email === 'student@example.com') {
        mockUser = {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'student@example.com',
          role: 'student',
          profileImage: 'https://i.pravatar.cc/150?u=student'
        };
      } else if (email === 'faculty@example.com') {
        mockUser = {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'faculty@example.com',
          role: 'faculty',
          profileImage: 'https://i.pravatar.cc/150?u=faculty'
        };
      } else if (email === 'admin@example.com') {
        mockUser = {
          id: '3',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          role: 'admin',
          institution: 'University of Example',
          profileImage: 'https://i.pravatar.cc/150?u=admin'
        };
      } else {
        throw new Error('Invalid credentials');
      }
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '4',
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'admin',
        institution: userData.institution
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
