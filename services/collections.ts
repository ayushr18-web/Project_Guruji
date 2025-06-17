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
    getCollectionItems: (id: string, params?: Record<string, any>) => {
        return apiClient.get(`/collections/${id}/items`, { params });
    },
    addCollectionItem: (id: string, payload: Record<string, any>) => {
        return apiClient.post(`/collections/${id}/items`, payload);
    },
    removeCollectionItem: (id: string, itemId: string) => {
        return apiClient.delete(`/collections/${id}/items/${itemId}`);
    }
}