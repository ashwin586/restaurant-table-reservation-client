import React, { useEffect, useState } from "react";
import Axios from "../../../services/axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { uploadUserProfile } from "../../../services/firebase/storage";
import { Spinner } from "@chakra-ui/react";
import { userLogout } from "../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userlogout = () => {
    localStorage.removeItem('userToken');
    dispatch(userLogout());
    navigate("/");
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image";
    input.onchange = handleImageChange;
    input.click();
  };

  const handleImageChange = async (e) => {
    const selecedImage = e.target.files[0];
    if (selecedImage) {
      try {
        setIsLoading(true);
        const imageURL = await uploadUserProfile(selecedImage, user._id);
        const response = await Axios.post("/uploadProfilePicture", {
          userId: user._id,
          imageURL,
        });
        if (response.status === 200) {
          navigate(0);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const userToken = localStorage.getItem("userToken");
      try {
        const response = await Axios.get("/getuserprofile", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data.userData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : null}
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="w-3/4 rounded-xl shadow-2xl">
          <div className="bg-yellow-400 p-4 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={
                      user?.userImage ||
                      "/assets/blank-profile-picture-973460_1920.png"
                    }
                    alt="Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                  <button
                    onClick={handleImageUpload}
                    className=" text-white p-2 absolute bottom-0 left-5"
                  >
                    Edit
                  </button>
                </div>
                <h1 className="ml-4 text-2xl text-black font-bold">
                  {user?.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-8 p-4">
            <div className="flex">
              <div className="w-1/4 border-r border-yellow-400 pr-4">
                <ul className="space-y-4">
                  <li>
                    <button className="text-black text-lg w-full py-2 rounded-lg bg-transparent hover:bg-yellow-400 hover:text-white">
                      Bookings
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-black text-lg w-full py-2 rounded-lg bg-transparent hover:bg-yellow-400 hover:text-white"
                      onClick={userlogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              <div className="container flex justify-center ">
                <div className="w-3/4 ml-4 ">
                  <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-600 font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-2/5 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
                        value={user?.name || ""}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-600 font-medium"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-2/5 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
                        value={user?.phoneNumber || ""}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-2/5 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
                        value={user?.email || ""}
                        readOnly
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
