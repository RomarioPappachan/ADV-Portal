"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";

function NewPassword() {
  const router = useRouter();
  const setPassword = useAuthStore((state) => state.setPassword);

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = passwords;

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await setPassword(password);
      toast.success(res.message || "Password set successfully");
      router.replace("/home");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-[420px] shadow-2xl rounded-lg bg-white mx-auto"
    >
      {/* Header */}
      <div className="w-full h-20 flex justify-center items-center gap-3 bg-sky-950 rounded-t-lg">
        <img src="/khcaa-logo.png" alt="logo" className="size-16" />
        <h1 className="text-4xl text-white font-bold">KHCAA</h1>
      </div>

      <div className="p-6 space-y-4">
        <h1 className="text-sky-600 text-xl font-semibold text-center">
          Create Password
        </h1>

        {/* Password Field */}
        <div className="flex flex-col space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={passwords.password}
            onChange={handleChange}
            className="h-12 px-4 pr-12 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-sky-950 text-black"
            placeholder="Enter new password"
          />
          <div
            className="absolute right-4 top-[42px] cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEye size={20} /> : <LuEyeOff size={20} />}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="h-12 px-4 pr-12 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-sky-950 text-black"
            placeholder="Re-enter new password"
          />
          <div
            className="absolute right-4 top-[42px] cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            title={showPassword ? "Hide" : "Show"}
          >
            {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
          </div>
        </div>

        {/* Error Message */}
        <div className="h-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg ${
            loading
              ? "bg-sky-950 cursor-not-allowed"
              : "bg-sky-950 hover:bg-sky-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default NewPassword;
