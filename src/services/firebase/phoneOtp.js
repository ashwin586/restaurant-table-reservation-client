import { toast } from "react-toastify";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const sendOtp = async (phoneNumber) => {
  try {
    const number = "+91" + phoneNumber;
    const appVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: () => {
        toast.success("Otp sent successfully");
      },
      "expired-callback": () => {
        toast.error("Timeout");
      },
    });
    console.log(appVerifier);
    const result = await signInWithPhoneNumber(auth, number, appVerifier);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const verifyOtp = async (e, otp) => {
  e.preventDefault();
  try {
  } catch (err) {
    console.log(err);
  }
};
