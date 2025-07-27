import { SignupData, LoginCredentials } from '../types/auth';

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  },

  validateSignup: (data: SignupData): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!data.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!validators.email(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!validators.password(data.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!data.role) {
      errors.role = 'Role is required';
    }

    if (data.role === 'school-student' && !data.schoolType) {
      errors.schoolType = 'School type is required for school students';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateLogin: (data: LoginCredentials): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!validators.email(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }

    if (!data.role) {
      errors.role = 'Role is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};
