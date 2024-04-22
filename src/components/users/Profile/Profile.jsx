import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import Navbar from "../Navbar";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { uploadUserProfile } from "../../../services/firebase/storage";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import ProfileSideBar from "./ProfileSideBar";
import Footer from "../Footer";
import getCroppedImg from "../../../utils/crop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [isCropPopupOpen, setIsCropPopupOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgType, setImgType] = useState("image/jpeg");
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const navigate = useNavigate();

  const isImageFile = (data) => {
    const base64HeaderRegex = /^data:image\/(png|jpeg|jpg);base64,/;
    return base64HeaderRegex.test(data);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCloseCropPopup = () => {
    setIsCropPopupOpen(false);
  };

  const uploadCroppedImage = useCallback(async () => {
    try {
      console.log(image);
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        imgType
      );
      setIsCropPopupOpen(false);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setIsLoading(true);
          await userAxios.get("/checkuser");
          const imageURL = await uploadUserProfile(croppedImage, user._id);
          const response = await userAxios.post("/uploadProfilePicture", {
            userId: user._id,
            imageURL,
          });
          if (response.status === 200) {
            navigate(0);
          }
        } catch (err) {
          if (err.response.status === 400) {
            toast.error(err.response.data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "dark",
            });
          }
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(croppedImage);
    } catch (err) {
      console.log(err);
    }
  }, [image, croppedAreaPixels, navigate, user, imgType]);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      setImgType(file.type);
      if (file) {
        setImage(URL.createObjectURL(file));
        setIsCropPopupOpen(true);
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
        await userAxios.get("/checkuser");
        const response = await userAxios.put("/editUser", values);
        if (response.status === 200) {
          setIsEdit(false);
        }
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        }
      } finally {
        setIsLoading(false);
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
    <>
      <div className="bg-homeBg flex flex-col min-h-screen">
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
            <Spinner />
          </div>
        ) : null}
        <Navbar />
        <div className="flex justify-center mt-10">
          {user && (
            <div className="w-3/4 rounded-xl shadow-2xl bg-white">
              <div className="bg-yellow-300 p-2 lg:p-4 text-white rounded-t-xl relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={
                          user?.userImage ||
                          "/assets/blank-profile-picture-973460_1920.png"
                        }
                        alt="Avatar"
                        className="w-20 h-20 rounded-xl"
                      />
                      <div className="bg-white w-6 h-6 text-white p-2 absolute bottom-0 rounded-full right-0 cursor-pointer flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faPencil}
                          onClick={handleImageUpload}
                          className="text-black"
                          size="sm"
                        />
                      </div>
                    </div>
                    <h1 className="ml-4 text-2xl text-white font-extrabold">
                      {user?.name}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="container mx-auto p-4 rounded-b-xl">
                <div className="flex ">
                  <ProfileSideBar />
                  <div className="container flex justify-center">
                    {isCropPopupOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 rounded-lg">
                        <div className="relative w-8/12 h-full bg-white">
                          <div className="p-4">
                            <Cropper
                              image={image}
                              crop={crop}
                              zoom={zoom}
                              aspect={5 / 5}
                              onCropChange={setCrop}
                              onZoomChange={setZoom}
                              onCropComplete={onCropComplete}
                            />
                            <div className="absolute bottom-0 left-0 w-full flex justify-end">
                              <button
                                className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-600"
                                type="button"
                                onClick={uploadCroppedImage}
                              >
                                Save Image
                              </button>
                              <button
                                className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-600 ms-2"
                                onClick={handleCloseCropPopup}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="w-3/4 ml-4 ">
                      <h2 className="text-2xl font-semibold mb-4">
                        My Profile
                      </h2>

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
                            className="w-full md:w-4/5 lg:w-3/5 lg border-2 border-yellow-100 rounded-md py-2 px-3 focus:outline-none focus:border-yellow-500 outline-none"
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
                            className="w-full md:w-4/5 lg:w-3/5 border-2 border-yellow-100 rounded-md py-2 px-3 focus:outline-none focus:border-yellow-500 outline-none"
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
                            className="w-full md:w-4/5 lg:w-3/5 border-2 border-yellow-100 rounded-md py-2 px-3 focus:outline-none focus:border-yellow-500 outline-none"
                            value={user?.email}
                            readOnly
                          />
                        </div>
                        {isEdit && (
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
                              className="w-full md:w-4/5 lg:w-3/5 border-2 border-yellow-100 rounded-md py-2 px-3 focus:outline-none focus:border-yellow-500 outline-none"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                            />
                          </div>
                        )}

                        {isEdit && (
                          <div>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Save Changes
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
                          className="bg-green-400 text-white font-medium px-4 py-2 rounded-md hover:bg-green-700"
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
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;
