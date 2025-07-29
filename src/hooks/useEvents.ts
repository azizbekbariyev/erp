import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "../types";
import { EventService } from "../service/event.service";
import type { EventTypes } from "../types/event";

export const useEvents = (params: ParamsType) => {
  const queryClient = useQueryClient();

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const res = await EventService.fetchEvents();
      return res?.data?.rooms || [];
    },
  });

  const createEvent = () => {
    return useMutation({
      mutationFn: async (data: EventTypes) => EventService.createEvent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
    });
  };

  const updateEvent = () => {
    return useMutation({
      mutationFn: async (data: EventTypes) => EventService.updateEvent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
    });
  };

  const deleteEvent = () => {
    return useMutation({
      mutationFn: async (id: number) => EventService.deleteEvent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
    });
  };

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
