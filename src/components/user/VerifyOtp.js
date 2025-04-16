"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function VerifyOtp({ mobileNo, setVerifyOpen, onSendOtp }) {
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
    const { num1, num2, num3, num4, num5, num6 } = otp;
    if (!num1 || !num2 || !num3 || !num4 || !num5 || !num6) {
      setIsOtpError(true);
      toast.error("Enter all OTP fields");
    } else {
      try {
        setIsOtpError(false);
        const fullOtp = `${num1}${num2}${num3}${num4}${num5}${num6}`;

        const response = await verifyOtp(mobileNo, fullOtp);

        if (response.status) {
          toast.success(response.message);
          router.replace("/home");
        }
      } catch (error) {
        console.error(error);
        // toast.error("Verify OTP failed");
        toast.error(error.message);

        setIsOtpError(true);
      }
    }
  };

  async function handleResendOtp(e) {
    setOtp({ num1: "", num2: "", num3: "", num4: "", num5: "", num6: "" });
    setTimer(150);
    setIsResend(false);
    setIsOtpError(false);
    onSendOtp(e); // call resend api
  }

  return (
    <form className="py-6 px-6 space-y-4" onSubmit={handleVerifyOtp}>
      <h1 className="text-[#3f51b5] text-xl font-semibold text-center">
        Verify OTP
      </h1>
      <div>
        <p className="text-gray-500 text-sm">
          Verify OTP sent to{" "}
          <span className="text-gray-700 font-semibold">{mobileNo}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="relative w-full flex justify-between items-center">
        {Object.keys(otp).map((key, index) => (
          <input
            key={index}
            type="tel"
            maxLength={1}
            className={`size-12 text-gray-700 text-center border rounded-md focus:outline-none focus:ring focus:ring-[#3f51b5] focus:[#3f51b5] ${
              isOtpError ? "border-rose-500" : "border-gray-300"
            }`}
            name={key}
            value={otp[key]}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {isOtpError && (
        <div className="">
          <p className="text-red-500 text-xs text-center">
            {isOtpError ? "Invalid OTP " : ""}
          </p>
        </div>
      )}

      <p className="text-[#707784] text-xs  flex justify-center items-center gap-3">
        <span>
          Resend OTP in{" "}
          <span className="text-[#191C21] text-xs">
            {/* {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : "00:00"} */}
            {timer > 0
              ? `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(
                  timer % 60
                ).padStart(2, "0")}`
              : "00:00"}
          </span>
        </span>
        {isResend && (
          <button
            className="text-[#3f51b5] text-base hover:underline hover:font-semibold cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        )}
      </p>

      <button
        type="submit"
        className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-[#3f51b5] cursor-pointer"
      >
        Login
      </button>
      <span className="text-gray-500 text-xs">
        Want to change mobile number?{" "}
        <span
          className="text-sm underline text-rose-500 cursor-pointer"
          onClick={() => setVerifyOpen(false)}
        >
          Change Mobile number
        </span>
      </span>
    </form>
  );
}

export default VerifyOtp;
