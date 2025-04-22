// "use client";

// import { useEffect } from "react";
// import { useDashboardStore } from "@/store/dashboardStore";

// import { FiUsers } from "react-icons/fi";
// import { PiStickerFill } from "react-icons/pi";
// import { FaIdCard } from "react-icons/fa6";
// import { BsJournalMedical } from "react-icons/bs";

// function Stats() {
//   const {
//     totalMembers,
//     totalStickerPayment,
//     totalIdCardPayment,
//     totalMedicalPayment,
//     getTotalMembers,
//     getTotalStickerPayments,
//     getTotalIdCardPayments,
//     getTotalMedicalPayments,
//   } = useDashboardStore();

//   useEffect(
//     function () {
//       if (!totalMembers) {
//         getTotalMembers(); // Fetch total no of members
//       }
//     },
//     [totalMembers]
//   );

//   useEffect(
//     function () {
//       if (!totalStickerPayment) getTotalStickerPayments();
//     },
//     [totalStickerPayment]
//   );

//   useEffect(
//     function () {
//       if (!totalIdCardPayment) getTotalIdCardPayments();
//     },
//     [totalIdCardPayment]
//   );

//   useEffect(
//     function () {
//       if (!totalMedicalPayment) getTotalMedicalPayments();
//     },
//     [totalMedicalPayment]
//   );

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       <div className="h-32 rounded-lg bg-teal-500 text-white flex">
//         <div className="w-1/3 flex justify-center items-center">
//           <FiUsers className="text-5xl" />
//         </div>
//         <div className="w-2/3 flex flex-col justify-center ">
//           <h1 className="text-base font-normal">Members</h1>
//           <p className="text-3xl font-semibold">
//             {totalMembers ? totalMembers : "-"}
//           </p>
//         </div>
//       </div>
//       <div className=" h-32 rounded-lg bg-blue-500 text-white flex">
//         <div className="w-1/3 flex justify-center items-center">
//           <PiStickerFill className="text-6xl" />
//         </div>
//         <div className="w-2/3 flex flex-col justify-center ">
//           <h1 className="text-base font-normal">Parking Sticker</h1>
//           <p className="text-3xl font-semibold">
//             {totalStickerPayment ? totalStickerPayment : "-"}
//           </p>
//         </div>
//       </div>
//       <div className=" h-32 rounded-lg bg-yellow-500 text-white flex">
//         <div className="w-1/3 flex justify-center items-center">
//           <FaIdCard className="text-5xl" />
//         </div>
//         <div className="w-2/3 flex flex-col justify-center ">
//           <h1 className="text-base font-normal">Identity Card</h1>
//           <p className="text-3xl font-semibold">
//             {totalIdCardPayment ? totalIdCardPayment : "-"}
//           </p>
//         </div>
//       </div>
//       <div className=" h-32 rounded-lg bg-rose-500 text-white flex">
//         <div className="w-1/3 flex justify-center items-center">
//           <BsJournalMedical className="text-5xl" />
//         </div>
//         <div className="w-2/3 flex flex-col justify-center ">
//           <h1 className="text-base font-normal">Medical Aid & Scheme</h1>
//           <p className="text-3xl font-semibold">
//             {totalMedicalPayment ? totalMedicalPayment : "-"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Stats;

"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";

import { LuUsers } from "react-icons/lu";
import { PiStickerFill, PiTicketFill } from "react-icons/pi";
import { FaUsers, FaPeopleGroup, FaIdCard } from "react-icons/fa6";
import { BsFillHeartPulseFill } from "react-icons/bs";

function Stats() {
  const {
    totalMembers,
    totalStickerPayment,
    totalIdCardPayment,
    totalMedicalPayment,
    getTotalMembers,
    getTotalStickerPayments,
    getTotalIdCardPayments,
    getTotalMedicalPayments,
  } = useDashboardStore();

  useEffect(() => {
    if (!totalMembers) getTotalMembers();
  }, [totalMembers]);

  useEffect(() => {
    if (!totalStickerPayment) getTotalStickerPayments();
  }, [totalStickerPayment]);

  useEffect(() => {
    if (!totalIdCardPayment) getTotalIdCardPayments();
  }, [totalIdCardPayment]);

  useEffect(() => {
    if (!totalMedicalPayment) getTotalMedicalPayments();
  }, [totalMedicalPayment]);

  const cards = [
    {
      title: "Members",
      icon: <FaPeopleGroup className="text-5xl text-white/80" />,
      value: totalMembers,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      title: "Parking Sticker",
      icon: <PiTicketFill className="text-6xl text-white/80" />,
      value: totalStickerPayment,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Identity Card",
      icon: <FaIdCard className="text-5xl text-white/80" />,
      value: totalIdCardPayment,
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Medical Aid & Scheme",
      icon: <BsFillHeartPulseFill className="text-5xl text-white/80" />,
      value: totalMedicalPayment,
      gradient: "from-rose-400 to-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-0">
      {cards.map(({ title, icon, value, gradient }, index) => (
        <div
          key={index}
          className={`h-36 rounded-2xl bg-gradient-to-br ${gradient} p-[1px] shadow-lg`}
        >
          <div className="h-full w-full bg-white/10 backdrop-blur-md rounded-2xl flex">
            <div className="w-1/3 flex justify-center items-center">{icon}</div>
            <div className="w-2/3 flex flex-col justify-center pr-4 text-white">
              <h1 className="text-sm sm:text-base font-medium tracking-wide drop-shadow-sm">
                {title}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold drop-shadow-sm">
                {value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
