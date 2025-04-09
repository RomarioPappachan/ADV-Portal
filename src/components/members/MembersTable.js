"use client";

import { useEffect } from "react";
import { useMemberStore } from "@/store/memberStore";

import { LuNotebookPen, LuTrash2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

function MembersTable() {
  const { members, getAllMembers, loading } = useMemberStore();
  const router = useRouter();
  useEffect(
    function () {
      async function fetchMembers() {
        if (members.length < 1) await getAllMembers();
      }
      fetchMembers();
    },
    [members]
  );

  console.log(members);
  return (
    <table className="w-full rounded-lg relative">
      <thead className="sticky top-0 left-4 w-full h-14 bg-blue-400 text-white rounded-t-lg">
        <tr className="h-full">
          <th className="w-2/12 px-2 text-left">Full Name</th>
          <th className="w-1/12 px-2 text-left">Mobile</th>
          <th className="w-2/12 px-2 text-center">Membership Id</th>
          <th className="w-2/12 px-2 text-center">Enrollment Id</th>
          <th className="w-2/12 px-2 text-center">Membership type</th>
          <th className="w-1/12 px-2 text-center">Status</th>
          <th className="w-3/12 px-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="rounded-b-lg">
        {loading ? (
          <tr>
            <td className="">
              <span className="text-black font-thin text-base">
                Loading....
              </span>
            </td>
          </tr>
        ) : (
          members?.map((member, index) => (
            <tr
              className="min-h-12 p-2 bg-white text-gray-800 text-xs border-b border-gray-100"
              key={member.id}
            >
              <td className="px-2 py-4 text-left ">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/members/${member?.id}`)
                  }
                >
                  {member?.fullname}
                </button>
              </td>
              <td className="px-2 py-4 text-left">{member?.mobile}</td>
              <td className="px-2 py-4 text-center">{member?.adv_code}</td>
              <td className="px-2 py-4 text-center">{member?.enrollment_id}</td>
              <td className="px-2 py-4 text-center">
                {member?.membership === 1 && (
                  <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-blue-100 text-blue-400">
                    Ordinary
                  </span>
                )}
                {member?.membership === 0 && (
                  <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-purple-100 text-purple-400">
                    Lifetime
                  </span>
                )}
              </td>
              <td className="px-2 py-4 text-center">
                {member?.active_status === 1 && (
                  <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-green-100 text-green-400">
                    Active
                  </span>
                )}
                {member?.active_status === 0 && (
                  <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-rose-100 text-rose-400">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-2 py-4 text-left flex justify-center items-center gap-6">
                {/* <span className="flex items-center justify-center gap-1 rounded px-4 py-2 text-xs bg-cyan-400 hover:bg-cyan-500 text-white font-semibold cursor-pointer">
                  <LuNotebookPen className="text-md" /> <span>Edit</span>
                </span>
                <span className="flex items-center justify-center gap-1 rounded px-4 py-2 text-xs bg-rose-400 hover:bg-rose-500 text-white font-semibold cursor-pointer">
                  <LuTrash2 className="text-md" /> <span>Delete</span>
                </span> */}

                <button className="text-xs text-gray-600 hover:text-cyan-500 font-semibold cursor-pointer hover:underline">
                  Edit
                </button>
                <button className="text-xs text-gray-600 hover:text-rose-500 font-semibold cursor-pointer hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default MembersTable;
