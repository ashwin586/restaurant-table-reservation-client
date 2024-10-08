import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAxios } from "../../services/AxiosInterceptors/userAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAxios.get("/getuserprofile");
        if (response.status === 200) {
          setProfile(response.data.userData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // fetchProfile();
  }, []);

  // const user = useSelector((state) => state.user.isLogged);
  const user = localStorage.getItem("userToken");
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200 bg-navbarBg">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to={"/"} className="flex items-center">
              <div className="flex justify-center items-center">
                <span className="hidden md:block">
                  <img
                    src="/assets/reserve.png"
                    style={{ height: "48px" }}
                    alt="Logo"
                  />
                </span>
                <span className="md:hidden">
                  <img
                    src="/assets/reserve.png"
                    style={{ height: "28px" }}
                    alt="Logo"
                  />
                </span>
                <h1 className="ps-2 lg:text-3xl lg:text-white font-extrabold whitespace-nowrap dark:text-white sm:text-lg text-xs">
                  RESERVETABLE
                </h1>
              </div>
            </Link>
          </div>
          <div className="md:block">
            <div className="flex items-center">
              {!user ? (
                <div className="flex items-center">
                  <button
                    className="me-10 bg-navbarBtns px-4 py-3 rounded-lg text-white font-semibold hover:bg-navbarHoverBtn"
                    onClick={() => navigate("/register")}
                  >
                    Signup
                  </button>
                  <button
                    className="me-10 bg-navbarBtns px-4 py-3 rounded-lg text-white font-semibold hover:bg-navbarHoverBtn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex">
                    <img
                      src={
                        profile?.userImage ||
                        "/assets/blank-profile-picture-973460_1920.png"
                      }
                      alt="Avatar"
                      className="rounded-xl cursor-pointer w-10 h-10 md:w-16 md:h-16"
                      onClick={() => navigate("/profile")}
                    />
                    {/* <p className="text-white font-semibold p-2 text-xl">
                      {profile?.name}
                    </p> */}
                    {/* <div className="inline-flex items-center">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size="2xl"
                        className="text-white hover:cursor-pointer ms-6"
                      />
                    </div> */}
                  </div>
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
