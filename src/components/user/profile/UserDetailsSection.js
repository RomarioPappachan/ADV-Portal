"use client";

import React from "react";
import { useUserStore } from "@/store/userStore";

import { LuPencil } from "react-icons/lu"; // Lucide icon from react-icons

export default function UserDetailsSection() {
  const { userDetails } = useUserStore();

  const renderBadge = (value, type) => {
    let text = "";
    let color = "";

    if (type === "membership") {
      text = value === 1 ? "Lifelong" : "Ordinary";
      color =
        value === 1
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700";
    } else if (type === "chamber") {
      text = value === 1 ? "Has Chamber" : "No Chamber";
      color =
        value === 1 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700";
    } else if (type === "status") {
      text = value === 1 ? "Active" : "Inactive";
      color =
        value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      <button className="absolute top-4 right-4 text-gray-600 hover:text-blue-600">
        <LuPencil size={18} />
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Name</p>
          <p className="text-gray-900 font-semibold">{userDetails?.fullname}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Email</p>
          <p className="text-gray-900 font-semibold">{userDetails?.email}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Mobile</p>
          <p className="text-gray-900 font-semibold">{userDetails?.mobile}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Home Phone</p>
          <p className="text-gray-900 font-semibold">{userDetails?.home_ph}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Office Phone</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.office_ph}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Residential Address</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.res_address}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Office Address</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.off_address}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Enrollment ID</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.enrollment_id}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Advocate Code</p>
          <p className="text-gray-900 font-semibold">{userDetails?.adv_code}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Date of Birth</p>
          <p className="text-gray-900 font-semibold">
            {new Date(userDetails?.date_of_birth).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Membership</p>
          <div className="mt-1">
            {renderBadge(userDetails?.membership, "membership")}
          </div>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Chamber</p>
          <div className="mt-1">
            {renderBadge(userDetails?.chamber, "chamber")}
          </div>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Status</p>
          <div className="mt-1">
            {renderBadge(userDetails?.active_status, "status")}
          </div>
        </div>
      </div>
    </div>
  );
}
