// "use client";
// import React, { useEffect, useState } from "react";
// import { useCauseListStore } from "@/store/causeListStore.";
// import { useAuthStore } from "@/store/authStore";
// import CauseListCard, {
//   CauseListCardLoader,
// } from "@/components/user/my-cases/CauseListCard";

// export default function MyCases() {
//   const { advCode, myCases, getAdvCases, loadCachedData, loading } =
//     useCauseListStore();
//   const { userInfo } = useAuthStore();

//   const hcCode = userInfo?.hc_code ? userInfo?.hc_code : advCode;

//   // Load cached data on initial mount
//   useEffect(() => {
//     loadCachedData();
//   }, []);

//   useEffect(() => {
//     if (hcCode) getAdvCases(hcCode); // assuming getAdvCases takes date as argument
//   }, [getAdvCases, hcCode]);

//   return (
//     <div className="h-full px-2 lg:px-4 flex flex-col">
//       <div className="h-12 sm:h-16 px-4 bg-sky-100 flex justify-between items-center rounded-lg">
//         <h1 className="text-gray-500 text-sm sm:text-base">My Cases</h1>

//         {/* Filter Buttons  */}
//         <div className="max-w-max flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow text-[10px] sm:text-sm font-medium text-gray-700">
//           <button className="flex items-center text-gray-700">
//             <span>All</span>
//           </button>
//           <div className="w-px h-4 bg-gray-300" />
//           <button className="flex items-center text-gray-700">
//             <span>Pending</span>
//           </button>
//           <div className="w-px h-4 bg-gray-300" />
//           <button className="flex items-center text-gray-700">
//             <span>Disposed</span>
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
//         {loading && myCases.length < 1 ? (
//           Array.from({ length: 12 }, (_, index) => (
//             <CauseListCardLoader key={index} />
//           ))
//         ) : myCases.length > 0 ? (
//           myCases.map(
//             (item, index) =>
//               !item.error && <CauseListCard item={item} key={index} />
//           )
//         ) : (
//           <div className="p-6">
//             <span className="text-red-400 text-base">No cases available</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import { useAuthStore } from "@/store/authStore";
import CauseListCard, {
  CauseListCardLoader,
} from "@/components/user/my-cases/CauseListCard";

export default function MyCases() {
  const { advCode, myCases, getAdvCases, loadCachedData, loading } =
    useCauseListStore();
  const { userInfo } = useAuthStore();

  const hcCode = userInfo?.hc_code ? userInfo?.hc_code : advCode;

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (hcCode) getAdvCases(hcCode);
  }, [getAdvCases, hcCode]);

  // Filtered cases based on selected filter
  const filteredCases = myCases.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Pending")
      return item.status === "Pending" || item.status === "P";
    if (filter === "Disposed")
      return item.status === "Disposed" || item.status === "D";
    return true;
  });

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-4 bg-sky-100 flex justify-between items-center rounded-lg">
        <h1 className="text-gray-500 text-sm sm:text-base">My Cases</h1>

        {/* Filter Buttons */}
        <div className="max-w-max flex items-center gap-3 bg-white border border-gray-200 px-2 py-1 sm:py-2 rounded-lg shadow text-[10px] sm:text-sm font-medium text-gray-700">
          {["All", "Pending", "Disposed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2 py-1 flex items-center rounded-md cursor-pointer ${
                filter === status
                  ? "text-blue-600 bg-blue-100 font-semibold "
                  : "text-gray-700 hover:bg-gray-100 hover:underline"
              }`}
            >
              <span>{status}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 py-4 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
        {loading && myCases.length < 1 ? (
          Array.from({ length: 12 }, (_, index) => (
            <CauseListCardLoader key={index} />
          ))
        ) : filteredCases.length > 0 ? (
          filteredCases.map(
            (item, index) =>
              !item.error && <CauseListCard item={item} key={index} />
          )
        ) : (
          <div className="p-6">
            <span className="text-rose-500 text-base">No cases available</span>
          </div>
        )}
      </div>
    </div>
  );
}
