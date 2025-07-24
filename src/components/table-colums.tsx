import type { TableProps } from "antd"
import type { GroupTypes } from "../types"
// GROUP COLUMNS
export const GroupColumns:TableProps<GroupTypes>["columns"] = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course:{title: string}) => <span>{course.title}</span>,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
]

// STUDENT COLUMNS