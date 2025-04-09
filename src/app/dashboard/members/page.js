// import React from "react";

// const page = () => {
//   return (
//     <div className="w-full p-4 bg-white rounded-lg ">
//       <h1 className="text-blue-950 text-xl pt-4 pb-6">Members</h1>
//       <div className="flex justify-end">
//         <button className="w-32 h-10 bg-blue-800 text-white font-semibold rounded-lg hover:border border-blue-800 hover:bg-white hover:text-blue-800 ease-in-out duration-300 cursor-pointer">Add Member</button>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import React, { useEffect, useState } from "react";
import AddMember from "@/components/members/AddMember";
import AddNewMember from "@/components/members/AddNewMember";
import MembersTable from "@/components/members/MembersTable";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-lg relative">
      {/* <div className="sticky top-4 left-4 rounded-lg"> */}
      <h1 className="text-blue-950 text-xl pt-4 pb-6">Members</h1>
      <div className="flex justify-end">
        {/* Add Member Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-32 h-10 bg-blue-800 text-white font-semibold rounded-lg hover:border border-blue-800 hover:bg-white hover:text-blue-800 ease-in-out duration-300 cursor-pointer"
        >
          Add Member
        </button>
      </div>
      {/* </div> */}

      <div className="mt-6 h-[55vh] relative rounded-lg overflow-y-auto">
        <MembersTable />
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
