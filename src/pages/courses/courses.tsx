import { Button, Space, Table, type TablePaginationConfig } from "antd";
import { useCourse, useGeneral } from "../../hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import type { CoursesTypes } from "../../types";
import { PopConfirm } from "../../components";
import CourseModal from "./courseModal";

const Course = () => {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data, isLoading, createCourse, updateCourse, deleteCourse } =
    useCourse(params);
  const { mutate: createMutation } = createCourse();
  const { mutate: updateMutation, isPending: isUpdating } = updateCourse();
  const { mutate: deleteMutation, isPending: isDeleting } = deleteCourse();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CoursesTypes | null>(
    null
  );
  const location = useLocation();
  const { handlePagination } = useGeneral();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams({ page: Number(page), limit: Number(limit) });
    }
  }, [location.search]);

  const handleCreate = () => {
    setSelectedCourse(null);
    setModalOpen(true);
  };

  const handleUpdate = (record: CoursesTypes) => {
    setSelectedCourse(record);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const handleModalSubmit = (values: CoursesTypes) => {
    if (selectedCourse) {
      updateMutation({ id: selectedCourse.id, data: values });
    } else {
      createMutation(values);
    }
    setModalOpen(false);
  };

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Lessons in a week",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Lessons in a month",
      dataIndex: "lessons_in_a_month",
      key: "lessons_in_a_month",
    },
    {
      title: "Lesson duration",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (val: boolean) => (val ? "✅ Ha" : "❌ Yo'q"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CoursesTypes) => (
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
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        + Add Course
      </Button>

      <Table
        dataSource={data || []}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} courses`,
          position: ["bottomCenter"],
        }}
        onChange={handleTableChange}
      />

      <CourseModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={selectedCourse}
      />
    </div>
  );
};

export default Course;
