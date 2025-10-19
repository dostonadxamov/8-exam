import { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { firebaseErrorMessage } from "../components/ErrorId";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const _signup = async ({ displayName, email, password }) => {
    try {
      setIsPending(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await updateProfile(user, {
        displayName,
        photoURL:
          "https://api.dicebear.com/9.x/initials/svg?seed=" + displayName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        displayName,
        photoURL:user.photoURL,
        online: true,
        createdAt: new Date(),
      });

      dispatch(login(user));
      console.log("✅ User signed up:", user);
    } catch (err) {
      setError(firebaseErrorMessage(err.message));
      console.log("❌ Signup error:", err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _signup, error, isPending };
};
