import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";
import PendingRestaurantModal from "./PendingRestaurantModal";

export const RestaurantsManagment = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [pendingTab, setPendingTab] = useState(false);
  const [activeTab, setActiveTab] = useState("online");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleAction = async (action, id) => {
    try {
      if (action === "unlist") {
        const response = await adminAxios.put("/admin/unlistRestaurant", {
          id,
        });
        if (response.status === 200) {
          const updateRestaurant = restaurants.map((restaurant) => {
            if (restaurant._id === id) {
              return { ...restaurant, isBlocked: true };
            }
            return restaurant;
          });
          setRestaurants(updateRestaurant);
        }
      } else if (action === "list") {
        const response = await adminAxios.put("/admin/listRestaurant", { id });
        if (response.status === 200) {
          const updateRestaurant = restaurants.map((restaurant) => {
            if (restaurant._id === id) {
              return { ...restaurant, isBlocked: false };
            }
            return restaurant;
          });
          setRestaurants(updateRestaurant);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await adminAxios.get("/admin/getAllRestaurants");
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
    <div className="h-screen bg-adminDashboard">
      <AdminHeader />
      <AdminSideBar />
      <div className="ml-[250px] mt-5 ">
        <div className="flex justify-around text-center">
          <h1
            className={`font-bold ${
              activeTab === "online" ? "bg-button text-white" : "bg-white"
            } w-60 p-2 rounded-3xl cursor-pointer`}
            onClick={() => {
              handleTab("online");
              setPendingTab(false);
            }}
          >
            Online Restaurants
          </h1>
          <h1
            className={`font-bold ${
              activeTab === "pending" ? "bg-button text-white" : "bg-white"
            } w-60 p-2 rounded-3xl cursor-pointer`}
            onClick={() => {
              handleTab("pending");
              setPendingTab(true);
            }}
          >
            Pending Restaurants
          </h1>
        </div>
        {pendingTab && (
          <PendingRestaurantModal
            pendingTab={pendingTab}
            restaurants={restaurants}
          />
        )}

        {!pendingTab &&
          restaurants.map((restaurant) =>
            restaurant?.isApproved === "Approved" ? (
              <div
                className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 flex"
                key={restaurant?._id}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    Restaurant Name: {restaurant?.name}
                  </h3>
                  <p className="text-lg font-medium">
                    Partner Name: {restaurant?.partner.name}{" "}
                  </p>
                  <p className="text-md text-gray-800">
                    Cuisine Types:{" "}
                    {restaurant?.cuisine.map((cuisine, index) => (
                      <span key={index}>
                        {cuisine.cuisine}
                        {index < restaurant.cuisine.length - 1 ? ", " : ""}
                      </span>
                    ))}{" "}
                  </p>
                  <p className="text-sm text-gray-800">
                    Opens: {restaurant?.openTime} - closes:{" "}
                    {restaurant?.closeTime}
                  </p>
                  <p className="text-sm text-gray-800">
                    {" "}
                    Address: {restaurant?.address}
                  </p>
                </div>
                {!restaurant?.isBlocked ? (
                  <button
                    className="bg-red-500 text-white h-16 w-36 rounded-lg hover:bg-red-600"
                    value="unlist"
                    onClick={(e) =>
                      handleAction(e.target.value, restaurant._id)
                    }
                  >
                    Unlist
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white h-16 w-36 rounded-lg hover:bg-green-600"
                    value="list"
                    onClick={(e) =>
                      handleAction(e.target.value, restaurant._id)
                    }
                  >
                    list
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center mt-20">
                <img
                  style={{ height: "417px", width: "626px" }}
                  src="/assets/no-data-concept-illustration_114360-2506.jpg"
                  alt="noRestaurant"
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};
