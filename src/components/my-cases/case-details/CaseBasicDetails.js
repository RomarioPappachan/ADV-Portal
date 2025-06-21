"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CaseBasicDetails() {
  const { caseDetails, caseStatus } = useCaseDetailsStore();

  const {
    caseType,
    status,
    filingNo,
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
    { label: "Filing Number", value: filingNo },
    { label: "Filing Date", value: filingDate },
    { label: "Registration Number", value: regNo },
    { label: "Registration Date", value: registrationDate },
    { label: "CNR Number", value: cnr },
    { label: "E-File No", value: efileNo },
    { label: "Disposed Date", value: disposal_date || "N/A" },
  ];
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">CASE DETAILS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map(({ label, value }, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-base font-semibold text-gray-900 break-words">
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
