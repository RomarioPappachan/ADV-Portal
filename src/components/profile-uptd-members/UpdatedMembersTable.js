"use client";
import React, { useEffect, useState } from "react";
import { useUpdatedMemberStore } from "@/store/updatedMemberStore";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/store/memberStore";

import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function UpdatedMembersTable() {
  const { resetSelectedMember } = useMemberStore();
  const { updatedMembers, totalPages, loading, getUpdatedMembers } =
    useUpdatedMemberStore();

  const router = useRouter();

  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50); // Rows per page
  const [date, setDate] = useState();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    // Format today's date as "YYYY-MM-DD"
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // "2025-06-19"
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    if (date) getUpdatedMembers(date, page, limit, completed);
  }, [date, page, limit, completed]);

  console.log(updatedMembers);

  const handleRowsChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  // Handle AntD DatePicker change
  const handleDateChange = (dateObj) => {
    if (!dateObj) return;
    const selectedDate = dateObj.format("YYYY-MM-DD"); // format using dayjs
    if (selectedDate !== date) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            disabled={completed === 0}
            className={`text-sm px-4 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed ${
              completed === 0
                ? "bg-[#3f51b5] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setCompleted(Number(0))}
          >
            Updated Members
          </button>
          <button
            type="button"
            disabled={completed === 1}
            className={`text-sm px-4 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed ${
              completed === 1
                ? "bg-[#3f51b5] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setCompleted(Number(1))}
          >
            Completed
          </button>
        </div>
        {/* <h2 className="text-lg font-semibold">Updated Members List</h2> */}
        {/* <input
          type="search"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-1 h-[42px] text-sm w-64 outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        /> */}
        <DatePicker
          value={date ? dayjs(date, "YYYY-MM-DD") : null}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="w-64 h-10"
          allowClear={false}
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full relative">
          <thead className="min-w-full bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="text-left p-4">Member </th>
              <th className="text-center ">KHCAA Membership No. </th>
              <th className="text-center ">
                Bar Council Enrollment No. <span className="ml-1"></span>
              </th>
              <th className="text-center cursor-pointer">Type </th>
              <th
                className="text-center cursor-pointer"
                onClick={() => handleSort("active_status")}
              >
                Status{" "}
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }, (_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="p-4" colSpan={6}>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : updatedMembers.length < 1 ? (
              <tr>
                <td className="p-4 font-medium text-sm text-red-600">
                  No members data to display
                </td>
              </tr>
            ) : (
              updatedMembers.map((member) => (
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
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full  ${
                        member?.membership === 1
                          ? "bg-blue-100 text-blue-500"
                          : member?.membership === 0
                          ? "bg-purple-100 text-purple-500"
                          : "text-gray-900"
                      }`}
                    >
                      {member?.membership === 1
                        ? "Ordinary"
                        : member?.membership === 0
                        ? "Lifelong"
                        : "N/A"}
                    </span>
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
            value={limit}
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
          Page {page} of {totalPages}
          <button
            className="ml-4 px-2 py-1 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer shadow-xs"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="ml-2 px-2 py-1 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer shadow-xs"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
