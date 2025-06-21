import { apiClient } from "../lib/api";

export const TEMPLES = {
    getTemples: (params?: Record<string, any>) => {
        return apiClient.get('/temples', { params });
    },
    deleteTemple: (id: string) => {
        return apiClient.delete(`/temples/${id}`);
    },
    createTemple: (newTemple: any) => {
        return apiClient.post('/temples', newTemple);
    },
    updateTemple: (id: string, updatedTemple: any) => {
        return apiClient.put(`/temples/${id}`, updatedTemple);
    },
}