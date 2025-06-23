"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import { LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";

function PasswordLogin({ onBack }) {
  const router = useRouter();
  const loginWithPassword = useAuthStore((state) => state.loginWithPassword);

  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLogging(true);

    if (!mobileNo || !password) return;

    try {
      const res = await loginWithPassword(mobileNo, password);
      if (res.status) {
        // router.push("/admin");
        toast.success("Login Successful");
        router.replace("/home");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <form className="py-6 px-6" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <h1 className="text-sky-600 text-xl font-semibold text-center">
          Member Login
        </h1>

        {/* Mobile Number Input */}
        <div className="relative w-full">
          <input
            type="tel"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            minLength={10}
            maxLength={10}
            required
            className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <label
            htmlFor="mobileNo"
            className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
              ${
                mobileNo
                  ? "top-0 text-xs text-sky-500"
                  : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-500"
              }`}
          >
            Mobile number
          </label>
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <label
            htmlFor="password"
            className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
              ${
                password
                  ? "top-0 text-xs text-sky-500"
                  : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-500"
              }`}
          >
            Password
          </label>
          <span
            className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide" : "Show"}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center -mt-4">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-sky-600 cursor-pointer"
          disabled={isLogging}
        >
          {isLogging ? "Logging..." : "Login"}
        </button>
      </div>

      <p
        className="pt-4 text-blue-700 underline font-thin cursor-pointer"
        onClick={onBack}
      >
        Login with OTP
      </p>
    </form>
  );
}

export default PasswordLogin;
