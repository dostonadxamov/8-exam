import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import  useLogout  from "../hooks/useLogout";

export default function MainLayout() {
  const { user } = useSelector((store) => store.userList);
  const [theme, setTheme] = useState("light");
  const { _logout, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <header className=" border-b border-gray-300 p-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">KitchenApp</h1>

          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-2 border p-2 rounded"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span>{user.displayName}</span>
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-6  border border-gray-300 rounded p-3 w-48 shadow-md z-50">
                  <NavLink
                    to="/"
                    className="block px-2 py-1 rounded "
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/createRecipe"
                    className="block px-2 py-1 rounded "
                    onClick={() => setIsOpen(false)}
                  >
                    Create Recipe
                  </NavLink>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-2 py-1 rounded "
                  >
                    Toggle Theme
                  </button>
                  {!isPending ? (
                    <button
                      onClick={() => {
                        _logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-2 py-1 rounded hover:bg-red-500 hover:text-white mt-2"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      disabled
                      className="block w-full text-left px-2 py-1 rounded bg-gray-200 mt-2 cursor-not-allowed"
                    >
                      Loading...
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
}
