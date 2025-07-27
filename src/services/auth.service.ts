import { api } from './api';
import { LoginCredentials, SignupData, User } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<{ token: string; user: User }>('/auth/login', credentials);
    return response.data;
  },

  async register(data: SignupData) {
    const response = await api.post<{ token: string; user: User }>('/auth/register', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async logout() {
    localStorage.removeItem('youngwealth_token');
  }
};
