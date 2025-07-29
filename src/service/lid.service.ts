import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { LidTypes } from "../types";


export const LidService = {
    async getLid() {
        return await apiConfig().getRequest(ApiUrls.LID);
    },

    createLid(model: LidTypes) {
        return apiConfig().postRequest(ApiUrls.LID, model);
    },

    updateLid(model: LidTypes, id: number) {
        return apiConfig().putRequest(`${ApiUrls.LID}/${id}`, model);
    },

    deleteLid(id: number) {
        return apiConfig().deleteRequest(`${ApiUrls.LID}/${id}`, {});
    },

    getLidById(id: number) {
        return apiConfig().getRequest(`${ApiUrls.LID}/${id}`);
    }
}