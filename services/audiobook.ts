import { apiClient } from "../lib/api";

export const AUDIOBOOKS = {
    getAudiobooks: (params?: Record<string, any>) => {
    return apiClient.get('/audiobooks', { params });
  },
}