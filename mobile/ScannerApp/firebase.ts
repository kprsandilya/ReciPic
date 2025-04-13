// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { API_KEY } from "./apikey"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "recipic-2.firebaseapp.com",
  projectId: "recipic-2",
  storageBucket: "recipic-2.firebasestorage.app",
  messagingSenderId: "455127185820",
  appId: "1:455127185820:web:055707f78d6ec9e406b059",
  measurementId: "G-CLN5KBM090"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);