import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('youngwealth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('youngwealth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
