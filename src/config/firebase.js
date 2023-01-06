// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJWH670y5mhsJFEu_IAvH30opSfAvNmT8",
  authDomain: "mern-shop-2229e.firebaseapp.com",
  projectId: "mern-shop-2229e",
  storageBucket: "mern-shop-2229e.appspot.com",
  messagingSenderId: "118128640425",
  appId: "1:118128640425:web:724478549a7a434ce0c4b8",
  measurementId: "G-2WZD302ZCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
