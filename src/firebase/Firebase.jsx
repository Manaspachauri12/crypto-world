// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAD8wuM7k6nXoOoHMR7optf42t67IppNdU",
  authDomain: "crypto-world-dd648.firebaseapp.com",
  projectId: "crypto-world-dd648",
  storageBucket: "crypto-world-dd648.appspot.com",
  messagingSenderId: "478118863793",
  appId: "1:478118863793:web:bd2a655408f707ce9dd390",
  measurementId: "G-4X52ECQ0S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
