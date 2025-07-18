// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";

// import toast from "react-hot-toast";
// import NewPassword from "./NewPassword";

// function VerifyOtp({ mobileNo, sessionId, setVerifyOpen, onSendOtp }) {
//   const { verifyOtp } = useAuthStore();
//   const router = useRouter();

//   const [otp, setOtp] = useState({
//     num1: "",
//     num2: "",
//     num3: "",
//     num4: "",
//     num5: "",
//     num6: "",
//   });

//   const [timer, setTimer] = useState(150);
//   const [isResend, setIsResend] = useState(false);
//   const [isOtpError, setIsOtpError] = useState(false);

//   const [isLogging, setIsLogging] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   // Timer logic
//   useEffect(() => {
//     let interval = null;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else {
//       setIsResend(true);
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   // Handle input changes
//   function handleOnChange(event) {
//     setIsOtpError(false);
//     const { name, value } = event.target;
//     const nextInput = document.querySelector(
//       `input[name=num${parseInt(name.slice(-1)) + 1}]`
//     );

//     setOtp((prevValue) => ({
//       ...prevValue,
//       [name]: value,
//     }));

//     if (value && nextInput) {
//       nextInput.focus();
//     }
//   }

//   // Handle keydown for backspace navigation
//   function handleKeyDown(event) {
//     const { name, value } = event.target;
//     const prevInput = document.querySelector(
//       `input[name=num${parseInt(name.slice(-1)) - 1}]`
//     );

//     if (event.key === "Backspace" && !value && prevInput) {
//       prevInput.focus();
//     }
//   }

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setIsOtpError(false);
//     setIsLogging(true);
//     const { num1, num2, num3, num4, num5, num6 } = otp;
//     if (!num1 || !num2 || !num3 || !num4 || !num5 || !num6) {
//       setIsOtpError(true);
//       toast.error("Enter all OTP fields");
//     } else {
//       try {
//         setIsOtpError(false);
//         const fullOtp = `${num1}${num2}${num3}${num4}${num5}${num6}`;

//         const response = await verifyOtp(sessionId, mobileNo, fullOtp);
//         if (response.status) {
//           if (response?.firstLogin === 1) {
//             setShowNewPassword(true); // show the popup
//           } else {
//             toast.success(response.message);
//             router.replace("/home");
//           }
//         }
//       } catch (error) {
//         // toast.error("Verify OTP failed");
//         toast.error(error.message);

//         setIsOtpError(true);
//       } finally {
//         setIsLogging(false);
//       }
//     }
//   };

//   async function handleResendOtp(e) {
//     setOtp({ num1: "", num2: "", num3: "", num4: "", num5: "", num6: "" });
//     setIsResend(false);
//     setIsOtpError(false);
//     await onSendOtp(e); // call resend api
//     setTimer(150);
//   }

//   return (
//     <>
//       <form className="py-6 px-6 space-y-4" onSubmit={handleVerifyOtp}>
//         <h1 className="text-sky-950 text-xl font-semibold text-center">
//           Verify OTP
//         </h1>
//         <div>
//           <p className="text-gray-500 text-sm">
//             Verify OTP sent to{" "}
//             <span className="text-gray-700 font-semibold">{mobileNo}</span>
//           </p>
//         </div>

//         {/* OTP Input */}
//         <div className="relative w-full flex justify-between items-center">
//           {Object.keys(otp).map((key, index) => (
//             <input
//               key={index}
//               type="tel"
//               maxLength={1}
//               className={`size-12 text-gray-700 text-center border rounded-md focus:outline-none focus:ring focus:ring-sky-950 focus:sky-950 ${
//                 isOtpError ? "border-rose-500" : "border-gray-300"
//               }`}
//               name={key}
//               value={otp[key]}
//               onChange={handleOnChange}
//               onKeyDown={handleKeyDown}
//             />
//           ))}
//         </div>
//         {isOtpError && (
//           <div className="">
//             <p className="text-red-500 text-xs text-center">
//               {isOtpError ? "Invalid OTP " : ""}
//             </p>
//           </div>
//         )}

//         <p className="text-[#707784] text-xs  flex justify-center items-center gap-3">
//           {isResend ? (
//             <button
//               className="text-sky-950 text-base hover:underline hover:font-semibold cursor-pointer"
//               onClick={handleResendOtp}
//             >
//               Resend OTP
//             </button>
//           ) : (
//             <span>
//               Resend OTP in{" "}
//               <span className="text-[#191C21] text-xs">
//                 {/* {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : "00:00"} */}
//                 {timer > 0
//                   ? `${String(Math.floor(timer / 60)).padStart(
//                       2,
//                       "0"
//                     )}:${String(timer % 60).padStart(2, "0")}`
//                   : "00:00"}
//               </span>
//             </span>
//           )}
//         </p>

//         <button
//           type="submit"
//           className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-sky-950 cursor-pointer"
//           disabled={isLogging}
//         >
//           {isLogging ? "Logging..." : "Login"}
//         </button>
//         <span className="text-gray-500 text-xs">
//           Want to change mobile number?{" "}
//           <span
//             className="text-sm underline text-rose-500 cursor-pointer"
//             onClick={() => setVerifyOpen(false)}
//           >
//             Change Mobile number
//           </span>
//         </span>
//       </form>

//       {showNewPassword && (
//         <div className="fixed inset-0 bg-gray-100  flex justify-center items-center z-50">
//           <NewPassword
//             mobileNo={mobileNo}
//             onClose={() => setShowNewPassword(false)}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default VerifyOtp;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import toast from "react-hot-toast";
import NewPassword from "./NewPassword";

function VerifyOtp({
  mobileNo,
  sessionId,
  setVerifyOpen,
  onSendOtp,
  onShowPasswordLogin,
}) {
  const { verifyOtp } = useAuthStore();
  const router = useRouter();

  const [otp, setOtp] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
  });

  const [timer, setTimer] = useState(150);
  const [isResend, setIsResend] = useState(false);
  const [isOtpError, setIsOtpError] = useState(false);

  const [isLogging, setIsLogging] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Handle input changes
  function handleOnChange(event) {
    setIsOtpError(false);
    const { name, value } = event.target;
    const nextInput = document.querySelector(
      `input[name=num${parseInt(name.slice(-1)) + 1}]`
    );

    setOtp((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (value && nextInput) {
      nextInput.focus();
    }
  }

  // Handle keydown for backspace navigation
  function handleKeyDown(event) {
    const { name, value } = event.target;
    const prevInput = document.querySelector(
      `input[name=num${parseInt(name.slice(-1)) - 1}]`
    );

    if (event.key === "Backspace" && !value && prevInput) {
      prevInput.focus();
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsOtpError(false);
    setIsLogging(true);
    const { num1, num2, num3, num4, num5, num6 } = otp;
    if (!num1 || !num2 || !num3 || !num4 || !num5 || !num6) {
      setIsOtpError(true);
      toast.error("Enter all OTP fields");
    } else {
      try {
        setIsOtpError(false);
        const fullOtp = `${num1}${num2}${num3}${num4}${num5}${num6}`;

        const response = await verifyOtp(sessionId, mobileNo, fullOtp);
        if (response.status) {
          if (response?.firstLogin === 1) {
            setShowNewPassword(true); // show the popup
          } else {
            toast.success(response.message);
            router.replace("/home");
          }
        }
      } catch (error) {
        // toast.error("Verify OTP failed");
        toast.error(error.message);

        setIsOtpError(true);
      } finally {
        setIsLogging(false);
      }
    }
  };

  async function handleResendOtp(e) {
    setOtp({ num1: "", num2: "", num3: "", num4: "", num5: "", num6: "" });
    setIsResend(false);
    setIsOtpError(false);
    await onSendOtp(e); // call resend api
    setTimer(150);
  }

  return (
    <>
      <form className="py-6 px-6 space-y-6" onSubmit={handleVerifyOtp}>
        <h1 className="text-sky-950 text-xl font-semibold text-center">
          Verify OTP
        </h1>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to{" "}
            <span className="text-gray-800 font-semibold">{mobileNo}</span>
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2">
          {Object.keys(otp).map((key, index) => (
            <input
              key={index}
              type="tel"
              maxLength={1}
              name={key}
              value={otp[key]}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              className={`w-12 h-12 text-center text-lg text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-950 ${
                isOtpError ? "border-rose-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Error message */}
        {isOtpError && (
          <p className="text-center text-xs text-red-600 -mt-2">Invalid OTP</p>
        )}

        {/* Resend Timer */}
        <p className="text-center text-sm text-gray-600">
          {isResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-sky-950 font-medium hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <>
              Resend OTP in{" "}
              <span className="text-gray-800 font-semibold">
                {timer > 0
                  ? `${String(Math.floor(timer / 60)).padStart(
                      2,
                      "0"
                    )}:${String(timer % 60).padStart(2, "0")}`
                  : "00:00"}
              </span>
            </>
          )}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 bg-sky-950 text-white font-semibold rounded-lg hover:bg-sky-900 transition"
          disabled={isLogging}
        >
          {isLogging ? "Logging..." : "Login"}
        </button>

        {/* Change mobile number */}
        <p className="text-center text-sm text-gray-600">
          Want to change mobile number?{" "}
          <span
            className="text-rose-500 underline cursor-pointer"
            onClick={() => {
              setVerifyOpen(false);
              onShowPasswordLogin(false); //to show otp login initially
            }}
          >
            Change Mobile number
          </span>
        </p>
      </form>

      {showNewPassword && (
        <div className="fixed inset-0 bg-gray-100  flex justify-center items-center z-50">
          <NewPassword
            mobileNo={mobileNo}
            onClose={() => setShowNewPassword(false)}
          />
        </div>
      )}
    </>
  );
}

export default VerifyOtp;
