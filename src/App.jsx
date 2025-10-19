import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import { action as loginAction } from "./pages/Login";
import { action as SignAction } from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { isAuthReady, login } from "./app/features/userSlice";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import SingleRecipe from "./pages/SingleRecipe";

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
          path: "/singleRecipe/:id",
          element: <SingleRecipe />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: SignAction,
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
