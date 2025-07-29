import { Outlet } from "react-router-dom";
import Students from "./student";

const StudentLayout = () => {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Students</h1>
      </div>
      <Students/>
      <Outlet />
    </div>
  );
};

export default StudentLayout;
