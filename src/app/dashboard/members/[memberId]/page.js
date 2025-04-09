"use client";

import { use } from "react";

function MemberProfile({ params }) {
  const { memberId } = use(params);

  console.log(memberId);

  return <div className="text-black">MemberProfile for ID: {memberId}</div>;
}

export default MemberProfile;
