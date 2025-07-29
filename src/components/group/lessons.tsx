import type { GroupLessonsType } from "@types";
import LessonsList from "../lessons-list";

const GroupLessons = ({ lessons }: GroupLessonsType) => {
  return <LessonsList lessons={lessons}/>
};

export default GroupLessons;
