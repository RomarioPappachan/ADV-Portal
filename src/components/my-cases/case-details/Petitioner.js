"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Petitioner() {
  const { petitionerList } = useCaseDetailsStore();

  return (
    <section className="p-2 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
      <h2 className="text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 text-center sm:rounded-lg py-2 mb-4">
        PETITIONER AND ADVOCATE
      </h2>

      <div className="space-y-6">
        {petitionerList.map((petitioner, pIndex) => (
          <div key={pIndex} className="border-b border-gray-200 pb-4">
            {/* Petitioner Name with Number */}
            <h3 className="text-base font-semibold text-gray-800">
              {pIndex + 1}. {petitioner.name}
            </h3>

            {/* Advocate Section */}
            {petitioner.adv?.length > 0 ? (
              <div className="mt-2 ml-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Petitioner Advocate
                </h4>
                <ol className="list-decimal pl-5 space-y-1">
                  {petitioner.adv.map((adv, aIndex) => (
                    <li
                      key={aIndex}
                      className="text-sm font-semibold text-gray-900"
                    >
                      {adv.adv_name}
                      {adv.adv_reg ? ` (${adv.adv_reg})` : ""}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-1 ml-4">
                No advocates listed.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
