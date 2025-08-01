import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "@service/groups.service";
import type { GroupStudentType, GroupTeacherType, GroupTypes } from "@types";
import type { ParamsType } from "@types";

export const useGroup = (params?: ParamsType, id?: number) => {
  const queryClinet = useQueryClient();
  const { data, refetch } = useQuery({
    enabled: !id,
    queryKey: ["groups", params],
    queryFn: async () => await GroupService.fetchGroups(params!),
  });

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: GroupTypes) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => GroupService.deleteGroup(id),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: GroupTypes }) =>
        GroupService.updateGroup(id, data),
    });
  };

  const useGroupById = (id: number) => {
    return useQuery({
      enabled: !!id,
      queryKey: ["group", id],
      queryFn: async () => GroupService.getGroupById(id),
    });
  };

  const useGroupAddStudent = () => {
    return useMutation({
      mutationFn: async ({
        groupId,
        studentId,
      }: {
        groupId: number;
        studentId: number;
      }) => GroupService.addStudentToGroup(groupId, studentId),
    });
  };

  const useGroupAddTeacher = () => {
    return useMutation({
      mutationFn: async ({
        groupId,
        teacherId,
      }: {
        groupId: number;
        teacherId: number;
      }) => GroupService.addTeacherToGroup(groupId, teacherId),
    });
  };

  const groupStudentQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-students", id],
    queryFn: async () => GroupService.getGroupStudents(id!),
  });

  const groupLessonsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-lessons", id],
    queryFn: async () => GroupService.getGroupLessons(id!),
  });

  const groupTeachersQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-teachers", id],
    queryFn: async () => GroupService.getGroupTeachers(id!),
  });

  const students = groupStudentQuery.data;
  const lessons = groupLessonsQuery.data;
  const teachers = groupTeachersQuery.data;

  const useGroupStudent = () => {
    return useMutation({
      mutationFn: async (data: GroupStudentType) =>
        GroupService.addGroupStudent(data),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["group-students"] });
      },
    });
  };

  const useGroupTeacher = () => {
    return useMutation({
      mutationFn: async (data: GroupTeacherType) =>
        GroupService.addGroupTeacher(data),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["group-teachers"] });
      },
    });
  };

  return {
    data,
    lessons,
    students,
    teachers,
    refetch,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete,
    useGroupById,
    useGroupAddStudent,
    useGroupAddTeacher,
    useGroupStudent,
    useGroupTeacher,
  };
};
