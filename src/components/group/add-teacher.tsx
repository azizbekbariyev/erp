import { Modal, Form, Select, DatePicker, Switch, Button } from "antd";
import type { TeacherTypes } from "../../types";
import dayjs from "dayjs";

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  teachers: TeacherTypes[];
}

const AddTeacherModal = ({
  open,
  onClose,
  onSubmit,
  loading,
  teachers,
}: AddTeacherModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      status: values.status ?? true,
    };
    onSubmit(formattedValues);
    form.resetFields();
  };

  console.log(teachers);

  return (
    <Modal open={open} onCancel={onClose} title="Add Teacher to Group" footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="teacherId"
          label="Select Teachers"
          rules={[{ required: true, message: "Please select teacher(s)" }]}
        >
          <Select mode="multiple" placeholder="Choose teachers">
            {teachers.map((teacher) => (
              <Select.Option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[{ required: true, message: "Please select start date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Add Teacher
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeacherModal;
