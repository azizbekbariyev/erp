import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  type TablePaginationConfig,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { CoursesTypes } from "@types";
import { useCourse } from "@hooks";
import { useLocation } from "react-router-dom";
import { useGeneral } from "@hooks";
import { CourseModal } from "./courseModal";

export const Courses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialLimit = Number(queryParams.get("limit")) || 10;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialLimit);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CoursesTypes | null>(
    null
  );
  const [mode, setMode] = useState<"create" | "update">("create");

  const { handlePagination } = useGeneral();
  const {
    data: courseData,
    isLoading,
    deleteCourse,
    createCourse,
    updateCourse,
  } = useCourse({
    page: currentPage,
    limit: pageSize,
  });

  const deleteMutation = deleteCourse();
  const createMutation = createCourse();
  const updateMutation = updateCourse();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({
      pagination,
      setParams: ({ page, limit }) => {
        setCurrentPage(page);
        setPageSize(limit);
      },
    });
  };

  const handleDelete = (course: CoursesTypes) => {
    deleteMutation.mutate(
      { id: course.id },
      {
        onSuccess: () => message.success("Course deleted successfully"),
        onError: () => message.error("Failed to delete course"),
      }
    );
  };

  const handleCreate = () => {
    setSelectedCourse(null);
    setMode("create");
    setModalOpen(true);
  };

  const handleUpdate = (course: CoursesTypes) => {
    setSelectedCourse(course);
    setMode("update");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleModalSubmit = (values: any) => {
    if (mode === "update" && selectedCourse) {
      updateMutation.mutate(
        { id: selectedCourse.id, data: values },
        {
          onSuccess: () => {
            message.success("Course updated successfully");
            handleCloseModal();
          },
          onError: () => message.error("Failed to update course"),
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          message.success("New course created successfully");
          handleCloseModal();
        },
        onError: () => message.error("Failed to create course"),
      });
    }
  };

  const columns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) =>
        price ? `${price.toLocaleString()} UZS` : "Free",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (active: boolean) => (
        <span
          style={{
            color: active ? "#52c41a" : "#ff4d4f",
            fontWeight: "bold",
          }}
        >
          {active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_: any, record: CoursesTypes) => (
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
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Courses</h2>
        <Button type="primary" onClick={handleCreate}>
          + Add Course
        </Button>
      </div>

      <Table<CoursesTypes>
        dataSource={courseData}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: courseData?.data?.total || 0,
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
        onCancel={handleCloseModal}
        onSubmit={handleModalSubmit}
        course={selectedCourse}
        mode={mode}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default Courses;
