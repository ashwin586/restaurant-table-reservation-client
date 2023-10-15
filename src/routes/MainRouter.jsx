import { Routes, Route } from "react-router-dom";
import AdminRouter from "./admin/AdminRouter";
import UserRouter from "./user/UserRouter";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<UserRouter />} />
    </Routes>
  );
}
