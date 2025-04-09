"use client";

import React, { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import EditClerk from "./EditClerk";
import DeleteClerk from "./DeleteClerk";

export default function ClerkDetails({ clerk }) {
  const [showEditClerk, setShowEditClerk] = useState(false);
  const [showDeleteClerk, setShowDeleteClerk] = useState(false);

  return (
    <div
      key={clerk.id}
      className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
    >
      {/* Card Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => setShowEditClerk(true)}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
          title="Edit"
        >
          <LuPencil size={16} />
        </button>
        <button
          onClick={() => setShowDeleteClerk(true)}
          className="text-gray-600 hover:text-red-600 cursor-pointer"
          title="Delete"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      {/* Clerk Info */}
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Name</p>
          <p className="text-gray-900 font-semibold">{clerk.name}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Designation</p>
          <p className="text-gray-900 font-semibold">{clerk.designation}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Address</p>
          <p className="text-gray-900 font-semibold">{clerk.address}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Contact No.</p>
          <p className="text-gray-900 font-semibold">{clerk.contact_no}</p>
        </div>
      </div>
      {showEditClerk && (
        <EditClerk clerk={clerk} onClose={() => setShowEditClerk(false)} />
      )}

      {showDeleteClerk && (
        <DeleteClerk clerk={clerk} onClose={() => setShowDeleteClerk(false)} />
      )}
    </div>
  );
}
