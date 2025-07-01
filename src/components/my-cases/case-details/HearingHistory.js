"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function HearingHistory() {
  const { hearinghistory } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        HISTORY OF CASE HEARING
      </h2>

      {hearinghistory && hearinghistory.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full table-auto bg-white text-sm text-left text-gray-900">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  #
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Cause List Type
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Hon: Judge Name
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Business Date
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Next Date (Tentative)
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Purpose of Hearing
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Order
                </th>
              </tr>
            </thead>
            <tbody>
              {hearinghistory.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.cause_list_type?.trim() || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.judge_name || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.business_date || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.adjourned_date || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {item.purpose || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-pre-line">
                    {item.remark?.trim() || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No hearing history available.</p>
      )}
    </section>
  );
}
