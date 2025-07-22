export type UserRole = 'school-student' | 'college-student' | 'employee';
export type SchoolType = 'government' | 'private';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  schoolType?: SchoolType;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  schoolType?: SchoolType;
}