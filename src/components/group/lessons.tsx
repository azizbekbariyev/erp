  import { useEffect, useRef } from 'react';
  import type { GroupLessonsType, Lessons } from '@types';
  import { Button } from 'antd';

  const GroupLessons = ({ lessons }: GroupLessonsType) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current) {
        console.log(containerRef.current.offsetWidth);
      }
    }, []);

    const goNext = () => {
      
    }

    return (
      <div className="flex gap-1 items-center" ref={containerRef}>
        <Button type="primary">Prev</Button>
        <div className="overflow-auto flex gap-1 ">
          {
            lessons.map((lesson: Lessons, index: number) => {
              return (
                <div
                  key={lesson.id}
                  className="p-3 bg-[#ccc] rounded-lg"
                >
                  <span>{index + 1}</span>
                </div>
              );
            })
          }
        </div>
        <Button type="primary" onClick={goNext}>Next</Button>
      </div>
    );
  };

  export default GroupLessons;
