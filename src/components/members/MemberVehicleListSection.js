"use client";

import { useState } from "react";
import { useMemberStore } from "@/store/memberStore";
import MemberVehicleDetails from "./MemberVehicleDetails";
import CreateVehicle from "./CreateVehicle";
import { LuPlus } from "react-icons/lu";

export default function MemberVehicleListSection() {
  const { vehicleDetails } = useMemberStore();

  const [showCreateVehicle, setShowCreateVehicle] = useState(false);

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Vehicle Details
        </h2>
        <button
          onClick={() => setShowCreateVehicle(true)}
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
            <MemberVehicleDetails vehicle={vehicle} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No vehicle details available.
        </p>
      )}
      {showCreateVehicle && (
        <CreateVehicle onClose={() => setShowCreateVehicle(false)} />
      )}
    </div>
  );
}
