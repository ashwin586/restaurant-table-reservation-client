import React, { useState } from "react";
import moment from "moment";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";

const PendingRestaurantModal = ({ pendingTab, restaurants }) => {
  const [updateRestaurant, setUpdateRestaurant] = useState(restaurants);
  const handleAction = async (action, id) => {
    if (action === "approve") {
      const response = await adminAxios.put("/admin/restaurantApprove", { id });
      if (response.status === 200) {
        const updatedResponse = restaurants.map((restaurant) => {
          if (restaurant._id === id) {
            return { ...restaurant, isApproved: "Approved" };
          }
          return restaurant;
        });
        setUpdateRestaurant(updatedResponse);
      }
    } else if (action === "reject") {
      const response = await adminAxios.put("/admin/restaurantReject", { id });
    }
  };
  return (
    <>
      {pendingTab &&
        updateRestaurant?.map(
          (restaurant) =>
            restaurant?.isApproved === "Pending" && (
              <div
                className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 flex relative"
                key={restaurant?._id}
              >
                <div className="flex-1">
                  <h3>
                    <span className="text-lg font-bold">Restaurant Name: </span>
                    {restaurant?.name}
                  </h3>
                  <p>
                    <span className="text-lg font-bold">Partner Name: </span>
                    {restaurant?.partner.name}{" "}
                  </p>
                  <p>
                    <span className="text-lg font-bold">Partner Contact: </span>
                    {restaurant?.partner.phoneNumber}
                  </p>
                  <p className="text-md text-gray-800">
                    <span className="text-lg font-bold">Cuisine Types: </span>
                    {restaurant?.cuisine.map((cuisine, index) => (
                      <span key={index}>
                        {cuisine.cuisine}
                        {index < restaurant.cuisine.length - 1 ? ", " : ""}
                      </span>
                    ))}{" "}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="text-lg font-bold">Opens: </span>
                    {moment(restaurant?.openTime).format("h:mmA")} -{" "}
                    <span className="text-lg font-bold">closes: </span>
                    {moment(restaurant?.closeTime).format("h:mmA")}
                  </p>
                  <p className="text-sm text-gray-800">
                    {" "}
                    <span className="text-lg font-bold">Address: </span>
                    {restaurant?.address}, {restaurant?.pinCode},{" "}
                    {restaurant?.city}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={() => handleAction("approve", restaurant._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={() => handleAction("reject", restaurant._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
        )}
      {!updateRestaurant.length && (
        <div className="flex justify-center items-center mt-20">
          <img
            style={{ height: "417px", width: "626px" }}
            src="/assets/no-data-concept-illustration_114360-2506.jpg"
            alt="noRestaurant"
          />
        </div>
      )}
    </>
  );
};

export default PendingRestaurantModal;
