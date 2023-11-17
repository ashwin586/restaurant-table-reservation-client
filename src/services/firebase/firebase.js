import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import {getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN ,
    projectId: process.env.REACT_APP_PROJECTID ,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID ,
    appId: process.env.REACT_APP_APPID 
};

export const Firebase = initializeApp(firebaseConfig);
export const storage = getStorage(Firebase);
export const auth = getAuth(Firebase);
export const googleProvider = new GoogleAuthProvider();