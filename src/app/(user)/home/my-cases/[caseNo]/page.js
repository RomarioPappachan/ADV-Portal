"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCaseDetailsStore } from "@/store/caseDetailsStore";
import CaseBasicDetails from "@/components/my-cases/case-details/CaseBasicDetails";
import CaseStatus from "@/components/my-cases/case-details/CaseStatus";
import Petitioner from "@/components/my-cases/case-details/Petitioner";
import Respondent from "@/components/my-cases/case-details/Respondent";
import ActsAndSections from "@/components/my-cases/case-details/ActsAndSections";
import IaDetails from "@/components/my-cases/case-details/IaDetails";
import CaseDocuments from "@/components/my-cases/case-details/CaseDocuments";
import HearingHistory from "@/components/my-cases/case-details/HearingHistory";
import CategoryDetails from "@/components/my-cases/case-details/CategoryDetails";
import Objections from "@/components/my-cases/case-details/Objections";
import ServedOn from "@/components/my-cases/case-details/ServedOn";
import Appealcases from "@/components/my-cases/case-details/AppealCases";
import Connectedcases from "@/components/my-cases/case-details/ConnectedCases";
import Araisedcases from "@/components/my-cases/case-details/AraisedCases";
import { LuChevronLeft } from "react-icons/lu";
import Proceedings from "@/components/my-cases/case-details/Proceedings";

export default function CaseDetailsSection() {
  const { caseNo } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const { getCaseStatus, caseDetails } = useCaseDetailsStore();

  const { caseType, filingYear, regNo } = caseDetails;

  const [isProceedingsOpen, setIsProceedingOpen] = useState(false);

  useEffect(() => {
    if (caseNo) {
      getCaseStatus(caseNo);
    }
  }, [caseNo]);

  const handleGoBack = () => {
    if (from) {
      router.push(from);
    } else {
      router.back(); // fallback
    }
  };

  return (
    <>
      <div className="py-6 sm:pb-5 pe-4 flex justify-between items-center">
        <button
          onClick={handleGoBack}
          className="max-w-max px-2 lg:px-4 flex justify-start items-center gap-1 sm:gap-2 text-sm sm:text-base text-blue-500 cursor-pointer"
        >
          <LuChevronLeft className="text-lg sm:text-xl" />
          <span>Back</span>
        </button>
        <span className="text-sm sm:text-base text-blue-500 font-bold">
          {`${caseType ? caseType : "--"} ${regNo ? regNo : "--"}/${
            filingYear ? filingYear : "--"
          }`}
        </span>
        <button
          type="button"
          title="Case Proceedings"
          className="px-2 sm:px-4 py-2 text-xs sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
          onClick={() => setIsProceedingOpen(true)}
        >
          Proceedings
        </button>
      </div>
      <div className="h-full px-2 lg:px-4 pb-20 overflow-y-auto">
        <CaseBasicDetails />
        <Appealcases />
        <CaseStatus />
        <Connectedcases />
        <Araisedcases />
        <Petitioner />
        <Respondent />
        <ServedOn />
        <ActsAndSections />
        <IaDetails />
        <CaseDocuments />
        <HearingHistory />
        <CategoryDetails />
        <Objections />
      </div>

      {isProceedingsOpen && (
        <Proceedings
          caseNo={caseNo}
          onClose={() => setIsProceedingOpen(false)}
        />
      )}
    </>
  );
}
