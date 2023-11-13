// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7e361.firebaseapp.com",
  projectId: "mern-estate-7e361",
  storageBucket: "mern-estate-7e361.appspot.com",
  messagingSenderId: "230978264191",
  appId: "1:230978264191:web:3285d2fdc79fc6b38eb34a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);