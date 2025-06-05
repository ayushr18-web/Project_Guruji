// hooks/useBooks.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API } from '../lib/api';
import { useBookStore } from '../store/bookStore';
import { IBook } from '../types/books';

export const useBooks = (
  params?: Record<string, any>
): UseQueryResult<IBook[], Error> => {
  const setBooks = useBookStore((state) => state.setBooks);

  return useQuery<IBook[], Error>({
    queryKey: ['books', params],
    queryFn: async () => {
      const { data } = await API.getBooks(params);
      return data as IBook[];
    },
    onSuccess: (data) => {
      setBooks(data);
    },
    onError: (error) => {
      console.error('Fetching books failed:', error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
