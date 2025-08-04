import type { GroupLessonsType } from "@types";
import LessonsList from "../lessons-list";
import { useEffect, useState } from "react";

const GroupLessons = ({ lessons }: GroupLessonsType) => {
  const [canceled, setCanceled] = useState(0);
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(0);
  // const [progress, setProgress] = useState(0)

  useEffect(() => {
    const canceled = lessons.filter((item) => item.status === "cancelled");
    const active = lessons.filter((item) => item.status === "new");
    const completed = lessons.filter((item) => item.status === "completed");
    // const progress = lessons.filter((item) => item.status === "progress")

    setCanceled(canceled.length);
    setActive(active.length);
    setCompleted(completed.length);
    // setProgress(progress.length)
  }, [lessons]);

  return (
    <div className="border rounded-lg gap-6 p-4">
      <div className="flex flex-row items-center justify-between">
        <span>Lessons</span>
        <div className="flex flex-row gap-6">
          <span>All: {lessons.length}</span>
          <span>Completed: {completed}</span>
          <span>Canceled: {canceled}</span>
          <span>Progress: 1</span>
          <span>New: {active}</span>
        </div>
      </div>
      <div className="w-full max-w-[1600px] mx-auto overflow-x-auto">
        <LessonsList lessons={lessons} />
      </div>
    </div>
  );
};

export default GroupLessons;
