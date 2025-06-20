import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FESTIVALS } from "../services/festivals";
import { IFestivalResponse } from "../types/festivals";

export const useGetFestivals = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['festivals-list', params],
    queryFn: async (): Promise<IFestivalResponse> => {
      const response = await FESTIVALS.getFestivals(params);
      return response.data as IFestivalResponse;
    },
  });
};

export const useCreateFestival = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (newFestival: Partial<IFestivalResponse>): Promise<IFestivalResponse> => {
        const response = await FESTIVALS.createFestival(newFestival);
        return response.data;
        },
        onSuccess: () => {
        // Invalidate and refetch the festivals list after creation
        queryClient.invalidateQueries({ queryKey: ['festivals-list'] });
        },
    });
    };  

    export const useUpdateFestival = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedFestival: Partial<IFestivalResponse>): Promise<IFestivalResponse> => {
            const response = await FESTIVALS.updateFestival(id, updatedFestival);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch the festivals list after update
            queryClient.invalidateQueries({ queryKey: ['festivals-list'] });
        },
    });
  }

  export const useDeleteFestival = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            await FESTIVALS.deleteFestival(id);
        },
        onSuccess: () => {
            // Invalidate and refetch the festivals list after deletion
            queryClient.invalidateQueries({ queryKey: ['festivals-list'] });
        },
    });
  }

  export const useGetFestivalData = (id: string) => {
    return useQuery({
        queryKey: ['festival-data', id],
        queryFn: async (): Promise<IFestivalResponse> => {
            const response = await FESTIVALS.getFestivals({ id });
            return response.data as IFestivalResponse;
        },
        enabled: !!id, // Only run this query if id is defined
    });
  }






