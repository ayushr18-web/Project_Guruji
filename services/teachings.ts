import { apiClient } from "../lib/api";

export const TEACHINGS = {
    getTeachings: (params?: Record<string, any>) => {
    return apiClient.get('/teachings', { params });
  },
  deleteTeachings: (id: string) => {
    return apiClient.delete(`/teachings/${id}`);
  },
  createTeaching: (payload: Record<string, any>) => {
    return apiClient.post('/teachings', payload);
  },
  updateTeaching: (id: string, payload: Record<string, any>) => {
    return apiClient.put(`/teachings/${id}`, payload);
  },
  getTeachingsData: (id: string) => {
    return apiClient.get(`/teachings/${id}`);
  }
}