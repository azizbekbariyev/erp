import { lazy } from "react";

const Sidebar = lazy(() => import("./sidebar"));
const Header = lazy(() => import("./header"));
import PopConfirm from "./pop-confirm";

export { Sidebar, Header, PopConfirm };