"use client";

import { createPortal } from "react-dom";
import { useMemberStore } from "@/store/memberStore";
import { deleteVehicle } from "@/api/member";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

function RemoveVehicle({ vehicle, onClose }) {
  const { selectedMemberId, getMemberById } = useMemberStore();

  //handleDelete
  const handleDelete = async () => {
    try {
      const response = await deleteVehicle(vehicle.id, "admin");
      if (response?.data?.message) toast.success(response?.data?.message);
      getMemberById(selectedMemberId); // re-render user data
      onClose();
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

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
          Delete Vehicle
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Are you sure you want to delete vehicle with registration no:{" "}
          <span className="font-semibold text-gray-800">{vehicle.regno}</span>?
          <br />
          This action is irreversible.
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
            onClick={handleDelete}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition text-sm sm:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default RemoveVehicle;
