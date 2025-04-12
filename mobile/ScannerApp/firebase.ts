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
  apiKey: "Enter API key here",
  authDomain: "recipic-3e67f.firebaseapp.com",
  projectId: "recipic-3e67f",
  storageBucket: "recipic-3e67f.firebasestorage.app",
  messagingSenderId: "41746715043",
  appId: "1:41746715043:web:c800e0e470003f68854a16",
  measurementId: "G-0WNS3Q4EQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);