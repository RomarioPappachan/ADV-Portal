"use client";
import React, { useEffect, useState } from "react";
import AddNewMember from "@/components/members/AddNewMember";
import MembersTable from "@/components/members/MembersTable";
import MembersList from "@/components/members/MembersList";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg relative">
      {/* <div className="sticky top-4 left-4 rounded-lg"> */}
      <h1 className="text-gray-800 text-xl ps-4">Members</h1>
      <div className="flex justify-end">
        {/* Add Member Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-32 h-10 bg-[#3f51b5] text-white font-semibold rounded-lg hover:border border-[#3f51b5] hover:bg-white hover:text-[#3f51b5] ease-in-out duration-300 cursor-pointer"
        >
          Add Member
        </button>
      </div>
      {/* </div> */}

      <div className="mt-6 relative overflow-y-auto">
        {/* <MembersTable /> */}

        <MembersList />
      </div>

      {/* Add Member Modal */}
      {/* <AddMember isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}

      {isModalOpen && (
        <AddNewMember isOpen={isModalOpen} onClose={setIsModalOpen} />
      )}
    </div>
  );
};

export default Page;
