import { apiClient } from "../lib/api";

export const STORIES = {
    getStories: (params?: Record<string, any>) => {
    return apiClient.get('/stories', { params });
  },
  getStoryData: (id: string) => {
    return apiClient.get(`/stories/${id}`);
  },
}