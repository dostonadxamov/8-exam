import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJcdkMhW8p572uMx0rIZdBdv2KSsW8aq8",
  authDomain: "kitchen-app-62a7c.firebaseapp.com",
  projectId: "kitchen-app-62a7c",
  storageBucket: "kitchen-app-62a7c.firebasestorage.app",
  messagingSenderId: "189610774451",
  appId: "1:189610774451:web:66ed70d47cc885376505c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app)
export const db = getFirestore(app)