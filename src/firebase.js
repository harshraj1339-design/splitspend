import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8yjAm-v91R-sHwq-rTRqCTudUQ8tpbT0",
  authDomain: "splitspend-865c9.firebaseapp.com",
  projectId: "splitspend-865c9",
  storageBucket: "splitspend-865c9.firebasestorage.app",
  messagingSenderId: "73474868606",
  appId: "1:73474868606:web:1abcf3934c8d7c4cf99f2f",
  measurementId: "G-ZS5XDZSP58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);