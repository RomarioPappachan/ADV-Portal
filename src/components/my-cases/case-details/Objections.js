"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Objections() {
  const { objections } = useCaseDetailsStore();

  // Convert object to array of values
  const objectionList = Object.values(objections || {}).filter(Boolean);

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">OBJECTIONS</h2>

      {objectionList.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">Objection</th>
            </tr>
          </thead>
          <tbody>
            {objectionList.map((text, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{text || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No objections available.</p>
      )}
    </section>
  );
}
