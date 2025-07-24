// GroupService.ts
import { apiConfig} from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { GroupTypes } from "@types";
import type { ParamsType } from "@types";
export const GroupService = {
  async fetchGroups(params: ParamsType) {
    return await apiConfig().getRequest(ApiUrls.GROUPS, params);
  },
  
  async getGroupLessons(groupId: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPLESSONS}/${groupId}`);
    return res
  },

  async getGroupStudents(groupId: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPSTUDENTSBYGROUPID}/${groupId}`);
    return res
  },

  async getGroupTeachers(groupId: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPTEACHERSBYGROUPID}/${groupId}`);
    return res
  },

  createGroup(model: GroupTypes) {
    return apiConfig().postRequest(ApiUrls.GROUPS, model);
  },

  updateGroup(id: number, model: GroupTypes) {
    return apiConfig().putRequest(`${ApiUrls.GROUPS}/${id}`,model);
  },

  deleteGroup(id: number) {
    return apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`,{}); // yoki deleteRequest
  },

  getGroupById(id: number) {
    return apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`);
  },

  addStudentToGroup(groupId: number, studentId: number) {
    return apiConfig().putRequest(`${ApiUrls.GROUPS}/${groupId}/add-student/${studentId}`);
  },

  removeStudentFromGroup(groupId: number, studentId: number) {
    return apiConfig().putRequest(`${ApiUrls.GROUPS}/${groupId}/remove-student/${studentId}`);
  },

  addTeacherToGroup(groupId: number, teacherId: number) {
    return apiConfig().putRequest(`${ApiUrls.GROUPS}/${groupId}/add-teacher/${teacherId}`);
  },

  removeTeacherFromGroup(groupId: number, teacherId: number) {
    return apiConfig().putRequest(`${ApiUrls.GROUPS}/${groupId}/remove-teacher/${teacherId}`);
  },


};
