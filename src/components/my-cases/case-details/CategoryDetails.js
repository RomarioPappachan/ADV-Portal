"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function CategoryDetails() {
  const { category } = useCaseDetailsStore();
  const rows = [
    { label: "Category", value: category?.category },
    { label: "Sub Category", value: category?.sub_category },
    { label: "Sub Sub Category", value: category?.sub_sub_category },
  ].filter((item) => item.value); // Only show if value exists

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        CATEGORY DETAILS
      </h2>

      {rows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
          {rows.map((item, index) => (
            <div key={index} className="flex">
              <div className="w-40 text-gray-600 font-medium">{item.label}</div>
              <div className="text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No category details available.</p>
      )}
    </section>
  );
}
