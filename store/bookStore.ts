// store/bookStore.ts
import { create } from 'zustand';
import { IChapterOrBookListResponse } from '../types/books';

interface BookStoreState {
  books: IChapterOrBookListResponse;
  setBooks: (books: IChapterOrBookListResponse) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  books: {} as IChapterOrBookListResponse, // Initialize with an empty object
  setBooks: (books) => set({ books }),
}));
