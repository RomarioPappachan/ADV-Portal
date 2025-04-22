// "use client";

// import React from "react";
// import { IoLogOutOutline } from "react-icons/io5";

// const Navbar = () => {
//   return (
//     <div className="w-full h-20 flex justify-between items-center bg-[#3f51b5] px-10">
//       <div className="flex items-center gap-2">
//         <img src="/khcaa-logo.png" alt="logo" className="size-16" />
//         <h1 className="text-xl text-white font-semibold">KHCAA</h1>
//       </div>
//       <button className="w-24 h-10 flex justify-center items-center gap-2 text-base text-white border border-white rounded-lg hover:text-[#3f51b5] hover:bg-white ease-in-out duration-300">
//         Logout
//         <IoLogOutOutline />
//       </button>
//     </div>
//   );
// };

// export default Navbar;

"use client";

import React, { useState } from "react";
import { LuUser, LuLogOut } from "react-icons/lu";
import { useAuthStore } from "@/store/authStore";
import Logout from "./Logout";

const Navbar = () => {
  const { isAuthenticated, userType } = useAuthStore();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className="w-full h-20 flex justify-between items-center bg-[#3f51b5] px-10">
      <div className="flex items-center gap-2">
        <img src="/khcaa-logo.png" alt="logo" className="w-16 h-16" />
        <h1 className="text-xl text-white font-semibold">KHCAA</h1>
      </div>

      <div className="flex items-center gap-4 text-white">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <LuUser className="w-6 h-6" />
              <span className="text-sm">{userType || "Admin"}</span>
            </div>
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer"
              title="Logout"
            >
              <LuLogOut className="w-5 h-5" />
            </button>
          </>
        ) : (
          <LuUser className="w-6 h-6" />
        )}
      </div>
      {/* logout popup   */}
      <Logout isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </div>
  );
};

export default Navbar;
