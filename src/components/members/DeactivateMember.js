"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { deactivateMember } from "@/api/member";
import toast from "react-hot-toast";

const DeactivateMember = ({
  isOpen,
  onClose,
  memberToDeactivate,
  onExpired,
}) => {
  const [mounted, setMounted] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeactivate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const memberId = memberToDeactivate?.id;
      const res = await deactivateMember(memberId, "admin");
      console.log(res);
      toast.success("Deactivated member successfully");
      onClose();
      onExpired(0); //to trigger render by changing it to expired and load expired table
    } catch (error) {
      toast.error("Failed to deactivate member");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <LuX size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Deactivation Confirmation
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Are you sure you want to deactivate{" "}
          <span className="text-gray-800 font-semibold">
            {memberToDeactivate?.fullname}
          </span>
          ?
          <br />
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleDeactivate}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition text-sm sm:text-base"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeactivateMember;
