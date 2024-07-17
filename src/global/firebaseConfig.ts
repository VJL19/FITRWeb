// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAluzK1TXt7_p_oTsH94qTgcah4u_tJsEg",
  authDomain: "fitrstorage.firebaseapp.com",
  databaseURL: "https://fitrstorage-default-rtdb.firebaseio.com",
  projectId: "fitrstorage",
  storageBucket: "fitrstorage.appspot.com",
  messagingSenderId: "39261814478",
  appId: "1:39261814478:web:1988427254c869a42cda9f",
  measurementId: "G-BGVQJ1SCZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
