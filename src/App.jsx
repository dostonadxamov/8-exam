
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRouters from "./components/ProtectedRouters";
import { useSelector } from "react-redux";
import { action } from "./pages/Signup";
import { action as action2 } from "./pages/Login";

export default function App() {
  const { user } = useSelector(store => store.user)
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
      action:action2
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: action
    },
  ]);

  return <RouterProvider router={routes} />;
}
