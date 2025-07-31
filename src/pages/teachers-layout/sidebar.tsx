// components/admin/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  GroupOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const items: MenuItem[] = [
    {
      key: "/dashboard/",
      icon: <HomeOutlined />,
      label: <Link to="/teacher/">Dashboard</Link>,
    },
    {
      key: "/salom/",
      icon: <GroupOutlined />,
      label: <Link to="/teacher/my-groups">Guruhlarim</Link>,
    },
  ];

  return (
    <div style={{ width: collapsed ? 80 : 250, transition: "width 0.1s ease", top: 72 }}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className="custom-menu"
        style={{
          height: "100%",
          borderRight: 0,
          background: "linear-gradient(180deg, #001529 0%, #002140 100%)",
        }}
      />
    </div>
  );
};

export default Sidebar;
