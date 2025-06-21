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
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">CASE STATUS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mainStatusFields.map(({ label, value }, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-base font-semibold text-gray-900 break-words">
              {value}
            </span>
          </div>
        ))}
      </div>

      {lastListed.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Last Listed Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lastListed.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Date</span>
                  <div className="font-medium text-gray-800">
                    {item.date || "—"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Bench</span>
                  <div className="font-medium text-gray-800">
                    {item.bench || "—"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">List</span>
                  <div className="font-medium text-gray-800">
                    {item.list?.trim() || "—"}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Item</span>
                  <div className="font-medium text-gray-800">
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
