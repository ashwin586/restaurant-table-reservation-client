import React from "react";

const Cart = ({cart, handlebooking}) => { 
  return (
    <>
      <div>
        {cart.length > 0 && (
          <div>
            <h1 className="font-bold text-lg text-center">Items Added</h1>
            <div className="flex justify-center">
              <table className="w-11/12">
                <thead>
                  <tr>
                    <th className="border border-gray-500 px-4 py-2">Menu</th>
                    <th className="border border-gray-500 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-500 px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="border border-gray-500">
                      <td className="border border-gray-500 px-4 py-2">
                        {item.menu}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        ₹ {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="border border-gray-500 px-4 py-2 font-bold"
                      colSpan="2"
                    >
                      Grand Total
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      ₹ {cart.reduce((acc, item) => acc + item.total, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        {cart.length > 0 && (
          <div className="w-full flex justify-center mt-4">
            <button
              className="bg-button text-gray-800 px-4 py-2 rounded-md flex items-center"
              type="submit"
              onClick={handlebooking}
            >
              {" "}
              Book a table
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
