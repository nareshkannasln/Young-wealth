// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password'
  },
  DASHBOARD: {
    SCHOOL: '/dashboard/school',
    COLLEGE: '/dashboard/college',
    EMPLOYEE: '/dashboard/employee',
    ADMIN: '/admin/dashboard'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    COURSE_MANAGER: '/admin/course-manager',
    LOGIN: '/admin/login'
  },
  LEARNING: '/learning',
  PAYMENT: '/payment',
  EXPENSE_TRACKER: '/expense-tracker'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'youngwealth_token',
  USER: 'youngwealth_user'
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me'
  },
  COURSES: {
    LIST: '/courses',
    DETAILS: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`
  }
};
