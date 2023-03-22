// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrSxACgVZHBNd7OPu5gSQaHwEsH4WwaIc",
  authDomain: "tindev-a06d2.firebaseapp.com",
  projectId: "tindev-a06d2",
  storageBucket: "tindev-a06d2.appspot.com",
  messagingSenderId: "292199411505",
  appId: "1:292199411505:web:35e3d03b53679b66f84a10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export default app;
