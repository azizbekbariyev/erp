import type { BranchTypes } from "./branches";

export interface EventTypes {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  is_active: boolean;
  branch: BranchTypes;
}
