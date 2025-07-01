"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CaseDocuments() {
  const { documents } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        DOCUMENTS
      </h2>

      {documents && documents.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full table-auto bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  #
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Document No
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Date
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  File Type
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Description
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Party Name
                </th>
                <th className="py-4 px-4 border-b border-gray-300 whitespace-nowrap">
                  Advocate Name
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.doc_no || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.paperdate || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.docu_name || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.description?.trim() || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.party_name || "—"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-900">
                    {doc.filedBy || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No documents available.</p>
      )}
    </section>
  );
}
