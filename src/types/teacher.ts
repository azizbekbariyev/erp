export interface TeacherTypes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: "main teacher" | "assistant teacher";
  is_active: boolean;
  refersh_token_hash: string | null;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
