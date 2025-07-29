import { useParams } from 'react-router-dom';
import { useGroup } from '../../hooks';
import GroupLessons from '../../components/group/lessons';

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { lessons } = useGroup({ page: 1, limit: 10 }, Number(id));

  console.log("LESSONS DATA:", lessons?.data?.lessons); // Tashqarida console.log

  return (
    <div className='px-6'>
      {/* {teachers?.data?.length > 0 && <GroupTeachers teachers={teachers.data} />} */}
      {Array.isArray(lessons?.data?.lessons) && lessons.data.lessons.length > 0 && (
        <GroupLessons lessons={lessons.data.lessons} />
      )}
      {/* {students?.data?.length > 0 && <GroupStudents students={students.data} />} */}
    </div>
  );
};

export default SingleGroup;
