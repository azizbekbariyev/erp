import React from 'react';
import { useParams } from 'react-router-dom';
import { useGroup } from '../../hooks';
import GroupTeachers from '../../components/group/teachers';
import GroupLessons from '../../components/group/lessons';
import GroupStudents from '../../components/group/students';

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const { students, lessons, teachers } = useGroup({ page: 1, limit: 10 }, Number(id));

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
