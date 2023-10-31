import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const Profile = () => {
  const [data, setdata] = useState();
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await partnerAxios.get("/partner/getDetails");
        if (response.status === 200) {
          setdata(response.data.partner);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPartner();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <div className="container mx-auto bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-1 flex justify-center">
              <img
                src={
                  data?.imageURL ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt="User Avatar"
                className="w-64 h-64 rounded-full object-cover"
              />
            </div>
            <div className="md:col-span-1">
              <strong className="text-lg">Profile</strong>
              <div className="mt-4">
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="font-semibold pr-4">Name: </td>
                      <td className="text-primary">{data?.name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Role:</td>
                      <td className="text-primary">Partner</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Email:</td>
                      <td className="text-primary">{data?.email}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Phone Number:</td>
                      <td className="text-primary">{data?.phoneNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
