"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMemberStore } from "@/store/memberStore";
import { ImageToBase64 } from "@/utilities/ImageToBase64";

import { LuImagePlus, LuX } from "react-icons/lu";
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

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "others" },
];

const membershipOptions = [
  { label: "Ordinary", value: 1 },
  { label: "Life", value: 0 },
];

const chamberOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

function EditMemberDetail({ onClose }) {
  const {
    selectedMemberId,
    userDetails,
    additionalInfo,
    getMemberById,
    editMember,
  } = useMemberStore();

  const fileInputRef = useRef(null);

  const [isEditting, setIsEditting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    adv_code: "",
    enrollment_id: "",
    email: "",
    profile_image: "",
    mobile: "",
    office_ph: "",
    home_ph: "",
    res_address: "",
    off_address: "",
    date_of_birth: null,
    qualification: "",
    date_of_enrol: null,
    date_of_admission: null,
    gender: "Male",
    membership: null,
    chamber: 0,
    blood: "",
    other_bar: "",
    senior: 0,
    completed: 0,
  });

  useEffect(() => {
    setFormData({
      fullname: userDetails?.fullname || "",
      adv_code: userDetails?.adv_code || "",
      enrollment_id: userDetails?.enrollment_id || "",
      email: userDetails?.email || "",
      profile_image: userDetails?.profile_image || "",
      mobile: userDetails?.mobile,
      office_ph: userDetails?.office_ph || "",
      home_ph: userDetails?.home_ph || "",
      res_address: userDetails?.res_address || "",
      off_address: userDetails?.off_address || "",
      date_of_birth: userDetails?.date_of_birth?.slice(0, 10) || null,
      membership: userDetails?.membership,
      blood: userDetails?.blood || "",
      other_bar: userDetails?.other_bar || "",
      senior: userDetails?.senior,
      completed: userDetails?.completed,

      qualification: additionalInfo?.qualification || "",
      date_of_enrol: additionalInfo?.date_of_enrol?.slice(0, 10) || null,
      date_of_admission:
        additionalInfo?.date_of_admission?.slice(0, 10) || null,
      gender: additionalInfo?.gender || "Male",
    });
  }, [userDetails, additionalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "membership" || name === "senior") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "chamber") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
    } else if (
      name === "date_of_enrol" ||
      name === "date_of_birth" ||
      name === "date_of_admission"
    ) {
      setFormData((prev) => ({ ...prev, [name]: value ? value : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      // setFormData((prev) => ({ ...prev, profile_image: imageUrl }));

      const data = await ImageToBase64(file);
      setFormData((prev) => ({ ...prev, profile_image: data }));

      // TODO: upload to backend or cloud storage
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsEditting(true);

    try {
      const updatedMember = {
        id: selectedMemberId,
        ...formData,
      };

      const response = await editMember(updatedMember, "admin");

      if (response?.data?.message)
        toast.success("Member details updated successfully");
      getMemberById(selectedMemberId); // re-render user details
      setTimeout(() => {
        onClose(); // close popup
      }, 2000);
    } catch (error) {
      toast.error("Failed to update details");
    } finally {
      setIsEditting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <LuX size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Edit User Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Image Upload  */}

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
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
                    alt="Profile Image"
                    className="w-full h-full object-cover bg-gray-100 text-gray-600"
                  />
                ) : (
                  <span className="flex flex-col justify-center items-center gap-y-2">
                    <LuImagePlus className="text-gray-400 text-3xl" />
                    <span className="text-gray-400 text-sm">
                      Click to Upload
                    </span>
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
            <div className="w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed === 1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    completed: e.target.checked ? 1 : 0,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Profile Completed</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              KHCAA Membership No.
            </label>
            <input
              type="text"
              name="adv_code"
              value={formData.adv_code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Bar council Enrollment No.
            </label>
            <input
              type="text"
              name="enrollment_id"
              value={formData.enrollment_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Date of Enrolment
            </label>
            <input
              type="date"
              name="date_of_enrol"
              value={formData.date_of_enrol}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Date of Admission (KHCAA)
            </label>
            <input
              type="date"
              name="date_of_admission"
              value={formData.date_of_admission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="13"
              minLength="10"
              required
            />
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
            >
              <option value="" selected disabled>
                Select
              </option>
              {membershipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Chamber
            </label>
            <input
              type="text"
              name="chamber"
              value={formData.chamber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* <select
              name="chamber"
              value={formData.chamber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              
            >
              <option value="" selected disabled>
                Select
              </option>
              {chamberOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Office Phone / Additional Mobile no.
            </label>
            <input
              type="text"
              name="office_ph"
              value={formData.office_ph}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="13"
              minLength="10"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Emergency Phone no.
            </label>
            <input
              type="text"
              name="home_ph"
              value={formData.home_ph}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="13"
              minLength="10"
            />
          </div>

          <div className="">
            <label className="block text-sm text-gray-600 font-medium">
              Residential Address
            </label>
            <textarea
              name="res_address"
              value={formData.res_address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="">
            <label className="block text-sm text-gray-600 font-medium">
              Office Address
            </label>
            <textarea
              name="off_address"
              value={formData.off_address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Whether Member of any other Bar Association?
            </label>
            <input
              type="text"
              name="other_bar"
              value={formData.other_bar}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Read-only Info */}
          {/* <div className="sm:col-span-2 mt-4 border-t pt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Other Info</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Enrollment ID</p>
                <p className="text-gray-800">{userDetails?.enrollment_id}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Advocate Code</p>
                <p className="text-gray-800">{userDetails?.adv_code}</p>
              </div>
            </div>
          </div> */}

          <div className="sm:col-span-2 mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 text-sm sm:text-base cursor-pointer"
              disabled={isEditting}
            >
              {isEditting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMemberDetail;
