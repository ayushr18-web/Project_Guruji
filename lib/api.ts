// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ec2-13-61-196-239.eu-north-1.compute.amazonaws.com/api/v1', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
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

  getBookData: (bookId: string) => {
    return apiClient.get(`/books/${bookId}`);
  },

  createBook: (payload: Record<string, any>) => {
    return apiClient.post('/books', payload);
  },

  updateBook: (bookId: string, payload: Record<string, any>) => {
    return apiClient.put(`/books/${bookId}`, payload);
  },

  getChapters: (bookId: string) => {
    return apiClient.get(`/books/${bookId}/chapters`);
  },
  
  createChapter: (bookId: string, chapterId?: string, payload: Record<string, any>) => {
    if(chapterId){
      return apiClient.put(`/books/${bookId}/chapters/${chapterId}`, payload);
    }
    return apiClient.post(`/books/${bookId}/chapters`, payload);
  },

  createSection: (bookId: string, chapterId: string, payload: Record<string, any>) => {
    return apiClient.post(`/books/${bookId}/chapters/${chapterId}/sections`, payload);
  },

  updateSection: (bookId: string, chapterId: string, sectionId: string, payload: Record<string, any>) => {
    return apiClient.put(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}`, payload);
  },

  getSections: (bookId: string,  chapterId: string) => {
    return apiClient.get(`/books/${bookId}/chapters/${chapterId}/sections`);
  },

  getCategories: () => {
    return apiClient.get('/categories?type=BOOK&skip=0&limit=25&is_active=true');
  },

  deleteChapter: (bookId: string, chapterId: string) => {
    return apiClient.delete(`/books/${bookId}/chapters/${chapterId}`);
  },

  deleteBook: (bookId: string) => {
    return apiClient.delete(`/books/${bookId}`);
  },

  deleteSection: (bookId: string, chapterId: string, sectionId: string) => {
    return apiClient.delete(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}`);
  },

  getTableOfContents: (bookId: string) => {
    return apiClient.get(`/books/${bookId}/toc`);
  },
  getParticularSection: (bookId: string, chapterId: string, sectionId: string) => {
    return apiClient.get(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}`);
  },
  // Add other API calls here...
};