import React, { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSideBar";
import AddCategory from "./AddCategory";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";
import { DeleteIcon } from "@chakra-ui/icons";

const Categories = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [categories, setCategories] = useState([]);

  const updatedCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminAxios.get("/admin/getAllCategory");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const response = await adminAxios.delete("/admin/deleteCategory", {
        data: { id },
      });
      if (response.status === 200) {
        const newCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(newCategories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isClicked && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <AddCategory
              isClicked={isClicked}
              closeModal={() => setIsClicked(false)}
              updatedCategory={updatedCategory}
            />
          </div>
        </div>
      )}
      <div className="h-screen bg-adminDashboard">
        <AdminHeader />
        <AdminSidebar />
        <div className="ml-[260px]">
          <div className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-2/5 h-96 font-serif overflow-y-auto">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => setIsClicked(true)}
              >
                Add Category
              </button>
            </div>
            <div className="my-4 flex flex-col items-center justify-center">
              {categories.map((category, index) => (
                <div
                  className="bg-slate-200 shadow-md rounded-md w-3/4 h-1/4 p-4 mb-4"
                  key={index}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl">{category?.category}</h1>
                    <div
                      className="cursor-pointer trasnform transition-transform hover:scale-150"
                      onClick={() => deleteCategory(category?._id)}
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

export default Categories;
