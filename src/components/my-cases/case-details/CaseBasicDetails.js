"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CaseBasicDetails() {
  const { caseDetails, caseStatus } = useCaseDetailsStore();

  const {
    caseType,
    status,
    filingNo,
    filingYear,
    filingDate,
    regNo,
    registrationDate,
    cnr,
    efileNo,
    disposal_date,
  } = caseDetails;

  const items = [
    { label: "Case Type", value: caseType },
    { label: "Status", value: caseStatus },
    { label: "Filing Number", value: `${caseType} ${filingNo}/${filingYear}` },
    { label: "Filing Date", value: filingDate },
    {
      label: "Registration Number",
      value: `${caseType} ${regNo}/${filingYear}`,
    },
    { label: "Registration Date", value: registrationDate },
    { label: "CNR Number", value: cnr },
    { label: "E-File No", value: efileNo },
    { label: "Disposed Date", value: disposal_date || "N/A" },
  ];

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-400 text-center sm:rounded-lg py-2 mb-4">
        CASE DETAILS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {items?.map(({ label, value }, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span
              className={`text-sm font-semibold break-words ${
                label === "Status"
                  ? value === "Pending"
                    ? "text-red-600"
                    : value === "Disposed"
                    ? "text-green-600"
                    : "text-gray-900"
                  : "text-gray-900"
              }`}
            >
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
