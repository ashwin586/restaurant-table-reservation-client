import {storage} from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



export const uploadUserProfile = async (image, id) =>{
    const storageRef = ref(storage, `userprofile/${id}`);
 try{
    const result = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(result.ref);
    return downloadURL;
 }catch(err){
    console.log(err);
 }
}


export const uploadRestaurantImage = async (image, id) =>{
   const storageRef = ref(storage, ``)
}