// "use client";

// import React from "react";
// import Link from "next/link";
// import { ImMail } from "react-icons/im";
// import { FaSquarePhone } from "react-icons/fa6";
// import { useAuthStore } from "@/store/authStore";

// const page = () => {
//   const { userInfo } = useAuthStore();
//   return (
//     <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-4 pb-10 bg-[#f6f8fa] box-border">
//       {/* left section  */}
//       <div className="lg:3/4 flex flex-col gap-8 bg-white rounded-lg p-8 border-2 border-gray-300">
//         <div className="flex items-center gap-6">
//           <div className="w-28 h-28 bg-gray-300 rounded-full p-1 overflow-hidden">
//             <img
//               src="/user-icon.jpg"
//               alt="profile img"
//               className="w-full rounded-full"
//             />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold text-black">
//               {userInfo?.fullname?.toUpperCase()}
//             </h1>
//             <p className="text-gray-500 text-sm">{userInfo?.adv_code}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 justify-between">
//           <div className=" h-20 ">
//             <div className="flex items-center gap-2 text-gray-400">
//               <ImMail /> Email
//             </div>
//             <p className="text-black font-semibold">{userInfo?.email}</p>
//           </div>
//           <div className=" h-20 ">
//             <div className="flex items-center gap-2 text-gray-400">
//               <FaSquarePhone /> Mobile Number
//             </div>
//             <p className="text-black font-semibold">{userInfo?.mobile}</p>
//           </div>
//           <div className=" h-20">
//             <div className="flex items-center gap-2 text-gray-400">
//               <ImMail /> Enrollment ID
//             </div>
//             <p className="text-black font-semibold">
//               {userInfo?.enrollment_id}
//             </p>
//           </div>
//         </div>
//         <div className="grid grid-col-1 md:grid-cols-3 justify-between gap-10 md:gap-0 ">
//           <div className=" h-28 space-y-3">
//             <div>
//               <div className="flex items-center gap-2 text-gray-400">
//                 <ImMail /> Residential Address
//               </div>
//               <p className="text-black font-semibold">
//                 {userInfo?.res_address}
//               </p>
//             </div>
//             <div>
//               <div className="flex items-center gap-2 text-gray-400">
//                 <ImMail /> Phone No:
//               </div>
//               <p className="text-black font-semibold">{userInfo?.home_ph}</p>
//             </div>
//           </div>
//           <div className="w-72 h-28  space-y-3">
//             <div>
//               <div className="flex items-center gap-2 text-gray-400">
//                 <ImMail /> Office Address
//               </div>
//               <p className="text-black font-semibold">
//                 {userInfo?.off_address}
//               </p>
//             </div>
//             <div>
//               <div className="flex items-center gap-2 text-gray-400">
//                 <ImMail /> Office Phone No:
//               </div>
//               <p className="text-black font-semibold">{userInfo?.office_ph}</p>
//             </div>
//           </div>
//         </div>

//         {/* view profile  */}
//         <div className="py-10">
//           <Link
//             href={"/home/profile"}
//             className="text-[#3f51b5] hover:text-purple-600 hover:underline text-xl"
//           >
//             View Profile Details
//           </Link>
//         </div>
//       </div>

//       {/* right section  */}
//       <div className="w-full lg:w-1/4 bg-white rounded-lg p-4 border-2 border-gray-300">
//         <h1 className="text-2xl font-semibold text-center text-blue-900 my-2">
//           Services
//         </h1>
//         <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-4">
//           <Link href={"/home/services/subscription"} className="w-full">
//             <div className="w-full h-[140px] text-white rounded-lg bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600  flex justify-center items-center text-lg md:text-2xl text-center hover:scale-105 transition-all duration-300">
//               <h1>My Subscriptions</h1>
//             </div>
//           </Link>
//           <Link href={"/home/services/my-cases"} className="w-full">
//             <div className="w-full h-[140px] text-white rounded-lg bg-linear-to-r from-purple-200 via-indigo-400 to-violet-600  flex justify-center items-center text-lg md:text-2xl hover:scale-105 transition-all duration-300">
//               My Cases
//             </div>
//           </Link>
//           <Link href={"/home/services/qr-code"} className="w-full">
//             <div className="w-full h-[140px] text-white rounded-lg bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500  flex justify-center items-center text-lg  md:text-2xl hover:scale-105 transition-all duration-300">
//               QR-Code
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuBuilding2,
  LuUserCheck,
  LuUser,
  LuBriefcase,
  LuMonitor,
  LuFile,
  LuBriefcaseBusiness,
  LuUserCog,
} from "react-icons/lu";

const Page = () => {
  const { userInfo } = useAuthStore();
  const { userDetails } = useUserStore();

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-10 bg-transparent">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col gap-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden border">
            <img
              src={
                userDetails?.profile_image
                  ? userDetails?.profile_image
                  : userInfo?.profile_image
                  ? userInfo?.profile_image
                  : "/user-icon.jpg"
              }
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {(
                userDetails?.fullname ||
                userInfo?.fullname ||
                ""
              ).toUpperCase()}
            </h1>
            <p className="text-gray-500">
              {userDetails?.adv_code || userInfo?.adv_code}
            </p>
          </div>
        </div>

        {/* Unified Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuMail /> Email
            </div>
            <p className="text-black font-semibold break-all">
              {userDetails?.email || userInfo?.email}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuPhone /> Mobile Number
            </div>
            <p className="text-black font-semibold">
              {userDetails?.mobile || userInfo?.mobile}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuUserCheck /> Bar council Enrollment No.
            </div>
            <p className="text-black font-semibold">
              {userDetails?.enrollment_id || userInfo?.enrollment_id}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuPhone /> Emergency Phone no.
            </div>
            <p className="text-black font-semibold">
              {userDetails?.home_ph || userInfo?.home_ph}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuBuilding2 /> Office Address
            </div>
            <p className="text-black font-semibold">
              {userDetails?.off_address || userInfo?.off_address}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <LuPhone /> Office Phone / Additional Mobile no.
            </div>
            <p className="text-black font-semibold">
              {userDetails?.office_ph || userInfo?.office_ph}
            </p>
          </div>
        </div>

        {/* View Profile */}
        <Link
          href="/home/profile"
          className="md:mt-6 max-w-max px-4 py-2 flex justify-center items-center gap-2 text-base font-medium rounded-md  bg-sky-900 text-sky-50 hover:bg-sky-950 hover:text-sky-100 hover:underline "
        >
          <LuUserCog className="text-2xl" />
          <span>Profile Details</span>
        </Link>
      </div>

      {/* Right Section - Services */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-4">
          Services{" "}
          <span className="text-lg text-black">(Under Development)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/home/my-cases/todays-cases">
            <div className="w-full h-32 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white text-xl font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              <LuBriefcaseBusiness className="text-2xl" />
              <span>My Cause List</span>
            </div>
          </Link>

          <Link href="/home/my-cases/live-board">
            <div className="w-full h-32 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white text-xl font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              <LuMonitor className="text-2xl" />
              <span>Live Court Status</span>
            </div>
          </Link>

          <Link href="/home/my-cases">
            <div className="w-full h-32 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white text-xl font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              <LuBriefcase className="text-2xl" />
              <span>My Cases</span>
            </div>
          </Link>

          <a
            href="https://ecourt.keralacourts.in/digicourt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-full h-32 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white text-xl font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              <LuFile className="text-2xl" />
              <span>E-Filing</span>
            </div>
          </a>

          <Link href="/home/services/subscription">
            <div className="w-full h-32 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white text-xl font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              <LuUser className="text-2xl" />
              <span>My Subscriptions</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
