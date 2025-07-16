import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import type { CoursesTypes, ParamsType } from "@types"

export const CourseService = {
    getAllCourse(params:ParamsType){
        return apiConfig().getRequest(ApiUrls.Course, params)
    },
    createCourse(model:CoursesTypes){
        return apiConfig().postRequest(ApiUrls.Course, model)
    },
    updateCourse(model:CoursesTypes, id:number){
        return apiConfig().putRequest(`${ApiUrls.Course}/${id}`, model)
    },
    deleteCoruse(id:number){
        return apiConfig().deleteRequest(`${ApiUrls.Course}/${id}`,{})
    }
}