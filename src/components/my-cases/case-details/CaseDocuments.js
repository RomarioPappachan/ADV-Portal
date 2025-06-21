"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CaseDocuments() {
  const { documents } = useCaseDetailsStore();
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">DOCUMENTS</h2>

      {documents && documents.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Document No
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Date</th>
              <th className="px-4 py-2 border-b border-gray-300">File Type</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Description
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Party Name</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Advocate Name
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{doc.doc_no || "—"}</td>
                <td className="px-4 py-2">{doc.paperdate || "—"}</td>
                <td className="px-4 py-2">{doc.docu_name || "—"}</td>
                <td className="px-4 py-2">{doc.description?.trim() || "—"}</td>
                <td className="px-4 py-2">{doc.party_name || "—"}</td>
                <td className="px-4 py-2">{doc.filedBy || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No documents available.</p>
      )}
    </section>
  );
}
