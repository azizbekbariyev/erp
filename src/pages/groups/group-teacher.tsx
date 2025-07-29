import { Button, Modal, Table, Typography } from "antd";
import type { TeacherTypes } from "../../types";
import { useForm } from "react-hook-form";
import { useGroup, useTeacher } from "../../hooks";
import { useParams } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GroupTeacherModal = ({ open, onClose }: Props) => {
  const { id } = useParams(); 
  // const groupId = Number(id);
  const { reset } = useForm<TeacherTypes>();
  const { data: teachers } = useTeacher({
    page: 1,
    limit: 10,
  });
  const { useGroupById } = useGroup({
    page: 1,
    limit: 10,
  });
  // const { mutate } = useGroupUpdate();
  const { data: group } = useGroupById(Number(id));

  const onSubmit = (record: TeacherTypes) => {
    if (!group?.data) return;
    // mutate({ groupId, teacherId: record.id });
    console.log(record);
    reset();
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
      render: (_: any, record: TeacherTypes) => (
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
      title="Add Teacher"
      width={800}
      footer={null}
      destroyOnClose
    >
      <Typography.Title level={5}>📋 Existing Teachers</Typography.Title>
      <Table
        dataSource={teachers?.data.teachers ?? []}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </Modal>
  );
};

export default GroupTeacherModal;
