"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function ActsAndSections() {
  const { acts } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        ACTS AND SECTIONS
      </h2>

      {acts && acts.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full bg-white text-sm table-auto">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Under Act(s)
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Under Section(s)
                </th>
              </tr>
            </thead>
            <tbody>
              {acts.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {item.actname || "—"}
                  </td>
                  <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
                    {item.section || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No acts or sections available.</p>
      )}
    </section>
  );
}
