import { userAxios } from "./AxiosInterceptors/userAxios";

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const razorPay = async (amount, cartDetails) => {
  return new Promise(async (resolve, reject) => {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    try {
      const resopnse = await userAxios.post(
        "/createPayment",
        JSON.stringify({
          amount: amount,
          currency: "INR",
        })
      );
      const order = await resopnse.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAYKEY,
        amount: order.amount,
        currency: order.currency,
        name: "Reservetable",
        order_id: order.id,
        prefill: {
          name: "Reservetable Admin",
          email: "reserveadmin@gmail.com",
          contact: "7356873619",
        },
        handler: async function (response) {
          try {
            const res = await userAxios.post(
              "/verifyPayment",
              JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            );
            if (res.status === 200) {
              const bookingResponse = await userAxios.post(
                "/bookingTable",
                cartDetails
              );
              if (bookingResponse.status === 200) {
                resolve({ status: "Success" });
              } else reject(new Error("Booking failed"));
            }
          } catch (error) {
            console.log(error);
            reject(error);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
