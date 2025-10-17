import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login as loginfunc } from "../app/features/userSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [ispending, setIspending] = useState(false);

  const login = async (email, password) => {
    try {
      setIspending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginfunc(req.user));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.log("Login error:", error);
    } finally {
      setIspending(false);
    }
  };

  return { login, ispending };
};
