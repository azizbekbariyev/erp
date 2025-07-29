export interface StudentTypes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  gender: "male" | "female";
  date_of_birth: string;
  avatar_url: string | null;
  refersh_token_hash: string | null;
  lidId?: number;
  events?: any[];
  created_at: string;
  updated_at: string;
}
