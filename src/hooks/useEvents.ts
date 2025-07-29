import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "../types";
import { RoomService } from "../service/room.service";
import type { RoomTypes } from "../types/room";

export const useEvents = (params:ParamsType) => {
    const queryClient = useQueryClient();

    const {data: events, isLoading, error} = useQuery({
        queryKey: ["events", params],
        queryFn: async () => {
            const res = await RoomService.fetchRooms(params);
            return res?.data?.rooms || [];
        },
    });

    const createRooms = () => {
        return useMutation({
            mutationFn: async (data: RoomTypes) =>
                RoomService.createRooms(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
            },
        });
    }

    const updateRooms = () => {
        return useMutation({
            mutationFn: async (data: ParamsType) =>
                RoomService.updateRooms(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
            },
        });
    }

    const deleteRooms = () => {
        return useMutation({
            mutationFn: async (data: ParamsType) =>
                RoomService.deleteRooms(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
            },
        });
    }

    return {
        events,
        isLoading,
        error,
        createRooms,
        updateRooms,
        deleteRooms
    }
}