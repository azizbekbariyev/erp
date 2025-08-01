import { Button } from "antd";
import type { GroupTeachersType, GroupTeacherType, TeacherTypes } from "../../types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGroup, useTeacher } from "../../hooks";
import AddTeacherModal from "./add-teacher";

const GroupTeachers = ({ teachers }: GroupTeachersType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id: groupId } = useParams();
  const { useGroupTeacher } = useGroup();
  const {data} = useTeacher({
    page: 1,
    limit: 20,
  },)
  const allTeachers: TeacherTypes[] = data?.data.data || []
  const { mutate: createMutate, isPending: isCreating } = useGroupTeacher();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    const payload: GroupTeacherType = {
      groupId: Number(groupId),
      teacherId: values.teacherId.map((id: number) => id.toString()),
      status: values.status,
      start_date: values.start_date,
    };

    console.log("Yuboriladigan payload:", payload);
    createMutate(payload);
  };

  return (
    <div className="border rounded-lg gap-3 p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Teachers ({teachers.length})</h1>
        <Button type="primary" onClick={handleOpenModal}>
          + Add Teacher
        </Button>
        <AddTeacherModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          loading={isCreating}
          teachers={allTeachers.map((teacher) => teacher)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {teachers.map((item) => (
          <div key={item.id}>
            <div className="flex items-center border p-2 rounded justify-between">
              <div className="fl ex flex-row items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold">
                  {item.teacher.avatar_url ? (
                    <img
                      src={item.teacher.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    item.teacher.first_name[0]
                  )}
                </span>
                <span>
                  {item.teacher.first_name} {item.teacher.last_name}
                </span>
              </div>
              <div className="flex flex-row gap-4">
                <span>
                  Role:{" "}
                  {item.teacher.role === "main teacher"
                    ? "Main Teacher"
                    : "Assistant Teacher"}
                </span>
                <span>Status: {item.status ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTeachers;
