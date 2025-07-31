import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherSerivce } from "@service/teachers.service";
import type { ParamsType, TeacherTypes } from "@types";

export const useTeacher = (params?:ParamsType, id?:number) => {
  const queryClinet = useQueryClient();
  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ["teacher", params],
    queryFn: async () => TeacherSerivce.getAllTeacher(params!),
  });

  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: async (data: TeacherTypes) =>
        TeacherSerivce.createTeacher(data),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: TeacherTypes }) =>
        TeacherSerivce.updateTeacher(data, id),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  const useTeacherDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => TeacherSerivce.deleteTeacher(id),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["teacher"] });
      },
    });
  };

  const useTeacherById = (id:number) =>{
    return useQuery({
      queryKey: ["teacher", id],
      queryFn: async () => TeacherSerivce.getTeacherById(id),
    });
  }

  const useGroupTeacher = useQuery({
    queryKey: ["group-teachers"],
    queryFn: async () => TeacherSerivce.getTeacherGroups(),
  })

  const groupTeacher = useGroupTeacher.data


  return {
    data,
    isLoading,
    groupTeacher,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
    useTeacherById,
  };
};
