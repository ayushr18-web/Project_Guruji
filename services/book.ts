// services/books.ts
import axios from 'axios';
import { API } from '../lib/api';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  publishedDate: string;
  coverUrl?: string;
  rating?: number;
}

interface GetBooksParams {
  page?: number;
  limit?: number;
  genre?: string;
  language?: string;
  search?: string;
}

export const BooksAPI = {
  getBooksList: (payload: GetBooksParams) => {
    return API.getBooks(payload);
  },
};
