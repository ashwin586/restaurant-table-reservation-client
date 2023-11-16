import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../Sidebar";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import { uploadPartnerProfileImage } from "../../../services/firebase/storage";

const Profile = () => {
  const [data, setdata] = useState();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await partnerAxios.get("/partner/getDetails");
        if (response.status === 200) {
          setdata(response.data.partner);
        }
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
      imageURL:
        data?.imageURL || "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    onSubmit: async (values) => {
      try {
        const response = await partnerAxios.put("/partner/editPartner", values);
        if (response.status === 200) {
          console.log("success");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image";
    input.onchange = handleImageChange;
    input.click();
  };

  const handleImageChange = async (e) => {
    try {
      const selecedImage = e.target.files[0];
      if (selecedImage) {
        const imageURL = await uploadPartnerProfileImage(
          selecedImage,
          data._id
        );
        formik.setFieldValue("imageURL", imageURL);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                  </div>
                  <div className="m-2">
                    <h1>Email</h1>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                  </div>
                  <div className="m-2">
                    <h1>Phone Number</h1>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      className="w-2/5 border border-black rounded-md py-1 px-3 focus:outline-none"
                    />
                  </div>
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
                          onClick={() => setIsEdit(false)}
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
