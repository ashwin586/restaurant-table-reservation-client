import React, { useEffect, useState } from "react";
import AddMenuModal from "./AddMenuModal";

const MenuModal = ({ isOpen, closeModal, isId }) => {
  const [addMenu, setAddMenu] = useState(false);

  useEffect(() => {}, []);
  return (
    <>
      {addMenu && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <AddMenuModal isOpen={addMenu} closeModal={() => setAddMenu(false)} />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-30 font-serif">
          <div className="bg-slate-300 p-4 rounded-lg shadow-lg w-3/6 h-4/6 overflow-y-auto relative">
            <button
              onClick={() => {
                setAddMenu(true);
              }}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            >
              Add Menu
            </button>
            <div
              class="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              onClick={closeModal}
            >
              <div class="absolute w-5 h-1 bg-gray-500 transform rotate-45"></div>
              <div class="absolute w-5 h-1 bg-gray-500 transform -rotate-45"></div>
            </div>

            <div className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-40 flex transform transition-transform hover:scale-105 font-serif">
              <div>
                <img
                  src=""
                  alt="FoodImage"
                  className="h-40 w-40 cursor-pointer"
                />
              </div>
              <div className="flex-1 ms-4 cursor-pointer">
                <h3>
                  <span className="text-lg font-bold">Food Name: </span>
                  Demo Food
                </h3>
                <h3>
                  <span className="text-lg font-bold">Food Quantity: </span>
                  50
                </h3>
                <h3>
                  <span className="text-lg font-bold">Food Price: </span>₹ 200
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuModal;
