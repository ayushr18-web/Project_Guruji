// hooks/useBooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../lib/api';
import { IBook } from '../types/books';

// Fetch books list
export const useBooks = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['books-list', params],
    queryFn: async (): Promise<Array<IBook>> => {
      const response = await API.getBooks(params);
      return response.data;
    },
  });
};

// Create a book
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: IBook): Promise<IBook> => {
      const response = await API.createBook(newBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the books list after creation
      queryClient.invalidateQueries({ queryKey: ['books-list'] });
    },
  });
};
