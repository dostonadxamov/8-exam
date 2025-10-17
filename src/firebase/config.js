import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJcdkMhW8p572uMx0rIZdBdv2KSsW8aq8",
  authDomain: "kitchen-app-62a7c.firebaseapp.com",
  projectId: "kitchen-app-62a7c",
  storageBucket: "kitchen-app-62a7c.firebasestorage.app",
  messagingSenderId: "189610774451",
  appId: "1:189610774451:web:66ed70d47cc885376505c6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

