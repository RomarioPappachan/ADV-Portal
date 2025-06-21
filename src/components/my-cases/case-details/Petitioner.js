"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Petitioner() {
  const { petitionerList } = useCaseDetailsStore();
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        PETITIONER AND ADVOCATE
      </h2>

      <div className="space-y-6">
        {petitionerList.map((petitioner, pIndex) => (
          <div key={pIndex} className="border-b pb-4">
            {/* Petitioner Name with Number */}
            <h3 className="text-lg font-medium text-gray-700">
              {pIndex + 1}. {petitioner.name}
            </h3>

            {/* Advocate Section */}
            {petitioner.adv?.length > 0 ? (
              <div className="mt-2 ml-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-1">
                  Petitioner Advocate
                </h4>
                <ol className="list-decimal pl-5 text-gray-800 space-y-1">
                  {petitioner.adv.map((adv, aIndex) => (
                    <li key={aIndex} className="text-base">
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
