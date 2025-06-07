// store/bookStore.ts
import { create } from 'zustand';
import { IBook } from '../types/books';
 const mockBooks: IBook[] = [
  {
    id: 1,
    title: "The Saffron Horizon",
    author: "Anita Desai",
    category: "Fiction",
    type: "Paperback",
    published: "2023-04-12",
  },
  {
    id: 2,
    title: "Maroon Tales",
    author: "Amitav Ghosh",
    category: "Historical",
    type: "Hardcover",
    published: "2022-08-30",
  },
  {
    id: 3,
    title: "Indigo Skies",
    author: "Chitra Banerjee Divakaruni",
    category: "Fantasy",
    type: "Ebook",
    published: "2021-11-25",
  },
  {
    id: 4,
    title: "Golden Truths",
    author: "Chetan Bhagat",
    category: "Self-Help",
    type: "Paperback",
    published: "2020-06-15",
  },
  {
    id: 5,
    title: "Echoes of Amber",
    author: "Arundhati Roy",
    category: "Drama",
    type: "Hardcover",
    published: "2023-01-07",
  },
];


interface BookStoreState {
  books: IBook[];
  setBooks: (books: IBook[]) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
}));
