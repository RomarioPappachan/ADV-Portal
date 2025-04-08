// import React from "react";

// const AddMember = ({ isOpen, onClose }) => {
//   if (!isOpen) return null; // If not open, don't render the modal

//   return (
//     <div className="fixed inset-0 bg-[#8c878786] flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-lg font-semibold text-blue-900 mb-4">Add Member</h2>

//         {/* Member Form */}
//         <form className="space-y-4">
//           <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-md" />
//           <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
//           <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-md" />

//           {/* Buttons */}
//           <div className="flex justify-end space-x-2">
//             <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">
//               Add Member
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMember;

import React, { useState } from "react";

const AddMember = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    membershipId: "",
    enrollmentId: "",
    membershipType: "",
    mobileNumber: "",
    email: "",
    officePhone: "",
    homePhone: "",
    dob: "",
    officeAddress: "",
    residentialAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-xs flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">Add Member</h2>
          <button
            className="text-gray-600 hover:text-red-600"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "membershipId", label: "Membership ID", type: "text" },
              { name: "enrollmentId", label: "Enrollment ID", type: "text" },
              { name: "mobileNumber", label: "Mobile Number", type: "tel" },
              { name: "email", label: "Email", type: "email" },
              { name: "officePhone", label: "Office Phone", type: "tel" },
              { name: "homePhone", label: "Home Phone", type: "tel" },
              { name: "doj", label: "Date of Joining", type: "date" },
            ].map(({ name, label, type }) => (
              <div key={name} className="relative w-full">
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label
                  htmlFor={name}
                  className={`absolute left-3 text-gray-500 transition-all bg-white px-1 cursor-text
                    ${
                      formData[name]
                        ? "top-0 text-xs text-blue-500"
                        : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                    }`}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Membership Type (Select) */}
          <div className="relative w-full">
            <select
              id="membershipType"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              required
              className="peer w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Membership Type
              </option>
              <option value="ordinary">Ordinary</option>
              <option value="life">Life</option>
            </select>
            <label
              htmlFor="membershipType"
              className="absolute left-3 top-0 text-xs text-blue-500 bg-white px-1 cursor-text"
            >
              Membership Type
            </label>
          </div>

          {/* Address Fields (Full Width) */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: "officeAddress", label: "Office Address", type: "text" },
              {
                name: "residentialAddress",
                label: "Residential Address",
                type: "text",
              },
            ].map(({ name, label, type }) => (
              <div key={name} className="relative w-full">
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label
                  htmlFor={name}
                  className={`absolute left-3 text-gray-500 transition-all bg-white px-1 cursor-text
                    ${
                      formData[name]
                        ? "top-0 text-xs text-blue-500"
                        : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                    }`}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
