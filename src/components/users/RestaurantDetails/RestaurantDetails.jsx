import React, { useEffect, useState } from "react";
import NavBar from "../Navbar";
import { useParams } from "react-router-dom";
import Axios from "../../../services/axios";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await Axios.get("/getRestaurantDetails", {
          params: {
            id: restaurantId,
          },
        });
        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurant();
  }, []);
  return (
    <>
      <div className="bg-adminDashboard h-fit">
        <NavBar />
        <div className="flex justify-center h-screen mt-4">
          <div className="bg-green-500 w-2/3 h-3/4">
            <div>
              lool</div>
            <div></div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
