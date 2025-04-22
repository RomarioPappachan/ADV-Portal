// "use client";

// import { useState } from "react";
// import { useMemberStore } from "@/store/memberStore";
// import { createPortal } from "react-dom";
// import InputText from "../ui/InputText";
// import InputSelect from "../ui/InputSelect";
// import InputTextarea from "../ui/InputTextarea";
// import InputTel from "../ui/InputTel";

// import toast from "react-hot-toast";

// const membershipOptions = [
//   { label: "Ordinary", value: 1 },
//   { label: "Life", value: 0 },
// ];

// const genderOptions = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
// ];

// function AddNewMember({ isOpen, onClose }) {
//   const { addMember, getAllMembers } = useMemberStore();

//   const [memberData, setMemberData] = useState({
//     fullname: "",
//     adv_code: "",
//     enrollment_id: "",
//     membership: null,
//     mobile: "",
//     res_address: "",
//     off_address: "",
//     email: "",
//     profile_image: "",
//     office_ph: "",
//     home_ph: "",
//     date_of_birth: "",
//     qualification: "",
//     date_of_enrol: "",
//     date_of_admission: "",
//     gender: "",
//   });

//   const handleOnChange = (event) => {
//     const { name, value } = event.target;
//     setMemberData((prevValue) => ({
//       ...prevValue,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log("Form submitted", memberData);

//     try {
//       const response = await addMember(memberData);
//       console.log(response);
//       if (response?.data?.adv_id) {
//         toast.success(response?.data?.message);
//         getAllMembers();
//       }
//       setTimeout(() => {
//         onClose(false);
//       }, 2000);
//     } catch (err) {
//       toast.error(err.message || "Failed to create a new member");
//       // console.log(err);
//     }
//   };

//   return createPortal(
//     <div className="fixed top-0 left-0 w-screen h-screen px-6 md:px-10 lg:px-20 xl:px-44 py-10 bg-[#00000075]">
//       <div className="h-full px-6 pb-6 bg-white rounded-lg border border-gray-300 overflow-y-auto relative">
//         <div className="sticky top-0 left-0 bg-white pt-6 pb-4 z-10">
//           <span className="absolute size-9 p-1 top-2 right-2 rounded-full hover:bg-gray-300 flex justify-center items-center cursor-pointer">
//             <button
//               className="text-3xl rotate-45 text-gray-500 cursor-pointer"
//               onClick={() => onClose(false)}
//             >
//               +
//             </button>
//           </span>
//           <h2 className="text-xl text-gray-500 font-semibold">
//             Add New Member
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="py-8 grid grid-cols-2 gap-6">
//             <InputText
//               type="text"
//               id="fullname"
//               name="fullname"
//               label="Full Name"
//               value={memberData.fullname}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputText
//               type="text"
//               id="adv_code"
//               name="adv_code"
//               label="Membership Id"
//               value={memberData.adv_code}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputText
//               type="text"
//               id="enrollment_id"
//               name="enrollment_id"
//               label="Enrollment Id"
//               value={memberData.enrollment_id}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputSelect
//               type="text"
//               id="membership"
//               name="membership"
//               label="Membership Type"
//               value={memberData.membership}
//               optionsArray={membershipOptions}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputText
//               type="date"
//               id="date_of_enrol"
//               name="date_of_enrol"
//               label="Date of Enrollment"
//               value={memberData.date_of_enrol}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputText
//               type="date"
//               id="date_of_admission"
//               name="date_of_admission"
//               label="Date of Admission"
//               value={memberData.date_of_admission}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputText
//               type="email"
//               id="email"
//               name="email"
//               label="Email"
//               value={memberData.email}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputTel
//               type="tel"
//               id="mobile"
//               name="mobile"
//               label="Mobile number"
//               value={memberData.mobile}
//               maxLength={10}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputTel
//               type="tel"
//               id="office_ph"
//               name="office_ph"
//               label="Office phone number"
//               value={memberData.office_ph}
//               maxLength={10}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputTel
//               type="tel"
//               id="home_ph"
//               name="home_ph"
//               label="Home phone number"
//               value={memberData.home_ph}
//               maxLength={10}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputTextarea
//               type="text"
//               id="res_address"
//               name="res_address"
//               label="Residential address"
//               value={memberData.res_address}
//               rows={4}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputTextarea
//               type="text"
//               id="off_address"
//               name="off_address"
//               label="Office address"
//               value={memberData.off_address}
//               rows={4}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputText
//               type="text"
//               id="qualification"
//               name="qualification"
//               label="Qualification"
//               value={memberData.qualification}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//             <InputText
//               type="date"
//               id="date_of_birth"
//               name="date_of_birth"
//               label="Date of birth"
//               value={memberData.date_of_birth}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputSelect
//               type="text"
//               id="gender"
//               name="gender"
//               label="Gender"
//               value={memberData.gender}
//               optionsArray={genderOptions}
//               onChange={handleOnChange}
//               formData={memberData}
//             />

//             <InputText
//               type="file"
//               id="profile_image"
//               name="profile_image"
//               label="Profile Image"
//               value={memberData.profile_image}
//               onChange={handleOnChange}
//               formData={memberData}
//             />
//           </div>
//           <div className="flex justify-end items-center gap-4">
//             <button
//               type="button"
//               className="w-36 h-10 px-4 py-2 text-base font-semibold text-rose-400 rounded-lg bg-rose-100 hover:border hover:border-rose-500 hover:text-rose-500 cursor-pointer"
//               onClick={() => onClose(false)}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="w-36 h-10 px-4 py-2 text-base font-semibold text-white rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// }

// export default AddNewMember;

"use client";

import { useState, useRef } from "react";
import { useMemberStore } from "@/store/memberStore";
import { createPortal } from "react-dom";
import { ImageToBase64 } from "@/utilities/ImageToBase64";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";

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
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    adv_code: "",
    enrollment_id: "",
    membership: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Click to Upload</span>
              )}
            </div>
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
            { name: "adv_code", label: "Membership ID", type: "text" },
            { name: "enrollment_id", label: "Enrollment ID", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "mobile", label: "Mobile Number", type: "tel" },
            { name: "office_ph", label: "Office Phone", type: "tel" },
            { name: "home_ph", label: "Home Phone", type: "tel" },
            {
              name: "date_of_enrol",
              label: "Date of Enrollment",
              type: "date",
            },
            {
              name: "date_of_admission",
              label: "Date of Admission",
              type: "date",
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
                required
              />
            </div>
          ))}

          {/* Select Fields */}
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
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
