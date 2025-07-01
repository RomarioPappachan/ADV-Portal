"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutConfirmation from "./user/LogoutConfirmation";
import Image from "next/image";
import Link from "next/link";
import { LuBell, LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

const UserNavbar = () => {
  const { logout } = useAuthStore();
  const { resetUserStore } = useUserStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    resetUserStore(); // clear the logged users data
    logout(); // clear user details and token

    setShowLogoutModal(false);
    router.replace("/");
  };

  // bg-[#3f51b5]

  return (
    <>
      <nav className="w-full bg-sky-950 text-white shadow-md">
        <div className="px-3 sm:px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/home">
              <div className="flex items-center gap-2">
                <Image
                  src="/khcaa-logo.png"
                  alt="KHCAA Logo"
                  width={48}
                  height={48}
                  className="w-12 sm:w-14"
                />
                <h1 className="text-lg sm:text-xl font-semibold">KHCAA</h1>
              </div>
            </Link>

            {/* Icons Section */}
            <div className="hidden md:flex items-center gap-4">
              <button
                className="p-2 rounded-full hover:bg-white/20 transition"
                aria-label="Notifications"
              >
                <LuBell size={20} />
              </button>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="p-2 rounded-full hover:bg-white/20 transition"
                aria-label="Logout"
              >
                <LuLogOut size={20} />
              </button>
            </div>

            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2" aria-label="Menu">
                {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Icons */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 flex gap-4">
            <button
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Notifications"
            >
              <LuBell size={20} />
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Logout"
            >
              <LuLogOut size={20} />
            </button>
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      <LogoutConfirmation
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserNavbar;
