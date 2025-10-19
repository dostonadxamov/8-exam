import { useEffect, useRef, useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as THREE from "three";
import { FcGoogle } from "react-icons/fc";
import { useSignup } from "../hooks/useSignup";
import { toast } from "sonner";
import { formErrorSign } from "../components/ErrorSign";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Signup() {
  const user = useActionData();
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const [error, setError] = useState(null);
  const { _signup, error: _error, isPending } = useSignup();
  const {
    error: errorGoogle,
    googleProvider,
    isPending: isPendingGoogle,
  } = useGoogle();

  useEffect(() => {
    if (user?.email && user?.password) {
      _signup(user);
      setError(false);
    } else {
      setError(user ? formErrorSign(user) : false);
    }
  }, [user]);

  useEffect(() => {
    if (_error) {
      toast.error(_error);
    }
  }, [_error]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.clouds.min.js";
    script.async = true;

    script.onload = () => {
      if (window.VANTA && !vantaEffectRef.current) {
        vantaEffectRef.current = window.VANTA.CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          backgroundColor: 0xffffff,
          skyColor: 0x68b8d7,
          cloudColor: 0xadc1de,
          cloudShadowColor: 0x183550,
          sunColor: 0xff9919,
          sunGlareColor: 0xff6633,
          sunlightColor: 0xff9933,
          speed: 1,
        });
      }
    };

    document.body.appendChild(script);
    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, []);

  const text = "Create Account";
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={vantaRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/40 via-[#16213e]/30 to-[#0f3460]/40 backdrop-blur-[2px]" />

      <div
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/30 
        rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] 
        p-8 sm:p-10 w-[90%] max-w-[370px] text-center text-white 
        hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-500"
      >
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex justify-center flex-wrap"
        >
          {letters.map((char, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <Form method="post" className="flex flex-col space-y-4">
          <input
            name="displayName"
            type="text"
            placeholder="Full Name"
            className="p-3 sm:p-3.5 rounded-lg bg-white/15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="p-3 sm:p-3.5 rounded-lg bg-white/15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-3 sm:p-3.5 rounded-lg bg-white/15 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 
            text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </Form>

        <div className="flex items-center justify-center my-4">
          <div className="w-1/4 h-[1px] bg-white/30"></div>
          <span className="mx-2 text-xs sm:text-sm text-white/70">OR</span>
          <div className="w-1/4 h-[1px] bg-white/30"></div>
        </div>

        {!isPendingGoogle && (
          <button
            className="flex items-center justify-center gap-2 bg-white/90 text-gray-800 font-semibold py-2 rounded-lg w-full
          hover:bg-white transition-all duration-300 active:scale-95 text-sm sm:text-base"
            onClick={() => googleProvider()}
          >
            <FcGoogle size={20} className="sm:size-[22px]" />
            Continue with Google
          </button>
        )}

        {isPendingGoogle && (
          <button
            className="flex items-center justify-center gap-2 bg-white/90 text-gray-800 font-semibold py-2 rounded-lg w-full
          hover:bg-white transition-all duration-300 active:scale-95 text-sm sm:text-base"
            disabled
          >
            <span className="loading loading-dots loading-xl"></span>
          </button>
        )}

        <p className="mt-5 text-xs sm:text-sm text-white/70">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-300 hover:text-white font-medium underline underline-offset-4 transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
