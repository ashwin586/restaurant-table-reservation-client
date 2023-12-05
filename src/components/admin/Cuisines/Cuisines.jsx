import React, { useState, useEffect } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import AddCusine from "./AddCusine";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";

const Cuisines = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  const updateCuisines = (newCuisine) => {
    setCuisines([...cuisines, newCuisine]);
  };

  const deleteCusine = async (id) => {
    try {
      const response = await adminAxios.delete("/admin/deleteCuisine", {
        data: { id },
      });
      if (response.status === 200) {
        toast.success(`${response.data.result.cuisine} has been Deleted`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          style: {
            background: "#EEEEFF",
            color: "green",
          },
        });
        const updatedCuisines = cuisines.filter(
          (cuisine) => cuisine._id !== id
        );
        setCuisines(updatedCuisines);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await adminAxios.get("/admin/getAllCusinies");
        if (response.status === 200) {
          setCuisines(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCuisines();
  }, []);

  return (
    <>
      {isClicked && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <AddCusine
              isClicked={isClicked}
              closeModal={() => setIsClicked(false)}
              updatedCategory={updateCuisines}
            />
          </div>
        </div>
      )}
      <div className="h-screen bg-adminDashboard">
        <AdminHeader />
        <AdminSideBar />
        <div className="ml-[260px]">
          <div className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-2/5 h-96 font-serif overflow-y-auto">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => setIsClicked(true)}
              >
                Add Cuisine
              </button>
            </div>
            <div className="my-4 flex flex-col items-center justify-center">
              {cuisines.map((cuisine, index) => (
                <div
                  className="bg-slate-200 shadow-md rounded-md w-3/4 h-1/4 p-4 mb-4"
                  key={index}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl">{cuisine?.cuisine}</h1>
                    <div
                      className="cursor-pointer trasnform transition-transform hover:scale-150"
                      onClick={() => deleteCusine(cuisine?._id)}
                    >
                      <DeleteIcon />
                    </div>
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

export default Cuisines;
