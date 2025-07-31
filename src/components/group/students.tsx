import { Button, Table, Tag } from "antd";
import type { GroupStudentsType, GroupStudentType, StudentTypes } from "../../types";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddStudentModal from "./add-student";
import { useGroup, useStudent } from "../../hooks";
import { useParams } from "react-router-dom";

const GroupStudents = ({ students }: GroupStudentsType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id: groupId } = useParams();
  const { useGroupStudent } = useGroup();
  const { data } = useStudent({
    page: 1,
    limit: 20,
  });
  const allStudents: StudentTypes[] = data?.data.data || [];
  const { mutate: createMutate, isPending: isCreating } = useGroupStudent();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    const payload: GroupStudentType = {
      groupId: groupId!,
      studentId: values.studentId.map((id: number) => id.toString()),
      status: values.status,
      start_date: values.start_date,
    }; 

    console.log("Yuboriladigan payload:", payload);
    createMutate(payload);
  };

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
          <Button type="primary" onClick={handleOpenModal}>
            + Add student
          </Button>
          <AddStudentModal
            open={modalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            loading={isCreating}
            students={allStudents.map((student) => student)}
          />
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
