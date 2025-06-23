"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdSubscriptions,
  MdQrCodeScanner,
  MdFolderSpecial,
} from "react-icons/md";

const NavLink = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const links = [
    {
      href: "/home/services/subscription",
      label: "Subscriptions",
      icon: <MdSubscriptions size={20} />,
    },
    // {
    //   href: "/home/services/my-cases",
    //   label: "My Cases",
    //   icon: <MdFolderSpecial size={20} />,
    // },
    {
      href: "/home/services/qr-code",
      label: "QR Code",
      icon: <MdQrCodeScanner size={20} />,
    },
  ];

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.href === pathname);
    const container = containerRef.current;
    if (container && activeIndex !== -1) {
      const tab = container.children[activeIndex];
      if (tab) {
        const { offsetLeft, offsetWidth } = tab;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [pathname]);

  return (
    <div className="relative w-full bg-white border-b border-gray-200">
      <div
        ref={containerRef}
        className="flex overflow-x-auto sm:justify-evenly items-center h-16 relative no-scrollbar"
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="flex-shrink-0">
              <div
                className={`flex items-center gap-2 px-4 py-2 h-10 cursor-pointer transition-all duration-200 
                ${
                  isActive
                    ? "text-[#3f51b5] font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.icon}
                <span className="text-sm sm:text-base">{link.label}</span>
              </div>
            </Link>
          );
        })}
        {/* Animated underline */}
        <span
          className="absolute bottom-0 h-1 bg-[#3f51b5] transition-all duration-300 rounded-full"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>
    </div>
  );
};

export default NavLink;
