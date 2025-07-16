import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { Button, Popconfirm, Space, Table } from "antd";
import type { StudentTypes } from "../../types";
import { EditOutlined } from "@ant-design/icons";
import GroupStudentModal from "./groupStudent";
import { useState } from "react";
import GroupTeacherModal from "./groupTeacher";

const Group = () => {
  const id = Number(useParams().id);
  const [openStudent, setStudentOpen] = useState(false);
  const [openTeacher, setTeacherOpen] = useState(false);
  const { useGroupById, useGroupDelete } = useGroup();
  const { data: group, isLoading } = useGroupById(id);
  const { mutate: deleteGroup } = useGroupDelete();

  if (isLoading) return <p>Loading...</p>;
  if (!group) return <p>Group not found</p>;

  const handleUpdate = (record: StudentTypes) => {
    console.log(record);
  };

  const handleDelete = (record: StudentTypes) => {
    deleteGroup(record.id);
  };

  const columsTeacher = [
    {
      title: "First name",
      dataIndex: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (_: any, record: StudentTypes) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this group?"
            onConfirm={() => handleDelete(record)}
          >
            <Button className="w-[20%]" onClick={() => handleDelete(record)}>
              🗑
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnsStudent = [
    {
      title: "First name",
      dataIndex: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Date of birth",
      dataIndex: "date_of_birth",
    },
    {
      title: "Actions",
      render: (_: any, record: StudentTypes) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this group?"
            onConfirm={() => handleDelete(record)}
          >
            <Button className="w-[20%]">🗑</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">
        {group.data.group.name}
      </h1>

      <div>
        <h2 className="text-xl font-semibold">👨‍🏫 Teachers</h2>
        <Button type="primary" onClick={() => setTeacherOpen(true)}>
          + Add Teacher
        </Button>
        <GroupTeacherModal
          open={openTeacher}
          onClose={() => setTeacherOpen(false)}
        />
        <Table
          dataSource={
            group.data.group.teachers ? group.data.group.teachers : []
          }
          columns={columsTeacher}
          rowKey="id"
          loading={!group.data.group.teachers}
          onChange={(e) => console.log(e)}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Students</h2>
        <Button type="primary" onClick={() => setStudentOpen(true)}>
          + Add Student
        </Button>
        <GroupStudentModal
          open={openStudent}
          onClose={() => setStudentOpen(false)}
        />
        <ul className="list-disc pl-6">
          <Table
            dataSource={
              group.data.group.students ? group.data.group.students : []
            }
            columns={columnsStudent}
            rowKey="id"
            loading={!group.data.group.students}
            onChange={(e) => console.log(e)}
          />
        </ul>
      </div>
    </div>
  );
};

export default Group;
