import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LidService } from "../service/lid.service";
import type { LidTypes } from "../types";

export const useLid = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lids"],
    queryFn: async () => {
      const res = await LidService.getLid();
      return res?.data || [];
    },
  });

  const createLid = () => {
    return useMutation({
      mutationFn: async (data: LidTypes) => LidService.createLid(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lids"] });
      },
    });
  };

  const updateLid = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: LidTypes }) =>
        LidService.updateLid(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lids"] });
      },
    });
  };

  const deleteLid = () => {
    return useMutation({
      mutationFn: async (id: number) => LidService.deleteLid(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lids"] });
      },
    });
  };

  return {
    data,
    isLoading,
    error,
    createLid,
    updateLid,
    deleteLid,
  };
};
