import { useEffect, useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { toast } from "sonner";
import { formErrorSign } from "../components/ErrorSign";

export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default function Signup() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _signup, error: _error, isPending } = useSignup();

  useEffect(() => {
    if (user?.email && user?.password) {
      setError(false);
      _signup(user);
    } else {
      setError(user ? formErrorSign(user) : false);
    }
  }, [user]);

  useEffect(() => {
    if (_error) {
      toast.error(_error);
    }
  }, [_error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Form method="post" className="flex flex-col space-y-4">
          <input
            name="displayName"
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded"
          />
          <button
            type="submit"
            disabled={isPending}
            className="  p-3 rounded hover:bg-blue-600 transition"
          >
            {isPending ? "Loading..." : "Sign Up"}
          </button>
        </Form>

      


        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
