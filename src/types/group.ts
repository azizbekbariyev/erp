import type { Lessons } from "./general";
import type { StudentTypes } from "./student";
import type { TeacherTypes } from "./teacher";

export interface GroupTypes {
  id?: number;
  title: string;
  course_id: number;
  course?: {
    id: number;
    title: string;
  };
  teacherId: number[];
  status: string;
  start_date: string;
  end_date: string;
  studentId: number[];
}


export interface GroupLessonsType {
  lessons:Lessons[]
}

export interface GroupStudentsType {
  students:StudentTypes[]
}

export interface GroupTeachersType {
  teachers:TeacherTypes[]
}