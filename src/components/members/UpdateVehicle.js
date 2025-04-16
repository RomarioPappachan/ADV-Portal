"use client";

import { useState, useEffect } from "react";
import { useMemberStore } from "@/store/memberStore";
import { createPortal } from "react-dom";
import { updateVehicle } from "@/api/member";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

function UpdateVehicle({ vehicle, onClose }) {
  const { selectedMemberId, getMemberById } = useMemberStore();

  const [form, setForm] = useState({
    regno: vehicle.regno || "",
    brand: vehicle.brand || "",
    model: vehicle.model || "",
    year: vehicle.year || "",
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

    try {
      const updatedVehicleData = {
        id: vehicle.id,
        adv_id: selectedMemberId,
        ...form,
      };

      const response = await updateVehicle(updatedVehicleData);
      if (response?.data?.message) toast.success(response?.data?.message);
      getMemberById(selectedMemberId); // re-render user data
      onClose(); // close the edit popup
    } catch (error) {
      toast.error("Failed to update vehicle details");
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
          Edit Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Registration Number
            </label>
            <input
              type="text"
              name="regno"
              value={form.regno}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Model
            </label>
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Year of Manufacture
            </label>
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base"
            >
              Update Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default UpdateVehicle;
