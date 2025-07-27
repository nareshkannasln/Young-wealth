import { api } from './api';

export const courseService = {
  async list() {
    const res = await api.get('/courses');
    return res.data;
  },
  async details(id: string) {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  },
  async enroll(id: string) {
    const res = await api.post(`/courses/${id}/enroll`);
    return res.data;
  }
};
