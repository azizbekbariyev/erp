import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";
import type { TeacherTypes } from "../../types";
import { useBranch } from "../../hooks";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: TeacherTypes) => void;
  initialValues?: TeacherTypes | null;
};

const TeacherModal = ({ open, onCancel, onSubmit, initialValues }: Props) => {
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
      title={initialValues ? "Edit Teacher" : "Add Teacher"}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Submit"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="e.g. Ali" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="e.g. Valiyev" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="+998 90 123 45 67" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Email is not valid" },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        {!initialValues && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>
        )}

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select
            placeholder="Select role"
            options={[
              { value: "teacher", label: "Teacher" },
              { value: "admin", label: "Admin" },
              { value: "main teacher", label: "Main Teacher" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Branch"
          name="branchId"
          rules={[{ required: true, message: "Please select branch" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select branches"
            loading={!branchData}
            options={
              branchData?.data?.branch?.map((branch: any) => ({
                value: branch.id,
                label: branch.name,
              })) || []
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherModal;
