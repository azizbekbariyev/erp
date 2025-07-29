import { Button, Space, Table } from "antd";
import { PopConfirm } from "../../components";
import { useState } from "react";
import { useCourse, useGroup } from "@hooks";
import ModalGroupForm from "./modal";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { GroupTypes } from "../../types";
import { GroupColumns } from "../../components/table-colums";

const Groups = () => {
  const {
    data: groups,
    refetch,
    useGroupCreate,
    useGroupDelete,
  } = useGroup({ limit: 10, page: 1 });
  const { data: courses } = useCourse({ limit: 100, page: 1 });
  const {mutate: deleteMutation, isPending: isDeletePending} = useGroupDelete();
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedGroup, setSelectedGroup] = useState(null);
  const [update, setUpdate] = useState<GroupTypes | null>(null);

  const createGroup = useGroupCreate();

  const handleOpenModal = () => {
    setUpdate(null);
    setModalOpen(true);
  };

  const deleteItem = (id: number) => {
    deleteMutation(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    createGroup.mutate(values, {
      onSuccess: () => {
        refetch();
        setModalOpen(false);
      },
    });
  };
const editItem = (record: GroupTypes) => {
    setUpdate(record);
    setModalOpen(true);
  };

  const columns = [
    ...(GroupColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: GroupTypes) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeletePending}
          />
          <Link to={`/admin/group/${record.id}`}>view</Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Groups</h2>
        <Button type="primary" onClick={handleOpenModal}>
          + Add Group
        </Button>
      </div>

      <Table
        dataSource={groups?.data?.data || []}
        columns={columns}
        rowKey="id"
      />

      <ModalGroupForm
        open={modalOpen}
        onCancel={handleCloseModal}
        onSubmit={handleSubmit}
        loading={createGroup.isPending}
        courses={courses?.data?.data || []}
        initialValues={update}
      />
    </>
  );
};

export default Groups;
