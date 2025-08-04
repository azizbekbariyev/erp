import { useRef, useState, useEffect } from "react";
import type { GroupLessonsType, Lessons } from "@types";
import { Button, Modal } from "antd";

const LessonsList = ({ lessons }: GroupLessonsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPostion, setScrollPostion] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scrollni markazga joylash: in_progress elementni o‘rtaga olib kelish
  useEffect(() => {
    if (!containerRef.current) return;

    const index = lessons.findIndex((l) => l.status === "in_progress");
    if (index !== -1) {
      const scrollTo = index * 110 - containerRef.current.clientWidth / 2 + 55; // 110 = width + gap
      containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [lessons]);

  const goNext = () => {
    containerRef.current?.scrollBy({ left: 120, behavior: "smooth" });
  };

  const goPrev = () => {
    containerRef.current?.scrollBy({ left: -120, behavior: "smooth" });
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
    return scrollPostion + container.clientWidth >= container.scrollWidth - 10;
  };

  const getBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "in_progress":
        return "bg-yellow-400";
      case "new":
      default:
        return "bg-gray-300";
    }
  };

  const openModal = (lesson: Lessons) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  return (
    <div className="flex gap-2 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
        Prev
      </Button>
      <div
        className="overflow-hidden flex gap-2 [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
        onScroll={handelScroll}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {lessons.map((lesson, index) => {
          const bgColor = getBgColor(lesson.status);
          const shapeClass =
            lesson.status === "completed" ? "rounded-none" : "rounded-lg";

          return (
            <div
              key={lesson.id}
              onClick={() => openModal(lesson)}
              className={`w-[100px] h-[100px] ${shapeClass} ${bgColor} p-2 text-white flex flex-col justify-center items-center cursor-pointer`}
              style={{ scrollSnapAlign: "center" }}
            >
              <div className="font-bold text-lg">{index + 1}</div>
              <div className="text-sm text-center">{lesson.status}</div>
            </div>
          );
        })}
      </div>
      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
        Next
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Lesson Info"
      >
        {selectedLesson && (
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {selectedLesson.id}
            </div>
            <div>
              <strong>Status:</strong> {selectedLesson.status}
            </div>
            {/* Qo‘shimcha maydonlar shu yerga */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LessonsList;
