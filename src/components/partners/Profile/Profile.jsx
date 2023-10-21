import React from "react";
import Sidebar from "../Sidebar";

const Profile = () => {
  return (
    <>
      <Sidebar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <div class="container mx-auto bg-white rounded-lg shadow-md p-4">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="md:col-span-1 flex justify-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="User Avatar"
                class="w-64 h-64 rounded-full object-cover"
              />
            </div>
            <div class="md:col-span-1">
              <strong class="text-lg">Information</strong>
              <div class="mt-4">
                <table class="table-auto">
                  <tbody>
                    <tr>
                      <td class="font-semibold pr-4">Identificacion</td>
                      <td class="text-primary">123456789</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Name</td>
                      <td class="text-primary">Bootdey</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Lastname</td>
                      <td class="text-primary">Bootstrap</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Username</td>
                      <td class="text-primary">bootnipets</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Role</td>
                      <td class="text-primary">Admin</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Email</td>
                      <td class="text-primary">noreply@email.com</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Created</td>
                      <td class="text-primary">20 jul 20014</td>
                    </tr>
                    <tr>
                      <td class="font-semibold pr-4">Modified</td>
                      <td class="text-primary">20 jul 20014 20:00:00</td>
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
