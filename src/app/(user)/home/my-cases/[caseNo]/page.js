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
import Proceedings from "@/components/my-cases/case-details/Proceedings";
import { LuChevronLeft, LuPlus } from "react-icons/lu";

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
      <div className="py-6 sm:pb-5 pe-4 bg-sky-950 rounded-lg flex justify-between items-center">
        <button
          onClick={handleGoBack}
          className="max-w-max px-2 lg:px-4 flex justify-start items-center gap-1 sm:gap-2 text-sm sm:text-base text-sky-50 hover:text-sky-200 cursor-pointer"
        >
          <LuChevronLeft className="text-lg sm:text-xl" />
          <span>Back</span>
        </button>
        <span className="text-sm sm:text-base text-sky-50 font-bold">
          {`${caseType ? caseType : "--"} ${regNo ? regNo : "--"}/${
            filingYear ? filingYear : "--"
          }`}
        </span>

        <button
          type="button"
          title="Case Proceedings"
          onClick={() => setIsProceedingOpen(true)}
          className="flex items-center gap-2 text-sm sm:text-base text-sky-50 hover:text-sky-200 font-medium cursor-pointer"
        >
          <LuPlus size={18} />
          <span className="hidden sm:inline">Proceedings</span>
        </button>
      </div>
      <div className="h-full mt-4 pb-20 overflow-y-auto">
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
