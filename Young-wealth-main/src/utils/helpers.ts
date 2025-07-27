import { ROUTES } from './constants';

export const getDashboardRoute = (role: string): string => {
  switch (role) {
    case 'school-student':
      return ROUTES.DASHBOARD.SCHOOL;
    case 'college-student':
      return ROUTES.DASHBOARD.COLLEGE;
    case 'employee':
      return ROUTES.DASHBOARD.EMPLOYEE;
    case 'admin':
      return ROUTES.ADMIN.DASHBOARD;
    default:
      return ROUTES.HOME;
  }
};
