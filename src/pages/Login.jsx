import { NavLink } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="relative flex px-[10px] items-center justify-center min-h-screen bg-[#0d0d0d] overflow-hidden">

      {/* Orqa fon – forma orqasida turgan aylanalar */}
      <div className="absolute lg:top-[18%] lg:right-[32%] top-[18%] right-[-15%] lg:w-50 lg:h-50 w-30 h-30 bg-pink-500 rounded-full opacity-80 blur-none"></div>
      <div className="absolute lg:bottom-[18%] lg:left-[32%] bottom-[18%] left-[-15%] lg:w-50 lg:h-50 w-30 h-30 bg-purple-600 rounded-full opacity-80 blur-none"></div>

      {/* Login formasi */}
      <div className="relative z-10 max-w-md w-full rounded-2xl shadow-2xl p-8 border border-white/20 
                      bg-white/10 backdrop-blur-xl text-white overflow-hidden">

        {/* Xiralashgan qismini yaratish uchun shaffof mask */}
        <div className="absolute inset-0 backdrop-blur-[40px] rounded-2xl"></div>

        {/* Form kontenti (ustida turadi) */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-start">Sign In</h1>
          <form className="space-y-10">
            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Email</legend>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Email"
              />
            </fieldset>

            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Password</legend>
              <input
                type="password"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Password"
              />
            </fieldset>
            <Button />


            <p className="text-center">
              Don't have an account?  
              <NavLink  to="/signup" className="text-pink-400 underline ml-[10px] cursor-pointer">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
