"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Connectedcases() {
  const { connectedCases } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        CONNECTED CASES
      </h2>

      {connectedCases && connectedCases.length > 0 ? (
        <div className="space-y-2 text-sm text-gray-900">
          {connectedCases.map((item, index) => (
            <div key={index} className="font-semibold">
              This case is connected to: {item.casenumber || "—"}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No connected cases available.</p>
      )}
    </section>
  );
}
