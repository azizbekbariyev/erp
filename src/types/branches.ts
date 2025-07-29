import type { TeacherTypes } from "./teacher";

export interface BranchTypes {
  id: number;
  name: string;
  address: string;
  call_number: string;
  teachers: TeacherTypes[];
  created_at: string;
  updated_at: string;
}
