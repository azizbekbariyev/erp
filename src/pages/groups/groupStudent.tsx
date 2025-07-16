import { Form, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import type { StudentTypes } from "../../types";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GroupStudentModal = ({ open, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentTypes>();

  const onSubmit = (data: StudentTypes) => {
    console.log("Form data:", data);
    onClose();
  };

  return (
    <Modal
      onOk={handleSubmit(onSubmit)}
      open={open}
      onCancel={onClose}
      title="Add Student"
    >
      <Form layout="vertical">
        <Form.Item
          label="First Name"
          validateStatus={errors.first_name ? "error" : ""}
        >
          <Controller
            name="first_name"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <Input placeholder="First Name" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          validateStatus={errors.last_name ? "error" : ""}
        >
          <Controller
            name="last_name"
            control={control}
            rules={{ required: "Last Name is required" }}
            render={({ field }) => <Input placeholder="Last Name" {...field} />}
          />
        </Form.Item>

        <Form.Item label="Email" validateStatus={errors.email ? "error" : ""}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
        </Form.Item>

        <Form.Item label="Phone" validateStatus={errors.phone ? "error" : ""}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field }) => <Input placeholder="Phone" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          validateStatus={errors.date_of_birth ? "error" : ""}
        >
          <Controller
            name="date_of_birth"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <Input placeholder="YYYY-MM-DD" {...field} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupStudentModal;
