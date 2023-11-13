import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Axios from "../../../services/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await Axios.get("/getAllRestaurants");
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
      <Navbar />
      <div className="">
        <div>
          <img
            className="w-full h-1/2"
            src="/assets/wepik-export-20231103074229zt1g.png"
            alt="bannerImage"
          />
        </div>
        <div className="flex justify-center">
          <div className="w-2/3 h-96">
            <div>
              <h1 className="text-2xl font-bold p-5">Restaurants Near By</h1>
            </div>

            <div className="grid grid-cols-4">
              {restaurants.map((restaurant) => (
                <div
                  className="w-72 h-60 bg-white shadow-md shadow-right shadow-bottom rounded-xl m-4 p-4 hover:cursor-pointer transform transition-transform hover:scale-102"
                  key={restaurant?._id}
                  onClick={() => navigate(`/restaurantDetails/${restaurant?._id}`)}
                >
                  <div className="h-3/5 relative">
                    <img
                      src={restaurant?.images[0]}
                      alt="RestaurantImage"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-xl font-bold text-gray-700">
                      {restaurant?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {restaurant?.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
