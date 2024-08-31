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

export const razorPay = async (amount) => {
  await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  try {
    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.REACT_APP_RAZORPAYKEY,
        currency: "INR",
        amount: amount * 100,
        name: "RESERVETABLE",
        prefill: {
          name: "RESERVETABLE",
        },
        handler: function (response) {
          if (response.razorpay_payment_id) {
            console.log("Payment successful", response.razorpay_payment_id);
            resolve({
              paymentId: response.razorpay_payment_id,
            });
          } else {
            console.log("Payment failed");
            reject("Payment failed");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  } catch (err) {
    console.log(err);
  }
};
