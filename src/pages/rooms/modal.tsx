import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import type { RoomTypes } from "../../types";
import { useBranch } from "../../hooks";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: RoomTypes) => void;
  initialValues?: RoomTypes | null;
};

const RoomModal = ({ open, onCancel, onSubmit, initialValues }: Props) => {
  const [form] = Form.useForm();
  const { data: branchData } = useBranch();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [open]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Room" : "Add Room"}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Submit"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues || { branchId: undefined }}
      >
        <Form.Item
          label="Branch"
          name="branchId"
          rules={[{ required: true, message: "Please select a branch" }]}
        >
          <Select
            placeholder="Select branch"
            loading={!branchData}
            options={
              branchData?.data.branch.map((branch: any) => ({
                value: branch.id,
                label: branch.name,
              })) || []
            }
          />
        </Form.Item>

        <Form.Item
          label="Room Name"
          name="name"
          rules={[{ required: true, message: "Please enter room name" }]}
        >
          <Input placeholder="e.g. Room A" />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: "Please enter capacity" }]}
        >
          <InputNumber
            min={1}
            placeholder="e.g. 25"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;
