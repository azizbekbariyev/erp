import { Modal, Form, Select, DatePicker, Switch, Button } from "antd";
import type { StudentTypes } from "../../types";
import dayjs from "dayjs";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  students: StudentTypes[];
}

const AddStudentModal = ({
  open,
  onClose,
  onSubmit,
  loading,
  students,
}: AddStudentModalProps) => {
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
  
  console.log(students);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Add Student to Group"
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="studentId"
          label="Select Students"
          rules={[{ required: true, message: "Please select students" }]}
        >
          <Select mode="multiple" placeholder="Choose students">
            {students.map((student) => (
              <Select.Option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
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
            Add to Group
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStudentModal;
