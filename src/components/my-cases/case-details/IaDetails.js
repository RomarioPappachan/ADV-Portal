"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function IaDetails() {
  const { iaList } = useCaseDetailsStore();
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">IA DETAILS</h2>

      {iaList && iaList.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">IA Number</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Date of Filing
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Date of Reg
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Status</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Classification
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Party</th>
            </tr>
          </thead>
          <tbody>
            {iaList.map((ia, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{ia.ia_no || "—"}</td>
                <td className="px-4 py-2">{ia.dt_filing || "—"}</td>
                <td className="px-4 py-2">{ia.dt_reg || "—"}</td>
                <td className="px-4 py-2">{ia.ia_status || "—"}</td>
                <td className="px-4 py-2">{ia.classification || "—"}</td>
                <td className="px-4 py-2">{ia.ia_party || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No IA records available.</p>
      )}
    </section>
  );
}
