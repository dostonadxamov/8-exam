
import { Navigate } from 'react-router-dom'

export default function ProtectedRouters({children, user}) {
    if (user) {
        return children
    } else {
   return <Navigate to="/login"/>   
    }
}
