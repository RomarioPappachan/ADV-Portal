"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 h-[400px] shadow-2xl rounded-lg bg-white">
        {/* Header */}
        <div className="w-full h-20 flex justify-center items-center gap-3 bg-blue-900 rounded-t-lg">
          <img src="/khcaa-logo.png" alt="logo" className="size-16" />
          <h1 className="text-4xl text-white font-bold">KHCAA</h1>
        </div>

        {/* Login Form */}
        <div className="py-6 px-6 space-y-6">
          <h1 className="text-blue-900 text-xl font-semibold text-center">
            Admin Login
          </h1>

          {/* Email Input */}
          <div className="relative w-full">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
                ${
                  email
                    ? "top-0 text-xs text-blue-500"
                    : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                }`}
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
                ${
                  password
                    ? "top-0 text-xs text-blue-500"
                    : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                }`}
            >
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button className="w-full h-12 flex justify-center items-center text-xl text-white font-semibold rounded-lg bg-blue-900">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
