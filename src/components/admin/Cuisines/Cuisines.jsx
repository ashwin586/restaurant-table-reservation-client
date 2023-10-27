import React, { useState, useEffect } from "react";
import AdminSideBar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";
import AddCusine from "./AddCusine";

const Cuisines = () => {
  const [isClicked, setIsClicked] = useState(false);
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
        <AddCusine
          isClicked={isClicked}
          closeModal={() => setIsClicked(false)}
        />
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
              <table
                role="table"
                className="w-full min-w-[500px] overflow-x-scroll"
              >
                {/* <thead>
                  <tr role="row">
                    <th
                      colspan="1"
                      role="columnheader"
                      title="Toggle SortBy"
                      style={{cursor: "pointer"}}
                    >
                      <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Name
                      </div>
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      title="Toggle SortBy"
                      style={{cursor: "pointer"}}
                    >
                      <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Artworks
                      </div>
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      title="Toggle SortBy"
                      style={{cursor: "pointer"}}
                    >
                      <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Rating
                      </div>
                    </th>
                  </tr>
                </thead> */}
                <tbody role="rowgroup" className="px-4">
                  <tr role="row">
                    <td className="py-3 text-sm" role="cell">
                      <div className="flex items-center gap-2">
                        <div className="h-[30px] w-[30px] rounded-full">
                          <img
                            src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2244&amp;q=80"
                            className="h-full w-full rounded-full"
                            alt=""
                          />
                        </div>
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          @maddison_c21
                        </p>
                      </div>
                    </td>
                    <td className="py-3 text-sm" role="cell">
                      <p className="text-md font-medium text-gray-600 dark:text-white">
                        9821
                      </p>
                    </td>
                    <td className="py-3 text-sm" role="cell">
                      <div className="mx-2 flex font-bold">
                        <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700">
                          <div
                            className="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
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
