import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"
import type { EventTypes } from "../types/event"

export const EventService = {
    fetchEvents(){
        return apiConfig().getRequest(ApiUrls.EVENTS)
    },

    createEvent(model: EventTypes){
        return apiConfig().postRequest(ApiUrls.EVENTS, model)
    },

    updateEvent(model: EventTypes, id: number){
        return apiConfig().putRequest(`${ApiUrls.EVENTS}/${id}`, model)
    },

    deleteEvent(id: number){
        return apiConfig().deleteRequest(`${ApiUrls.EVENTS}/${id}`, {})
    }
}