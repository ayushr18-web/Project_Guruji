import { apiClient } from "../lib/api";

export const PLACES = {
    getPlaces: (params?: Record<string, any>) => {
    return apiClient.get('/places', { params });
  },
}