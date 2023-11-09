import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const MenuDetailsModal = ({ isOpen, closeModal, isSelected }) => {
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: isSelected._id,
      name: isSelected.name || "",
      category: isSelected.foodCategory._id || "",
      quantity: isSelected.quantity || 0,
      price: isSelected.price || 0,
      imageURL: isSelected.imageURL
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Min 3 character is required")
        .required("The field cannot be empty"),
      category: Yup.string().required("Please select a food type"),
      quantity: Yup.number(),
      price: Yup.number().required("The price field cannot be empty"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await partnerAxios.put("/partner/editMenu", values);
        if (response.status === 200) {
          closeModal();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await partnerAxios.get("/partner/fetchCategories");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 font-serif">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 h-2/4 overflow-y-auto">
            <h1 className="text-2xl m-4">Add new Meal</h1>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <label className="text-lg">
                  Food Name
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={`w-full border border-gray-300 rounded p-2 mb-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    disabled={!isEdit}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="error text-red-600 ">{formik.errors.name}</p>
                  )}
                </label>
                <label className="text-lg">
                  Food Type
                  <select
                    name="category"
                    className={`w-full border border-gray-300 rounded p-2 mb-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    disabled={!isEdit}
                  >
                    <option value="">Select the food type</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="error text-red-600 ">
                      {formik.errors.category}
                    </p>
                  )}
                </label>
                <label className="text-lg">
                  Food Quantity (If any)
                  <input
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    className={`w-full border border-gray-300 rounded p-2 mb-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    disabled={!isEdit}
                  />
                  {formik.touched.quantity && formik.errors.quantity && (
                    <p className="error text-red-600 ">
                      {formik.errors.quantity}
                    </p>
                  )}
                </label>
                <label className="text-lg">
                  Food Price (In ₹)
                  <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className={`w-full border border-gray-300 rounded p-2 mb-2 ${
                      !isEdit ? "bg-gray-400" : "bg-white"
                    }`}
                    disabled={!isEdit}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <p className="error text-red-600 ">{formik.errors.price}</p>
                  )}
                </label>
                {isSelected.imageURL && (
                  <img
                    src={isSelected.imageURL}
                    alt="foodImage"
                    className="w-48 h-48 m-3"
                  />
                )}
                {/* <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center"
                  type="button"
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
                  Add Image
                </button> */}
                <div className="flex justify-end mt-3">
                  {isEdit && (
                    <div>
                      <button
                        className="bg-green-500 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                        type="submit"
                      >
                        save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                        type="button"
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </form>
              <div className="flex justify-end mt-3">
                {!isEdit && (
                  <div>
                    <button
                      className="bg-green-500 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                      type="button"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit Food
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuDetailsModal;
