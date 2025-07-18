"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyCasesCard({ index, item }) {
  const pathname = usePathname();

  return (
    <Link href={`/home/my-cases/${item?.cino}?from=${pathname}`}>
      <div className=" max-h-max rounded-md border border-sky-200 hover:bg-sky-100">
        {/* head  */}
        <div className="bg-sky-950 h-10 px-2 flex justify-between items-center rounded-t-md">
          <h3 className="max-w-max text-sm text-sky-100">
            High Court of Kerala
          </h3>
          <div
            className={`px-2 py-1 rounded-full flex justify-center items-center font-semibold ${
              item?.status === "P" || item?.status === "Pending"
                ? "text-white bg-green-500"
                : item?.status === "D" || item?.status === "Disposed"
                ? "text-white bg-rose-500"
                : "text-white bg-gray-500"
            }`}
          >
            <span className="text-[10px]">
              {item?.status === "P" || item?.status === "Pending"
                ? "Pending"
                : item?.status === "D" || item?.status === "Disposed"
                ? "Disposed"
                : "N/A"}
            </span>
          </div>
        </div>

        {/* body  */}
        <div className="p-2 flex flex-col justify-center">
          <span className="text-gray-600 text-xs font-semibold">
            {item?.petitioner}
          </span>
          <span className="text-gray-400 text-xs font-thin">vs</span>

          <span className="text-gray-600 text-xs font-semibold">
            {item?.respondent}
          </span>
        </div>

        {/* case no  */}
        <div className="p-2 flex items-center justify-end">
          <span className="bg-sky-950 px-2 py-1 font-semibold text-[10px] sm:text-xs rounded-sm flex justify-center items-center gap-1">
            <span className="text-orange-400">{item?.ctitle}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function MyCasesCardLoader() {
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
