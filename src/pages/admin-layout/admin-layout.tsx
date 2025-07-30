import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true); // Bu yerga ko‘chiramiz

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggle={toggleCollapsed} collapsed={collapsed} />{" "}
      {/* Prop beriladi */}
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} /> {/* Sidebar ham prop oladi */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 ml-20 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
