import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import AddRestaurantModal from "./AddRestaurantModal";

const Restaurants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
  }, [])

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
      </div>
    </>
  );
};

export default Restaurants;
