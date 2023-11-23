import React, { useEffect, useState } from "react";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import Navbar from "../Navbar";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { uploadUserProfile } from "../../../services/firebase/storage";
import { Spinner } from "@chakra-ui/react";
import ProfileSideBar from "./ProfileSideBar";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const isImageFile = (data) => {
    const base64HeaderRegex = /^data:image\/(png|jpeg|jpg);base64,/;
    return base64HeaderRegex.test(data);
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (isImageFile(reader.result)) {
            try {
              setIsLoading(true);
              const imageURL = await uploadUserProfile(file, user._id);
              const response = await userAxios.post("/uploadProfilePicture", {
                userId: user._id,
                imageURL,
              });
              if (response.status === 200) {
                navigate(0);
              }
            } catch (err) {
              console.log(err);
            } finally {
              setIsLoading(false);
            }
          } else {
            alert("Please select a valid image file (JPEG or PNG)");
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    input.click();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userAxios.get("/getuserprofile");
        if (response.status === 200) {
          setUser(response.data.userData);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await userAxios.put("/editUser", values);
        if (response.status === 200) {
          setIsEdit(false);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  function handleCancel() {
    formik.setValues({
      name: user ? user.name : "",
      phoneNumber: user ? user.phoneNumber : "",
      email: user ? user.email : "",
      password: "",
    });
    setIsEdit(false);
  }
  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : null}
      <Navbar />
      <div className="flex justify-center mt-10">
        {user && (
          <div className="w-3/4 rounded-xl shadow-2xl">
            <div className="bg-yellow-300 p-4 text-white rounded-t-xl relative">
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
                <div className="absolute right-5 text-black w-36 h-28 rounded-lg bg-blue-300 flex flex-col items-center justify-evenly">
                  <h1 className="text-xl font-serif">Wallet Balance:</h1>
                  <h1 className="text-xl font-mono">₹{user.wallet?.balance}</h1>
                </div>
              </div>
            </div>

            <div className="container mx-auto mt-8 p-4">
              <div className="flex">
                <ProfileSideBar />
                <div className="container flex justify-center ">
                  <div className="w-3/4 ml-4 ">
                    <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

                    <form onSubmit={formik.handleSubmit}>
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
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          readOnly={!isEdit}
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
                          name="phoneNumber"
                          onChange={formik.handleChange}
                          className="w-2/5 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
                          value={formik.values.phoneNumber}
                          readOnly={!isEdit}
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
                          value={user?.email}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-gray-600 font-medium"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="w-2/5 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          readOnly={!isEdit}
                        />
                      </div>
                      {isEdit && (
                        <div>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="bg-gray-500 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-600 ms-2"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </form>

                    {!isEdit && (
                      <button
                        className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600"
                        type="button"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
