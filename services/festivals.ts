import { apiClient } from "../lib/api";

export const FESTIVALS = {
    getFestivals: (params?: Record<string, any>) => {
        return apiClient.get('/festivals', { params });
    },
    createFestival: (payload: Record<string, any>) => {
        return apiClient.post('/festivals', payload);
    },
    updateFestival: (id: string, payload: Record<string, any>) => {
        return apiClient.put(`/festivals/${id}`, payload);
    },
    deleteFestival: (id: string) => {
        return apiClient.delete(`/festivals/${id}`);
    }
}