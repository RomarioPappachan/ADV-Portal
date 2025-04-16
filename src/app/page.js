"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

import SendOtp from "@/components/user/SendOtp";
import VerifyOtp from "@/components/user/VerifyOtp";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { sendOtp, restoreSession } = useAuthStore();

  const [mobileNo, setMobileNo] = useState("");
  const [isVerifyOpen, setVerifyOpen] = useState(false);

  useEffect(function () {
    async function isLogged() {
      const res = await restoreSession();
      if (!res.isAuthenticated || res?.userType !== "user") {
        return;
      } else {
        router.push("/home");
      }
    }

    isLogged();
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobileNo) {
      toast.error("Enter mobile number");
      setVerifyOpen(false);
      return;
    } else {
      try {
        const response = await sendOtp(mobileNo);
        if (response.status) {
          setTimeout(() => {
            toast.success(response.message);
            toast.success(response.otp);
            setVerifyOpen(true);
          }, 1000);
        }
        // alert("Send Otp");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 px-2 sm:px-4 md:px-8 lg:px-16">
      <div className="min-w-[320px] sm:w-md max-w-lg h-auto shadow-2xl rounded-lg bg-white pb-10">
        {/* Header */}
        <div className="w-full h-20 flex justify-center items-center gap-3 bg-[#3f51b5] rounded-t-lg">
          <img src="/khcaa-logo.png" alt="logo" className="size-16" />
          <h1 className="text-4xl text-white font-bold">KHCAA</h1>
        </div>

        {!isVerifyOpen ? (
          <SendOtp
            mobileNo={mobileNo}
            setMobileNo={setMobileNo}
            onSendOtp={handleSendOtp}
          />
        ) : (
          <VerifyOtp
            mobileNo={mobileNo}
            setMobileNo={setMobileNo}
            onSendOtp={handleSendOtp}
            setVerifyOpen={setVerifyOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
