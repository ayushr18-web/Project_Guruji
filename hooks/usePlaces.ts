import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PLACES } from "../services/places";
import { IPlacesResponse } from "../types/places";


export const useGetPlaces = (
  params: Record<string, any> = {}
) => {
  return useQuery({
    queryKey: ['places-list', params],
    queryFn: async (): Promise<IPlacesResponse> => {
      const response = await PLACES.getPlaces(params);
      return response.data as IPlacesResponse;
    },
  });
};
