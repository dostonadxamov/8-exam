import CreateRecipe from "./pages/CreateRecipe";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "./layouts/MainLayout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { action as Signaction } from "./pages/Signup";
import { action as loginaction } from "./pages/Login";
import { isAuthReady, login } from "./app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import  Recipe  from "./pages/Recipe";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.userList);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/createRecipe",
          element: <CreateRecipe />,
        },
        {
          path: "/recipe/:id",
          element: <Recipe />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginaction,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: Signaction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);
  return (
    <>
      {authReady && <RouterProvider router={routes} />}
      <Toaster position="top-right" richColors />
    </>
  );
}
