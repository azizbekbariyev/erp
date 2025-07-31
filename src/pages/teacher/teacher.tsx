import { Button, Space, Table, type TablePaginationConfig } from "antd";
import { useGeneral, useTeacher } from "../../hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import type { TeacherTypes } from "../../types";
import { PopConfirm } from "../../components";
import TeacherModal from "./teacherModal";

const Teacher = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data,
    isLoading,
    useTeacherDelete,
    useTeacherCreate,
    useTeacherUpdate,
  } = useTeacher(params);
  const { mutate: deleteMutation, isPending: isDeleting } = useTeacherDelete();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherTypes | null>(
    null
  );

  const { mutate: createMutation } = useTeacherCreate();
  const { mutate: updateMutation, isPending: isUpdating } = useTeacherUpdate();
  const teachers = data?.data.data;
  const { handlePagination } = useGeneral();
  const location = useLocation();
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const handleCreate = () => {
    setSelectedTeacher(null);
    setModalOpen(true);
  };

  const handleUpdate = (record: TeacherTypes) => {
    setSelectedTeacher(record);
    setModalOpen(true);
  };

  const handleModalSubmit = (values: any) => {
    if (selectedTeacher) {
      updateMutation({ id: selectedTeacher.id, data: values });
    } else {
      createMutation(values);
    }
    setModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (value: boolean) => (value ? "✅ Ha" : "❌ Yo'q"),
    },
    {
      title: "Rasm",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="Avatar"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
        ) : (
          "Yo'q"
        ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => new Date(value).toLocaleString("uz-UZ"),
    },
    {
      title: "Actions",
      render: (_: any, record: TeacherTypes) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            disabled={isUpdating}
          />
          <PopConfirm
            handleDelete={() => handleDelete(record.id)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <h1>Teachers</h1>
        <Button
          type="primary"
          onClick={handleCreate}
          style={{ marginBottom: 16 }}
        >
          + Add Teacher
        </Button>
      </div>

      <Table
        dataSource={teachers}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} teachers`,
          position: ["bottomCenter"],
        }}
        onChange={handleTableChange}
      />
      <TeacherModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={selectedTeacher}
      />
    </div>
  );
};

export default Teacher;
