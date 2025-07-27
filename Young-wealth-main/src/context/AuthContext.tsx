import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types/auth';
import { authService } from '../services/auth.service';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } catch (error) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    const { token, user } = await authService.login({ email, password, role });
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  };

  const register = async (userData: any) => {
    const { token, user } = await authService.register(userData);
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
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

export default AuthContext;
