"use client";

import { useState, useRef } from "react";
import { useMemberStore } from "@/store/memberStore";
import { createPortal } from "react-dom";
import { ImageToBase64 } from "@/utilities/ImageToBase64";
import toast from "react-hot-toast";
import { LuImagePlus, LuX } from "react-icons/lu";

const membershipOptions = [
  { label: "Ordinary", value: 1 },
  { label: "Life", value: 0 },
];

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
const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "others" },
];

function AddNewMember({ isOpen, onClose }) {
  const { addMember, getAllMembers } = useMemberStore();
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    adv_code: "",
    enrollment_id: "",
    membership: null,
    chamber: 0,
    mobile: "",
    res_address: "",
    off_address: "",
    email: "",
    profile_image: "",
    office_ph: "",
    home_ph: "",
    date_of_birth: "",
    qualification: "",
    date_of_enrol: "",
    date_of_admission: "",
    gender: "",
    blood: "",
    other_bar: "",
    senior: 0,
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "membership") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "chamber") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await ImageToBase64(file);

      setFormData((prev) => ({
        ...prev,
        profile_image: data,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await addMember(formData);
      if (response?.data?.adv_id) {
        toast.success(response.data.message);
        getAllMembers();
        setTimeout(() => {
          onClose(false);
        }, 1000);
      }
    } catch (err) {
      toast.error(err.message || "Failed to create a new member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-full">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <LuX size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add New Member
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Image Upload */}
          <div className="sm:col-span-2">
            {/* <label className="block text-sm text-gray-600 font-medium mb-1">
              Profile Image
            </label> */}
            <div
              onClick={handleImageClick}
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {formData.profile_image ? (
                <img
                  src={formData.profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex flex-col justify-center items-center gap-y-2">
                  <LuImagePlus className="text-gray-400 text-3xl" />
                  <span className="text-gray-400 text-sm">Click to Upload</span>
                </span>
              )}
            </div>
            {formData?.profile_image && (
              <span className="text-gray-400 text-sm ps-4">
                Click to Upload
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {[
            { name: "fullname", label: "Full Name", type: "text" },
            { name: "adv_code", label: "KHCAA Membership No.", type: "text" },
            {
              name: "enrollment_id",
              label: "Bar council Enrollment No.",
              type: "text",
            },
            { name: "email", label: "Email", type: "email" },
            { name: "mobile", label: "Mobile Number", type: "tel" },
            {
              name: "office_ph",
              label: "Office Phone / Additional Mobile no.",
              type: "tel",
            },
            { name: "home_ph", label: "Emergency Phone no.", type: "tel" },
            {
              name: "date_of_enrol",
              label: "Date of Enrollment",
              type: "date",
            },
            {
              name: "date_of_admission",
              label: "Date of Admission (KHCAA)",
              type: "date",
            },
            {
              name: "other_bar",
              label: "Bar Association (If any other)",
              type: "text",
            },
            { name: "qualification", label: "Qualification", type: "text" },
            { name: "date_of_birth", label: "Date of Birth", type: "date" },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm text-gray-600 font-medium">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                required={
                  input.name === "office_ph" ||
                  input.name === "home_ph" ||
                  input.name === "other_bar" ||
                  input.name === "date_of_enrol"
                    ? false
                    : true
                }
              />
            </div>
          ))}

          {/* Select Fields */}
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" selected disabled>
                Select
              </option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Blood Group
            </label>
            <select
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" selected disabled>
                Select
              </option>
              {bloodGroupOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Membership Type
            </label>
            <select
              name="membership"
              value={formData.membership}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              {membershipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Chamber Number
            </label>
            <input
              type="text"
              name="chamber"
              value={formData.chamber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium mb-2">
              Senior Advocate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="senior"
                checked={formData.senior === 1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    senior: e.target.checked ? 1 : 0,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Check if senior advocate
              </span>
            </div>
          </div>

          {/* Textareas */}
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 font-medium">
              Residential Address
            </label>
            <textarea
              name="res_address"
              rows="3"
              value={formData.res_address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 font-medium">
              Office Address
            </label>
            <textarea
              name="off_address"
              rows="3"
              value={formData.off_address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end items-center gap-4 pt-4">
            <button
              type="button"
              className="w-32 h-10 px-4 py-2 text-sm font-semibold text-rose-500 bg-rose-100 rounded-md hover:border hover:border-rose-500 hover:text-rose-600"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-32 h-10 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
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

export default AddNewMember;
