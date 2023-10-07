import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/users/LoginPage";
import SignupPage from "./pages/users/SignupPage";
import HomePage from "./pages/users/HomePage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserManagment from "./pages/admin/AdminUserManagment";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

function App() {
  // const user = useSelector((state) => state.user.isLogged);
  const admin = useSelector((state) => state.admin.isLogged);
  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              admin === true ? (
                <Navigate to={"/admin/dashboard"} />
              ) : (
                <AdminLoginPage />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              admin === false ? (
                <Navigate to={"/admin"} />
              ) : (
                <AdminDashboardPage />
              )
            }
          />
          <Route
            path="/admin/usermanagment"
            element={
              admin === false ? (
                <Navigate to={"/admin"} />
              ) : (
                <AdminUserManagment />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
