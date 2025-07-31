import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"


export const Service = {
    getInformationProfile(){
        return apiConfig().getRequest(`${ApiUrls.ADMIN}/profile`)
    },
}