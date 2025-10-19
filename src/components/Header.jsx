import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { RxExit } from "react-icons/rx";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

export default function Header() {
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
    <div className="w-full z-50 bg-black border-b border-white/10 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between relative">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent select-none">
          Kitchen<span className="text-white">App</span>
        </h1>

        {user && (
          <div className="flex items-center gap-4 relative">
            <div className="hidden sm:block text-white font-medium text-[18px]">
              {user.displayName}
            </div>

            <div
              className="relative tooltip tooltip-bottom"
              data-tip={"Tap to open"}
            >
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-white/30 shadow-md cursor-pointer"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
            </div>

            {isOpen && (
              <div className="absolute top-[55px] right-0 bg-white text-black rounded-xl shadow-lg border border-gray-200 w-52 p-3 z-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-2 text-gray-500 hover:text-white hover:bg-red-700 rounded-2xl py-2 px-2"
                >
                  <MdOutlineClose />
                </button>

                <div className="flex flex-col gap-3 mt-4">
                  <NavLink
                    to="/"
                    className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-black hover:text-white transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Home <AiOutlineHome />
                  </NavLink>

                  <NavLink
                    to="/createRecipe"
                    className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-black hover:text-white transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Recipe <IoCreateOutline />
                  </NavLink>

                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                    className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-black hover:text-white transition-all"
                  >
                    Change theme {theme === "light" ? <FaRegMoon /> : <LuSun />}
                  </button>

                  {!isPending ? (
                    <button
                      onClick={() => {
                        _logout();
                        setIsOpen(false);
                      }}
                      className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all"
                    >
                      Logout <RxExit />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-2 bg-gray-200 rounded-md cursor-not-allowed"
                    >
                      Loading...
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
