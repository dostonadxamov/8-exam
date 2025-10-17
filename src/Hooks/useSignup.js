import { useState } from "react";
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";

export const useSignup = () => {
    const dispatch = useDispatch()
    const [ispending, setIspending] = useState(false)
    const signup = async (name, photo, email, password) => {
        try {
            setIspending(true)
            const req = await createUserWithEmailAndPassword(auth, email, password)
            if (!req.user) {
                throw new Error("Could not complete signup")
            }
            await updateProfile(req.user, {
                displayName: name,
                photoURL: photo 
            })

     
            dispatch(login(req.user))
            console.log(req.user);
            

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        } finally {
            setIspending(false)
        }
    }
    return { signup, ispending}
}