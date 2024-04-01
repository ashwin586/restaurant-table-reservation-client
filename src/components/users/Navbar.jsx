import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAxios } from "../../services/AxiosInterceptors/userAxios";

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
    fetchProfile();
  }, []);

  const user = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200 bg-navbarBg ">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to={"/"} className="flex items-center">
              <div className="flex justify-center items-center">
                <span>
                  <img
                    src="/assets/reserve.png"
                    style={{ height: "48px" }}
                    alt="Logo"
                  />
                </span>
                <h1 className="ps-2 text-3xl font-extrabold whitespace-nowrap dark:text-white">
                  RESERVETABLE
                </h1>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
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
                      className="w-16 h-16 rounded-xl cursor-pointer"
                      onClick={() => navigate("/profile")}
                    />
                    <p className="text-white font-semibold p-2 text-xl">
                      {profile?.name}
                    </p>
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
