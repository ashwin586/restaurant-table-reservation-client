import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSideBar from "../AdminSideBar";
import Axios from "../../../services/axios";
import { toast } from "react-toastify";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  const handleAction = async (action, id) => {
    try {
      if (action === "block") {
        const response = await Axios.put(
          "/admin/blockUser",
          { id },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        if (response.status === 200) {
          const updatedUser = usersData.map((user) => {
            if (user._id === id) {
              return { ...user, accountStatus: true };
            }
            return user;
          });
          setUsersData(updatedUser);
          toast.error(`${response.data.name} has been blocked`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            style: {
              background: "#EEEEFF",
              color: "red",
            },
          });
        }
      } else if (action === "unBlock") {
        const response = await Axios.put(
          "/admin/unBlockUser",
          { id },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        if (response.status === 200) {
          const updatedUser = usersData.map((user) => {
            if (user._id === id) {
              return { ...user, accountStatus: false };
            }
            return user;
          });
          setUsersData(updatedUser);
          toast.success(`${response.data.name} has been unblocked`, {
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
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/admin/getUserData", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setUsersData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="relative overflow-x-auto ml-[260px] flex justify-center mt-[20px]">
        {usersData && usersData.length !== 0 ? (
          <table className="w-4/5	 text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Email
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Status
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="text-center px-6 py-4 font-medium dark:text-white"
                  >
                    {user?.name}
                  </th>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {user?.email}
                  </td>
                  <td className="text-center ont-medium px-6 py-4 dark:text-white">
                    {user?.phoneNumber}
                  </td>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {user.accountStatus === false ? (
                      <p className="text-green-500">Active</p>
                    ) : (
                      <p className="text-red-500">Blocked</p>
                    )}
                  </td>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {user.accountStatus ? (
                      <button
                        value={"unBlock"}
                        onClick={(e) => handleAction(e.target.value, user._id)}
                        className="bg-green-500 px-3 py-2 rounded-lg"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        value={"block"}
                        onClick={(e) => handleAction(e.target.value, user._id)}
                        className="bg-red-500 px-3 py-2 rounded-lg"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img
              src="/assets/7117865_3371471.jpg"
              alt="nodataimage"
              width="350px"
            />
            <h1 className="text-2xl">No users Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
