import React from "react";

const OrdersModal = ({ open, close, orders }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 font-serif ">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 h-2/4 overflow-y-auto relative">
            <div
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              onClick={close}
            >
              <div className="absolute w-5 h-1 bg-gray-500 transform rotate-45"></div>
              <div className="absolute w-5 h-1 bg-gray-500 transform -rotate-45"></div>
            </div>
            <div className="mt-10 p-4 ">
              {orders &&
                orders.map((order, index) => (
                  <div className="grid grid-cols-2 text-center" key={index}>
                    <div className="p-1">{order.menu.name}</div>
                    <div className="p-1">x<span className="text-xl">{order.quantity}</span></div>
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
