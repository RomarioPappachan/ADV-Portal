"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";

function ForgotPasswordModal({ isOpen, onClose }) {
  const { sendOtp, verifyOtpPwd, resetPassword } = useAuthStore();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [advId, setAdvId] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhone("");
      setOtp("");
      setSessionId("");
      setNewPassword("");
      setConfirmPassword("");
      setCountdown(0);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Start countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    const res = await sendOtp(phone);
    setIsLoading(false);

    if (res?.status) {
      setSessionId(res.session_id);
      setStep(2);
      setCountdown(120);
      toast.success("OTP sent successfully");
    } else {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const res = await verifyOtpPwd(sessionId, phone, otp);
      console.log(res);

      if (res?.data.adv_id) {
        setAdvId(res.data.adv_id);
        setStep(3);
        toast.success("OTP verified");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 1) {
      toast.error("Enter new password");
      return;
    }

    try {
      setIsLoading(true);
      const res = await resetPassword(advId, phone, newPassword);

      if (res?.status) {
        toast.success("Password updated successfully");
        onClose();
      }
    } catch (err) {
      toast.error(err.message || "Failed to set password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e1e1e1] backdrop-blur-sm px-2.5 sm:px-4 md:px-8 lg:px-16">
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md">
        <div className="w-full h-20 flex justify-center items-center gap-3 bg-sky-950 rounded-t-2xl">
          <img src="/khcaa-logo.png" alt="logo" className="size-16" />
          <h1 className="text-2xl text-white font-bold">KHCAA</h1>
        </div>

        <div className="w-full p-6">
          <h2 className="text-2xl font-semibold text-sky-950 text-center mb-6">
            Reset Password
          </h2>

          {/* Step 1: Enter Phone */}
          {step === 1 && (
            <>
              <label className="block text-sm font-medium text-sky-950 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-900"
              />
              <button
                onClick={handleSendOtp}
                className="w-full h-11 bg-sky-950 text-white font-medium rounded-lg hover:bg-sky-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* Step 2: Enter OTP */}
          {step === 2 && (
            <>
              <label className="block text-sm font-medium text-sky-950 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter OTP sent to your phone"
                className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 mb-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
              />
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                {countdown > 0 ? (
                  <span>Resend OTP in {formatCountdown(countdown)}</span>
                ) : (
                  <button
                    className="text-sky-950 hover:underline"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                onClick={handleVerifyOtp}
                className="w-full h-11 bg-sky-950 text-white font-medium rounded-lg hover:bg-sky-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <label className="block text-sm font-medium text-sky-950 mb-1">
                New Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-900 pr-10"
                />
                <span
                  className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>

              <label className="block text-sm font-medium text-sky-950 mb-1">
                Confirm Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-900 pr-10"
                />
                <span
                  className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full h-11 bg-sky-950 text-white font-medium rounded-lg hover:bg-sky-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full h-10 mt-5 text-sm bg-gray-100 text-sky-950 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
