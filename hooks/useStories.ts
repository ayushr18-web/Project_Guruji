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