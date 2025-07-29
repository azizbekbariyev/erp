import { ApiUrls } from '@api/api-urls';
import { apiConfig } from "@api/config"
import type { BranchTypes } from "@/types"

export const BrancheService = {
    getAllBranches (){
        return apiConfig().getRequest(ApiUrls.BRANCHES)
    },
    createBranche(model:BranchTypes){
        return apiConfig().postRequest(ApiUrls.BRANCHES, model)
    },
    updateBranches(model:BranchTypes, id:number){
        return apiConfig().putRequest(`${ApiUrls.BRANCHES}/${id}`, model)
    },
    deleteBranches(id:number){
        return apiConfig().deleteRequest(`${ApiUrls.BRANCHES}/${id}`, {})
    }
}