// "use client";

// function SendOtp({ mobileNo, setMobileNo, onSendOtp }) {
//   return (
//     <form className="py-6 px-6 space-y-8" onSubmit={onSendOtp}>
//       <h1 className="text-purple-700 text-xl font-semibold text-center">
//         Member Login
//       </h1>

//       {/* Mobile number Input */}
//       <div className="relative w-full">
//         <input
//           type="tel"
//           id="mobileNo"
//           value={mobileNo}
//           onChange={(e) => {
//             const val = e.target.value;
//             setMobileNo(val);
//           }}
//           minLength={10}
//           maxLength={10}
//           className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//         />
//         <label
//           htmlFor="mobileNo"
//           className={`absolute left-3 text-gray-500 transition-all bg-white px-1
//                 ${
//                   mobileNo
//                     ? "top-0 text-xs text-purple-500"
//                     : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-500"
//                 }`}
//         >
//           Mobile number
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-purple-700 cursor-pointer"
//       >
//         Send OTP
//       </button>
//     </form>
//   );
// }

// export default SendOtp;

"use client";

import React, { useState } from "react";
import PasswordLogin from "./PasswordLogin";

function SendOtp({ mobileNo, setMobileNo, isSendingOtp, onSendOtp }) {
  const [showPasswordLogin, setShowPasswordLogin] = useState(true);

  if (showPasswordLogin) {
    return <PasswordLogin onBack={() => setShowPasswordLogin(false)} />;
  }

  return (
    <form className="py-6 px-6" onSubmit={onSendOtp}>
      <div className="space-y-8">
        <h1 className="text-purple-700 text-xl font-semibold text-center">
          Member Login
        </h1>

        {/* Mobile number Input */}
        <div className="relative w-full">
          <input
            type="tel"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            minLength={10}
            maxLength={10}
            className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <label
            htmlFor="mobileNo"
            className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
                ${
                  mobileNo
                    ? "top-0 text-xs text-purple-500"
                    : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-500"
                }`}
          >
            Mobile number
          </label>
        </div>

        <button
          type="submit"
          className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-purple-700 cursor-pointer"
          disabled={isSendingOtp}
        >
          {isSendingOtp ? "Sending..." : "Send OTP"}
        </button>
      </div>

      {/* Toggle to password login */}
      <p
        className="pt-4 text-blue-700 underline font-thin cursor-pointer"
        onClick={() => setShowPasswordLogin(true)}
      >
        Login with Password
      </p>
    </form>
  );
}

export default SendOtp;
