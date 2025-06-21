"use client";

import React, { useEffect } from "react";
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

export default function CaseDetailsSection() {
  const { caseNo } = useParams();
  const { getCaseStatus } = useCaseDetailsStore();

  useEffect(() => {
    if (caseNo) {
      getCaseStatus(caseNo);
    }
  }, [caseNo]);

  console.log(caseNo);

  return (
    <div className="h-full px-2 lg:px-4 overflow-y-auto">
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
  );
}
