"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CaseStatus() {
  const { caseDetails, caseStatus, lastListed } = useCaseDetailsStore();

  const mainStatusFields = [
    {
      label: "First Hearing Date",
      value: caseDetails.firstHearingDate || "—",
    },
    { label: "Decision Date", value: caseDetails.disposal_date || "—" },
    { label: "Case Status", value: caseStatus || "—" },
    { label: "Nature of Disposal", value: caseDetails.disposalNature || "—" },
    { label: "Coram", value: caseDetails.coram || "—" },
    { label: "Bench", value: caseDetails.bench || "—" },
  ];

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        CASE STATUS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-6">
        {mainStatusFields.map(({ label, value }, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span
              className={`text-sm font-semibold break-words ${
                label === "Case Status"
                  ? value === "Pending"
                    ? "text-red-600"
                    : value === "Disposed"
                    ? "text-green-600"
                    : "text-gray-900"
                  : "text-gray-900"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {lastListed.length > 0 && (
        <div className="mt-4">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Last Listed Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {lastListed.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Date
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.date || "—"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Bench
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.bench || "—"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    List
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.list?.trim() || "—"}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Item
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.item || "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
