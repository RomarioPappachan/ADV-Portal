"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

function Logout({ setIsLogoutOpen }) {
  const { logout } = useAuthStore();
  const router = useRouter();

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen px-20 py-10 bg-transparent backdrop-blur-xs flex justify-center items-center">
      <div className="min-w-lg min-h-56 px-6 py-10 bg-white relative rounded-lg border border-gray-300">
        <span className="absolute right-4 top-4 size-8 p-1 rounded-full flex justify-center items-center hover:bg-gray-300">
          <button
            className="text-4xl text-gray-600 font-thin rotate-45 cursor-pointer"
            onClick={() => setIsLogoutOpen(false)}
          >
            +
          </button>
        </span>
        <div className="pt-6 pb-10">
          <p className="text-black text-base text-center">
            Are you sure you want to logout?
          </p>
        </div>
        <div className="flex justify-around items-center ">
          <button
            className="w-36 h-10 px-4 py-2 text-base font-semibold rounded-lg bg-rose-400 hover:bg-rose-500 cursor-pointer"
            onClick={() => {
              logout();
              toast.success("Logout Successfull");
              router.push("/admin");
            }}
          >
            Confirm
          </button>
          <button
            className="w-36 h-10 px-4 py-2 text-base font-semibold rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer"
            onClick={() => setIsLogoutOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Logout;
