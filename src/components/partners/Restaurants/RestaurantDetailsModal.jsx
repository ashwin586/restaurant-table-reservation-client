import React, { useState } from "react";
import { useFormik } from "formik";
import { uploadRestaurantImage } from "../../../services/firebase/storage";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const RestaurantDetailsModal = ({ isOpen, isSelected, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [images, setImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const selectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImages([...images, file]);
      }
    };
  };

  const formik = useFormik({
    initialValues: {
      _id: isSelected._id,
      name: isSelected.name,
      cuisine: isSelected.cuisine,
      opens: isSelected.openTime,
      closes: isSelected.closeTime,
      streetAddress: isSelected.address,
      pinCode: isSelected.pinCode,
      city: isSelected.city,
      imageURl: isSelected.images,
    },

    onSubmit: async (values) => {
      try {
        if (isSaving) {
          if (images.length > 0) {
            const imageUrl = await uploadRestaurantImage(images);
            values.imageURl = imageUrl;
          }
          const response = await partnerAxios.put("/partner/editRestaurant", {
            values,
          });
          if (response.status === 200) {
            closeModal();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 font-serif">
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/6 h-4/6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isSelected.name}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h1 className="text-xl">Restaurant Name:</h1>
                <input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className={`w-full border border-gray-600 rounded p-2 my-2 ${
                    !isEdit ? "bg-gray-400" : "bg-white"
                  }`}
                  disabled={!isEdit}
                />
              </div>
              <div className="h-28 my-3">
                <h1 className="text-xl">Restaurant Cuisines</h1>
                {formik.values.cuisine.map((cuisine, index) => (
                  <label key={index} className="mx-3 flex">
                    <input
                      type="checkbox"
                      name="cuisine"
                      value={cuisine._id}
                      checked
                      readOnly={!isEdit}
                    />
                    {cuisine.cuisine}
                  </label>
                ))}
              </div>
              <div>
                <h1 className="text-xl">Street Address:</h1>
                <input
                  type="text"
                  name="address"
                  value={formik.values.streetAddress}
                  className={`w-full border border-gray-600 rounded p-2 my-2 ${
                    !isEdit ? "bg-gray-400" : "bg-white"
                  }`}
                  disabled={!isEdit}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h1 className="text-xl">Pincode:</h1>
                  <input
                    type="text"
                    name="pinCode"
                    value={formik.values.pinCode}
                    className={`w-full border border-gray-600 rounded p-2 my-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    disabled={!isEdit}
                  />
                </div>
                <div>
                  <h1 className="text-xl">City:</h1>
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    className={`w-full border border-gray-600 rounded p-2 my-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    disabled={!isEdit}
                  />
                </div>
              </div>

              {isSelected.images.length > 0 && (
                <div>
                  <h1 className="text-xl">Restaurant Images: </h1>
                  <div className="flex">
                    {isSelected.images.map((image, index) => (
                      <img key={index} src={image} alt="images" className="w-48 h-48 m-3" />
                    ))}
                  </div>
                </div>
              )}

              {isEdit && (
                <div>
                  {images &&
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt="SelectedImage"
                        className="max-h-40 mb-2"
                      />
                    ))}
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center"
                    onClick={selectImage}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Restaurant Image
                  </button>
                </div>
              )}

              {isEdit && (
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mr-2"
                    onClick={() => setIsSaving(true)}
                  >
                    Save
                  </button>

                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
            {!isEdit && (
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>

                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetailsModal;
