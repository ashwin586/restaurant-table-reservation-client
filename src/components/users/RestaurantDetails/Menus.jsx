import React, { useState } from "react";

const Menus = ({ menus, addToCart, cart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMenu = menus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="p-3">
        <h1 className="text-2xl font-semibold ">Menus</h1>
        <div>
          <div className="mt-2 ms-20">
            <input
              type="text"
              className="pl-6 w-1/3 border-gray-500 border p-2 rounded-md outline-none"
              placeholder="Search Menu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            {menus &&
              filteredMenu.map((menu) => (
                <div
                  className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-40 flex transform transition-transform hover:scale-105 font-serif"
                  key={menu?._id}
                >
                  <div className="flex">
                    <div>
                      <img
                        src={menu?.imageURL}
                        alt="FoodImage"
                        className="h-32 w-32 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 ms-4 cursor-pointer">
                      <h3>
                        <span className="text-lg font-bold">Food Name: </span>
                        {menu?.name}
                      </h3>
                      <h3>
                        <span className="text-lg font-bold">Food Type: </span>
                        {menu?.foodCategory.category}
                      </h3>
                      <h3>
                        <span className="text-lg font-bold">Food Price: </span>₹{" "}
                        {menu?.price}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-2">
                    <div className="flex items-center space-x-2 justify-center mb-2">
                      <button
                        className="bg-slate-400 text-white px-2 py-1  focus:outline-none"
                        onClick={() =>
                          addToCart(
                            menu?._id,
                            menu?.name,
                            (cart.find((item) => item.menu === menu?.name)
                              ?.quantity || 1) - 1,
                            menu?.price
                          )
                        }
                      >
                        -
                      </button>
                      <span className="text-lg">
                        {cart.find((item) => item.menu === menu?.name)
                          ?.quantity || 1}
                      </span>
                      <button
                        className="bg-slate-400 text-white px-2 py-1  focus:outline-none"
                        onClick={() =>
                          addToCart(
                            menu?._id,
                            menu?.name,
                            (cart.find((item) => item.menu === menu?.name)
                              ?.quantity || 0) + 1,
                            menu?.price
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-button text-gray-800 px-4 py-2 rounded-md flex items-center"
                      type="button"
                      onClick={() => {
                        const quantity =
                          cart.find((item) => item.menu === menu?.name)
                            ?.quantity || 1;
                        const total = quantity * menu?.price;
                        addToCart(menu?._id, menu?.name, quantity, total);
                      }}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Item
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menus;
