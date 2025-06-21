"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function CaseDetailsSection() {
  const { caseNo } = useParams();
  const { getCaseStatus, caseDetails } = useCaseDetailsStore();

  const { caseType, filingYear, regNo } = caseDetails;

  useEffect(() => {
    if (caseNo) {
      getCaseStatus(caseNo);
    }
  }, [caseNo]);

  return (
    <>
      <div className="pb-5 pe-4 flex justify-between items-center">
        <Link
          href="/home/my-cases/cause-list"
          className="max-w-max px-2 lg:px-4 flex justify-start items-center gap-2 text-blue-500"
        >
          <LuChevronLeft className="text-xl" />
          <span>Back</span>
        </Link>
        <span className="text-base text-blue-500 font-bold">
          {`${caseType} ${regNo}/${filingYear}`}
        </span>
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
    </>
  );
}
