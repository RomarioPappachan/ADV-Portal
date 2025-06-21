"use client";
import React from "react";
import { usePathname } from "next/navigation";

const myCasesRoutes = [
  { label: "My Cases", path: "/home/my-cases" },
  { label: "Cause List", path: "/home/my-cases/cause-list" },
];

export default function MyCasesSideBar() {
  const pathname = usePathname();
  return (
    <div className="w-full max-h-max px-2 lg:px-4 pb-2">
      <ul className="flex flex-row sm:flex-col gap-1">
        {myCasesRoutes.map((route, index) => (
          <li
            key={route.label}
            className={`sm:w-full p-2 rounded-lg text-xs lg:text-sm ${
              pathname === route.path
                ? " bg-indigo-50 text-indigo-400"
                : "text-gray-500"
            }`}
          >
            {route.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
