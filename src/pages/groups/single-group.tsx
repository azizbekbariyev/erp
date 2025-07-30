import { useParams } from "react-router-dom";
import { useGroup } from "../../hooks";
import GroupLessons from "../../components/group/lessons";
import GroupStudents from "../../components/group/students";
import GroupTeachers from "../../components/group/teachers";

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { lessons } = useGroup({ page: 1, limit: 10 }, Number(id));
  const { useGroupById } = useGroup({ page: 1, limit: 10 });
  const { teachers } = useGroup({ page: 1, limit: 10 }, Number(id));
  const { students } = useGroup({ page: 1, limit: 10 }, Number(id));
  const { data: group } = useGroupById(Number(id));
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center p-4 rounded-lg border gap-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Group name:{" "}
          <span className="font-bold text-blue-600">
            {group?.data.group.name}
          </span>
        </h1>
        <div className="flex flex-row gap-4">
          <p>Start date: {group?.data.group.start_date}</p>
          <p>End date: {group?.data.group.end_date}</p>
          <p>
            Time: {group?.data.group.start_time} - {group?.data.group.end_time}
          </p>
          <p>Status: {group?.data.group.status}</p>
        </div>
        <div>
          <p>Course: {group?.data.group.course.title}</p>
          <p>Description: {group?.data.group.course.description}</p>
          {/* Duration: 8 monthPer week: 5 lessonLesson time: 240 minPrice: 250,000 sum */}
          <div className="flex flex-row gap-4">
            <p>Duration: {group?.data.group.course.duration} month</p>
            <p>Per week: {group?.data.group.course.per_week} lesson</p>
            <p>Lesson time: {group?.data.group.course.lesson_duration} min</p>
          </div>
        </div>
      </div>
      {teachers?.data?.length > 0 && (
        <GroupTeachers teachers={teachers?.data} />
      )}
      {Array.isArray(lessons?.data?.lessons) &&
        lessons.data.lessons.length > 0 && (
          <GroupLessons lessons={lessons.data.lessons} />
        )}
      {students?.data?.length > 0 && (
        <GroupStudents students={students?.data} />
      )}
    </div>
  );
};

export default SingleGroup;
