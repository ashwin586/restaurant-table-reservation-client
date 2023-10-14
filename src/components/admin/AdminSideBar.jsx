import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/slice/adminSlice"; 

const AdminSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // function openSidebar() {
  //     document.querySelector(".sidebar").classList.toggle("hidden");
  // }
  const adminlogout = () => {
    dispatch(adminLogout());
    localStorage.removeItem('adminToken')
        navigate('/admin')
  };
  return (
    <>
      <div className="bg-blue-600">
        {/* <span
                    class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                    onclick={openSidebar}
                >
                </span> */}
        <div className="sidebar fixed h-screen lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-button">
          <Link to="/admin/dashboard">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/dashboard"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              }`}
            >
              <p className="text-[15px] ml-4 font-bold">Dashboard</p>
            </div>
          </Link>
          <Link to="/admin/usermanagment">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/usermanagment"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              } `}
            >
              <span className="text-[15px] ml-4 font-bold ">Users</span>
            </div>
          </Link>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:text-yellow-500 text-white hover:bg-white"
            onClick={adminlogout}
          >
            <span className="text-[15px] ml-4 font-bold">Logout</span>
          </div>
        </div>

        {/* <script type="text/javascript">
      function dropdown() {
        document.querySelector("#submenu").classList.toggle("hidden");
        document.querySelector("#arrow").classList.toggle("rotate-0");
      }
      dropdown();

      function openSidebar() {
        document.querySelector(".sidebar").classList.toggle("hidden");
      }
    </script> */}
      </div>
    </>
  );
};

export default AdminSideBar;
