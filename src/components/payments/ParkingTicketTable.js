"use client";

import React, { useState, useMemo } from "react";
import { useStatisticsStore } from "@/store/statisticsStore";

export default function ParkingTicketTable({ tableHeading = "" }) {
  const { allPayments } = useStatisticsStore();
  const payments = allPayments ?? [];

  /* ------------------------------------------------------------------ */
  /* ――― TABLE STATE ――― */
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");
  /* ------------------------------------------------------------------ */

  /* ---------- Helpers ---------- */
  /** Format dd/mm/yyyy with *always‑two*‑digit day+month (en‑GB). */
  const formattedDate = (d) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);

  /** Return start, expiry, days left. */
  const expiryInfo = (createdAt) => {
    const created = new Date(createdAt);
    const expiry = new Date(created);
    expiry.setFullYear(created.getFullYear() + 1);
    const today = Date.now();
    const daysRemaining = Math.max(0, Math.ceil((expiry - today) / 86_400_000));
    return {
      startDate: formattedDate(created),
      expiryDate: formattedDate(expiry),
      daysRemaining,
    };
  };

  /* ---------- Filter ---------- */
  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const { startDate, expiryDate } = expiryInfo(p.created_at);
      return (
        p.payment_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startDate.includes(searchQuery) ||
        expiryDate.includes(searchQuery) ||
        p.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.amount?.toString().includes(searchQuery) ||
        p.currency?.toLowerCase().includes(searchQuery)
      );
    });
  }, [payments, searchQuery]);

  /* ---------- Sort (fixes string‑vs‑number bug) ---------- */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      /* ---------- 1. Handle dates ---------- */
      if (sortField === "created_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      /* ---------- 2. Try to coerce numerics ---------- */
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const bothNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum);

      if (bothNumeric) {
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      /* ---------- 3. Fallback to case‑insensitive string compare ---------- */
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal), undefined, {
            sensitivity: "accent",
          })
        : String(bVal).localeCompare(String(aVal), undefined, {
            sensitivity: "accent",
          });
    });
  }, [filtered, sortField, sortOrder]);

  /* ---------- Pagination ---------- */
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / rowsPerPage));

  /* ---------- Click to sort ---------- */
  const toggleSort = (field) => {
    setCurrentPage(1); // reset page on new sort
    setSortField(field);
    setSortOrder((o) =>
      field === sortField ? (o === "asc" ? "desc" : "asc") : "asc"
    );
  };

  /* ---------- Colour map for status ---------- */
  const statusClasses = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  /* ------------------------------------------------------------------ */
  return (
    <div className="p-4 text-gray-800">
      {/* --- header --- */}
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

      {/* --- table --- */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-left select-none">
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
              ].map(({ label, field }) => (
                <th
                  key={label}
                  onClick={() => toggleSort(field)}
                  className="py-4 px-4 cursor-pointer"
                >
                  {label}
                  {/* show arrow always */}
                  <span className="ml-1">
                    {sortField === field
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => {
              const { startDate, expiryDate, daysRemaining } = expiryInfo(
                p.created_at
              );
              return (
                <tr
                  key={p.id}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 capitalize">{p.customer_name}</td>
                  <td className="py-4 px-4">{p.customer_mobile}</td>
                  <td className="py-4 px-4">{p.customer_email}</td>
                  <td className="py-4 px-4 capitalize">{p.payment_type}</td>
                  <td className="py-4 px-4">{startDate}</td>
                  <td className="py-4 px-4">{expiryDate}</td>
                  <td className="py-4 px-4">{daysRemaining} days</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusClasses[p.status]
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    ₹{Number(p.amount).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 uppercase">{p.currency}</td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No subscription data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- pagination --- */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Rows per page:
          <select
            className="ml-2 border border-gray-300 outline-none rounded px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(+e.target.value);
              setCurrentPage(1);
            }}
          >
            {[10, 20, 50].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="text-sm">
          Page {currentPage} of {totalPages}
          <button
            className="ml-4 px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="ml-2 px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
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
