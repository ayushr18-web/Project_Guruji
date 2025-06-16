import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STORIES } from "../services/stories";
import { ICollection, ICollectionItem, ICollectionListResponse } from "../types/collections";
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

export const useGetCollectionData = (id: string) => {
  return useQuery({
    queryKey: ['collection-data', id],
    queryFn: async (): Promise<ICollection> => {
      const response = await COLLECTIONS.getCollectionData(id);
      return response.data;
    },
  });
}

export const useEditCollection = ( id: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
  }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedCollection: ICollection): Promise<ICollection> => {
      const response = await COLLECTIONS.updateCollection(id, updatedCollection);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the books list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['collection-list'] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await COLLECTIONS.deleteCollection(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection-list'] });
    },
  });
};