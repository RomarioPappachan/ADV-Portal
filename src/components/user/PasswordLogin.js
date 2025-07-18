// "use client";

// import React, { useState } from "react";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";

// import { LuEye, LuEyeOff } from "react-icons/lu";
// import toast from "react-hot-toast";

// function PasswordLogin({ onBack }) {
//   const router = useRouter();
//   const loginWithPassword = useAuthStore((state) => state.loginWithPassword);

//   const [mobileNo, setMobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLogging, setIsLogging] = useState(false);

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLogging(true);

//     if (!mobileNo || !password) return;

//     try {
//       const res = await loginWithPassword(mobileNo, password);
//       if (res.status) {
//         // router.push("/admin");
//         toast.success("Login Successful");
//         router.replace("/home");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLogging(false);
//     }
//   };

//   return (
//     <form className="py-6 px-6" onSubmit={handleSubmit}>
//       <div className="space-y-8">
//         <h1 className="text-sky-950 text-xl font-semibold text-center">
//           Member Login
//         </h1>

//         {/* Mobile Number Input */}
//         <div className="relative w-full">
//           <input
//             type="tel"
//             id="mobileNo"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//             minLength={10}
//             maxLength={10}
//             required
//             className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900"
//           />
//           <label
//             htmlFor="mobileNo"
//             className={`absolute left-3 text-gray-500 transition-all bg-white px-1
//               ${
//                 mobileNo
//                   ? "top-0 text-xs text-sky-900"
//                   : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-900"
//               }`}
//           >
//             Mobile number
//           </label>
//         </div>

//         {/* Password Input with Eye Toggle */}
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="peer w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900"
//           />
//           <label
//             htmlFor="password"
//             className={`absolute left-3 text-gray-500 transition-all bg-white px-1
//               ${
//                 password
//                   ? "top-0 text-xs text-sky-900"
//                   : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-900"
//               }`}
//           >
//             Password
//           </label>
//           <span
//             className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//             title={showPassword ? "Hide" : "Show"}
//           >
//             {showPassword ? <LuEyeOff /> : <LuEye />}
//           </span>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-600 text-sm text-center -mt-4">{error}</p>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-sky-950 hover:bg-sky-900 cursor-pointer"
//           disabled={isLogging}
//         >
//           {isLogging ? "Logging..." : "Login"}
//         </button>
//       </div>

//       <p
//         className="pt-4 text-sky-950 font-light cursor-pointer"
//         onClick={onBack}
//       >
//         Login with OTP?
//       </p>
//     </form>
//   );
// }

// export default PasswordLogin;

"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";
import ForgotPasswordModal from "./ForgotPasswordModal";

function PasswordLogin({ onBack }) {
  const router = useRouter();
  const loginWithPassword = useAuthStore((state) => state.loginWithPassword);

  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState("");
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLogging(true);

    if (!mobileNo || !password) return;

    try {
      const res = await loginWithPassword(mobileNo, password);
      if (res.status) {
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
    <>
      <div className="w-full   bg-white shadow-lg rounded-2xl p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-sky-950 text-2xl font-semibold text-center mb-8">
            Member Login
          </h1>

          {/* Mobile Number Input */}
          <div className="relative mb-6">
            <input
              type="tel"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              minLength={10}
              maxLength={10}
              required
              className="peer w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900"
            />
            <label
              htmlFor="mobileNo"
              className={`absolute left-3 px-1 text-gray-500 bg-white transition-all 
                ${
                  mobileNo
                    ? "top-0 text-xs text-sky-900"
                    : "top-3 text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-900"
                }`}
            >
              Mobile number
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-3 pr-10 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 px-1 text-gray-500 bg-white transition-all 
                ${
                  password
                    ? "top-0 text-xs text-sky-900"
                    : "top-3 text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-900"
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
            <p className="text-red-600 text-sm text-center mb-2">{error}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <p
              className="text-sky-950 text-sm font-medium cursor-pointer underline"
              onClick={() => setIsForgotOpen(true)}
            >
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLogging}
            className="w-full h-11 bg-sky-950 text-white font-semibold rounded-lg hover:bg-sky-900 transition"
          >
            {isLogging ? "Logging in..." : "Login"}
          </button>

          {/* Login with OTP Option */}
          <div className="pt-6 text-center">
            <p
              className="text-sky-950 text-sm cursor-pointer hover:underline"
              onClick={onBack}
            >
              Login with OTP?
            </p>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </>
  );
}

export default PasswordLogin;
