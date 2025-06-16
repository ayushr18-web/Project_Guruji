import { apiClient } from "../lib/api";

export const STORIES = {
    getStories: (params?: Record<string, any>) => {
    return apiClient.get('/stories', { params });
  },
  getStoryData: (id: string) => {
    return apiClient.get(`/stories/${id}`);
  },
  updateStory: (id: string, payload: Record<string, any>) => {
    return apiClient.put(`/stories/${id}`, payload);
  },
  createStory: (payload: Record<string, any>) => {
    return apiClient.post('/stories', payload);
  },
  deleteStory: (id: string) => {
    return apiClient.delete(`/stories/${id}`);
  },
}