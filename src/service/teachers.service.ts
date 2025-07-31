import { apiConfig } from "@api/config"
import { ApiUrls } from "@api/api-urls"
import type { ParamsType, TeacherTypes } from "@types";

export const TeacherSerivce = {
    getAllTeacher(params:ParamsType){
        return apiConfig().getRequest(ApiUrls.TEACHER, params)
    },
    createTeacher(model:TeacherTypes){
        return apiConfig().postRequest(ApiUrls.TEACHER, model);
    },
    updateTeacher(model:TeacherTypes, id:number){
        return apiConfig().putRequest(`${ApiUrls.TEACHER}/${id}`, model);
    },
    deleteTeacher(id:number){
        return apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`, {});
    },
    getTeacherById(id:number){
        return apiConfig().getRequest(`${ApiUrls.TEACHER}/${id}`)
    },
    getTeacherGroups(){
        return apiConfig().getRequest(`${ApiUrls.TEACHERGROUP}/my-groups`)
    },
    getStudentGroups(id:number){
        return apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}/teacher`)
    }
}