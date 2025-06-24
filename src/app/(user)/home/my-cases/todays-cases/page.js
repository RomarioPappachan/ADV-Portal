"use client";
import React, { useEffect, useState } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import { useAuthStore } from "@/store/authStore";
import CauseListCard, {
  CauseListCardLoader,
} from "@/components/user/my-cases/CauseListCard";

import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function TodaysCases() {
  const { causeList, getCauseList, loading } = useCauseListStore();
  const { userInfo } = useAuthStore();

  const [date, setDate] = useState("");

  const enrolId = userInfo?.enrollment_id;

  useEffect(() => {
    // Format today's date as "YYYY-MM-DD"
    const today = dayjs().format("YYYY-MM-DD");
    setDate(today);
  }, []);

  useEffect(() => {
    if (date) {
      getCauseList(date, enrolId); // assuming getCauseList takes date as argument
    }
  }, [date, enrolId, getCauseList]);

  // Handle AntD DatePicker change
  const handleDateChange = (dateObj) => {
    if (!dateObj) return;
    const selectedDate = dateObj.format("YYYY-MM-DD"); // format using dayjs
    if (selectedDate !== date) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-4 py-3 bg-sky-100 flex justify-between items-center rounded-lg">
        <h1 className="text-gray-500 text-sm sm:text-base">Today's Cases</h1>

        <DatePicker
          value={date ? dayjs(date, "YYYY-MM-DD") : null}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="h-8 sm:h-10 text-sm sm:text-base"
          allowClear={false}
        />
      </div>

      <div className="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
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
