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
  const options = {
    key: "rzp_test_Happ5J4dHSI2eF",
    currency: "INR",
    amount: amount * 100,
    name: "RESERVETABLE",
    prefill: {
      name: "RESERVETABLE",
    },
    handler: function (response) {
      if (response.razorpay_payment_id) {
        console.log("Payment successful", response.razorpay_payment_id);
      } else {
        console.log("Payment failed");
      }
    },
  };
  try {
    const paymentPromise = new Promise((resolve) => {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      resolve(paymentObject);
    });

    const paymentId = await paymentPromise;
    return paymentId;
  } catch (err) {
    console.log(err);
  }
};