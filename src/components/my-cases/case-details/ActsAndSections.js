"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function ActsAndSections() {
  const { acts } = useCaseDetailsStore();
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ACTS AND SECTIONS
      </h2>

      {acts && acts.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">
                Under Act(s)
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Under Section(s)
              </th>
            </tr>
          </thead>
          <tbody>
            {acts.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-gray-900">
                  {item.actname || "—"}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {item.section || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No acts or sections available.</p>
      )}
    </section>
  );
}
