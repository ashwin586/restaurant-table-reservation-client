import { Routes, Route } from "react-router-dom";
import AdminRouter from "./admin/AdminRouter";
import UserRouter from "./user/UserRouter";
import PartnerRouter from "./partner/PartnerRouter";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<UserRouter />} />
      <Route path="/partner/*" element={<PartnerRouter />}/>
    </Routes>
  );
}
