export interface LidTypes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  target: string;
  test_date: string | null;
  trial_lesson_date: string | null;
  groupId: number | null;
  lid_status: string;
  cancel_reason: string | null;
  is_active: boolean;
  refresh_token_hash: string | null;
  created_at: string;
  updated_at: string;
}