// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-base-url.com', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global Error Handling Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Log the error to an external service
    console.error('API Error:', error);

    // Optional: Extract useful info
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Example: Customize error based on status
    if (status === 401) {
      // Unauthorized - maybe redirect to login
      console.warn('Unauthorized! Redirecting to login...');
    }

    // Return a consistent error object or rethrow
    return Promise.reject({
      status,
      message,
      original: error,
    });
  }
);

export const API = {
  // Auth APIs
  login: (payload: { email: string; password: string }) => {
    return apiClient.post('/login', payload);
  },

  // Book APIs
  getBooks: (params?: Record<string, any>) => {
    return apiClient.get('/books', { params });
  },

  // Add other API calls here...
};