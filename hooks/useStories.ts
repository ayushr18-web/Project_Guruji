import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STORIES } from "../services/stories";
import { IStoryApiResponse, IStoryItem } from "../types/stories";


export const useGetStories = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['stories-list', params],
    queryFn: async (): Promise<IStoryApiResponse> => {
      const response = await STORIES.getStories(params);
      return response.data as IStoryApiResponse;
    },
  });
};


export const useGetStoryData = (id: string) => {
  return useQuery({
    queryKey: ['book-data', id],
    queryFn: async (): Promise<IStoryItem> => {
      const response = await STORIES.getStoryData(id);
      return response.data;
    },
  });
}

export const useEditStory = ( id: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IStoryItem): Promise<IStoryItem> => {
      const response = await STORIES.updateStory(id, payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the books list to reflect changes
      queryClient.invalidateQueries({ queryKey: [`story-${id}`] });
    },
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: IStoryItem): Promise<IStoryItem> => {
      const response = await STORIES.createStory(newBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the books list after creation
      queryClient.invalidateQueries({ queryKey: ['books-list'] });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await STORIES.deleteStory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story-list'] });
    },
  });
};