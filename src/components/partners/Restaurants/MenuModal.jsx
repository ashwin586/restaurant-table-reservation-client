import React, { useEffect, useState } from "react";
import AddMenuModal from "./AddMenuModal";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import MenuDetailsModal from "./MenuDetailsModal";

const MenuModal = ({ isOpen, closeModal, isId }) => {
  const [addMenu, setAddMenu] = useState(false);
  const [menus, setMenus] = useState([]);
  const [menuDetailsModal, setMenuDetailsModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await partnerAxios.get("/partner/fetchAllMenus", {
          params: {
            id: isId,
          },
        });
        if (response.status === 200) {
          setMenus(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMenus();
  }, []);

  const handleEditSuccess = (updatedMenu) => {
    const updatedIndex = menus.findIndex((menu) => menu._id === updatedMenu.id);
    setMenus((prevMenus) => {
      const newMenus = [...prevMenus];
      newMenus[updatedIndex] = updatedMenu;
      return newMenus;
    });
  };

  const handleAddSuccess = (newMenu) => { 
    setMenus((prevMenus) => [...prevMenus, newMenu]);
  };

  return (
    <>
      {addMenu && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <AddMenuModal
            isOpen={addMenu}
            closeModal={() => setAddMenu(false)}
            isId={isId}
            changedValues={handleAddSuccess} 
          />
        </div>
      )}

      {menuDetailsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <MenuDetailsModal
            isOpen={menuDetailsModal}
            closeModal={() => setMenuDetailsModal(false)}
            isSelected={selectedMenu}
            onEditSuccess={handleEditSuccess}
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-30 font-serif">
          <div className="bg-slate-300 p-4 rounded-lg shadow-lg w-3/6 h-4/6 overflow-y-auto relative">
            <button
              onClick={() => {
                setAddMenu(true);
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
            >
              Add Meal
            </button>
            <div
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              onClick={closeModal}
            >
              <div className="absolute w-5 h-1 bg-gray-500 transform rotate-45"></div>
              <div className="absolute w-5 h-1 bg-gray-500 transform -rotate-45"></div>
            </div>
            {menus.map((menu) => (
              <div
                className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-40 flex transform transition-transform hover:scale-105 font-serif"
                onClick={() => {
                  setMenuDetailsModal(true);
                  setSelectedMenu(menu);
                }}
                key={menu?._id}
              >
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
                    {menu?.foodCategory?.category}
                  </h3>
                  <h3>
                    <span className="text-lg font-bold">Food Category: </span>
                    {menu?.category || "N/A"}
                  </h3>
                  <h3>
                    <span className="text-lg font-bold">Food Quantity: </span>
                    {menu?.quantity}
                  </h3>
                  <h3>
                    <span className="text-lg font-bold">Food Price: </span>₹{" "}
                    {menu?.price}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MenuModal;
