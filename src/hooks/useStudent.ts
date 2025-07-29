import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType, StudentTypes } from "../types";
import { StudentSerivce } from "@service/student.service";
export const useStudent = (params: ParamsType) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const response = await StudentSerivce.getAllStudent(params);
      return response;
    },
  });

  const useStudentCreate = () =>
    useMutation({
      mutationFn: (data: StudentTypes) => StudentSerivce.createStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  const useStudentUpdate = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: number; data: StudentTypes }) =>
        StudentSerivce.updateStudent(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });

  const useStudentDelete = () =>
    useMutation({
      mutationFn: (id: number) => StudentSerivce.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });

  const useStudentById = (id: number) => {
    return useQuery({
      queryKey: ["student", id],
      queryFn: async () => StudentSerivce.getStudentById(id),
    });
  };
  return {
    data,
    isLoading,
    error,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
    useStudentById,
  };
};
