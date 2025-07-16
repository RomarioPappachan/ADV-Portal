"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useMemberStore } from "@/store/memberStore";
import MemberDetailsSection from "@/components/members/MemberDetailsSection";
import MemberClerkListSection from "@/components/members/MemberClerkListSection";
import MemberVehicleListSection from "@/components/members/MemberVehicleListSection";
import MemberPaymentListSection from "@/components/members/MemberPaymentListSection";
import { LuUsers } from "react-icons/lu";
import { useRouter } from "next/navigation";

function MemberProfile({ params }) {
  const { memberId } = use(params);

  const { getMemberById } = useMemberStore();

  const router = useRouter();

  useEffect(() => {
    if (memberId) {
      getMemberById(memberId);
    }
  }, [memberId]);

  function handleGoBack() {
    router.back();
  }

  return (
    <div className="w-full bg-white rounded-lg relative">
      <div className="bg-transparent">
        <button
          // href="/dashboard/members"
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 hover:text-blue-800 transition duration-200 shadow-sm"
          onClick={handleGoBack}
        >
          <LuUsers className="text-xl" />
          <span className="font-medium">Back to Members List</span>
        </button>
      </div>

      {/* <div className="sticky top-4 left-4 rounded-lg"> */}
      <h1 className="text-gray-800 text-xl my-4">Members Details</h1>
      <div className="space-y-6">
        <MemberDetailsSection />

        <MemberClerkListSection />

        <MemberVehicleListSection />

        <MemberPaymentListSection />
      </div>
      {/* </div> */}

      <div className="mt-6 relative rounded-lg overflow-y-auto"></div>
    </div>
  );
}

export default MemberProfile;
