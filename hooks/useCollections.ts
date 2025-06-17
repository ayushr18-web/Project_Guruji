import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STORIES } from "../services/stories";
import { ICollection, ICollectionItem, ICollectionListResponse } from "../types/collections";
import { COLLECTIONS } from "../services/collections";
import { useBooks } from "./useBook";
import { API } from "../lib/api";
import { TEACHINGS } from "../services/teachings";


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



export const useActiveItems = (type: "Book" | "Story" | "Teaching" | null, searchText: string) => {
    return useQuery({
        queryKey: [type, searchText],
        queryFn: async () => {
            if (!searchText || searchText.length <= 1) return [];
            switch (type) {
                case "Book":
                    return (await API.getBooks({ skip: 0, limit: 10, search: searchText }));
                case "Story":
                    return (await STORIES.getStories({ skip: 0, limit: 10, search: searchText }));
                case "Teaching":
                    return (await TEACHINGS.getTeachings({ skip: 0, limit: 10, search: searchText }));
                default:
                    return [];
            }
        },
        enabled: !!type && searchText.length > 1,
        staleTime: 300000, // optional cache control
    });
};


export const useGetCollectionItems = (collectionId: string) => {
  return useQuery({
    queryKey: ['collection-items', collectionId],
    queryFn: async (): Promise<ICollectionItem[]> => {
      const response = await COLLECTIONS.getCollectionItems(collectionId);
      return response.data;
    },
  });
}

export const useAddCollectionItem = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: ICollectionItem): Promise<ICollectionItem> => {
      const response = await COLLECTIONS.addCollectionItem(collectionId, item);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection-items', collectionId] });
    },
  });
} 

export const useRemoveCollectionItem = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<void> => {
      await COLLECTIONS.removeCollectionItem(collectionId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection-items', collectionId] });
    },
  });
}