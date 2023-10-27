import React, { useState, useEffect } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import AddCusine from "./AddCusine";
import Axios from "../../../services/axios";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";

const Cuisines = () => {
  const token = localStorage.getItem("adminToken");
  const [isClicked, setIsClicked] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  const updateCuisines = (newCuisine) => {
    setCuisines([...cuisines, newCuisine]);
  };

  const deleteCusine = async (id) => {
    try {
      const response = await Axios.delete("/admin/deleteCuisine", {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200) {
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
        const updatedCuisines = cuisines.filter((cuisine) => cuisine._id !== id);
        setCuisines(updatedCuisines);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await Axios.get("/admin/getAllCusinies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    <div className="h-screen bg-adminDashboard">
      <AdminHeader />
      <AdminSideBar />
      <div className="ml-[260px]">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => setIsClicked(true)}
        >
          Add Cuisine
        </button>
        {isClicked && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <AddCusine
                isClicked={isClicked}
                closeModal={() => setIsClicked(false)}
                updateCuisines={updateCuisines}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
              <table
                role="table"
                className="w-full min-w-[500px] overflow-x-scroll"
              >
                <thead>
                  <tr role="row">
                    <th
                      colSpan="1"
                      role="columnheader"
                      title="Toggle SortBy"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Cuisine Name
                      </div>
                    </th>
                    <th
                      colSpan="1"
                      role="columnheader"
                      title="Toggle SortBy"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup" className="px-4">
                  {cuisines.map((cuisine) => (
                    <tr role="row" key={cuisine?._id}>
                      <td className="py-3 text-sm" role="cell">
                        <div className="flex items-center gap-2">
                          <h1 className="text-md font-bold dark:text-black">
                            {cuisine?.cuisine}
                          </h1>
                        </div>
                      </td>
                      <td className="py-3 text-sm" role="cell">
                        <button
                          className="text-md font-medium text-gray-600 dark:text-black"
                          onClick={() => deleteCusine(cuisine._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuisines;
