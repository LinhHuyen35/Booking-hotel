import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZwFodVPr_JxqpCxQL3gYf-8P_melUPzM",
  authDomain: "booking-hotel-5f351.firebaseapp.com",
  projectId: "booking-hotel-5f351",
  storageBucket: "booking-hotel-5f351.appspot.com",
  messagingSenderId: "180537310772",
  appId: "1:180537310772:web:ce68910aeeeee36a2f5461",
  measurementId: "G-LV6TWSHKZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
