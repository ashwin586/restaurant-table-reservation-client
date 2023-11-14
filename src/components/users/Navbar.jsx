import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200 bg-button ">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to={"/"} className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                RESERVETABLE
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              {!user ? (
                <div className="flex items-center">
                  <button
                    className="me-10 bg-white px-4 py-3 rounded-xl"
                    onClick={() => navigate("/register")}
                  >
                    Signup
                  </button>
                  <button
                    className="me-10 bg-white px-4 py-3 rounded-xl"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    className="bg-white px-4 py-3 rounded-xl me-10"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
