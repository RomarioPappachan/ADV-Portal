"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const myCasesRoutes = [
  { label: "My Cause List", path: "/home/my-cases/todays-cases" },
  { label: "Live Board", path: "/home/my-cases/live-board" },
  { label: "My Cases", path: "/home/my-cases" },
  { label: "Associates", path: "/home/my-cases/associates" },
  // { label: "Cause List", path: "/home/my-cases/cause-list" },
];

export default function MyCasesSideBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <div className="w-full max-h-max px-2 lg:px-4 pb-2">
      <ul className="flex flex-row sm:flex-col gap-1">
        {myCasesRoutes.map((route, index) => (
          <Link href={route.path} key={`${route.label}${index}`}>
            <li
              className={`sm:w-full p-2 rounded-lg text-xs lg:text-sm  ${
                pathname === route.path || from === route.path
                  ? " bg-sky-950 text-sky-50"
                  : "text-sky-950 hover:bg-sky-50"
              }`}
            >
              {route.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
