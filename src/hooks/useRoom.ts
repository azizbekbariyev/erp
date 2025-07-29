import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoomService } from "../service/room.service";
import type { RoomTypes, ParamsType } from "../types";

export const useRoom = (params: ParamsType) => {
  const queryClient = useQueryClient();

  const {
    data: rawRooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms", params],
    queryFn: async () => {
      const res = await RoomService.fetchRooms(params);
      return res?.data?.rooms || [];
    },
  });

  const createRoom = () => {
    return useMutation({
      mutationFn: async (data: RoomTypes) => RoomService.createRoom(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  const updateRoom = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: RoomTypes }) =>
        RoomService.updateRoom(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  const deleteRoom = () => {
    return useMutation({
      mutationFn: async (id: number) => RoomService.deleteRoom(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  return {
    data: rawRooms,
    isLoading,
    error,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};