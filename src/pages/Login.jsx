import { useEffect, useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";
import { formError } from "../components/ErrorId";

export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _login, error: _error, isPending } = useLogin();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  useEffect(() => {
    if (_error) toast.error(_error);
  }, [_error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Form method="post" className="flex flex-col space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded text-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded text-black"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </Form>

     


        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
