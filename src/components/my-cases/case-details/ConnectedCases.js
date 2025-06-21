"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Connectedcases() {
  const { connectedCases } = useCaseDetailsStore();

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        CONNECTED CASES
      </h2>

      {connectedCases && connectedCases.length > 0 ? (
        <div className="space-y-2 text-sm text-gray-900">
          {connectedCases.map((item, index) => (
            <div key={index}>
              This case is connected to : {item.casenumber || "—"}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No connected cases available.</p>
      )}
    </section>
  );
}
