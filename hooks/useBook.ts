// hooks/useBooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../lib/api';
import { IBook, IChapterOrBookListResponse } from '../types/books';

// Fetch books list
export const useBooks = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['books-list', params],
    queryFn: async (): Promise<IChapterOrBookListResponse> => {
      const response = await API.getBooks(params);
      return response.data as IChapterOrBookListResponse;
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

export const useChapters = (bookId: string) => {
  return useQuery({
    queryKey: ['chapters', bookId],
    queryFn: async (): Promise<Array<any>> => {
      const response = await API.getChapters(bookId);
      return response.data;
    },
  });
}

export const useCreateChaper = (
  bookId: string,
  chapterId?: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, any>({
    mutationFn: async (newChapter) => {
      try {
        let response;
        if(chapterId) {
           response = await API.createChapter(bookId, chapterId, newChapter);
        }else{
           response = await API.createChapter(bookId, undefined, newChapter);
        }
       
        return response.data as any;
      } catch (error) {
        throw error; // rethrow to let react-query handle error state
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', bookId] });
      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options?.onError) options.onError(error);
    },
  });
};


export const useCreateSection = (
  bookId: string,
  chapterId: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, any>({
    mutationFn: async (newChapter) => {
      try {
        const response = await API.createSection(bookId, chapterId, newChapter);
        return response.data as any;
      } catch (error) {
        throw error; // rethrow to let react-query handle error state
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sections', bookId, chapterId] });
      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options?.onError) options.onError(error);
    },
  });
};


export const useGetBookData = (bookId: string) => {
  return useQuery({
    queryKey: ['book-data', bookId],
    queryFn: async (): Promise<IBook> => {
      const response = await API.getBookData(bookId);
      return response.data;
    },
  });
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Array<string>> => {
      const response = await API.getCategories();
      return response.data;
    },
  });
}


export const useEditBook = ( bookId: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBook: IBook): Promise<IBook> => {
      const response = await API.updateBook(bookId, updatedBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the books list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['books-list'] });
    },
  });
};


export const useSections = (bookId: string, chapterId: string) => {
  return useQuery({
    queryKey: ['sections', bookId, chapterId],
    queryFn: async (): Promise<Array<any>> => {
      const response = await API.getSections(bookId, chapterId);
      return response.data;
    },
  });
};

