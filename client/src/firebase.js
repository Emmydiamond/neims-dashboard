import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_sJYPlS3rb1fgSrGJuP_mJ9wEtnYH8vg",
  authDomain: "neims-b43b6.firebaseapp.com",
  projectId: "neims-b43b6",
  storageBucket: "neims-b43b6.firebasestorage.app",
  messagingSenderId: "493584166545",
  appId: "1:493584166545:web:abf46a85e3d87173aa5930",
  measurementId: "G-9QVTB2GF93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚨 THIS LINE IS THE FIX
setPersistence(auth, browserSessionPersistence);

export const provider = new GoogleAuthProvider();
export { auth };