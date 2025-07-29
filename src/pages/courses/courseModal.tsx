import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import type { CoursesTypes } from "@types";

interface CourseModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CoursesTypes) => void;
  course?: CoursesTypes | null;
  loading?: boolean;
  mode: "create" | "update";
}

const { TextArea } = Input;

export const CourseModal: React.FC<CourseModalProps> = ({
  open,
  onCancel,
  onSubmit,
  course,
  loading = false,
  mode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (course && mode === "update") {
        form.setFieldsValue({
          title: course.title,
          description: course.description,
          price: course.price,
          duration: course.duration,
          lessons_in_a_week: course.lesson_in_a_week,
          lessons_in_a_month: course.lessons_in_a_month,
          lesson_duration: course.lesson_duration,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, course, form, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields()
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={mode === "update" ? "Edit Course" : "Create New Course"}
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText={mode === "update" ? "Save" : "Create"}
      cancelText="Cancel"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
          price: 0,
          duration: 1,
          lessons_in_a_week: 3,
          lessons_in_a_month: 12,
          lesson_duration: 120,
        }}
      >
        <Form.Item
          name="title"
          label="Course Name"
          rules={[{ required: true, message: "Course name is required!" }]}
        >
          <Input placeholder="e.g. Frontend" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (UZS)"
          rules={[
            { required: true, message: "Price is required!" },
            { type: "number", min: 0, message: "Price must be non-negative!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            step={10000}
            placeholder="e.g. 250000"
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Course Duration (in months)"
          rules={[
            { required: true, message: "Duration is required!" },
            { type: "number", min: 1, max: 24, message: "Duration must be between 1 and 24 months!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            max={24}
            placeholder="e.g. 3"
          />
        </Form.Item>

        <Form.Item
          name="lessons_in_a_week"
          label="Lessons per Week"
          rules={[{ required: true, message: "Please select lessons per week!" }]}
        >
          <Select
            placeholder="Select lessons per week"
            onChange={(value) => {
              // Auto-calculate lessons per month (assuming 4 weeks/month)
              form.setFieldsValue({ lessons_in_a_month: value * 4 });
            }}
          >
            <Select.Option value={3}>3</Select.Option>
            <Select.Option value={5}>5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="lessons_in_a_month"
          label="Lessons per Month"
          rules={[{ required: true, message: "Please select lessons per month!" }]}
        >
          <Select placeholder="Select lessons per month">
            <Select.Option value={12}>12</Select.Option>
            <Select.Option value={20}>20</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="lesson_duration"
          label="Lesson Duration (minutes)"
          rules={[{ required: true, message: "Please select lesson duration!" }]}
        >
          <Select placeholder="Select lesson duration">
            <Select.Option value={120}>2 hours (120 mins)</Select.Option>
            <Select.Option value={180}>3 hours (180 mins)</Select.Option>
            <Select.Option value={240}>4 hours (240 mins)</Select.Option>
            <Select.Option value={270}>4.5 hours (270 mins)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Description is required!" },
            { min: 10, message: "At least 10 characters" },
          ]}
        >
          <TextArea rows={4} placeholder="Enter course description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseModal;