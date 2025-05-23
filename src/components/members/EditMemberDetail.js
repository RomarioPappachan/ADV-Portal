"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMemberStore } from "@/store/memberStore";
import { ImageToBase64 } from "@/utilities/ImageToBase64";

import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";

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
    email: "",
    profile_image: "",
    office_ph: "",
    home_ph: "",
    res_address: "",
    off_address: "",
    date_of_birth: "",
    qualification: "",
    date_of_enrol: "",
    date_of_admission: "",
    gender: "Male",
  });

  useEffect(() => {
    setFormData({
      fullname: userDetails?.fullname || "",
      email: userDetails?.email || "",
      profile_image: userDetails?.profile_image || "",
      office_ph: userDetails?.office_ph || "",
      home_ph: userDetails?.home_ph || "",
      res_address: userDetails?.res_address || "",
      off_address: userDetails?.off_address || "",
      date_of_birth: userDetails?.date_of_birth?.slice(0, 10) || "",
      qualification: additionalInfo?.qualification || "",
      date_of_enrol: additionalInfo?.date_of_enrol?.slice(0, 10) || "",
      date_of_admission: additionalInfo?.date_of_admission?.slice(0, 10) || "",
      gender: additionalInfo?.gender || "Male",
    });
  }, [userDetails, additionalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // console.log(formData);
    setIsEditting(true);

    try {
      const updatedMember = {
        id: selectedMemberId,
        adv_code: userDetails.adv_code,
        enrollment_id: userDetails.enrollment_id,
        membership: userDetails.membership,
        ...formData,
      };

      const response = await editMember(updatedMember);

      if (response?.data?.message)
        toast.success("Member details updated successfully");
      getMemberById(selectedMemberId); // re-render user details
      setTimeout(() => {
        onClose(); // close popup
      }, 2000);
    } catch (error) {
      console.log(error);
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

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 font-medium mb-1">
              Profile Image
            </label>
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
                <span className="text-gray-400 text-sm">Click to Upload</span>
              )}
            </div>
            <span className="text-gray-400 text-sm ps-4">Click to Upload</span>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Office Phone
            </label>
            <input
              type="text"
              name="office_ph"
              value={formData.office_ph}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="13"
              minLength="10"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Home Phone
            </label>
            <input
              type="text"
              name="home_ph"
              value={formData.home_ph}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              required
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
              required
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
              required
            />
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
              required
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
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Date of Admission
            </label>
            <input
              type="date"
              name="date_of_admission"
              value={formData.date_of_admission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              required
            >
              <option>Male</option>
              <option>Female</option>
            </select>
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
