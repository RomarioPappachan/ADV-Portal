"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/authStore";
import { useAssociateStore } from "@/store/associatesStore";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

export default function Proceedings({ onClose }) {
  const { userInfo } = useAuthStore();
  const { addAssociate, getAssociates } = useAssociateStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [proceeding, setProceeding] = useState("");

  const userId = userInfo?.id; //for api calls

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setProceeding(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //Api call

      onClose();
    } catch (error) {
      toast.error("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-20 max-h-screen overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <LuX size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Proceedings
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Address (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="proceeding"
              value={proceeding}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
