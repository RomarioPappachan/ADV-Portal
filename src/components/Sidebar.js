"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logout from "./Logout";

import { FiHome, FiUsers, FiLogOut } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";

const Sidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/dashboard" },
    {
      name: "Members",
      icon: <FiUsers size={20} />,
      path: "/dashboard/members",
    },
    {
      name: "Updated Members",
      icon: <LiaUserEditSolid size={20} />,
      path: "/dashboard/profile-uptd-members",
    },
    {
      name: "Subscriptions",
      icon: <LuShieldCheck size={20} />,
      path: "/dashboard/payments/parking",
    },
  ];

  useEffect(() => {
    if (pathname === "/dashboard") setActiveTab("Dashboard");
    else if (pathname.startsWith("/dashboard/members")) setActiveTab("Members");
    else if (pathname.startsWith("/dashboard/profile-uptd-members"))
      setActiveTab("Updated Members");
    else if (pathname.startsWith("/dashboard/payments"))
      setActiveTab("Subscriptions");
  }, [pathname]);

  return (
    <div className="w-64 min-h-screen h-full bg-white shadow-lg flex flex-col">
      {/* Navigation */}
      <nav className=" p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
              router.push(item.path);
            }}
            className={`flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer
              ${
                activeTab === item.name
                  ? "bg-gray-200 text-gray-800 font-semibold"
                  : ""
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t-[1px] border-t-gray-300 p-4">
        <button
          className="flex items-center gap-3 p-3 w-full rounded-lg text-rose-600 hover:bg-rose-100 transition mb-4 cursor-pointer"
          onClick={() => setIsLogoutOpen(true)}
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* logout popup   */}
      <Logout isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </div>
  );
};

export default Sidebar;
