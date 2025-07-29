import { Button, Modal, Table, Typography } from "antd";
import { useForm } from "react-hook-form";
import type { StudentTypes } from "../../types";
import { useGroup, useStudent } from "../../hooks";
import { useParams } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const GroupStudentModal = ({ open, onClose, refetch }: Props) => {
  const { id } = useParams();
  const groupId = Number(id);
  const { reset } = useForm<StudentTypes>();
  const { data: students, isLoading } = useStudent({
    page: 1,
    limit: 10,
  });
  const { useGroupAddStudent, useGroupById } = useGroup({
    page: 1,
    limit: 10,
  });
  const { mutate } = useGroupAddStudent();
  const { data: group } = useGroupById(Number(id));

  const onSubmit = (record: StudentTypes) => {
    if (!group?.data) return;
    mutate({
      groupId,
      studentId: record.id,
    });
    reset();
    refetch();
    onClose();
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
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
      title: "Actions",
      render: (_: any, record: StudentTypes) => (
        <Button type="primary" onClick={() => onSubmit(record)}>
          Add
        </Button>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={() => {
        reset();
        onClose();
      }}
      title="Add Student"
      width={800}
      footer={null}
      destroyOnClose
    >
      <Typography.Title level={5}>📋 Existing Students</Typography.Title>
      <Table
        dataSource={students?.data.students ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
        loading={isLoading}
        size="small"
      />
    </Modal>
  );
};

export default GroupStudentModal;
