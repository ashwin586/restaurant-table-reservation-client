import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN ,
    projectId: process.env.REACT_APP_AUTHDOMAIN ,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID ,
    appId: process.env.REACT_APP_APPID 
};

const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);

export {Firebase, auth};