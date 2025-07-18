// "use client";

// import React, { useState } from "react";
// import PasswordLogin from "./PasswordLogin";

// function SendOtp({ mobileNo, setMobileNo, isSendingOtp, onSendOtp }) {
//   const [showPasswordLogin, setShowPasswordLogin] = useState(true);

//   if (showPasswordLogin) {
//     return <PasswordLogin onBack={() => setShowPasswordLogin(false)} />;
//   }

//   return (
//     <form className="py-6 px-6" onSubmit={onSendOtp}>
//       <div className="space-y-8">
//         <h1 className="text-sky-950 text-xl font-semibold text-center">
//           Member Login
//         </h1>

//         {/* Mobile number Input */}
//         <div className="relative w-full">
//           <input
//             type="tel"
//             id="mobileNo"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//             minLength={10}
//             maxLength={10}
//             className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900"
//           />
//           <label
//             htmlFor="mobileNo"
//             className={`absolute left-3 text-gray-500 transition-all bg-white px-1
//                 ${
//                   mobileNo
//                     ? "top-0 text-xs text-sky-500"
//                     : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-900"
//                 }`}
//           >
//             Mobile number
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-sky-950 hover:bg-sky-900 cursor-pointer"
//           disabled={isSendingOtp}
//         >
//           {isSendingOtp ? "Sending..." : "Send OTP"}
//         </button>
//       </div>

//       {/* Toggle to password login */}
//       <p
//         className="pt-4 text-sky-950 font-light cursor-pointer"
//         onClick={() => setShowPasswordLogin(true)}
//       >
//         Login with Password?
//       </p>
//     </form>
//   );
// }

// export default SendOtp;

"use client";

import React, { useState } from "react";
import PasswordLogin from "./PasswordLogin";

function SendOtp({
  mobileNo,
  setMobileNo,
  isSendingOtp,
  onSendOtp,
  showPasswordLogin,
  onShowPasswordLogin,
}) {
  if (showPasswordLogin) {
    return <PasswordLogin onBack={() => onShowPasswordLogin(false)} />;
  }

  return (
    <form onSubmit={onSendOtp} className="py-6 px-6 space-y-6">
      <h1 className="text-sky-950 text-xl font-semibold text-center">
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

      {/* Send OTP button */}
      <button
        type="submit"
        className="w-full h-12 bg-sky-950 text-white font-semibold rounded-lg hover:bg-sky-900 transition"
        disabled={isSendingOtp}
      >
        {isSendingOtp ? "Sending..." : "Send OTP"}
      </button>

      {/* Toggle to password login */}
      <p
        className="pt-4 text-center text-sm text-sky-950 cursor-pointer hover:underline"
        onClick={() => onShowPasswordLogin(true)}
      >
        Login with Password?
      </p>
    </form>
  );
}

export default SendOtp;
