import React, { useState } from "react";
import { userLogout } from "../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const ProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userlogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <FontAwesomeIcon
          icon={faX}
          onClick={closeSidebar}
          className="lg:hidden flex justify-start p-2"
        />
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          onClick={toggleSidebar}
          className="lg:hidden flex justify-start p-2"
        />
      )}
      <div
        className={`lg:w-1/4 ${
          isOpen ? "block" : "hidden"
        } lg:block lg:border-r lg:border-yellow-400 lg:pr-4`}
      >
        <ul className="space-y-4">
          <Link to={"/profile"} onClick={closeSidebar}>
            <button
              className={`text-black text-sm lg:text-xl w-full py-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
                location.pathname === "/profile"
                  ? "bg-yellow-400 text-white"
                  : "hover:text-white text-yellow-900 hover:bg-white bg-yellow-100"
              }`}
            >
              Profile
            </button>
          </Link>
          <Link to={"/bookings"} onClick={closeSidebar}>
            <button
              className={`text-black text-sm lg:text-xl w-full py-2 px-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
                location.pathname === "/bookings"
                  ? "bg-yellow-400 text-white"
                  : "hover:text-white text-yellow-900 hover:bg-white bg-yellow-100"
              }`}
            >
              Bookings
            </button>
          </Link>
          <Link to={"/reviews"} onClick={closeSidebar}>
            <button
              className={`text-black text-sm lg:text-xl w-full py-2 mb-2 rounded-lg hover:bg-yellow-400 hover:text-white ${
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
              className="text-red-500 text-sm lg:text-xl w-full py-2 mb-2 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white"
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
