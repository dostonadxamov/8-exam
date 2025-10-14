import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { logout as logout2 } from "../app/features/userSlice" 

export function useLogout() {
    const dispatch = useDispatch()
    const [ispending, setIspending] = useState(false)
    const logout = async () => {
        try {
            setIspending(true)
            await signOut(auth)
            dispatch(logout2()) 
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        } finally {
            setIspending(false)
        }
    }
    return { logout, ispending }
}