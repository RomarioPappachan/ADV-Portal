"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import CreatePayment from "./CreatePayment";
import PaymentTable from "./PaymentTable";

export default function MemberPaymentListSection() {
  const [showCreatePayment, setShowCreatePayment] = useState(false);

  return (
    <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Subscription Details
        </h2>
        <button
          onClick={() => setShowCreatePayment(true)}
          className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          <LuPlus size={18} />
          <span className="hidden sm:inline">Create Payment</span>
        </button>
      </div>

      {/* Payments Table */}
      <PaymentTable />

      {showCreatePayment && (
        <CreatePayment onClose={() => setShowCreatePayment(false)} />
      )}
    </div>
  );
}
