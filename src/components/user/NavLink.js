"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const links = [
    { href: "/home/services/subscription", label: "Subscriptions" },
    { href: "/home/services/my-cases", label: "My Cases" },
    { href: "/home/services/qr-code", label: "QR Code" },
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
    <div className="relative w-full h-16 bg-white border-b border-b-gray-200">
      <div
        ref={containerRef}
        className="flex justify-evenly items-center h-full relative"
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <h2
              className={`font-semibold h-10 px-2 cursor-pointer pt-2 ${
                pathname === link.href ? "text-blue-800" : "text-gray-600"
              }`}
            >
              {link.label}
            </h2>
          </Link>
        ))}
        {/* Animated underline */}
        <span
          className="absolute bottom-0 h-1 bg-blue-800 transition-all duration-300 rounded-full"
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
