"use client";

import { useState } from "react";
import { useMemberStore } from "@/store/memberStore";
import { createPortal } from "react-dom";
import InputText from "../ui/InputText";
import InputSelect from "../ui/InputSelect";
import InputTextarea from "../ui/InputTextarea";
import InputTel from "../ui/InputTel";

import toast from "react-hot-toast";

const membershipOptions = [
  { label: "Ordinary", value: 1 },
  { label: "Life", value: 0 },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

function AddNewMember({ isOpen, onClose }) {
  const { addMember, getAllMembers } = useMemberStore();

  const [memberData, setMemberData] = useState({
    fullname: "",
    adv_code: "",
    enrollment_id: "",
    membership: null,
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
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form submitted", memberData);

    try {
      const response = await addMember(memberData);
      console.log(response);
      if (response?.data?.adv_id) {
        toast.success(response?.data?.message);
        getAllMembers();
      }
      setTimeout(() => {
        onClose(false);
      }, 2000);
    } catch (err) {
      toast.error(err.message || "Failed to create a new member");
      // console.log(err);
    }
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen px-6 md:px-10 lg:px-20 xl:px-44 py-10 bg-[#00000075]">
      <div className="h-full px-6 pb-6 bg-white rounded-lg border border-gray-300 overflow-y-auto relative">
        <div className="sticky top-0 left-0 bg-white pt-6 pb-4 z-10">
          <span className="absolute size-9 p-1 top-2 right-2 rounded-full hover:bg-gray-300 flex justify-center items-center cursor-pointer">
            <button
              className="text-3xl rotate-45 text-gray-500 cursor-pointer"
              onClick={() => onClose(false)}
            >
              +
            </button>
          </span>
          <h2 className="text-xl text-gray-500 font-semibold">
            Add New Member
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="py-8 grid grid-cols-2 gap-6">
            <InputText
              type="text"
              id="fullname"
              name="fullname"
              label="Full Name"
              value={memberData.fullname}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputText
              type="text"
              id="adv_code"
              name="adv_code"
              label="Membership Id"
              value={memberData.adv_code}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputText
              type="text"
              id="enrollment_id"
              name="enrollment_id"
              label="Enrollment Id"
              value={memberData.enrollment_id}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputSelect
              type="text"
              id="membership"
              name="membership"
              label="Membership Type"
              value={memberData.membership}
              optionsArray={membershipOptions}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputText
              type="date"
              id="date_of_enrol"
              name="date_of_enrol"
              label="Date of Enrollment"
              value={memberData.date_of_enrol}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputText
              type="date"
              id="date_of_admission"
              name="date_of_admission"
              label="Date of Admission"
              value={memberData.date_of_admission}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputText
              type="email"
              id="email"
              name="email"
              label="Email"
              value={memberData.email}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputTel
              type="tel"
              id="mobile"
              name="mobile"
              label="Mobile number"
              value={memberData.mobile}
              maxLength={10}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputTel
              type="tel"
              id="office_ph"
              name="office_ph"
              label="Office phone number"
              value={memberData.office_ph}
              maxLength={10}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputTel
              type="tel"
              id="home_ph"
              name="home_ph"
              label="Home phone number"
              value={memberData.home_ph}
              maxLength={10}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputTextarea
              type="text"
              id="res_address"
              name="res_address"
              label="Residential address"
              value={memberData.res_address}
              rows={4}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputTextarea
              type="text"
              id="off_address"
              name="off_address"
              label="Office address"
              value={memberData.off_address}
              rows={4}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputText
              type="text"
              id="qualification"
              name="qualification"
              label="Qualification"
              value={memberData.qualification}
              onChange={handleOnChange}
              formData={memberData}
            />
            <InputText
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              label="Date of birth"
              value={memberData.date_of_birth}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputSelect
              type="text"
              id="gender"
              name="gender"
              label="Gender"
              value={memberData.gender}
              optionsArray={genderOptions}
              onChange={handleOnChange}
              formData={memberData}
            />

            <InputText
              type="file"
              id="profile_image"
              name="profile_image"
              label="Profile Image"
              value={memberData.profile_image}
              onChange={handleOnChange}
              formData={memberData}
            />
          </div>
          <div className="flex justify-end items-center gap-4">
            <button
              type="button"
              className="w-36 h-10 px-4 py-2 text-base font-semibold text-rose-400 rounded-lg bg-rose-100 hover:border hover:border-rose-500 hover:text-rose-500 cursor-pointer"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-36 h-10 px-4 py-2 text-base font-semibold text-white rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default AddNewMember;
