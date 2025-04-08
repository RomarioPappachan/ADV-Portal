"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";

import { FiUsers } from "react-icons/fi";
import { PiStickerFill } from "react-icons/pi";
import { FaIdCard } from "react-icons/fa6";
import { BsJournalMedical } from "react-icons/bs";

function Stats() {
  const {
    totalMembers,
    totalStickerPayment,
    totalIdCardPayment,
    totalMedicalPayment,
    getTotalMembers,
    getTotalStickerPayments,
    getTotalIdCardPayments,
    getTotalMedicalPayments,
  } = useDashboardStore();

  useEffect(
    function () {
      if (!totalMembers) {
        getTotalMembers(); // Fetch total no of members
      }
    },
    [totalMembers]
  );

  useEffect(
    function () {
      if (!totalStickerPayment) getTotalStickerPayments();
    },
    [totalStickerPayment]
  );

  useEffect(
    function () {
      if (!totalIdCardPayment) getTotalIdCardPayments();
    },
    [totalIdCardPayment]
  );

  useEffect(
    function () {
      if (!totalMedicalPayment) getTotalMedicalPayments();
    },
    [totalMedicalPayment]
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="h-32 rounded-lg bg-teal-500 text-white flex">
        <div className="w-1/3 flex justify-center items-center">
          <FiUsers className="text-5xl" />
        </div>
        <div className="w-2/3 flex flex-col justify-center ">
          <h1 className="text-base font-normal">Members</h1>
          <p className="text-3xl font-semibold">
            {totalMembers ? totalMembers : "-"}
          </p>
        </div>
      </div>
      <div className=" h-32 rounded-lg bg-blue-500 text-white flex">
        <div className="w-1/3 flex justify-center items-center">
          <PiStickerFill className="text-6xl" />
        </div>
        <div className="w-2/3 flex flex-col justify-center ">
          <h1 className="text-base font-normal">Parking Sticker</h1>
          <p className="text-3xl font-semibold">
            {totalStickerPayment ? totalStickerPayment : "-"}
          </p>
        </div>
      </div>
      <div className=" h-32 rounded-lg bg-yellow-500 text-white flex">
        <div className="w-1/3 flex justify-center items-center">
          <FaIdCard className="text-5xl" />
        </div>
        <div className="w-2/3 flex flex-col justify-center ">
          <h1 className="text-base font-normal">Identity Card</h1>
          <p className="text-3xl font-semibold">
            {totalIdCardPayment ? totalIdCardPayment : "-"}
          </p>
        </div>
      </div>
      <div className=" h-32 rounded-lg bg-rose-500 text-white flex">
        <div className="w-1/3 flex justify-center items-center">
          <BsJournalMedical className="text-5xl" />
        </div>
        <div className="w-2/3 flex flex-col justify-center ">
          <h1 className="text-base font-normal">Medical Aid & Scheme</h1>
          <p className="text-3xl font-semibold">
            {totalMedicalPayment ? totalMedicalPayment : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
