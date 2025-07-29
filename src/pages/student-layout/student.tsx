import { useEffect, useState } from "react";
import { useStudent } from "../../hooks";
import { Table, Button, Space } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { StudentTypes } from "../../types";
import { PopConfirm } from "../../components";
import StudentModal from "./modal";

const Students = () => {
  const [students, setStudents] = useState<StudentTypes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState<StudentTypes | null>(null);

  const { data, useStudentCreate, useStudentDelete, useStudentUpdate } = useStudent({
    page: 1,
    limit: 10,
  });

  const { mutate: createMutation, isPending: isCreating } = useStudentCreate();
  const { mutate: deleteMutation, isPending: isDeleting } = useStudentDelete();
  const { mutate: updateMutation, isPending: isUpdating } = useStudentUpdate();

  useEffect(() => {
    if (data?.data.data && Array.isArray(data.data.data)) {
      setStudents(data.data.data as StudentTypes[]);
    } else {
      setStudents([]);
    }
  }, [data]);

  const handleOpenModal = () => {
    setUpdate(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setUpdate(null);
  };

  const handleUpdate = (record: StudentTypes) => {
    setUpdate(record);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const handleSubmit = (values: any) => {
    if (update) {
      console.log("Update",values);
      updateMutation(
        { id: update.id, data: values },
        {
          onSuccess: () => {
            handleCloseModal();
          },  
        }
      );
    } else {
      console.log("Create",values);
      createMutation(values, {
        onSuccess: () => {
          handleCloseModal();
        },
      });
    }
  };

  const columns = [
    {
      title: "ID",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a: StudentTypes, b: StudentTypes) =>
        a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a: StudentTypes, b: StudentTypes) =>
        a.last_name.localeCompare(b.last_name),
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
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string) =>
        gender === "male" ? "Male" : gender === "female" ? "Female" : "-",
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("en-US") : "-",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (active: boolean) =>
        active ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>Inactive</span>
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: StudentTypes) => (
        <Space>
          <Button
          type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            disabled={isUpdating}
          />
          <PopConfirm
            handleDelete={() => handleDelete(record.id)}
            loading={ isDeleting }
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          Add Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={students || []}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={isCreating || isUpdating || isDeleting}
      />

      <StudentModal
        open={modalOpen}
        onCancel={handleCloseModal}
        onSubmit={handleSubmit}
        loading={isCreating || isUpdating}
        initialValues={update}
      />
    </div>
  );
};

export default Students;