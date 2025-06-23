"use client";

import React, { useEffect, useState } from "react";
import { useDisplayBoardStore } from "@/store/displayBoardStore";

import { LuClock3 } from "react-icons/lu";

export default function LiveBoard() {
  const { courtRooms, getDisplayBoard, loading } = useDisplayBoardStore();
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="relative p-4 min-h-screen">
      {/* 🟢 Live Clock - top right */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-full shadow text-sm font-medium text-gray-700">
          {/* Live label */}
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <span>Live</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-gray-300" />

          {/* Clock */}
          <div className="flex items-center gap-1 text-gray-700">
            <LuClock3 className="text-base" />
            <span>
              {currentTime.toLocaleTimeString("en-US", { hour12: true })}
            </span>
            {/* Replace with dynamic time if needed */}
          </div>
        </div>
      </div>

      {/* 🏛️ Grid of Tiny Courtroom Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-16">
        {courtRooms.length > 1 ? (
          courtRooms.map((room) => (
            <div
              key={room?.room_no}
              className="bg-blue-50 rounded shadow px-3 py-2 flex justify-between items-center text-blue-800 text-sm font-medium"
            >
              <span>{room?.room_no}</span>
              <span>
                {room?.cause_list_sr_no ? room?.cause_list_sr_no : "--"}
              </span>
            </div>
          ))
        ) : (
          <div className="bg-blue-50 rounded shadow px-3 py-2 flex justify-between items-center text-blue-800 text-sm font-medium">
            <span>No rooms</span>
          </div>
        )}
        {/* Tiny Card */}
      </div>
    </div>
  );
}
