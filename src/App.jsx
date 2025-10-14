
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRouters from "./components/ProtectedRouters";
import { useDispatch, useSelector } from "react-redux";
import { action } from "./pages/Signup";
import { action as action2 } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { isAuthReady, login } from "./app/features/userSlice";
import { auth } from "./firebase/config";

export default function App() {
  const { user, authReady } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRouters user={user}>
        <MainLayouts />
      </ProtectedRouters>,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: action2
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: action
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user))
      }
      dispatch(isAuthReady(true))
    })
  })
  return <>
    {authReady && <RouterProvider router={routes} />}
  </>;
}
