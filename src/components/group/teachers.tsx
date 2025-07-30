import { Button } from "antd";
import type { GroupTeachersType } from "../../types";

const GroupTeachers = ({ teachers }: GroupTeachersType) => {
  return (
    <div className="border rounded-lg gap-3 p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Teachers ({teachers.length})</h1>
        <Button type="primary">+ Add Teacher</Button>
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
