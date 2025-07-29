import type { GroupStudentsType } from '../../types'

const GroupStudents = ({students}:GroupStudentsType) => {
  console.log(students);
  return (
    <div>Students</div>
  )
}

export default GroupStudents