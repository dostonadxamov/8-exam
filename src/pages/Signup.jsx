import { Form, NavLink, useActionData } from "react-router-dom";
import Button from "../components/Button";
import { useSignup } from "../Hooks/useSignup";
import { useEffect} from "react";
import { FormError } from "../components/ErrorId";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formdata = await request.formData()
  const data = Object.fromEntries(formdata)

  return data
}

export default function Signup() {
  const data = useActionData()
  // const { signup } = useSignup()

  useEffect(() => {
    if (data?.username && data?.photo && data?.email && data?.password) {
      console.log(data);
    } else {
      toast.error(FormError(data))
    }
  }, [data])

  return (
    <div className="relative flex px-[10px] items-center justify-center min-h-screen bg-[#0d0d0d] overflow-hidden">

      <div className="absolute lg:top-[8%] lg:right-[34%] top-[18%] right-[-15%] lg:w-50 lg:h-50 w-30 h-30 bg-pink-500 rounded-full opacity-80 blur-none"></div>
      <div className="absolute lg:bottom-[8%] lg:left-[34%] bottom-[18%] left-[-15%] lg:w-50 lg:h-50 w-30 h-30 bg-purple-600 rounded-full opacity-80 blur-none"></div>

      <div className="relative z-10 max-w-md w-full rounded-2xl shadow-2xl p-8 border border-white/20 
                      bg-white/10 backdrop-blur-xl text-white overflow-hidden">

        <div className="absolute inset-0 backdrop-blur-[40px] rounded-2xl"></div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-start">Sign Up</h1>
          <Form method="post" className="space-y-10">
            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Username</legend>
              <input
                name="username"
                type="text"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Username"
              />
            </fieldset>

            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Photo URL</legend>
              <input
                name="photo"
                type="url"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Photo URL"
              />
            </fieldset>

            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Email</legend>
              <input
                name="email"
                type="email"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Email"
              />
            </fieldset>

            <fieldset>
              <legend className="block mb-2 text-sm font-medium">Password</legend>
              <input
                name="password"
                type="password"
                className="block w-full px-4 py-2 border border-white/20 rounded-md 
                           bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Password"
              />
            </fieldset>
            <Button />


            <p className="text-center">
              Already have an account?
              <NavLink to="/login" className="text-pink-400 underline ml-[10px] cursor-pointer">Sign In</NavLink>
            </p>
          </Form>
        </div>
      </div>
    </div>
  )
}
