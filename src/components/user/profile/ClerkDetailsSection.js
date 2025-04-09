"use client";

import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import AddClerk from "./AddClerk";
import ClerkDetails from "./ClerkDetails";

export default function ClerkDetailsSection() {
  const { clerkDetails } = useUserStore();

  const [showAddClerk, setShowAddClerk] = useState(false);

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Clerk Details
        </h2>
        <button
          onClick={() => setShowAddClerk(true)}
          className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          <LuPlus size={18} />
          <span className="hidden sm:inline">Add Clerk</span>
        </button>
      </div>

      {/* Clerk Cards */}
      {clerkDetails && clerkDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clerkDetails.map((clerk, index) => (
            <ClerkDetails clerk={clerk} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No clerk details available.
        </p>
      )}

      {showAddClerk && <AddClerk onClose={() => setShowAddClerk(false)} />}
    </div>
  );
}
