import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { ParamsType } from "../types";
import type { RoomTypes } from "../types/room";

export const RoomService = {
  async fetchRooms(params: ParamsType) {
    return await apiConfig().getRequest(ApiUrls.ROOMS, params);
  },

  createRoom(model: RoomTypes) {
    return apiConfig().postRequest(ApiUrls.ROOMS, model);
  },

  deleteRoom(id: number) {
    return apiConfig().deleteRequest(`${ApiUrls.ROOMS}/${id}`, {});
  },

  updateRoom(model: RoomTypes, id: number) {
    return apiConfig().putRequest(`${ApiUrls.ROOMS}/${id}`, model);
  },

  getRoomById(id: number) {
    return apiConfig().getRequest(`${ApiUrls.ROOMS}/${id}`);
  },
};
