// "use client";
// import React, { useEffect, useState } from "react";
// import { useCauseListStore } from "@/store/causeListStore.";
// import { useAuthStore } from "@/store/authStore";
// import MyCasesCard, {
//   MyCasesCardLoader,
// } from "@/components/user/my-cases/MyCasesCard";

// export default function MyCases() {
//   const { advCode, myCases, getAdvCases, loadCachedData, loading } =
//     useCauseListStore();
//   const { userInfo } = useAuthStore();

//   // const hcCode = userInfo?.hc_code ? userInfo?.hc_code : advCode;
//   const enrollmentId = userInfo?.enrollment_id;

//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     loadCachedData();
//   }, []);

//   useEffect(() => {
//     if (enrollmentId) getAdvCases(enrollmentId);
//   }, [getAdvCases, enrollmentId]);

//   // Filtered cases based on selected filter
//   const filteredCases = myCases.filter((item) => {
//     if (filter === "All") return true;
//     if (filter === "Pending")
//       return item.status === "Pending" || item.status === "P";
//     if (filter === "Disposed")
//       return item.status === "Disposed" || item.status === "D";
//     return true;
//   });

//   return (
//     <div className="h-full px-2 lg:px-4 flex flex-col">
//       <div className="h-12 sm:h-16 px-4 bg-sky-950 flex justify-between items-center rounded-lg">
//         <h1 className="text-sky-50 text-sm sm:text-base">My Cases</h1>

//         {/* Filter Buttons */}
//         <div className="max-w-max flex items-center gap-3 px-2 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium">
//           {["All", "Pending", "Disposed"].map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-4 py-1 flex items-center rounded-full cursor-pointer ${
//                 filter === status
//                   ? "text-sky-800 bg-sky-100 font-semibold"
//                   : "text-white border border-white hover:bg-gray-100 hover:text-gray-700 hover:underline"
//               }`}
//             >
//               <span>{status}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* search bar */}
//       <div className="h-12 sm:h-16 flex justify-end items-center rounded-lg">
//         <input
//           type="search"
//           className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 h-10 bg-transparent text-sm text-sky-950 border border-sky-950 rounded-md focus:outline-none focus:border-2 focus:ring-0"
//           placeholder="Search case.."
//         />
//       </div>

//       <div className="flex-1 py-4 pb-10 overflow-y-auto">
//         <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
//           {loading && myCases.length < 1 ? (
//             Array.from({ length: 12 }, (_, index) => (
//               <MyCasesCardLoader key={index} />
//             ))
//           ) : filteredCases.length > 0 ? (
//             filteredCases.map(
//               (item, index) =>
//                 !item.error && <MyCasesCard item={item} key={index} />
//             )
//           ) : (
//             <div className="p-6">
//               <span className="text-rose-500 text-base">
//                 No cases available
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import { useAuthStore } from "@/store/authStore";
import MyCasesCard, {
  MyCasesCardLoader,
} from "@/components/user/my-cases/MyCasesCard";

export default function MyCases() {
  const { advCode, myCases, getAdvCases, loadCachedData, loading } =
    useCauseListStore();
  const { userInfo } = useAuthStore();

  const enrollmentId = userInfo?.enrollment_id;

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (enrollmentId) getAdvCases(enrollmentId);
  }, [getAdvCases, enrollmentId]);

  // Valid cases only (no errors)
  const validCases = myCases.filter((item) => !item.error);

  // Counts (only from valid cases)
  const allCount = validCases.length;
  const pendingCount = validCases.filter(
    (item) => item.status === "Pending" || item.status === "P"
  ).length;
  const disposedCount = validCases.filter(
    (item) => item.status === "Disposed" || item.status === "D"
  ).length;

  // Filtered based on filter type first
  const filteredCasesByStatus = validCases.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Pending")
      return item.status === "Pending" || item.status === "P";
    if (filter === "Disposed")
      return item.status === "Disposed" || item.status === "D";
    return true;
  });

  // Final filtered list with search applied on top of filter
  const finalFilteredCases = filteredCasesByStatus.filter((item) =>
    item.ctitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      {/* Header with Filter Buttons */}
      <div className="h-12 sm:h-16 px-4 bg-sky-950 flex justify-between items-center rounded-lg">
        <h1 className="hidden sm:inline-block text-sky-50 text-sm sm:text-base">
          My Cases
        </h1>

        <div className="max-w-max flex items-center gap-3 px-2 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium">
          {[
            { label: "All", count: allCount },
            { label: "Pending", count: pendingCount },
            { label: "Disposed", count: disposedCount },
          ].map(({ label, count }) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-1 flex items-center rounded-full cursor-pointer ${
                filter === label
                  ? "text-sky-800 bg-sky-100 font-semibold"
                  : "text-white border border-white hover:bg-gray-100 hover:text-gray-700 hover:underline"
              }`}
            >
              <span>
                {label} ({count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="h-12 sm:h-16 flex justify-end items-center rounded-lg">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 h-10 bg-transparent text-sm text-sky-950 border border-sky-950 rounded-md focus:outline-none focus:border-2 focus:ring-0"
          placeholder="Search case..."
        />
      </div>

      {/* Case List */}
      <div className="flex-1 py-4 pb-10 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading && validCases.length < 1 ? (
            Array.from({ length: 12 }, (_, index) => (
              <MyCasesCardLoader key={index} />
            ))
          ) : finalFilteredCases.length > 0 ? (
            finalFilteredCases.map((item, index) => (
              <MyCasesCard item={item} key={index} />
            ))
          ) : (
            <div className="p-6">
              <span className="text-rose-500 text-base">
                No cases available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
