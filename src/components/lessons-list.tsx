import { useRef, useState } from "react";
import type { GroupLessonsType, Lessons } from "@types";
import { Button } from "antd";

const LessonsList = ({ lessons }: GroupLessonsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPostion, setScrollPostion] = useState(0);

  const goNext = () => {
    containerRef.current?.scrollBy({ left: 40, behavior: "smooth" });
  };

  const goPrev = () => {
    containerRef.current?.scrollBy({ left: -40, behavior: "smooth" });
  };

  const handelScroll = () => {
    if (containerRef.current) {
      setScrollPostion(containerRef.current.scrollLeft);
    }
  };

  const isStartDisabled = () => {
    if (!containerRef.current) return true;
    return scrollPostion <= 5;
  };

  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current;
    return scrollPostion + container.clientWidth >= container.scrollWidth - 10
  };

  return (
    <div className="flex gap-2 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
        Prev
      </Button>
      <div
        className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
        onScroll={handelScroll}
      >
        {lessons.map((lesson: Lessons, index: number) => {
          return (
            <div key={lesson.id} className="p-3 bg-[#ccc] rounded-lg cursor-pointer">
              <span>{index + 1}</span>
            </div>
          );
        })}
      </div>
      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
        Next
      </Button>
    </div>
  );
};

export default LessonsList;
