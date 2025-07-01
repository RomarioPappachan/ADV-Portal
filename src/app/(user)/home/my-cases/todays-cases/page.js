// "use client";
// import React, { useEffect, useState, useMemo } from "react";
// import { useCauseListStore } from "@/store/causeListStore.";
// import { useAuthStore } from "@/store/authStore";
// import { useDisplayBoardStore } from "@/store/displayBoardStore";
// import CauseListCard, {
//   CauseListCardLoader,
// } from "@/components/user/my-cases/CauseListCard";

// import { DatePicker } from "antd";
// import dayjs from "dayjs";
// import { LuDownload, LuVideo } from "react-icons/lu";

// export default function TodaysCases() {
//   const { causeList, getCauseList, loading } = useCauseListStore();
//   const { userInfo } = useAuthStore();
//   const { courtRooms, getDisplayBoard } = useDisplayBoardStore();

//   const [date, setDate] = useState("");
//   const [enrolmentIds, setEnrolmentIds] = useState([]);
//   const [room, setRoom] = useState("All");

//   const enrolId = userInfo?.enrollment_id;
//   const associatesArray = userInfo?.associates?.split(",");

//   useEffect(() => {
//     setEnrolmentIds([enrolId, ...(associatesArray || [])]);
//   }, []);

//   useEffect(() => {
//     const today = dayjs().format("YYYY-MM-DD");
//     setDate(today);
//   }, []);

//   useEffect(() => {
//     if (date && enrolmentIds.length > 0) {
//       getCauseList(date, enrolmentIds);
//     }
//   }, [date, enrolmentIds, getCauseList]);

//   useEffect(() => {
//     const today = dayjs().format("YYYY-MM-DD");
//     const isToday = date === today;

//     if (!isToday) return;

//     getDisplayBoard(); // Initial call
//     const interval = setInterval(getDisplayBoard, 30000);

//     return () => clearInterval(interval);
//   }, [date, getDisplayBoard]);

//   const handleDateChange = (dateObj) => {
//     if (!dateObj) return;
//     const selectedDate = dateObj.format("YYYY-MM-DD");
//     if (selectedDate !== date) {
//       setDate(selectedDate);
//       setRoom("All");
//     }
//   };

//   const uniqueRoomNos = useMemo(
//     () => ["All", ...new Set(causeList.map((item) => item.room_no.trim()))],
//     [causeList]
//   );

//   const selectedJudge = useMemo(() => {
//     if (room === "All") return null;
//     const judge =
//       causeList.find((item) => item.room_no.trim() === room)?.judge || null;
//     if (!judge) return null;
//     return judge.replace(/HONOURABLE\s*/i, "").trim();
//   }, [room, causeList]);

//   const selectedCourtRoom = useMemo(() => {
//     if (room === "All") return null;
//     return courtRooms.find((item) => item.room_no?.trim() === room);
//   }, [room, courtRooms]);

//   const handleDownloadCaseList = async (e) => {
//     e.preventDefault();
//     // api call
//   };

//   return (
//     <div className="h-full px-2 lg:px-4 flex flex-col">
//       {/* Top filters */}
//       <div className="min-h-12 sm:min-h-16 px-2 sm:px-4 py-3 bg-sky-950 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 rounded-lg">
//         <div className="max-w-max flex flex-wrap items-center gap-3 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium">
//           {uniqueRoomNos.map((roomNo) => (
//             <button
//               key={roomNo}
//               onClick={() => setRoom(roomNo)}
//               className={`px-4 py-1 flex items-center text-xs sm:text-sm rounded-full cursor-pointer ${
//                 room === roomNo
//                   ? "text-sky-800 bg-sky-100 font-semibold"
//                   : "text-white border border-white hover:bg-gray-100 hover:text-gray-700 hover:underline"
//               }`}
//             >
//               <span>{roomNo}</span>
//             </button>
//           ))}
//         </div>

//         <div className="flex justify-between items-center gap-2">
//           <DatePicker
//             value={date ? dayjs(date, "YYYY-MM-DD") : null}
//             onChange={handleDateChange}
//             format="YYYY-MM-DD"
//             className="flex-1 h-8 sm:h-10 text-sm sm:text-base"
//             allowClear={false}
//           />

//           {/* download button  */}
//           <button
//             type="button"
//             title="Download"
//             onClick={handleDownloadCaseList}
//             className="p-2 text-sky-50 rounded-full hover:text-sky-200 hover:bg-white/10 cursor-pointer"
//           >
//             <LuDownload className="text-2xl " />
//           </button>
//         </div>
//       </div>

//       {/* Room and Judge info */}
//       {room !== "All" && (
//         <div className="mt-0.5 px-2 sm:px-4 py-1.5 bg-sky-950 rounded-lg">
//           <div className="flex justify-between items-center">
//             {/* court no. & vconsol  */}
//             <div className="flex justify-start items-center gap-4">
//               <div className="px-2 py-1 bg-white/30 flex flex-col justify-center items-center">
//                 <span className="text-white text-[10px] sm:text-xs">Court</span>
//                 <span className="text-white text-[10px] sm:text-xs">
//                   {room}
//                 </span>
//               </div>
//               <a
//                 href="https://hckerala.vconsol.com/login"
//                 target="_blank"
//                 className=" text-white hover:text-sky-200"
//               >
//                 <LuVideo className=" text-3xl" />
//               </a>
//             </div>

//             {/* live case no   */}
//             <div className="flex flex-col">
//               <div className="flex items-center gap-1 font-semibold">
//                 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-sky-100 text-[10px] sm:text-xs">
//                   Live Board
//                 </span>
//               </div>
//               <div className="px-2 sm:px-3 py-1 bg-white rounded-xs flex justify-center items-center">
//                 <span className="text-orange-500 text-xs sm:text-sm font-bold">
//                   {selectedCourtRoom?.cause_list_sr_no || "—"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Judges  */}
//           <div className="mt-2 flex justify-start items-center gap-2">
//             <div className="rounded-full overflow-hidden drop-shadow-sm shadow-sky-50">
//               <img
//                 src="/judge.jpg"
//                 alt="Judge"
//                 className="size-8 object-cover"
//               />
//             </div>
//             <span className="text-white text-[10px] sm:text-xs">
//               {selectedJudge || "N/A"}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Case List */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="py-4 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {loading ? (
//             Array.from({ length: 12 }, (_, index) => (
//               <CauseListCardLoader key={index} />
//             ))
//           ) : causeList.length > 0 ? (
//             causeList
//               .filter((item) => room === "All" || item.room_no.trim() === room)
//               .map((item, index) => <CauseListCard item={item} key={index} />)
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
import React, { useEffect, useState, useMemo } from "react";
import { useCauseListStore } from "@/store/causeListStore.";
import { useAuthStore } from "@/store/authStore";
import { useDisplayBoardStore } from "@/store/displayBoardStore";
import CauseListCard, {
  CauseListCardLoader,
} from "@/components/user/my-cases/CauseListCard";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { LuDownload, LuVideo } from "react-icons/lu";
import toast from "react-hot-toast";

export default function TodaysCases() {
  const { causeList, getCauseList, downloadCauseListPdf, loading } =
    useCauseListStore();
  const { userInfo } = useAuthStore();
  const { courtRooms, getDisplayBoard } = useDisplayBoardStore();

  const [date, setDate] = useState("");
  const [enrolmentIds, setEnrolmentIds] = useState([]);
  const [room, setRoom] = useState("All");

  const enrolId = userInfo?.enrollment_id;
  const associatesArray = userInfo?.associates?.split(",");

  useEffect(() => {
    setEnrolmentIds([enrolId, ...(associatesArray || [])]);
  }, []);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    setDate(today);
  }, []);

  useEffect(() => {
    if (date && enrolmentIds.length > 0) {
      getCauseList(date, enrolmentIds);
    }
  }, [date, enrolmentIds, getCauseList]);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const isToday = date === today;

    if (!isToday) return;

    getDisplayBoard(); // Initial call
    const interval = setInterval(getDisplayBoard, 30000);

    return () => clearInterval(interval);
  }, [date, getDisplayBoard]);

  const handleDateChange = (dateObj) => {
    if (!dateObj) return;
    const selectedDate = dateObj.format("YYYY-MM-DD");
    if (selectedDate !== date) {
      setDate(selectedDate);
      setRoom("All");
    }
  };

  const uniqueRoomNos = useMemo(
    () => ["All", ...new Set(causeList.map((item) => item.room_no.trim()))],
    [causeList]
  );

  const selectedJudge = useMemo(() => {
    if (room === "All") return null;
    const judge =
      causeList.find((item) => item.room_no.trim() === room)?.judge || null;
    if (!judge) return null;
    return judge.replace(/HONOURABLE\s*/i, "").trim();
  }, [room, causeList]);

  const selectedCourtRoom = useMemo(() => {
    if (room === "All") return null;
    return courtRooms.find((item) => item.room_no?.trim() === room);
  }, [room, courtRooms]);

  // ✅ Get the currently visible cases (filtered by room)
  const visibleCases = useMemo(() => {
    return causeList.filter(
      (item) => room === "All" || item.room_no.trim() === room
    );
  }, [causeList, room]);

  // ✅ Download button handler
  const handleDownloadCaseList = async (e) => {
    e.preventDefault();

    if (visibleCases.length < 1) {
      toast("No cases available to download");
      return;
    }

    try {
      const formattedCases = visibleCases.map((item) => ({
        item: item.originalsr_no,
        court: item.room_no,
        judge: item.judge,
        case_no: item.ctitle,
        parties: `${item.petitioner} vs ${item.respondent}`,
      }));

      const response = await downloadCauseListPdf(formattedCases);
      // console.log(response);

      // ✅ Open in new tab
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(response.data);
      window.open(url, "_blank");

      // Optional: clean up after a delay
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Error while downloading");
    }
  };

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      {/* Top filters */}
      <div className="min-h-12 sm:min-h-16 px-2 sm:px-4 py-3 bg-sky-950 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 rounded-lg">
        <div className="max-w-max flex flex-wrap items-center gap-3 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium">
          {uniqueRoomNos.map((roomNo) => (
            <button
              key={roomNo}
              onClick={() => setRoom(roomNo)}
              className={`px-4 py-1 flex items-center text-xs sm:text-sm rounded-full cursor-pointer ${
                room === roomNo
                  ? "text-sky-800 bg-sky-100 font-semibold"
                  : "text-white border border-white hover:bg-gray-100 hover:text-gray-700 hover:underline"
              }`}
            >
              <span>{roomNo}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center gap-2">
          <DatePicker
            value={date ? dayjs(date, "YYYY-MM-DD") : null}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            className="flex-1 h-8 sm:h-10 text-sm sm:text-base"
            allowClear={false}
          />

          {/* download button  */}
          <button
            type="button"
            title="Download"
            onClick={handleDownloadCaseList}
            className="p-2 text-sky-50 rounded-full hover:text-sky-200 hover:bg-white/10 cursor-pointer"
          >
            <LuDownload className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Room and Judge info */}
      {room !== "All" && (
        <div className="mt-0.5 px-2 sm:px-4 py-1.5 bg-sky-950 rounded-lg">
          <div className="flex justify-between items-center">
            {/* court no. & vconsol */}
            <div className="flex justify-start items-center gap-4">
              <div className="px-2 py-1 bg-white/30 flex flex-col justify-center items-center">
                <span className="text-white text-[10px] sm:text-xs">Court</span>
                <span className="text-white text-[10px] sm:text-xs">
                  {room}
                </span>
              </div>
              <a
                href="https://hckerala.vconsol.com/login"
                target="_blank"
                className="text-white hover:text-sky-200"
              >
                <LuVideo className="text-3xl" />
              </a>
            </div>

            {/* live case no */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-semibold">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sky-100 text-[10px] sm:text-xs">
                  Live Board
                </span>
              </div>
              <div className="px-2 sm:px-3 py-1 bg-white rounded-xs flex justify-center items-center">
                <span className="text-orange-500 text-xs sm:text-sm font-bold">
                  {selectedCourtRoom?.cause_list_sr_no || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Judge name */}
          <div className="mt-2 flex justify-start items-center gap-2">
            <div className="rounded-full overflow-hidden drop-shadow-sm shadow-sky-50">
              <img
                src="/judge.jpg"
                alt="Judge"
                className="size-8 object-cover"
              />
            </div>
            <span className="text-white text-[10px] sm:text-xs">
              {selectedJudge || "N/A"}
            </span>
          </div>
        </div>
      )}

      {/* Case List */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 12 }, (_, index) => (
              <CauseListCardLoader key={index} />
            ))
          ) : visibleCases.length > 0 ? (
            visibleCases.map((item, index) => (
              <CauseListCard item={item} key={index} />
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
