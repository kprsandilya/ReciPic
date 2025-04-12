// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5nJKRCsYcgbZUcRP99ErzREOdZhOXcoM",
  authDomain: "recipic-baf26.firebaseapp.com",
  projectId: "recipic-baf26",
  storageBucket: "recipic-baf26.firebasestorage.app",
  messagingSenderId: "204851599120",
  appId: "1:204851599120:web:3262ea06ee27d71210f795",
  measurementId: "G-T4V3PJJ37N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);