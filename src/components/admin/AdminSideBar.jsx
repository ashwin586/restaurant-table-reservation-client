import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { adminLogout } from "../../redux/slice/adminSlice";

const AdminSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const adminlogout = () => {
    // dispatch(adminLogout());
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <>
      <div className="bg-blue-600">
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
          <Link to="/admin/partnermanagment">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/partnermanagment"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              } `}
            >
              <span className="text-[15px] ml-4 font-bold ">Partners</span>
            </div>
          </Link>
          <Link to="/admin/restaurantmanagment">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/restaurantmanagment"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              } `}
            >
              <span className="text-[15px] ml-4 font-bold ">Restaurants</span>
            </div>
          </Link>
          <Link to="/admin/cuisines">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/cuisines"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              } `}
            >
              <span className="text-[15px] ml-4 font-bold ">Cuisines</span>
            </div>
          </Link>
          <Link to="/admin/categoryManagment">
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                location.pathname === "/admin/categoryManagment"
                  ? "bg-white text-yellow-500"
                  : "hover:text-yellow-500 text-gray-200 hover:bg-white"
              } `}
            >
              <span className="text-[15px] ml-4 font-bold ">Category</span>
            </div>
          </Link>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:text-yellow-500 text-white hover:bg-white"
            onClick={adminlogout}
          >
            <span className="text-[15px] ml-4 font-bold">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
