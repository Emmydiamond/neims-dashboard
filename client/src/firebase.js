import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_sJYPlS3rb1fgSrGJuP_mJ9wEtnYH8vg",
  authDomain: "neims-b43b6.firebaseapp.com",
  projectId: "neims-b43b6",
  storageBucket: "neims-b43b6.firebasestorage.app",
  messagingSenderId: "493584166545",
  appId: "1:493584166545:web:abf46a85e3d87173aa5930",
  measurementId: "G-9QVTB2GF93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();