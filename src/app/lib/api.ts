// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-base-url.com', // Change to your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors here if needed (e.g., auth tokens)

export const Api = {
  // Auth APIs
  login: (payload: { email: string; password: string }) => {
    return apiClient.post('/login', payload);
  },

  // Add other API calls here
};
