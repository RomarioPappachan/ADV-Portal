"use client";

import { ImMail } from "react-icons/im";
import { FaSquarePhone } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";
import { MdOutlineHomeWork } from "react-icons/md";
import { useAuthStore } from "@/store/authStore";

function UserProfile() {
  const { userInfo } = useAuthStore();
  return (
    <div className="space-y-4">
      <div className="w-full h-56 bg-white flex flex-col justify-center items-center gap-2 rounded-lg">
        <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
        <h1 className="text-black font-semibold mt-2">{userInfo?.fullname}</h1>
        <h2 className="text-black ">{userInfo?.adv_code}</h2>
      </div>
      <div className="w-full space-y-4 bg-white rounded-lg p-4 ">
        <h2 className="text-black font-semibold">Profile</h2>
        <div className="flex items-center gap-x-2">
          <ImMail className="text-teal-500 text-xl" />
          <p className="text-black">{userInfo?.email}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaSquarePhone className="text-teal-500 text-xl" />
          <p className="text-black">{userInfo?.mobile}</p>
        </div>

        <h2 className="text-black font-semibold">Office Address</h2>
        <div className="flex gap-x-2">
          <ImOffice className="text-teal-500 text-4xl" />
          <p className="text-black">{userInfo?.off_address}</p>
        </div>

        <h2 className="text-black font-semibold">Res Address</h2>
        <div className="flex gap-x-2">
          <MdOutlineHomeWork className="text-teal-500 text-4xl" />
          <p className="text-black">{userInfo?.res_address}</p>
        </div>
        <div className="p-2 flex justify-center items-center">
          <button
            type="button"
            className="text-lg text-teal-500 font-semibold hover:underline cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
