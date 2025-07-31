import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";

const TeacherLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggle={toggleCollapsed} collapsed={collapsed} />
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} />
        <main className="flex-1 p-4 bg-gray-50"> {/* Fixed: added proper styling */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;