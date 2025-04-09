"use client";

import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="w-full h-20 flex justify-between items-center bg-blue-900 px-10">
      <div className="flex items-center gap-2">
        <img src="/khcaa-logo.png" alt="logo" className="size-16" />
        <h1 className="text-xl text-white font-semibold">KHCAA</h1>
      </div>
      <button className="w-24 h-10 flex justify-center items-center  gap-2 text-base text-white border border-white rounded-lg hover:text-blue-900 hover:bg-white ease-in-out duration-300">
        Logout
        <IoLogOutOutline />
      </button>
    </div>
  );
};

export default Navbar;
