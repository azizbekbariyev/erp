import { Outlet } from "react-router-dom";
import Students from "./student";

const StudentLayout = () => {
  return (
    <div style={{ padding: "24px" }}> 
      <Students/>
    </div>
  );
};

export default StudentLayout;
