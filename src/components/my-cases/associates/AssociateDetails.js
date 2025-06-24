"use client";

import { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import EditAssociate from "./EditAssociate";
import DeleteAssociate from "./DeleteAssociate";

export default function AssociateDetails({ associate }) {
  const [showUpdateAssociate, setShowUpdateAssociate] = useState(false);
  const [showRemoveAssociate, setShowRemoveAssociate] = useState(false);
  return (
    <div
      key={associate.hc_code}
      className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
    >
      {/* Card Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => setShowUpdateAssociate(true)}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
          title="Edit"
        >
          <LuPencil size={16} />
        </button>
        <button
          onClick={() => setShowRemoveAssociate(true)}
          className="text-gray-600 hover:text-red-600 cursor-pointer"
          title="Delete"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-3 text-sm grid grid-cols-1 sm:grid-cols-2">
        <div>
          <p className="text-gray-500 font-medium">Advocate Name</p>
          <p className="text-gray-900 font-semibold">
            {associate?.name ? associate?.name : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Mobile No.</p>
          <p className="text-gray-900 font-semibold">
            {associate?.mobile ? associate?.mobile : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">
            Bar Council Enrollment No.
          </p>
          <p className="text-gray-900 font-semibold">
            {associate?.enrollment_no ? associate?.enrollment_no : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">High Court No.</p>
          <p className="text-gray-900 font-semibold">
            {associate?.hc_code ? associate?.hc_code : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">KHCAA Membership No.</p>
          <p className="text-gray-900 font-semibold">
            {associate?.adm_no ? associate?.adm_no : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Email</p>
          <p className="text-gray-900 font-semibold">
            {associate?.email ? associate?.email : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Address</p>
          <p className="text-gray-900 font-semibold">
            {associate?.address ? associate?.address : "--"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Blood Group</p>
          <p className="text-gray-900 font-semibold">
            {associate?.blood ? associate?.blood : "--"}
          </p>
        </div>
      </div>
      {showUpdateAssociate && (
        <EditAssociate
          associate={associate}
          onClose={() => setShowUpdateAssociate(false)}
        />
      )}
      {showRemoveAssociate && (
        <DeleteAssociate
          associate={associate}
          onClose={() => setShowRemoveAssociate(false)}
        />
      )}
    </div>
  );
}
