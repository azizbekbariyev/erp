import { Outlet } from "react-router-dom";
import Teachers from "./teacher";

export const TeacherLayout = () => {
  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}>
        <h1 style={{ margin: 0 }}> Teachers</h1>
      </div>
      <Teachers />
      <Outlet />
    </div>
  );
}

export default TeacherLayout;