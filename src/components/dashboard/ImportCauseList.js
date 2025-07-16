// "use client";

// import React, { useEffect, useState } from "react";
// import { importCauseList } from "@/api/dashboard";

// import { DatePicker } from "antd";
// import dayjs from "dayjs";

// import styles from "./ImportCauseList.module.css";
// import { createPortal } from "react-dom";

// export default function ImportCauseList() {
//   const [date, setDate] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const today = dayjs().format("YYYY-MM-DD");
//     setDate(today);
//   }, []);

//   // 🛡️ Prevent browser tab close or reload during import
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (isSubmitting) {
//         e.preventDefault();
//         e.returnValue = ""; // Required for Chrome
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isSubmitting]);

//   const handleDateChange = (dateObj) => {
//     if (!dateObj) return;
//     const selectedDate = dateObj.format("YYYY-MM-DD");
//     if (selectedDate !== date) {
//       setDate(selectedDate);
//     }
//   };

//   const handleImport = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setStatus("loading");
//     setMessage(`Importing cause list...`);

//     try {
//       if (date) {
//         const res = await importCauseList(date);
//         console.log(res);
//         const caseCount = res?.data?.count;
//         setStatus("success");

//         if (caseCount) {
//           setMessage(`Successfully imported ${caseCount} cases for ${date}`);
//         } else {
//           setMessage("No cases available to be imported");
//         }
//       }
//     } catch (error) {
//       setStatus("error");
//       setMessage("Error importing cause list");
//     } finally {
//       setTimeout(() => {
//         setMessage("");
//         setIsSubmitting(false);
//         setStatus("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="px-2 sm:px-10 py-10 flex flex-col justify-start item-start border-2 border-gray-300 rounded-xl">
//       <div className="flex justify-start item-start gap-3">
//         <div className="rounded-lg">
//           <DatePicker
//             className={styles.datePicker}
//             value={date ? dayjs(date, "YYYY-MM-DD") : null}
//             onChange={handleDateChange}
//             format="YYYY-MM-DD"
//             allowClear={false}
//           />
//         </div>
//         <button
//           className="max-w-max px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-900 hover:text-sky-100 cursor-pointer"
//           onClick={handleImport}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Importing..." : "Import Cause list"}
//         </button>
//       </div>
//       {isSubmitting && (
//         <ImportStatus date={date} message={message} status={status} />
//       )}
//     </div>
//   );
// }

// export function ImportStatus({ date, message, status }) {
//   console.log(date);
//   return createPortal(
//     <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center">
//       <div className="bg-white rounded-lg p-10">
//         <h1 className="text-blue-800 text-base font-semibold">
//           Import Cause List
//         </h1>
//         <div
//           className={`min-w-md mt-5 p-4 text-sm rounded-lg ${
//             status === "loading"
//               ? "bg-gray-100 text-gray-500"
//               : status === "success"
//               ? "bg-emerald-100 text-emerald-500"
//               : "bg-rose-100 text-rose-500"
//           }`}
//         >
//           <span>{message}</span>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { importCauseList } from "@/api/dashboard";

// import { DatePicker } from "antd";
// import dayjs from "dayjs";

// import styles from "./ImportCauseList.module.css";
// import { createPortal } from "react-dom";

// export default function ImportCauseList() {
//   const [date, setDate] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const today = dayjs().format("YYYY-MM-DD");
//     setDate(today);
//   }, []);

//   // 🛡️ Prevent browser tab close or reload during import
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (isSubmitting) {
//         e.preventDefault();
//         e.returnValue = ""; // Required for Chrome
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isSubmitting]);

//   const handleDateChange = (dateObj) => {
//     if (!dateObj) return;
//     const selectedDate = dateObj.format("YYYY-MM-DD");
//     if (selectedDate !== date) {
//       setDate(selectedDate);
//     }
//   };

//   const handleImport = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setStatus("loading");
//     setMessage(`Importing cause list...`);

//     try {
//       if (date) {
//         const res = await importCauseList(date);
//         console.log(res);
//         const caseCount = res?.data?.count;
//         setStatus("success");

//         if (caseCount) {
//           setMessage(`Successfully imported ${caseCount} cases for ${date}`);
//         } else {
//           setMessage("No cases available to be imported");
//         }
//       }
//     } catch (error) {
//       setStatus("error");
//       setMessage("Error importing cause list");
//     } finally {
//       setTimeout(() => {
//         setMessage("");
//         setIsSubmitting(false);
//         setStatus("");
//       }, 5000);
//     }
//   };

//   const generateDates = () => {
//     const days = [];
//     const today = dayjs();

//     let offset = -2;
//     let forward = 0;

//     // Collect backward weekdays
//     while (offset <= 0 && days.length < 2) {
//       const date = today.add(offset, "day");
//       const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday

//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         days.push(date);
//       }
//       offset++;
//     }

//     // Include today if it's a weekday
//     if (today.day() !== 0 && today.day() !== 6) {
//       days.push(today);
//     }

//     // Collect forward weekdays
//     let plus = 1;
//     while (days.length < 5) {
//       const date = today.add(plus, "day");
//       const dayOfWeek = date.day();

//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         days.push(date);
//       }

//       plus++;
//     }

//     // Sort ascending
//     return days.sort((a, b) => a.valueOf() - b.valueOf());
//   };

//   return (
//     <div className="px-2 sm:px-10 py-10 flex flex-col justify-start item-start border-2 border-sky-900 rounded-xl">
//       {/* Horizontally scrollable date cards */}
//       <div className="w-full overflow-x-auto pb-4">
//         <div className="flex gap-2 w-max">
//           {generateDates().map((d) => {
//             const formatted = d.format("YYYY-MM-DD");
//             const isSelected = formatted === date;

//             return (
//               <div
//                 key={formatted}
//                 onClick={() => setDate(formatted)}
//                 className={`min-w-[60px] h-[60px] flex flex-col items-center justify-center border rounded-md cursor-pointer transition-transform duration-200 ${
//                   isSelected
//                     ? "bg-sky-700 text-white shadow-md"
//                     : "bg-gray-100 text-gray-600 hover:bg-sky-100"
//                 }`}
//               >
//                 <div className="text-sm font-medium">{d.format("ddd")}</div>
//                 <div className="text-lg font-semibold">{d.format("D")}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Date Picker fallback */}
//       <div className="flex justify-start item-start gap-3">
//         <div className="rounded-lg">
//           <DatePicker
//             className={styles.datePicker}
//             value={date ? dayjs(date, "YYYY-MM-DD") : null}
//             onChange={handleDateChange}
//             format="YYYY-MM-DD"
//             allowClear={false}
//           />
//         </div>
//         <button
//           className="max-w-max px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-900 hover:text-sky-100 cursor-pointer disabled:opacity-60"
//           onClick={handleImport}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Importing..." : "Import Cause list"}
//         </button>
//       </div>

//       {isSubmitting && (
//         <ImportStatus date={date} message={message} status={status} />
//       )}
//     </div>
//   );
// }

// export function ImportStatus({ date, message, status }) {
//   return createPortal(
//     <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center z-[9999]">
//       <div className="bg-white rounded-lg p-10">
//         <h1 className="text-blue-800 text-base font-semibold">
//           Import Cause List
//         </h1>
//         <div
//           className={`min-w-md mt-5 p-4 text-sm rounded-lg ${
//             status === "loading"
//               ? "bg-gray-100 text-gray-500"
//               : status === "success"
//               ? "bg-emerald-100 text-emerald-500"
//               : "bg-rose-100 text-rose-500"
//           }`}
//         >
//           <span>{message}</span>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { importCauseList } from "@/api/dashboard";
import dayjs from "dayjs";
import { createPortal } from "react-dom";

export default function ImportCauseList() {
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const formattedDisplayDate = date ? dayjs(date).format("DD-MM-YYYY") : "";

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    setDate(today);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSubmitting]);

  const handleImport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("loading");
    setMessage("Importing cause list...");

    try {
      if (date) {
        const res = await importCauseList(date);
        const caseCount = res?.data?.count;
        setStatus("success");

        if (caseCount) {
          setMessage(
            `Successfully imported ${caseCount} cases on ${formattedDisplayDate}`
          );
        } else {
          setMessage("No cases available to import");
        }
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error importing cause list");
    } finally {
      setTimeout(() => {
        setMessage("");
        setIsSubmitting(false);
        setStatus("");
      }, 5000);
    }
  };

  // const generateDates = () => {
  //   const days = [];
  //   const today = dayjs();

  //   let offset = -2;

  //   while (offset <= 0 && days.length < 2) {
  //     const date = today.add(offset, "day");
  //     const dow = date.day();
  //     if (dow !== 0 && dow !== 6) {
  //       days.push(date);
  //     }
  //     offset++;
  //   }

  //   if (today.day() !== 0 && today.day() !== 6) {
  //     days.push(today);
  //   }

  //   let plus = 1;
  //   while (days.length < 5) {
  //     const date = today.add(plus, "day");
  //     const dow = date.day();
  //     if (dow !== 0 && dow !== 6) {
  //       days.push(date);
  //     }
  //     plus++;
  //   }

  //   return days.sort((a, b) => a.valueOf() - b.valueOf());
  // };

  const isWeekday = (date) => {
    const day = date.day();
    return day !== 0 && day !== 6; // Not Sunday(0) or Saturday(6)
  };

  const generateDates = () => {
    const today = dayjs();
    const days = [];

    // Add today only if it's a weekday
    if (isWeekday(today)) {
      days.push(today);
    }

    // Get 2 valid previous weekdays
    let prevOffset = 1;
    while (days.length < 3) {
      const prevDate = today.subtract(prevOffset, "day");
      if (isWeekday(prevDate)) {
        days.unshift(prevDate);
      }
      prevOffset++;
    }

    // Get 2 valid next weekdays
    let nextOffset = 1;
    while (days.length < 5) {
      const nextDate = today.add(nextOffset, "day");
      if (isWeekday(nextDate)) {
        days.push(nextDate);
      }
      nextOffset++;
    }

    return days;
  };

  return (
    <div className="px-2 sm:px-10 py-10 flex flex-col items-start border-2 border-sky-900 rounded-xl">
      {/* Scrollable Row */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-3 w-max items-center p-2">
          {/* Date Cards */}
          {generateDates().map((d) => {
            const formatted = d.format("YYYY-MM-DD");
            const isSelected = formatted === date;

            return (
              <div
                key={formatted}
                onClick={() => setDate(formatted)}
                className={`w-[60px] h-[60px] flex flex-col items-center justify-center border rounded-md cursor-pointer transition-transform duration-200 ${
                  isSelected
                    ? "bg-sky-700 text-white scale-105 shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-sky-100"
                }`}
              >
                <div className="text-[10px] font-medium">{d.format("ddd")}</div>
                <div className="text-base font-bold leading-tight">
                  {d.format("D")}
                </div>
                <div className="text-[10px]">{d.format("MMM YY")}</div>
              </div>
            );
          })}

          {/* Import Button as part of scroll */}
          <button
            className="ms-4 px-4 h-[60px] bg-sky-800 text-white rounded-lg hover:bg-sky-900 hover:text-sky-100 cursor-pointer disabled:opacity-60 whitespace-nowrap"
            onClick={handleImport}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Importing..." : "Import Cause List"}
          </button>
        </div>
      </div>

      {/* Status Modal */}
      {isSubmitting && (
        <ImportStatus
          date={formattedDisplayDate}
          message={message}
          status={status}
        />
      )}
    </div>
  );
}

export function ImportStatus({ date, message, status }) {
  return createPortal(
    <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-lg p-10">
        <h1 className="text-blue-800 text-base font-semibold">
          Import Cause List on {date}
        </h1>
        <div
          className={`min-w-md mt-5 p-4 text-sm rounded-lg ${
            status === "loading"
              ? "bg-gray-100 text-gray-500"
              : status === "success"
              ? "bg-emerald-100 text-emerald-500"
              : "bg-rose-100 text-rose-500"
          }`}
        >
          <span>{message}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
