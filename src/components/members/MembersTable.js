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
    <div className="p-4 bg-white rounded-xl shadow text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Members List</h2>

        <input
          type="search"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-1 h-[42px] text-sm w-64 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full relative">
          <thead className="min-w-full bg-gray-100 text-gray-700 text-sm uppercase">
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
            {paginatedData.length < 1 ? (
              <tr>
                <td className="p-4 font-medium text-sm text-red-600">
                  No members data to display
                </td>
              </tr>
            ) : (
              paginatedData.map((member) => (
                <tr
                  key={member.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-shadow"
                >
                  <td className="p-4 flex items-center gap-4">
                    {member?.profile_image?.startsWith("data:image/") ? (
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
                      <span className="text-xs text-gray-500">
                        {member.mobile}
                      </span>
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
                        View / Edit
                      </button>
                      {/* <button className="text-xs text-gray-600 hover:text-cyan-500 font-semibold cursor-pointer hover:underline">
                        Edit
                      </button> */}
                      <button className="text-xs text-gray-600 hover:text-rose-500 font-semibold cursor-pointer hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Rows per page:
          <select
            className="ml-2 border border-gray-300 outline-none rounded px-2 py-1"
            value={rowsPerPage}
            onChange={handleRowsChange}
          >
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm">
          Page {currentPage} of {totalPages}
          <button
            className="ml-4 px-2 py-1 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer shadow-xs"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="ml-2 px-2 py-1 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer shadow-xs"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* <div className="flex items-center gap-2">
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
        </select>
      </div>

      <div className="flex items-center gap-3 mt-4">
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
      </div> */}
    </div>
  );
}

export default MembersTable;
