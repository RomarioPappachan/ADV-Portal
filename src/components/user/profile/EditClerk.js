"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { updateClerk } from "@/api/member";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

function EditClerk({ clerk, onClose }) {
  const { userInfo } = useAuthStore();
  const { getUserById } = useUserStore();

  const userId = userInfo?.id;

  const [isEditting, setIsEditting] = useState(false);

  const [form, setForm] = useState({
    name: clerk.name || "",
    designation: clerk.designation || "",
    address: clerk.address || "",
    contact_no: clerk.contact_no || "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditting(true);

    try {
      const updatedClerkData = {
        id: clerk.id,
        adv_id: userId,
        ...form,
      };

      const response = await updateClerk(updatedClerkData, "user");
      if (response?.data?.message) toast.success(response?.data?.message);
      getUserById(userId); // re-render user data
      onClose(); // close the edit popup
    } catch (error) {
      toast.error("Failed to update clerk details");
    } finally {
      setIsEditting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <LuX size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Edit Clerk
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact No.
            </label>
            <input
              type="tel"
              name="contact_no"
              value={form.contact_no}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base cursor-pointer"
              disabled={isEditting}
            >
              {isEditting ? "Updating..." : "Update Clerk"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default EditClerk;
