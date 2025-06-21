"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Araisedcases() {
  const { arisedCases } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 text-center sm:rounded-lg py-2 mb-4">
        ARAISED CASES
      </h2>

      {arisedCases && arisedCases.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full table-auto bg-white text-sm text-left text-gray-900">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  #
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Case No
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Disposed by
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {arisedCases.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.casenumber || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.disposedby || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.status || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No arised cases available.</p>
      )}
    </section>
  );
}
