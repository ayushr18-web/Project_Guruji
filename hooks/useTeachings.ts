import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITeachings, ITeachingsApiResponse } from "../types/teachings";
import { TEACHINGS } from "../services/teachings";

export const useGetTeachings = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['teachings-list', params],
    queryFn: async (): Promise<ITeachingsApiResponse> => {
      const response = await TEACHINGS.getTeachings(params);
      return response.data as ITeachingsApiResponse;
    },
  });
};


export const useDeleteTeaching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await TEACHINGS.deleteTeachings(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books-list'] });
    },
  });
};


export const useCreateTeaching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: Partial<ITeachings>): Promise<ITeachings> => {
      const response = await TEACHINGS.createTeaching(newBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the books list after creation
      queryClient.invalidateQueries({ queryKey: ['teaching'] });
    },
  });
};


export const useEditTeaching = ( bookId: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBook: ITeachings): Promise<ITeachings> => {
      const response = await TEACHINGS.updateTeaching(bookId, updatedBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the books list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['books-list'] });
    },
  });
};

export const useGetTeachingData = (bookId: string) => {
  return useQuery({
    queryKey: ['book-data', bookId],
    queryFn: async (): Promise<ITeachings> => {
      const response = await TEACHINGS.getTeachingsData(bookId);
      return response.data;
    },
  });
}