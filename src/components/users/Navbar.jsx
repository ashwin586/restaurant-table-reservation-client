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
                  <div className="flex">
                    <img
                      src={
                        profile?.userImage ||
                        "/assets/blank-profile-picture-973460_1920.png"
                      }
                      alt="Avatar"
                      className="w-16 h-16 rounded-full cursor-pointer"
                      onClick={() => navigate("/profile")}
                    />
                    <p>{profile?.name}</p>
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
