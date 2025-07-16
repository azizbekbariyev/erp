import { lazy } from "react";

const Sidebar = lazy(() => import("./sidebar"));
const Header = lazy(() => import("./header"));

export { Sidebar, Header };