"use client";

import React, { useState } from "react";
import { useMemberStore } from "@/store/memberStore";
import EditMemberDetail from "./EditMemberDetail";
import { LuPencil } from "react-icons/lu"; // Lucide icon from react-icons

export default function MemberDetailsSection() {
  const { userDetails, additionalInfo } = useMemberStore();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const renderBadge = (value, type) => {
    let text = "";
    let color = "";

    if (type === "membership") {
      text = value === 1 ? "Ordinary" : "Lifelong";
      color =
        value === 1
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700";
    } else if (type === "chamber") {
      text = value > 0 ? value : "No Chamber";
      color =
        value > 0 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700";
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
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 cursor-pointer"
        onClick={() => setIsEditOpen(true)}
      >
        <LuPencil size={18} />
      </button>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <img
          src={
            userDetails?.profile_image
              ? userDetails?.profile_image
              : "/user-icon.jpg"
          }
          // src="/user-icon.jpg"
          alt="Profile Image"
          className="w-28 h-28 rounded-full object-cover border border-gray-300 bg-gray-100 shadow-sm"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">
            {userDetails?.fullname}
          </h2>
          <p className="text-gray-500">{userDetails?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Membership ID</p>
          <p className="text-gray-900 font-semibold">{userDetails?.adv_code}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Enrolment ID</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.enrollment_id}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Mobile Number</p>
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
          <p className="text-gray-500 font-medium">Date of Birth</p>
          <p className="text-gray-900 font-semibold">
            {userDetails?.date_of_birth
              ? new Date(userDetails?.date_of_birth).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Gender</p>
          <p className="text-gray-900 font-semibold">
            {additionalInfo?.gender || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Qualification</p>
          <p className="text-gray-900 font-semibold">
            {additionalInfo?.qualification || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Date of Enrolment</p>
          <p className="text-gray-900 font-semibold">
            {additionalInfo?.date_of_enrol
              ? new Date(additionalInfo.date_of_enrol).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Date of Admission</p>
          <p className="text-gray-900 font-semibold">
            {additionalInfo?.date_of_admission
              ? new Date(additionalInfo.date_of_admission).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Membership Type</p>
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

      {isEditOpen && <EditMemberDetail onClose={() => setIsEditOpen(false)} />}
    </div>
  );
}
