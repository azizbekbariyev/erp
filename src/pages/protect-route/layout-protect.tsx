import { GetItem } from "../../helper/storages";
import { Navigate } from "react-router-dom";
import type { ProtectedRoute } from "../../types";
export const LayoutProtect = ({ children }: ProtectedRoute) => {
  const token = GetItem("access_token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
export default LayoutProtect;
