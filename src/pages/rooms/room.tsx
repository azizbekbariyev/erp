import { Button, Space, Table, type TablePaginationConfig } from "antd";
import type { RoomTypes } from "../../types";
import { useRoom } from "../../hooks/useRoom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeneral } from "../../hooks";
import { PopConfirm } from "../../components";
import { EditOutlined } from "@ant-design/icons";
import RoomModal from "./modal";

const Room = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomTypes | null>(null);
  const location = useLocation();
  const { handlePagination } = useGeneral();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
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
  
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };
  const {
    data: roomData,
    isLoading,
    createRoom,
    updateRoom,
    deleteRoom,
  } = useRoom({
    page: 1,
    limit: 10,
  });
  console.log(roomData);
  const { mutate: deleteMutation, isPending: isDeleting } = deleteRoom();
  const { mutate: createMutation } = createRoom();
  const { mutate: updateMutation, isPending: isUpdating } = updateRoom();

  const handleCreate = () => {
    setEditingRoom(null);
    setModalOpen(true);
  };

  const handleUpdate = (record: RoomTypes) => {
    setEditingRoom(record);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingRoom(null);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (branch: { name: string }) => <span>{branch.name}</span>,
    },
    {
      title: "Action",
      render: (_: any, record: RoomTypes) => (
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
          + Add Room
        </Button>
      </div>

      <Table<RoomTypes>
        dataSource={roomData}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: roomData?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} courses`,
          position: ["bottomCenter"],
        }}
        onChange={handleTableChange}
      />

      <RoomModal
        open={modalOpen}
        onCancel={handleCancel}
        onSubmit={(data) => {
          if (editingRoom) {
            updateMutation({ data, id: editingRoom.id });
          } else {
            createMutation(data);
          }
          setModalOpen(false);
        }}
        initialValues={editingRoom}
      />
    </div>
  );
};

export default Room;
