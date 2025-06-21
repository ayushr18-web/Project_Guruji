import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TEMPLES } from "../services/temples";
import { ITempleListResponse } from "../types/temples";


export const useGetTemples = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['stories-list', params],
    queryFn: async (): Promise<ITempleListResponse> => {
      const response = await TEMPLES.getTemples(params);
      return response.data as ITempleListResponse;
    },
  });
};

export const useDeleteTemple= () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await TEMPLES.deleteTemple(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delete-list'] });
    },
  });
};

export const useCreateTemple = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTemple: any): Promise<any> => {
      const response = await TEMPLES.createTemple(newTemple);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the temples list after creation
      queryClient.invalidateQueries({ queryKey: ['temples-list'] });
    },
  });
}

 export const useGetTempleData = (id: string) => {
    return useQuery({
        queryKey: ['temple-data', id],
        queryFn: async (): Promise<ITempleListResponse> => {
            const response = await TEMPLES.getTemples({ id });
            return response.data as ITempleListResponse;
        },
        enabled: !!id, // Only run this query if id is defined
    });
  }


  export const useUpdateTemple = (id: string) => {
      const queryClient = useQueryClient();
      return useMutation({
          mutationFn: async (updatedFestival: Partial<ITempleListResponse>): Promise<ITempleListResponse> => {
              const response = await TEMPLES.updateTemple(id, updatedFestival);
              return response.data;
          },
          onSuccess: () => {
              // Invalidate and refetch the festivals list after update
              queryClient.invalidateQueries({ queryKey: ['temples-list'] });
          },
      });
    }

