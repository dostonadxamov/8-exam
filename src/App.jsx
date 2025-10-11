
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRouters from "./components/ProtectedRouters";
import { useSelector } from "react-redux";

export default function App() {
  const { user } = useSelector(store => store.user)
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRouters >
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
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />
    },
  ]);

  return <RouterProvider router={routes} />;
}
