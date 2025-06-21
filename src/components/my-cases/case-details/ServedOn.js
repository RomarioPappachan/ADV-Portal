"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function ServedOn() {
  const { servedon } = useCaseDetailsStore();

  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">SERVED ON</h2>

      {servedon && servedon.length > 0 ? (
        <div className="space-y-2 text-sm text-gray-900">
          {servedon.map((item, index) => (
            <div key={index}>{item.adv_name}</div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No advocates served yet.</p>
      )}
    </section>
  );
}
