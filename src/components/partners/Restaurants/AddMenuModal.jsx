import React from "react";
import { useFormik } from "formik";

const AddMenuModal = ({ isOpen, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: 0,
      imageURL: "",
    },
  });
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="text-lg">
                  Food Quantity (If any)
                  <input
                    type="text"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="text-lg">
                  Food Price
                  <input
                    type="text"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
              </form>
            </div>
            <div className="flex justify-end mt-3">
                <button className="bg-green-500 hover:bg-gray-400 px-4 py-2 rounded-md mr-2">
                    Add Food
                </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMenuModal;
