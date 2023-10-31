import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import moment from "moment";
import AddRestaurantModal from "./AddRestaurantModal";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const Restaurants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await partnerAxios.get(
          "/partner/getPartnerRestaurant"
        );
        if (response.status === 200) {
          setRestaurants(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add new Restaurant
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <AddRestaurantModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
        {restaurants.map((restaurant) => (
          <div
            className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 flex cursor-pointer transform transition-transform hover:scale-105 font-serif"
            key={restaurant?._id}
          >
            <div className="flex-1">
              <h3>
                <span className="text-lg font-bold">Restaurant Name: </span>
                {restaurant?.name}
              </h3>
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
                {restaurant?.address}, {restaurant?.pinCode}, {restaurant?.city}
              </p>
            </div>
            <div>
              <span className="font-serif">Status: {""}</span>
              {restaurant.isApproved === "Pending" ? (
                <span className="text-yellow-500 font-bold">Pending</span>
              ) : restaurant.isApproved === "Approved" ? (
                <span className="text-green-500 font-bold">Online</span>
              ) : (
                <span className="text-red-500 font-bold">Rejected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Restaurants;
