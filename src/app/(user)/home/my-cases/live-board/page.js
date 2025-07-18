"use client";

import React, { useEffect, useState } from "react";
import { useDisplayBoardStore } from "@/store/displayBoardStore";
import { useCauseListStore } from "@/store/causeListStore.";

import { LuCalendar1, LuClock3 } from "react-icons/lu";

export default function LiveBoard() {
  const { courtRooms, getDisplayBoard, loading } = useDisplayBoardStore();
  const { cachedRoomMeta, loadCachedRoomMeta } = useCauseListStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // ✅ Load cachedRoomMeta on first mount
  useEffect(() => {
    loadCachedRoomMeta();
  }, []);

  // ⏰ Live Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔁 Poll every 30 seconds
  useEffect(() => {
    getDisplayBoard(); // Initial call
    const interval = setInterval(getDisplayBoard, 30000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-2 sm:px-4 bg-sky-950 rounded-lg relative flex justify-between items-center gap-2">
        {/* 📅 Date - top left */}

        <div className="max-w-max flex items-center gap-1 bg-white border border-gray-200 px-4 py-2 rounded-full shadow text-[10px] sm:text-sm font-medium text-gray-700">
          <LuCalendar1 className="text-xs sm:text-base" />
          <span>{formattedDate}</span>
        </div>

        {/* 🟢 Live Clock - top right */}

        <div className="max-w-max flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-full shadow text-[10px] sm:text-sm font-medium text-gray-700">
          {/* Live label */}
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <span>Live</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-gray-300" />

          {/* Clock */}
          <div className="flex items-center gap-1 text-gray-700">
            <LuClock3 className="text-xs sm:text-base" />
            <span>
              {currentTime.toLocaleTimeString("en-US", { hour12: true })}
            </span>
            {/* Replace with dynamic time if needed */}
          </div>
        </div>
      </div>
      {/* 🏛️ Grid of Tiny Courtroom Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4 pb-10">
          {loading ? (
            Array.from({ length: 20 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-50 rounded shadow px-3 py-2 flex justify-between items-center"
              >
                <span className="h-3 bg-gray-200 rounded"></span>
                <span className="h-3 bg-gray-200 rounded"></span>
              </div>
            ))
          ) : courtRooms.length > 1 ? (
            courtRooms.map((room, index) => {
              const trimmedRoomNo = room?.room_no?.trim();
              const isCached = cachedRoomMeta?.rooms?.includes(trimmedRoomNo);

              return (
                <div
                  key={`${trimmedRoomNo}-${index}`}
                  className={`rounded shadow px-3 py-2 flex justify-between items-center text-sm font-medium ${
                    isCached
                      ? "bg-gradient-to-r from-orange-500 to-orange-800 text-rose-100"
                      : "bg-sky-950 text-sky-100"
                  }`}
                >
                  <span>{trimmedRoomNo || "—"}</span>
                  <span
                    className={`${
                      isCached
                        ? "text-rose-50 drop-shadow-md"
                        : "text-orange-400"
                    }`}
                  >
                    {room?.cause_list_sr_no || "--"}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 bg-blue-50 rounded shadow px-3 py-2 flex justify-between items-center text-rose-500 text-sm font-medium">
              <span>Court rooms are not available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
