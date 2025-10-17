import { Link, Outlet } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useSelector } from "react-redux";

export default function MainLayouts() {
  const { user } = useSelector((store) => store.user)
  const { logout, ispending } = useLogout()
  return (
    <>
      <header>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Kitchen app</a>
          </div>
          <div className="flex-none">

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create recipe</Link></li>
                <li>
                  <label className="swap ml-[-80px] swap-rotate">
                    <a>Theme controller</a>
                    <input type="checkbox" className="theme-controller" value="black" />
                  </label>
                </li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="text-center">
        <Outlet />
      </main>



    </>
  )
}
