
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyCAUAQYJNZ3rhzOmXYe7RdJNtq_kG2kFLo",
    authDomain: "nextapifirebase.firebaseapp.com",
    databaseURL: "https://nextapifirebase-default-rtdb.firebaseio.com",
    projectId: "nextapifirebase",
    storageBucket: "nextapifirebase.firebasestorage.app",
    messagingSenderId: "722090848591",
    appId: "1:722090848591:web:b9810b77537b246218553a",
    measurementId: "G-2V1CLJLZNW"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
