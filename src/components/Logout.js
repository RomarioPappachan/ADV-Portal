// "use client";

// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import { createPortal } from "react-dom";
// import toast from "react-hot-toast";

// function Logout({ setIsLogoutOpen }) {
//   const { logout } = useAuthStore();
//   const router = useRouter();

//   return createPortal(
//     <div className="fixed top-0 left-0 w-screen h-screen px-20 py-10 bg-transparent backdrop-blur-xs flex justify-center items-center">
//       <div className="min-w-lg min-h-56 px-6 py-10 bg-white relative rounded-lg border border-gray-300">
//         <span className="absolute right-4 top-4 size-8 p-1 rounded-full flex justify-center items-center hover:bg-gray-300">
//           <button
//             className="text-4xl text-gray-600 font-thin rotate-45 cursor-pointer"
//             onClick={() => setIsLogoutOpen(false)}
//           >
//             +
//           </button>
//         </span>
//         <div className="pt-6 pb-10">
//           <p className="text-black text-base text-center">
//             Are you sure you want to logout?
//           </p>
//         </div>
//         <div className="flex justify-around items-center ">
//           <button
//             className="w-36 h-10 px-4 py-2 text-base font-semibold rounded-lg bg-rose-400 hover:bg-rose-500 cursor-pointer"
//             onClick={() => {
//               logout();
//               toast.success("Logout Successfull");
//               router.push("/admin");
//             }}
//           >
//             Confirm
//           </button>
//           <button
//             className="w-36 h-10 px-4 py-2 text-base font-semibold rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer"
//             onClick={() => setIsLogoutOpen(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

// export default Logout;

"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import { useMemberStore } from "@/store/memberStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";

const Logout = ({ isOpen, onClose }) => {
  const { adminLogout } = useAdminAuthStore();

  // const { resetSelectedMember } = useMemberStore();

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    // resetSelectedMember();
    adminLogout();
    toast.success("Logout Successfull");
    router.push("/admin");
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <LuX size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Logout Confirmation
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Are you sure you want to logout? <br />
          You will need to login again to access your dashboard.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Logout;
