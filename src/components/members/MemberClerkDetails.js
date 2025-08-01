"use client";

import React, { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import UpdateClerk from "./UpdateClerk";
import RemoveClerk from "./RemoveClerk";

export default function MemberClerkDetails({ clerk }) {
  const [showUpdateClerk, setShowUpdateClerk] = useState(false);
  const [showRemoveClerk, setShowRemoveClerk] = useState(false);

  return (
    <div
      key={clerk.id}
      className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
    >
      {/* Card Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => setShowUpdateClerk(true)}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
          title="Edit"
        >
          <LuPencil size={16} />
        </button>
        <button
          onClick={() => setShowRemoveClerk(true)}
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
          <p className="text-gray-500 font-medium">Contact No.</p>
          <p className="text-gray-900 font-semibold">{clerk.contact_no}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Clerk Registration No.</p>
          <p className="text-gray-900 font-semibold">{clerk.clerk_reg_no}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Address</p>
          <p className="text-gray-900 font-semibold">{clerk.address}</p>
        </div>
      </div>
      {showUpdateClerk && (
        <UpdateClerk clerk={clerk} onClose={() => setShowUpdateClerk(false)} />
      )}

      {showRemoveClerk && (
        <RemoveClerk clerk={clerk} onClose={() => setShowRemoveClerk(false)} />
      )}
    </div>
  );
}
