"use client";
import React, { useEffect, useState } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import { useAuthStore } from "@/store/authStore";
import CauseListCard, {
  CauseListCardLoader,
} from "@/components/user/my-cases/CauseListCard";

export default function MyCases() {
  const { advCode, myCases, getAdvCases, loadCachedData, loading } =
    useCauseListStore();
  const { userInfo } = useAuthStore();

  const hcCode = userInfo?.hc_code ? userInfo?.hc_code : advCode;

  // Load cached data on initial mount
  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (hcCode) getAdvCases(hcCode); // assuming getAdvCases takes date as argument
  }, [getAdvCases, hcCode]);

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-4 bg-sky-100 flex justify-between items-center rounded-lg">
        <h1 className="text-gray-500 text-sm sm:text-base">My Cases</h1>
      </div>

      <div className="flex-1 py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
        {loading && myCases.length < 1 ? (
          Array.from({ length: 12 }, (_, index) => (
            <CauseListCardLoader key={index} />
          ))
        ) : myCases.length > 0 ? (
          myCases.map(
            (item, index) =>
              !item.error && <CauseListCard item={item} key={index} />
          )
        ) : (
          <div className="p-6">
            <span className="text-red-400 text-base">No cases available</span>
          </div>
        )}
      </div>
    </div>
  );
}
