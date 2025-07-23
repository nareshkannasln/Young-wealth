import { useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types/auth';

const STORAGE_KEY = 'youngwealth_auth';
const USERS_KEY = 'youngwealth_users';

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@student.com',
    password: 'password123',
    role: 'school-student',
    schoolType: 'government',
    createdAt: new Date(),
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@college.com',
    password: 'password123',
    role: 'college-student',
    createdAt: new Date(),
  },
  {
    id: 'admin',
    fullName: 'Admin',
    email: 'admin@youngwealth.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
  },
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Initialize mock users in localStorage if not present
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    }

    // Check for existing auth state
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState({
          isAuthenticated: true,
          user: parsedAuth.user,
          loading: false,
        });
      } catch (error) {
        console.error('Failed to parse auth state:', error);
        localStorage.removeItem(STORAGE_KEY);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user = users.find((u: User) => 
        u.email === credentials.email && 
        u.password === credentials.password && 
        u.role === credentials.role
      );

      if (!user) {
        return { success: false, error: 'Invalid email, password, or role' };
      }

      const authData = { user };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (signupData: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      // Check if user already exists
      const existingUser = users.find((u: User) => u.email === signupData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role,
        schoolType: signupData.schoolType,
        createdAt: new Date(),
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Auto-login after signup
      const authData = { user: newUser };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      
      setAuthState({
        isAuthenticated: true,
        user: newUser,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'school-student':
        return '/dashboard/school';
      case 'college-student':
        return '/dashboard/college';
      case 'employee':
        return '/dashboard/employee';
      default:
        return '/dashboard';
    }
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    getDashboardRoute,
  };
};
