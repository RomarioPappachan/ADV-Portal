"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMemberStore } from "@/store/memberStore";
import { createPayment } from "@/api/statistics";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

const categoryOptions = [
  { label: "Subscription", value: "Subscription" },
  { label: "One Time", value: "Single" },
  { label: "Monthly", value: "Monthly" },
  { label: "Others", value: "Others" },
];

function CreatePayment({ onClose }) {
  const { selectedMemberId, userDetails, getMemberById } = useMemberStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    category: "",
    payment_type: "others",
    signature: "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setForm({
      customer_name: userDetails?.fullname || "",
      customer_email: userDetails?.email || "",
      customer_mobile: userDetails?.mobile || "",
    });
  }, [userDetails]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const paymentData = {
        adv_id: selectedMemberId,
        status: "completed",
        ...form,
      };
      console.log(paymentData);
      const response = await createPayment(paymentData);
      console.log(response);
      if (response?.data?.payment_id) toast.success(response?.data?.message);
      getMemberById(selectedMemberId);
      onClose(); // Close the popup after submission
    } catch (error) {
      toast.error("Failed to add payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <LuX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Create Payment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              required
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact No.
            </label>
            <input
              type="tel"
              name="customer_mobile"
              value={form.customer_mobile}
              onChange={handleChange}
              required
              disabled
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="customer_email"
              value={form.customer_email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Payment Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled selected>
                -- Select --
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Payment Type
            </label>
            <select
              name="payment_type"
              value={form.payment_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled selected>
                -- Select --
              </option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Description
            </label>
            <textarea
              name="signature"
              rows="3"
              value={form.signature}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="sm:col-span-2 mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 text-sm sm:text-base cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default CreatePayment;
