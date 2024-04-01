import React from "react";

const OrdersModal = ({ open, close, orders, userName }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 font-serif ">
          <div className="bg-amber-100 p-4 rounded-lg shadow-lg w-1/4 h-2/4 overflow-y-auto relative">
            <div
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              onClick={close}
            >
              <div className="absolute w-5 h-1 bg-gray-500 transform rotate-45"></div>
              <div className="absolute w-5 h-1 bg-gray-500 transform -rotate-45"></div>
            </div>
            <div className="mt-10 p-4 ">
              <h1 className="mb-2 text-3xl font-extrabold">
                {userName}'s Orders
              </h1>
              {orders &&
                orders.map((order, index) => (
                  <div className="grid grid-cols-2 text-center" key={index}>
                    <div className="inline-flex items-center">
                      <div className="m-2">
                        <img
                          src={order.menu.imageURL}
                          alt=""
                          style={{ height: "36px", width: "36px" }}
                        />
                      </div>
                      <div className="p-1 text-xl">{order.menu.name}</div>
                    </div>

                    <div className="p-1 text-yellow-800">
                      x<span className="text-xl">{order.quantity}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersModal;
