import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOk_8o9lfMi804gDYNJlbh_Xuh3w9I8ZU",
  authDomain: "final-exam-e8957.firebaseapp.com",
  projectId: "final-exam-e8957",
  storageBucket: "final-exam-e8957.appspot.com",
  messagingSenderId: "152658799071",
  appId: "1:152658799071:web:b403cc0d81ea5f8086fc6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app)
export const db = getFirestore(app)