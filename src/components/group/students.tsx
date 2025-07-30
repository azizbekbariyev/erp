import { Button, Table, Tag } from "antd";
import type { GroupStudentsType } from "../../types";
import type { ColumnsType } from "antd/es/table";

const GroupStudents = ({ students }: GroupStudentsType) => {
  const columns: ColumnsType<GroupStudentsType["students"][0]> = [
    {
      title: "STUDENTS",
      key: "student",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>
            {record.student.first_name} {record.student.last_name}
          </div>
          <div style={{ color: "#999" }}>{record.student.gender}</div>
        </div>
      ),
    },
    {
      title: "PHONE",
      key: "phone",
      render: (_, record) => record.student.phone,
    },
    {
      title: "MAIL",
      key: "email",
      render: (_, record) => record.student.email,
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, record) =>
        record.status ? (
          <Tag color="green">✅ Active</Tag>
        ) : (
          <Tag color="red">❌ Inactive</Tag>
        ),
    },
    {
      title: "BIRTH DATE",
      key: "birthDate",
      render: (_, record) => record.student.date_of_birth,
    },
  ];

  return (
    <div className="flex flex-col gap-4 border rounded-lg px-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 p-4">
          <h1>Students</h1>
          <span>{students.length}</span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Button type="primary">+ Add student</Button>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={students}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default GroupStudents;
