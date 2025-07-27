import { api } from './api';

export const expenseService = {
  async list() {
    const res = await api.get('/expenses');
    return res.data;
  },
  async add(data: { amount: number; category: string; note?: string }) {
    const res = await api.post('/expenses', data);
    return res.data;
  },
  async remove(id: string) {
    const res = await api.delete(`/expenses/${id}`);
    return res.data;
  }
};
