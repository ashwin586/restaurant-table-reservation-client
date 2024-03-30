import React from "react";
import { userLogout } from "../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ProfileSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userlogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <>
      <div className="w-1/4 border-r border-yellow-400 pr-4">
        <ul className="space-y-4">
          <Link to={"/profile"}>
            <button
              className={`text-black text-lg w-full py-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
                location.pathname === "/profile"
                  ? "bg-yellow-400 text-white"
                  : "hover:text-white text-yellow-900 hover:bg-white bg-yellow-100"
              }`}
            >
              Profile
            </button>
          </Link>
          <Link to={"/bookings"}>
            <button
              className={`text-black text-lg w-full py-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
                location.pathname === "/bookings"
                  ? "bg-yellow-400 text-white"
                  : "hover:text-white text-yellow-900 hover:bg-white bg-yellow-100"
              }`}
            >
              Bookings
            </button>
          </Link>
          <Link to={"/reviews"}>
            <button
              className={`text-black text-lg w-full py-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
                location.pathname === "/reviews"
                  ? "bg-yellow-400 text-black"
                  : "hover:text-white text-yellow-900 hover:bg-white bg-yellow-100"
              }`}
            >
              Reviews
            </button>
          </Link>
          <li>
            <button
              className="text-red-500 text-lg w-full py-2 mb-2 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white"
              onClick={userlogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileSideBar;
