import React, { useState } from "react";
import { Formik, Form, input, ErrorMessage } from "formik";
import * as Yup from "yup";
import { partnerAxios } from "../../../services/Axios/partnerAxios";

function AddRestaurantModal({ isOpen, closeModal }) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [openson, setOpensOn] = useState("");
  const [closeson, setCloseson] = useState("");
  const [address, setAddress] = useState("");
  // const handleSave = () => {
  //   closeModal();
  // };

  // const validation = Yup.object().shape({
  //   name: Yup.string()
  //     .min(4, "Enter a valid Name")
  //     .required("Please enter a name"),
  //   cuisine: Yup.string().required("Enter one cuisine"),
  //   openson: Yup.string().required("Enter a opening time"),
  //   closeon: Yup.string().required("Enter a closing Time"),
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const restaurantData = { name, cuisine, openson, closeson, address };
      const response = await partnerAxios.post(
        "/partner/addRestaurant",
        restaurantData
      );
      if (response.status === 200) {
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add New Restaurant</h2>
          {/* <Formik
            initialValues={{
              name: "",
              cuisine: "",
              openson: "",
              closeson: "",
              address: "",
            }}
            validationSchema={validation}
            onSubmit={async (values) => {
              console.log('clicked')
              console.log(values);
              try {
                const response = await Axios.post(
                  "/partner/addRestaurant",
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              } catch (err) {
                console.log(err);
              }
            }}
          > */}
          {/* <Form> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {/* <ErrorMessage
              name="name"
              component="p"
              className="error text-red-600 "
            /> */}

            <input
              type="text"
              placeholder="Cuisine"
              name="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {/* <ErrorMessage
              name="cuisine"
              component="p"
              className="error text-red-600 "
            /> */}

            <div className="flex">
              <input
                type="text"
                placeholder="Opens On"
                name="openson"
                value={openson}
                onChange={(e) => setOpensOn(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
              {/* <ErrorMessage
                name="openson"
                component="p"
                className="error text-red-600 "
              /> */}
              <input
                type="text"
                placeholder="Closes On"
                name="closeson"
                value={closeson}
                onChange={(e) => setCloseson(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-2 ms-3"
              />
              {/* <ErrorMessage
                name="closeson"
                component="p"
                className="error text-red-600 "
              /> */}
            </div>
            <input
              placeholder="Address line"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2 h-16 max-h-40 overflow-y-auto"
            />
            {/* <ErrorMessage
              name="address"
              component="p"
              className="error text-red-600 "
            /> */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mr-2"
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
          </form>
          {/* </Form> */}
          {/* </Formik> */}
        </div>
      </div>
    )
  );
}

export default AddRestaurantModal;
