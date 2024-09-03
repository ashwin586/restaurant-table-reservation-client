import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../Sidebar";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import { uploadPartnerProfileImage } from "../../../services/firebase/storage";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setIsLoading(true);
        const response = await partnerAxios.get("/partner/getDetails");
        if (response.status === 200) {
          setdata(response.data.partner);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPartner();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      passwordone: "",
      passwordtwo: "",
      imageURL:
        data?.imageURL || "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(4, "Must have atleast 4 characters")
        .required("Please provide a name"),
      email: Yup.string().required("Please provide a valid email"),
      passwordone: Yup.string()
        .matches(/^(?=.*[A-Z])/, "Must include One uppercase letter")
        .matches(/^(?=.*\d)/, "Must include one digit")
        .matches(/^(?=.*\d)/, "Must include one digit"),
      passwordtwo: Yup.string().oneOf(
        [Yup.ref("passwordone")],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await partnerAxios.put("/partner/editPartner", values);
        if (response.status === 200) {
          setIsEdit(false);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const isImageFile = (data) => {
    const base64HeaderRegex = /^data:image\/(png|jpeg|jpg);base64,/;
    return base64HeaderRegex.test(data);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image";
    input.onchange = handleImageChange;
    input.click();
  };

  const handleImageChange = async (e) => {
    try {
      const selectedImage = e.target.files[0];
      if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (isImageFile(reader.result)) {
            setIsLoading(true);
            const imageURL = await uploadPartnerProfileImage(
              selectedImage,
              data._id
            );
            formik.setFieldValue("imageURL", imageURL);
            setIsLoading(false);
          } else {
            alert("Please select a valid image file (JPEG or PNG)");
          }
        };
        reader.readAsDataURL(selectedImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    formik.setValues({
      name: data ? data?.name : "",
      email: data ? data?.email : "",
      imageURL: data
        ? data?.imageURL
        : "https://bootdey.com/img/Content/avatar/avatar7.png",
    });
    setIsEdit(false);
  };
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <CircularProgress />
        </div>
      ) : null}
      <Sidebar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <div className="w-1/3  bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col">
            <h1 className="p-2 text-2xl font-bold">My Profile</h1>
            <div className="cursor-pointer">
              <button onClick={handleImageUpload}>
                <img
                  name="imageURL"
                  src={formik.values.imageURL}
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </button>
            </div>
            <div className="">
              <div className="mt-4">
                <form onSubmit={formik.handleSubmit}>
                  <div className="m-2">
                    <h1>Name</h1>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      disabled={!isEdit}
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="error text-red-600 ">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="m-2">
                    <h1>Email</h1>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      disabled={!isEdit}
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="error text-red-600 ">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="m-2">
                    <h1>Phone Number</h1>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      disabled
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                  </div>
                  {isEdit && (
                    <div className="m-2">
                      <h1>Password</h1>
                      <input
                        type="password"
                        name="passwordone"
                        value={formik.values.passwordone}
                        onChange={formik.handleChange}
                        className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                      />
                      {formik.touched.passwordone &&
                        formik.errors.passwordone && (
                          <p className="error text-red-600 ">
                            {formik.errors.passwordone}
                          </p>
                        )}
                      <h1 className="m-2">Re Enter Password</h1>
                      <input
                        type="password"
                        name="passwordtwo"
                        value={formik.values.passwordtwo}
                        onChange={formik.handleChange}
                        className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                      />
                      {formik.touched.passwordtwo &&
                        formik.errors.passwordtwo && (
                          <p className="error text-red-600 ">
                            {formik.errors.passwordtwo}
                          </p>
                        )}
                    </div>
                  )}

                  <div className="mt-3">
                    {isEdit && (
                      <div>
                        <button
                          type="submit"
                          className="w-24 bg-blue-500 py-2 rounded-xl"
                          onClick={() => setIsEdit(true)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className=" ms-2 w-24 bg-gray-400 py-2 rounded-xl"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </form>
                {!isEdit && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="w-24 bg-green-500 py-2 rounded-xl"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
