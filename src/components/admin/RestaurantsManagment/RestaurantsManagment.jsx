import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import Axios from "../../../services/axios";

export const RestaurantsManagment = () => {
  const [restaurants, setRestaurants] = useState([]);
  const token = localStorage.getItem("adminToken");

  const handleAction = async (action, id) => {
    try {
      if (action === "unlist") {
        const response = await Axios.put(
          "/admin/unlistRestaurant",
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        const response = await Axios.put(
          "/admin/listRestaurant",
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        const response = await Axios.get("/admin/getAllRestaurants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      <AdminHeader />
      <AdminSideBar />
      <div className="ml-[250px] mt-5 ">
        {restaurants.map((restaurant) => (
          <div
            className="mb-6 p-4 ms-20 bg-adminDashboard shadow-lg rounded-lg w-4/5 h-48 flex"
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
                Cuisine Types: {restaurant?.cuisine}{" "}
              </p>
              <p className="text-sm text-gray-800">
                Opens: {restaurant?.openTime} - closes: {restaurant?.closeTime}
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
                onClick={(e) => handleAction(e.target.value, restaurant._id)}
              >
                Unlist
              </button>
            ) : (
              <button
                className="bg-green-500 text-white h-16 w-36 rounded-lg hover:bg-green-600"
                value="list"
                onClick={(e) => handleAction(e.target.value, restaurant._id)}
              >
                list
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
