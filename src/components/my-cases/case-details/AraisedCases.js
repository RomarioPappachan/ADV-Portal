"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Araisedcases() {
  const { arisedCases } = useCaseDetailsStore();

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ARAISED CASES
      </h2>

      {arisedCases && arisedCases.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">Case No</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Disposed by
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {arisedCases.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.casenumber || "—"}</td>
                <td className="px-4 py-2">{item.disposedby || "—"}</td>
                <td className="px-4 py-2">{item.status || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No arised cases available.</p>
      )}
    </section>
  );
}
