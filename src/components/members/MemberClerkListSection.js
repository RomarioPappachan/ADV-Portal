"use client";

import { useState } from "react";
import CreateClerk from "./CreateClerk";
import MemberClerkDetails from "./MemberClerkDetails";
import { useMemberStore } from "@/store/memberStore";
import { LuPlus } from "react-icons/lu";

export default function MemberClerkListSection() {
  const { clerkDetails } = useMemberStore();

  const [showCreateClerk, setShowCreateClerk] = useState(false);

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Clerk Details
        </h2>
        <button
          onClick={() => setShowCreateClerk(true)}
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
            <MemberClerkDetails clerk={clerk} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No clerk details available.
        </p>
      )}

      {showCreateClerk && (
        <CreateClerk onClose={() => setShowCreateClerk(false)} />
      )}
    </div>
  );
}
