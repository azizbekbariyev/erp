import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import type { StudentTypes } from "../../types";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: StudentTypes | null;
  loading?: boolean;
};

const StudentModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  loading = false,
}: Props) => {
  const [form] = Form.useForm();
  const isEditMode = Boolean(initialValues);
  // const { data: lidOptions, isLoading: lidLoading } = useLid();
  // const { data: roomOptions, isLoading: roomLoading } = useRoom();

  useEffect(() => {
    if (open) {
      if (isEditMode && initialValues) {
        form.setFieldsValue({
          ...initialValues,
          date_of_birth: initialValues.date_of_birth
            ? dayjs(initialValues.date_of_birth)
            : null,
          lidId: initialValues.lidId || undefined,
          events: initialValues.events || [],
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          is_active: true,
          lidId: undefined,
          events: [],
        });
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth
        ? values.date_of_birth.format("YYYY-MM-DD")
        : null,
    };
    console.log("Formatted Values:", formattedValues);
    onSubmit(formattedValues);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title={isEditMode ? "Edit Student" : "Add Student"}
      okText={isEditMode ? "Save" : "Create"}
      confirmLoading={loading}
      cancelButtonProps={{ disabled: loading }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input disabled={loading} placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input disabled={loading} placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email" },
          ]}
        >
          <Input disabled={loading} placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input disabled={loading} placeholder="+998..." />
        </Form.Item>

        {!isEditMode && (
          <>
            <Form.Item
              label="Password"
              name="password_hash"
              rules={[
                { required: true, message: "Please enter password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password disabled={loading} placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={["password_hash"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password_hash") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                disabled={loading}
                placeholder="Confirm password"
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select
            disabled={loading}
            placeholder="Select gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          rules={[{ required: true, message: "Please select date of birth" }]}
        >
          <DatePicker
            disabled={loading}
            style={{ width: "100%" }}
            placeholder="Select birth date"
            disabledDate={(current) => current && current > dayjs()}
          />
        </Form.Item>

        {/* <Form.Item label="Active" name="is_active" valuePropName="checked">
          <Switch disabled={loading} />
        </Form.Item> */}

        {/* <Form.Item
          label="Lid"
          name="lidId"
          rules={[{ required: true, message: "Please select a lid" }]}
        >
          <Select
            disabled={loading || lidLoading}
            placeholder="Select a lid"
            options={
              lidOptions?.lid?.map((lid: LidTypes) => ({
                label: `${lid.first_name} ${lid.last_name}`,
                value: lid.id,
              })) || []
            }
            showSearch
            optionFilterProp="label"
            allowClear
          />
        </Form.Item>

        <Form.Item label="Rooms" name="events">
          <Select
            disabled={loading || roomLoading}
            mode="multiple"
            placeholder="Select rooms"
            options={
              roomOptions?.map((room: RoomTypes) => ({
                label: room.name,
                value: room.id,
              })) || []
            }
            showSearch
            optionFilterProp="label"
            allowClear
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default StudentModal;
