// "use client";

// import { useEffect } from "react";
// import { useMemberStore } from "@/store/memberStore";

// import { LuNotebookPen, LuTrash2 } from "react-icons/lu";
// import { useRouter } from "next/navigation";

// function MembersTable() {
//   const { members, getAllMembers, loading } = useMemberStore();
//   const router = useRouter();
//   useEffect(
//     function () {
//       async function fetchMembers() {
//         if (members.length < 1) await getAllMembers();
//       }
//       fetchMembers();
//     },
//     [members]
//   );

//   console.log(members);
//   return (
//     <table className="w-full rounded-lg relative">
//       <thead className="sticky top-0 left-0 w-full h-14 bg-blue-400 text-white rounded-t-lg">
//         <tr className="w-full h-full">
//           <th className="w-2/12 px-2 text-left">Full Name</th>
//           <th className="w-1/12 px-2 text-left">Mobile</th>
//           <th className="w-2/12 px-2 text-center">Membership Id</th>
//           <th className="w-2/12 px-2 text-center">Enrollment Id</th>
//           <th className="w-2/12 px-2 text-center">Membership type</th>
//           <th className="w-1/12 px-2 text-center">Status</th>
//           <th className="w-3/12 px-2 text-center">Action</th>
//         </tr>
//       </thead>
//       <tbody className="w-full rounded-b-lg">
//         {loading ? (
//           <tr>
//             <td className="">
//               <span className="text-black font-thin text-base">
//                 Loading....
//               </span>
//             </td>
//           </tr>
//         ) : (
//           members?.map((member, index) => (
//             <tr
//               className="w-full min-h-12 p-2 bg-white text-gray-800 text-xs border-b border-gray-100"
//               key={member.id}
//             >
//               <td className="px-2 py-4 text-left ">
//                 <button
//                   className="cursor-pointer"
//                   onClick={() =>
//                     router.push(`/dashboard/members/${member?.id}`)
//                   }
//                 >
//                   {member?.fullname}
//                 </button>
//               </td>
//               <td className="px-2 py-4 text-left">{member?.mobile}</td>
//               <td className="px-2 py-4 text-center">{member?.adv_code}</td>
//               <td className="px-2 py-4 text-center">{member?.enrollment_id}</td>
//               <td className="px-2 py-4 text-center">
//                 {member?.membership === 1 && (
//                   <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-blue-100 text-blue-400">
//                     Ordinary
//                   </span>
//                 )}
//                 {member?.membership === 0 && (
//                   <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-purple-100 text-purple-400">
//                     Lifetime
//                   </span>
//                 )}
//               </td>
//               <td className="px-2 py-4 text-center">
//                 {member?.active_status === 1 && (
//                   <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-green-100 text-green-400">
//                     Active
//                   </span>
//                 )}
//                 {member?.active_status === 0 && (
//                   <span className="px-2 py-1 font-semibold text-xs rounded-lg bg-rose-100 text-rose-400">
//                     Inactive
//                   </span>
//                 )}
//               </td>
//               <td className="px-2 py-4 text-left flex justify-center items-center gap-6">
//                 {/* <span className="flex items-center justify-center gap-1 rounded px-4 py-2 text-xs bg-cyan-400 hover:bg-cyan-500 text-white font-semibold cursor-pointer">
//                   <LuNotebookPen className="text-md" /> <span>Edit</span>
//                 </span>
//                 <span className="flex items-center justify-center gap-1 rounded px-4 py-2 text-xs bg-rose-400 hover:bg-rose-500 text-white font-semibold cursor-pointer">
//                   <LuTrash2 className="text-md" /> <span>Delete</span>
//                 </span> */}

//                 <button className="text-xs text-gray-600 hover:text-cyan-500 font-semibold cursor-pointer hover:underline">
//                   Edit
//                 </button>
//                 <button className="text-xs text-gray-600 hover:text-rose-500 font-semibold cursor-pointer hover:underline">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );
// }

// export default MembersTable;

"use client";

import { useEffect, useState, useMemo } from "react";
import { useMemberStore } from "@/store/memberStore";
import { useRouter } from "next/navigation";

function MembersTable() {
  const { members, getAllMembers, resetSelectedMember } = useMemberStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("fullname");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const router = useRouter();

  useEffect(() => {
    if (members.length < 1) getAllMembers();
  }, [members]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      Object.values(member).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [members, searchTerm]);

  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      const valueA = a[sortField] ?? "";
      const valueB = b[sortField] ?? "";

      const valA = typeof valueA === "string" ? valueA.toLowerCase() : valueA;
      const valB = typeof valueB === "string" ? valueB.toLowerCase() : valueB;

      return sortOrder === "asc"
        ? valA > valB
          ? 1
          : valA < valB
          ? -1
          : 0
        : valA < valB
        ? 1
        : valA > valB
        ? -1
        : 0;
    });
  }, [filteredMembers, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedMembers.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedMembers.slice(start, start + rowsPerPage);
  }, [sortedMembers, currentPage, rowsPerPage]);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <input
          type="search"
          placeholder="Search across all fields..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="flex items-center gap-2">
          <label
            htmlFor="rowsPerPage"
            className="text-sm font-medium text-gray-800"
          >
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            {/* <option value={1000}>1000</option> */}
          </select>
        </div>
      </div>

      <table className="w-full rounded-lg relative">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th
              className="text-left p-4 cursor-pointer"
              onClick={() => handleSort("fullname")}
            >
              Member{" "}
              <span className="ml-1">
                {sortField === "fullname"
                  ? sortOrder === "asc"
                    ? "⯅"
                    : "⯆"
                  : "⬧"}
              </span>
            </th>
            <th
              className="text-center cursor-pointer"
              onClick={() => handleSort("adv_code")}
            >
              Membership ID{" "}
              <span className="ml-1">
                {sortField === "adv_code"
                  ? sortOrder === "asc"
                    ? "⯅"
                    : "⯆"
                  : "⬧"}
              </span>
            </th>
            <th
              className="text-center cursor-pointer"
              onClick={() => handleSort("enrollment_id")}
            >
              Enrollment ID{" "}
              <span className="ml-1">
                {sortField === "enrollment_id"
                  ? sortOrder === "asc"
                    ? "⯅"
                    : "⯆"
                  : "⬧"}
              </span>
            </th>
            <th
              className="text-center cursor-pointer"
              onClick={() => handleSort("membership")}
            >
              Type{" "}
              <span className="ml-1">
                {sortField === "membership"
                  ? sortOrder === "asc"
                    ? "⯅"
                    : "⯆"
                  : "⬧"}
              </span>
            </th>
            <th
              className="text-center cursor-pointer"
              onClick={() => handleSort("active_status")}
            >
              Status{" "}
              <span className="ml-1">
                {sortField === "active_status"
                  ? sortOrder === "asc"
                    ? "⯅"
                    : "⯆"
                  : "⬧"}
              </span>
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((member) => (
            <tr
              key={member.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-shadow"
            >
              <td className="p-4 flex items-center gap-4">
                {member?.profile_image.startsWith("data:image/") ? (
                  <img
                    className="w-10 h-10 rounded-full shadow-md border-gray-300"
                    src={member.profile_image}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {member.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-800">
                    {member.fullname}
                  </span>
                  <span className="text-xs text-gray-500">{member.mobile}</span>
                </div>
              </td>
              <td className="text-center text-xs text-gray-700">
                {member.adv_code}
              </td>
              <td className="text-center text-xs text-gray-700">
                {member.enrollment_id}
              </td>
              <td className="text-center">
                {member?.membership === 1 ? (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
                    Ordinary
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-500">
                    Lifetime
                  </span>
                )}
              </td>
              <td className="text-center">
                {member?.active_status === 1 ? (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-500">
                    Inactive
                  </span>
                )}
              </td>
              <td className="text-center">
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="text-xs text-gray-600 hover:text-cyan-500 font-semibold cursor-pointer hover:underline"
                    onClick={() => {
                      resetSelectedMember();
                      router.push(`/dashboard/members/${member.id}`);
                    }}
                  >
                    View
                  </button>
                  <button className="text-xs text-gray-600 hover:text-cyan-500 font-semibold cursor-pointer hover:underline">
                    Edit
                  </button>
                  <button className="text-xs text-gray-600 hover:text-rose-500 font-semibold cursor-pointer hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-sm text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MembersTable;
