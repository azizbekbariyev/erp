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
  students:{
    id: number;
    start_date: string;
    end_date: string;
    status: boolean;
    student: StudentTypes
  }[]
}

export interface GroupTeachersType {
  teachers: {
    id: number;
    start_date: string;
    end_date: string;
    status: boolean;
    teacher: TeacherTypes;
  }[];
}

export interface GroupStudentType{
  groupId: string;
  studentId: []
  status: boolean
  start_date:Date
}

export interface GroupTeacherType{
  groupId: number;
  teacherId: []
  status: boolean
  start_date:Date
}