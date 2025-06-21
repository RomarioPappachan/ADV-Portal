"use client";
import React, { useEffect, useState } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import CauseListCard, {
  CauseListCardLoader,
} from "@/components/user/my-cases/CauseListCard";

import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function CauseList() {
  const { causeList, courts, count, getCauseList, loading } =
    useCauseListStore();
  const [date, setDate] = useState();

  useEffect(() => {
    // Format today's date as "YYYY-MM-DD"
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // "2025-06-19"
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    if (date) {
      getCauseList(date); // assuming getCauseList takes date as argument
    }
  }, [date, getCauseList]);

  // Handle AntD DatePicker change
  const handleDateChange = (dateObj) => {
    if (!dateObj) return;
    const selectedDate = dateObj.format("YYYY-MM-DD"); // format using dayjs
    if (selectedDate !== date) {
      setDate(selectedDate);
    }
  };

  // if (loading)
  //   return (
  //     <div className="w-full h-full flex justify-center items-center animate-pulse">
  //       <span className="text-blue-500 text-xl">Loading...</span>
  //     </div>
  //   );

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-4 bg-indigo-100 flex justify-between items-center rounded-lg">
        <h1 className="text-gray-500 text-sm sm:text-base">Cause List</h1>
        {/* <input
          type="date"
          name="date"
          id=""
          className="h-10 text-gray-500 bg-white rounded-lg border border-gray-200"
          value={date}
          onChange={handleDateChange}
        /> */}
        <DatePicker
          value={date ? dayjs(date, "YYYY-MM-DD") : null}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="h-8 sm:h-10 text-sm sm:text-base"
          allowClear={false}
        />
      </div>

      <div className="flex-1 py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
        {loading ? (
          Array.from({ length: 12 }, (_, index) => (
            <CauseListCardLoader key={index} />
          ))
        ) : causeList.length > 0 ? (
          causeList.map((item, index) => (
            <CauseListCard item={item} key={index} />
          ))
        ) : (
          <div className="p-6">
            <span className="text-red-400 text-base">No cases available</span>
          </div>
        )}
      </div>
    </div>
  );
}
