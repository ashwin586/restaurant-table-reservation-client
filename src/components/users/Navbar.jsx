import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {userLogout} from '../../redux/slice/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userlogout = () =>{
    dispatch(userLogout());
    navigate('/login');
  }
  return (
    <>
      <div className="h-20 bg-white shadow-lg flex justify-between">
        <div className="flex">
          <h1 className="bg-white flex items-center ps-10 text-black font-bold text-2xl">
            LOGO
          </h1>
        </div>
        {!user ? (
          <div className="flex me-10 items-center">
            <div>
              <button
                className="me-10 bg-button px-4 py-3 rounded-xl"
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
            </div>
            <div>
              <button
                className="me-10 bg-button px-4 py-3 rounded-xl"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="flex me-10 items-center">
            <div>
              <button className="bg-button px-4 py-3 rounded-xl me-10">
                Profile
              </button>
            </div>
            <div>
                <button className="bg-button px-4 py-3 rounded-xl" onClick={userlogout}>
                    Logout
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
