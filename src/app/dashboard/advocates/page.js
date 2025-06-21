"use client";
import { useEffect, useState } from "react";
import { useMemberStore } from "@/store/memberStore";
import MembersList from "@/components/members/MembersList";

export default function MembersPage() {
  return (
    <div className="mx-auto">
      <MembersList />
    </div>
  );
}
