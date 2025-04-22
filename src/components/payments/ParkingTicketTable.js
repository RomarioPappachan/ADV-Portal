"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useStatisticsStore } from "@/store/statisticsStore";

export default function ParkingTicketTable({ tableHeading = "" }) {
  const { allPayments, loading, error, getAllPayments } = useStatisticsStore();
  // console.log(allPayments);
  const payments = allPayments || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");

  const calculateExpiryInfo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const expiryDate = new Date(createdDate);
    expiryDate.setFullYear(createdDate.getFullYear() + 1);

    const today = new Date();
    const diffTime = expiryDate - today;
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      startDate: createdDate.toLocaleDateString(),
      expiryDate: expiryDate.toLocaleDateString(),
      daysRemaining: daysRemaining >= 0 ? daysRemaining : 0,
    };
  };

  const filteredData = useMemo(() => {
    return payments.filter((p) => {
      const { startDate, expiryDate } = calculateExpiryInfo(p.created_at);
      return (
        p.payment_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startDate.includes(searchQuery) ||
        expiryDate.includes(searchQuery) ||
        p.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.amount?.toString().includes(searchQuery) ||
        p.currency?.toLowerCase().includes(searchQuery)
      );
    });
  }, [searchQuery, payments]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
    });
    return data;
  }, [filteredData, sortField, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{tableHeading}</h2>
        <input
          type="search"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-1 h-[42px] text-sm w-64 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white text-sm ">
          <thead className="bg-gray-100 text-left ">
            <tr>
              {[
                { label: "Name", field: "customer_name" },
                { label: "Mobile", field: "customer_mobile" },
                { label: "Email", field: "customer_email" },
                { label: "Type", field: "payment_type" },
                { label: "Start Date", field: "created_at" },
                { label: "Expiry Date", field: "created_at" },
                { label: "Days Left", field: "created_at" },
                { label: "Status", field: "status" },
                { label: "Amount", field: "amount" },
                { label: "Currency", field: "currency" },
              ].map((col) => (
                <th
                  key={col.label}
                  onClick={() => handleSort(col.field)}
                  className="py-4 px-4 cursor-pointer select-none"
                >
                  {col.label}
                  {sortField === col.field
                    ? sortOrder === "asc"
                      ? " ▲"
                      : " ▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p) => {
              const { startDate, expiryDate, daysRemaining } =
                calculateExpiryInfo(p.created_at);
              return (
                <tr
                  key={p.id}
                  className="border-t border-gray-300 hover:bg-gray-50 "
                >
                  <td className="py-4 px-4 capitalize">{p.customer_name}</td>
                  <td className="py-4 px-4">{p.customer_mobile}</td>
                  <td className="py-4 px-4">{p.customer_email}</td>
                  <td className="py-4 px-4 capitalize">{p.payment_type}</td>
                  <td className="py-4 px-4">{startDate}</td>
                  <td className="py-4 px-4">{expiryDate}</td>
                  <td className="py-4 px-4">{daysRemaining} days</td>
                  {/* <td className={`py-4 px-4 capitalize ${p.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                      {p.status}
                    </td> */}

                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize 
        ${
          p.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="py-4 px-4">₹{p.amount}</td>
                  <td className="py-4 px-4">{p.currency}</td>
                </tr>
              );
            })}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No subscription data available.
                </td>
              </tr>
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
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 50].map((num) => (
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
    </div>
  );
}
