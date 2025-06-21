"use client";

import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CategoryDetails() {
  const { category } = useCaseDetailsStore();

  const rows = [
    { label: "Category", value: category?.category },
    { label: "Sub Category", value: category?.sub_category },
    { label: "Sub Sub Category", value: category?.sub_sub_category },
  ].filter((item) => item.value); // Only show non-empty values

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 text-center sm:rounded-lg py-2 mb-4">
        CATEGORY DETAILS
      </h2>

      {rows.length > 0 ? (
        <div className="space-y-4 text-sm">
          {rows.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <div className="w-full sm:w-48 text-sm font-medium text-gray-500">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No category details available.</p>
      )}
    </section>
  );
}
