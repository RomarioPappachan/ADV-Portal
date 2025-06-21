"use client";
import React from "react";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";

export default function Respondent() {
  const { respondentList } = useCaseDetailsStore();
  return (
    <section className="p-4 md:p-6 bg-white shadow rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        RESPONDENT AND ADVOCATES
      </h2>

      <div className="space-y-6">
        {respondentList.map((respondent, rIndex) => (
          <div key={rIndex} className="border-b pb-4">
            {/* Respondent Name with Number */}
            <h3 className="text-lg font-medium text-gray-700">
              {rIndex + 1}. {respondent.name}
            </h3>

            {/* Advocate Section */}
            {respondent.adv?.length > 0 ? (
              <div className="mt-2 ml-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-1">
                  Respondent Advocate
                </h4>
                <ol className="list-decimal pl-5 text-gray-800 space-y-1">
                  {respondent.adv.map((adv, aIndex) => (
                    <li key={aIndex} className="text-base">
                      {adv.adv_name
                        ? adv.adv_name +
                          (adv.adv_reg ? ` (${adv.adv_reg})` : "")
                        : "—"}
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
