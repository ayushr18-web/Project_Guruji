import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STORIES } from "../services/stories";
import { ICollectionItem, ICollectionListResponse } from "../types/collections";
import { COLLECTIONS } from "../services/collections";


export const useGetCollections = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['collections-list', params],
    queryFn: async (): Promise<ICollectionListResponse> => {
      const response = await COLLECTIONS.getCollections(params);
      return response.data as ICollectionListResponse;
    },
  });
};


export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook: ICollectionItem): Promise<ICollectionItem> => {
      const response = await COLLECTIONS.createCollection(newBook);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the books list after creation
      queryClient.invalidateQueries({ queryKey: ['collection-list'] });
    },
  });
};