import { api } from './api';

export const adminService = {
  async login(data: { email: string; password: string }) {
    const res = await api.post('/admin/login', data);
    return res.data;
  },
  async stats() {
    const res = await api.get('/admin/stats');
    return res.data;
  },
  async courses() {
    const res = await api.get('/admin/courses');
    return res.data;
  },
  async createCourse(formData: FormData) {
    const res = await api.post('/admin/courses', formData);
    return res.data;
  },
  async updateCourse(id: string, formData: FormData) {
    const res = await api.put(`/admin/courses/${id}`, formData);
    return res.data;
  },
  async deleteCourse(id: string) {
    const res = await api.delete(`/admin/courses/${id}`);
    return res.data;
  },
  async addVideo(courseId: string, formData: FormData) {
    const res = await api.post(`/admin/courses/${courseId}/videos`, formData);
    return res.data;
  },
  async deleteVideo(courseId: string, videoId: string) {
    const res = await api.delete(`/admin/courses/${courseId}/videos/${videoId}`);
    return res.data;
  }
};
