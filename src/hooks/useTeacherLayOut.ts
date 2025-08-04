import { useQuery } from "@tanstack/react-query";
import { TeacherSerivce } from "../service/teachers.service";

export const useTeacherLayOut = () => {
  const useGroupTeacher = useQuery({
    queryKey: ["group-teachers"],
    queryFn: async () => TeacherSerivce.getTeacherGroups(),
  });

  const groupTeacher = useGroupTeacher.data;

  return {
    groupTeacher,
  };
};
