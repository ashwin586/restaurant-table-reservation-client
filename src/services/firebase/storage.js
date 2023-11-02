import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadUserProfile = async (image, id) => {
  const storageRef = ref(storage, `userprofile/${id}`);
  try {
    const result = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(result.ref);
    return downloadURL;
  } catch (err) {
    console.log(err);
  }
};

export const uploadRestaurantImage = async (images) => {
  const downloadUrls = [];
  for (const image of images) {
    const storageRef = ref(storage, `RestaurantImages/${image.name}`);
    try {
      const result = await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(result.ref);
      downloadUrls.push(downloadUrl);
    } catch (err) {
      console.log(err);
    }
  }
  return downloadUrls;
};

export const uploadFoodImage = async (image) => {
  try {
    const storageRef = ref(storage, `FoodImages/${image.name}`);
    const result = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(result.ref);
    return downloadURL;
  } catch (err) {
    console.log(err);
  }
};
