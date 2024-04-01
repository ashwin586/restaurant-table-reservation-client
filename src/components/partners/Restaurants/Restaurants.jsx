import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import moment from "moment";
import AddRestaurantModal from "./AddRestaurantModal";
import RestaurantDetailsModal from "./RestaurantDetailsModal";
import MenuModal from "./MenuModal";
import { Spinner } from "@chakra-ui/react";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const Restaurants = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestaurantDetailsModal, setIsRestauarantDetailsModal] =
    useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true)
        const response = await partnerAxios.get(
          "/partner/getPartnerRestaurant"
        );
        if (response.status === 200) {
          setRestaurants(response.data);
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : null}
      <Sidebar />
      <div className="bg-adminDashboard min-h-screen">
        <div className="bg-adminDashboard h-fit p-4 sm:ml-64">
          <div className="bg-adminDashboard h-screen">
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

            {isRestaurantDetailsModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <RestaurantDetailsModal
                    isOpen={isRestaurantDetailsModal}
                    isSelected={selectedRestaurant}
                    closeModal={() => setIsRestauarantDetailsModal(false)}
                  />
                </div>
              </div>
            )}

            {isMenu && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <MenuModal
                    isOpen={isMenu}
                    closeModal={() => setIsMenu(false)}
                    isId={selectedRestaurant}
                  />
                </div>
              </div>
            )}

            {restaurants.map((restaurant) => (
              <div
                className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 flex transform transition-transform hover:scale-105 font-serif"
                key={restaurant?._id}
              >
                {restaurant.images && restaurant.images.length > 0 && (
                  <div>
                    <img
                      src={restaurant.images[0]}
                      alt="restaurantImage"
                      className="h-40 w-40 cursor-pointer"
                      onClick={() => {
                        setIsRestauarantDetailsModal(true);
                        setSelectedRestaurant(restaurant);
                      }}
                    />
                  </div>
                )}

                <div
                  className="flex-1 ms-4 cursor-pointer"
                  onClick={() => {
                    setIsRestauarantDetailsModal(true);
                    setSelectedRestaurant(restaurant);
                  }}
                >
                  <h3>
                    <span className="text-lg font-bold text-blue-500">
                      Restaurant Name:{" "}
                    </span>
                    {restaurant?.name}
                  </h3>
                  <p className="text-md text-gray-800">
                    <span className="text-lg font-bold text-blue-500">
                      Cuisine Types:{" "}
                    </span>
                    {restaurant?.cuisine.map((cuisine, index) => (
                      <span key={index}>
                        {cuisine.cuisine}
                        {index < restaurant.cuisine.length - 1 ? ", " : ""}
                      </span>
                    ))}{" "}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="text-lg font-bold text-blue-500">
                      Opens:{" "}
                    </span>
                    {moment(restaurant?.openTime).format("h:mmA")} -{" "}
                    <span className="text-lg font-bold text-blue-500">
                      closes:{" "}
                    </span>
                    {moment(restaurant?.closeTime).format("h:mmA")}
                  </p>
                  <p className="text-sm text-gray-800">
                    {" "}
                    <span className="text-lg font-bold text-blue-500">
                      Address:{" "}
                    </span>
                    {restaurant?.address}, {restaurant?.pinCode},{" "}
                    {restaurant?.city}
                  </p>
                </div>

                <div className="flex-col space-y-5">
                  <div>
                    <span className="font-serif">Status: {""}</span>
                    {restaurant.isApproved === "Pending" ? (
                      <span className="text-yellow-500 font-bold text-xl">
                        Pending
                      </span>
                    ) : restaurant.isApproved === "Approved" ? (
                      <span className="text-green-500 font-bold text-xl">
                        Online
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold text-xl">
                        Rejected
                      </span>
                    )}
                  </div>
                  <div>
                    {restaurant.isApproved === "Approved" && (
                      <div className="flex flex-col space-y-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-400 border-b-4 border-b-green-800 border-e-2 border-e-green-800 hover:border-b-green-500 hover:border-e-green-500"
                          onClick={() => {
                            setIsMenu(true);
                            setSelectedRestaurant(restaurant._id);
                          }}
                        >
                          Menu
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-400 border-b-4 border-e-2 border-b-yellow-800 border-e-yellow-800 hover:border-b-yellow-500 hover:border-e-yellow-500"
                          onClick={() => {
                            navigate(`/partner/${restaurant?._id}/orders`);
                          }}
                        >
                          Orders
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
