"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function IaDetails() {
  const { iaList } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        IA DETAILS
      </h2>

      {iaList && iaList.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  #
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  IA Number
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Date of Filing
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Date of Reg
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Classification
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Party
                </th>
              </tr>
            </thead>
            <tbody>
              {iaList.map((ia, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.ia_no || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.dt_filing || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.dt_reg || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.ia_status || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.classification || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {ia.ia_party || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No IA records available.</p>
      )}
    </section>
  );
}
