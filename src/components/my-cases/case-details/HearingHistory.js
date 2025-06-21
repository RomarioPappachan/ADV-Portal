"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function HearingHistory() {
  const { hearinghistory } = useCaseDetailsStore();

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        HISTORY OF CASE HEARING
      </h2>

      {hearinghistory && hearinghistory.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Cause List Type
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Hon: Judge Name
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                BusinessDate
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                NextDate (Tentative Date)
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Purpose of Hearing
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Order.</th>
            </tr>
          </thead>
          <tbody>
            {hearinghistory.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {item.cause_list_type?.trim() || "—"}
                </td>
                <td className="px-4 py-2">{item.judge_name || "—"}</td>
                <td className="px-4 py-2">{item.business_date || "—"}</td>
                <td className="px-4 py-2">{item.adjourned_date || "—"}</td>
                <td className="px-4 py-2">{item.purpose || "—"}</td>
                <td className="px-4 py-2 whitespace-pre-line">
                  {item.remark?.trim() || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No hearing history available.</p>
      )}
    </section>
  );
}
