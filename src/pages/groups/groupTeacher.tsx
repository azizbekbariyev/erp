import { Controller, useForm } from "react-hook-form"
import type { TeacherTypes } from "../../types"
import { Form, Input, Modal, Select } from "antd"

interface Props {
    open: boolean
    onClose: () => void
}

const GroupTeacherModal = ({open, onClose}:Props) => {
    const {control, handleSubmit, formState:{errors}} = useForm<TeacherTypes>()
    const onSubmit = (data:TeacherTypes) => {
        console.log(data);
        onClose();
    }
    return (
        <Modal
        onOk={handleSubmit(onSubmit)}
        open={open}
        onCancel={onClose}
        title="Add Teacher">
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
                    render={({ field }) => (
                    <Input placeholder="Last Name" {...field} />
                    )}
                />
                </Form.Item>

                <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                >
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                    <Input placeholder="Email" {...field} />
                    )}
                />
                </Form.Item>

                <Form.Item
                label="Phone"
                validateStatus={errors.phone ? "error" : ""}
                >
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone is required" }}
                    render={({ field }) => (
                    <Input placeholder="Phone" {...field} />
                    )}
                />
                </Form.Item>

                <Form.Item
                label="Role"
                validateStatus={errors.role ? "error" : ""}
                >
                <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                    <Input placeholder="Role" {...field} />
                    )}
                />
                </Form.Item>

                <Form.Item
                label="Active"
                validateStatus={errors.is_active ? "error" : ""}
                >
                <Controller
                    name="is_active"
                    control={control}
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                        <Select
                        placeholder="Status"
                        {...field}
                        options={[
                            { value: true, label: "Active" },
                            { value: false, label: "Inactive" },
                        ]}
                        />
                    )}
                />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default GroupTeacherModal