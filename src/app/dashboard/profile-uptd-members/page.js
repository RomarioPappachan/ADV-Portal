"use client";
import UpdatedMembersTable from "@/components/profile-uptd-members/UpdatedMembersTable";
import UpdatedProfileTable from "@/components/profile-uptd-members/UpdatedProfileTable";
import React, { useEffect, useState } from "react";

const ProfileUpdatedMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg relative">
      <h1 className="text-gray-800 text-xl ps-4">Updated Members</h1>

      <div className="mt-6 relative overflow-y-auto">
        <UpdatedMembersTable />

        {/* <UpdatedProfileTable /> */}
      </div>
    </div>
  );
};

export default ProfileUpdatedMembers;
