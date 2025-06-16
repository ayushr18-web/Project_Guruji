import { apiClient } from "../lib/api";

export const COLLECTIONS = {
    getCollections: (params?: Record<string, any>) => {
        return apiClient.get('/collections', { params });
    },
    getCollectionData: (id: string) => {
        return apiClient.get(`/collections/${id}`);
    },
    updateCollection: (id: string, payload: Record<string, any>) => {
        return apiClient.put(`/collections/${id}`, payload);
    },
    createCollection: (payload: Record<string, any>) => {
        return apiClient.post('/collections', payload);
    },
    deleteCollection: (id: string) => {
        return apiClient.delete(`/collections/${id}`);
    },
}