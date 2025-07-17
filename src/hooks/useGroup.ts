import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "@service/groups.service";
import type { GroupTypes } from "@types";
import type { ParamsType } from "@types";

export const useGroup = (params: ParamsType) => {
  const queryClinet = useQueryClient();
  const { data } = useQuery({
    queryKey: ["groups", params],
    queryFn: async () => GroupService.fetchGroups(params),
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

  const useGroupById = (id:number) => {
    return useQuery({
      queryKey: ["group", id],
      queryFn: async () => GroupService.getGroupById(id),
      enabled: !!id
    });
  }

  const useGroupAddStudent = () => {
    return useMutation({
      mutationFn: async ({groupId, studentId}: {groupId: number; studentId: number}) => GroupService.addStudentToGroup(groupId, studentId),
    })
  }

  const useGroupAddTeacher = () => {
    return useMutation({
      mutationFn: async ({groupId, teacherId}: {groupId: number; teacherId: number}) => GroupService.addTeacherToGroup(groupId, teacherId),
    })
  }

  return {
    data,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete,
    useGroupById,
    useGroupAddStudent,
  };
};
  