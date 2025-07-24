import React from 'react'
import type { GroupTeachersType } from '../../types'

const GroupTeachers = ({teachers}:GroupTeachersType) => {
  console.log(teachers);
  return (
    <div>Teachers</div>
  )
}

export default GroupTeachers