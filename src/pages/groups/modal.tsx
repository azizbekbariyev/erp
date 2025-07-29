import { Modal, Form, Input, DatePicker, Select, TimePicker } from "antd";

interface ModalGroupFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  courses: any[];
  initialValues?: any;
}

const ModalGroupForm = ({ open, onCancel, onSubmit, loading, courses, initialValues }: ModalGroupFormProps) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date.format("YYYY-MM-DD"),
        start_time: values.start_time.format("HH:mm"),
        end_time: values.end_time.format("HH:mm"),
      };
      onSubmit(payload);
    });
  };

  return (
    <Modal
      open={open}
      title="Add Group"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="name" label="Group Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="course_id" label="Course" rules={[{ required: true }]}>
          <Select placeholder="Select a course">
            {courses.map((course) => (
              <Select.Option key={course.id} value={course.id}>
                {course.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="end_date" label="End Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="start_time" label="Start Time" rules={[{ required: true }]}>
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item name="end_time" label="End Time" rules={[{ required: true }]}>
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalGroupForm;
