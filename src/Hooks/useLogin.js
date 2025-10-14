import { useState } from "react";
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";

export const useLogin = () => {
    const dispatch = useDispatch()
    const [ispending, setIspending] = useState(false)
    const login = async (email, password) => {
        try {
            setIspending(true)
            const req = await signInWithEmailAndPassword(auth, email, password)
            if (!req.user) {
                throw new Error("Could not complete login")
            }
        
            dispatch(login(req.user))
            console.log(req.user);
            

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        } finally {
            setIspending(false)
        }
    }
    return { login, ispending }
}