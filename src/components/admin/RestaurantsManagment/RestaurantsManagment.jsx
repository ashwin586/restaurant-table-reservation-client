import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import Axios from "../../../services/axios";

export const RestaurantsManagment = () => {
  const [restaurants, setRestaurants] = useState([]);
  const token = localStorage.getItem("adminToken");
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
          <div className="mb-6 p-4 ms-20 bg-adminDashboard shadow-lg rounded-lg w-4/5 h-48 flex" key={restaurant?._id}>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Restaurant Name: {restaurant?.name}</h3>
              <p className="text-lg font-medium">Partner Name: {restaurant?.partner.name} </p>
              <p className="text-md text-gray-800">Cuisine Types: {restaurant?.cuisine} </p>
              <p className="text-sm text-gray-800">Opens: {restaurant?.openTime} - closes: {restaurant?.closeTime}</p>
              <p className="text-sm text-gray-800"> Address: {restaurant?.address}</p>
            </div>
            <button className="bg-blue-500 text-white h-16 w-36 rounded-lg hover:bg-blue-600">
              Unlist
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
