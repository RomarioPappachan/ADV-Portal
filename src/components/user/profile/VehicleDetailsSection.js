"use client";

import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { LuPlus } from "react-icons/lu";
import AddVehicle from "./AddVehicle";
import VehicleDetails from "./VehicleDetails";
import { useState } from "react";

export default function VehicleDetailsSection() {
  const { vehicleDetails } = useUserStore();

  const [showAddVehicle, setShowAddVehicle] = useState(false);

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Vehicle Details
        </h2>
        <button
          onClick={() => setShowAddVehicle(true)}
          className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          <LuPlus size={18} />
          <span className="hidden sm:inline">Add Vehicle</span>
        </button>
      </div>

      {/* Vehicle Cards */}
      {vehicleDetails && vehicleDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleDetails.map((vehicle, index) => (
            <VehicleDetails vehicle={vehicle} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No vehicle details available.
        </p>
      )}
      {showAddVehicle && (
        <AddVehicle onClose={() => setShowAddVehicle(false)} />
      )}
    </div>
  );
}
