import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRouter from "./admin/AdminRouter";
import UserRouter from "./user/UserRouter";
import PartnerRouter from "./partner/PartnerRouter";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <UserRouter />,
  },
  {
    path: "/partner/*",
    element: <PartnerRouter />,
  },
  {
    path: "/admin/*",
    element: <AdminRouter />,
  },
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
