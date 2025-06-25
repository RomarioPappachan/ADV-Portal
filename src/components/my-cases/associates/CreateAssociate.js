"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/authStore";
import { useAssociateStore } from "@/store/associatesStore";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
  { label: "Others", value: "Others" },
];

export default function CreateAssociate({ onClose }) {
  const { userInfo } = useAuthStore();
  const { addAssociate, getAssociates } = useAssociateStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    enrollment_no: "",
    mobile: "",
    address: "",
    hc_code: "",
    adm_no: "",
    email: "",
    blood: "",
  });

  const userId = userInfo?.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, mobile } = form;
    if (!name || !mobile) return;

    try {
      const associateData = {
        associated: userId,
        ...form,
      };
      const response = await addAssociate(associateData);

      if (response?.data?.message) toast.success(response?.data?.message);
      getAssociates(userId);
      onClose();
    } catch (error) {
      toast.error("Failed to add associate");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-20 max-h-screen overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <LuX size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Associate
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Advocate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Advocate Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile No.
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={13}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Enrollment No */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Bar Council Enrollment No.
            </label>
            <input
              type="text"
              name="enrollment_no"
              value={form.enrollment_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* HC Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              High Court Code
            </label>
            <input
              type="text"
              name="hc_code"
              value={form.hc_code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Admission No */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              KHCAA Membership No.
            </label>
            <input
              type="text"
              name="adm_no"
              value={form.adm_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Blood Group
            </label>
            <select
              name="blood"
              value={form.blood}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select --</option>
              {bloodGroupOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Address (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm"
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
