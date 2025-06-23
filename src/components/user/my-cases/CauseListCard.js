"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CauseListCard({ index, item }) {
  const pathname = usePathname();

  return (
    <Link href={`/home/my-cases/${item?.cino}?from=${pathname}`}>
      <div
        key={index}
        className="min-h-48 h-full px-4 py-2 border border-gray-200 rounded-lg shadow-md relative flex flex-col justify-between"
      >
        <div
          className={`px-2 py-1 absolute top-2 right-2 rounded flex justify-center items-center font-semibold ${
            item?.status === "P"
              ? "bg-purple-100 text-purple-500"
              : item?.status === "D"
              ? "bg-green-100 text-green-500"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span className="text-xs">
            {item?.status === "P"
              ? "Pending"
              : item?.status === "D"
              ? "Disposed"
              : "N/A"}
          </span>
        </div>
        <h3 className="text-gray-800 text-base font-bold">{item?.ctitle}</h3>

        <div className="mt-5 mb-3 flex flex-col justify-center">
          <span className="text-gray-600 text-xs font-semibold">
            {item?.petitioner}
          </span>
          <span className="text-gray-400 text-xs font-thin">vs</span>

          <span className="text-gray-600 text-xs font-semibold">
            {item?.respondent}
          </span>
        </div>
        <div>
          <p className="text-gray-600 text-[10px] text-right">
            {item?.originalsr_no}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function CauseListCardLoader() {
  return (
    <div className="animate-pulse min-h-44 p-4 border border-gray-200 rounded-lg shadow-md relative flex flex-col justify-between">
      <div className="px-2 py-1 absolute top-2 right-2 w-16  h-2 rounded bg-gray-200"></div>
      <h3 className="w-1/2 h-6 rounded bg-gray-200"></h3>

      <div className="my-2 flex flex-col justify-center gap-2">
        <div className="h-4 rounded bg-gray-200"></div>
        <div className="h-2 rounded bg-gray-200"></div>

        <div className="h-4 rounded bg-gray-200"></div>
      </div>
      <div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
