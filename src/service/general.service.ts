import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"


export const Service = {
    getInformationProfile(){
        return apiConfig().getRequest(`${ApiUrls.ADMIN}/profile`)
    },

    forgetPassword(modal: {email: string, password: string}) {
        return apiConfig().postRequest(ApiUrls.FORGETPASSWORD, modal)
    },

    confirmOtp(modal:{otp:number}){
        console.log("modal", modal);
        return apiConfig().postRequest(ApiUrls.CONFIRMOTP, modal)
    },

    confirmPassword(modal:{password:string, confirmPassword:string}){
        return apiConfig().postRequest(ApiUrls.RESETPASSWORD, modal)
    },
}