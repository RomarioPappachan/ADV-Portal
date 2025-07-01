"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function ServedOn() {
  const { servedon } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-center sm:rounded-lg py-2 mb-4">
        SERVED ON
      </h2>

      {servedon && servedon.length > 0 ? (
        <div className="space-y-2 text-sm text-gray-900">
          {servedon.map((item, index) => (
            <div key={index} className="font-semibold">
              {item.adv_name}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No advocates served yet.</p>
      )}
    </section>
  );
}
