import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";
import { toast } from "react-toastify";

const PartnersManagment = () => {
  const [partnerData, setPartnerData] = useState([]);

  const handleAction = async (action, id) => {
    try {
      if (action === "block") {
        const response = await adminAxios.put("/admin/blockPartner", { id });
        if (response.status === 200) {
          const updatedPartner = partnerData.map((partner) => {
            if (partner._id === id) {
              return { ...partner, accountStatus: true };
            }
            return partner;
          });
          setPartnerData(updatedPartner);
          toast.error(`Partner has been blocked`, {
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
        const response = await adminAxios.put("/admin/unBlockPartner", { id });
        if (response.status === 200) {
          const updatedPartner = partnerData.map((partner) => {
            if (partner._id === id) {
              return { ...partner, accountStatus: false };
            }
            return partner;
          });
          setPartnerData(updatedPartner);
          toast.success(`Partner has been unblocked`, {
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
    } catch (err) {
      console.log(err);
      if (err && err.response.status === 400) {
        toast.error(`${err.response.data.message}`, {
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
    }
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await adminAxios.get("/admin/getPartnersData");
        setPartnerData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPartners();
  }, []);
  return (
    <div className="h-screen bg-adminDashboard">
      <AdminHeader />
      <AdminSideBar />
      <div className="relative overflow-x-auto ml-[260px] flex justify-center mt-[20px]">
        {partnerData && partnerData.length !== 0 ? (
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
              {partnerData.map((partner) => (
                <tr
                  key={partner._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="text-center px-6 py-4 font-medium dark:text-white"
                  >
                    {partner?.name}
                  </th>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {partner?.email}
                  </td>
                  <td className="text-center ont-medium px-6 py-4 dark:text-white">
                    {partner?.phoneNumber}
                  </td>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {partner.accountStatus === false ? (
                      <p className="text-green-500">Active</p>
                    ) : (
                      <p className="text-red-500">Blocked</p>
                    )}
                  </td>
                  <td className="text-center font-medium px-6 py-4 dark:text-white">
                    {partner.accountStatus ? (
                      <button
                        value={"unBlock"}
                        onClick={(e) =>
                          handleAction(e.target.value, partner._id)
                        }
                        className="bg-green-500 px-3 py-2 rounded-lg"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        value={"block"}
                        onClick={(e) =>
                          handleAction(e.target.value, partner._id)
                        }
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
    </div>
  );
};

export default PartnersManagment;
