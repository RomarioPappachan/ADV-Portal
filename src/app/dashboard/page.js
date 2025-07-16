// import React from "react";

// import Stats from "@/components/dashboard/Stats";
// import Statistics from "@/components/dashboard/Statistics";

// const page = () => {
//   return (
//     <div className="w-full p-4 bg-white rounded-lg ">
//       <h1 className="text-blue-950 text-xl mb-6">Dashboard</h1>
//       <div>
//         <Stats />
//       </div>
//       <div className="pt-10">
//         <Statistics />
//       </div>
//     </div>
//   );
// };

// export default page;

import React from "react";
import Stats from "@/components/dashboard/Stats";
import Statistics from "@/components/dashboard/Statistics";
import ImportCauseList from "@/components/dashboard/ImportCauseList";

const page = () => {
  return (
    <div className="w-full bg-white rounded-lg">
      <h1 className="text-blue-950 text-xl lg:text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      {/* import cause list */}
      <div>
        <ImportCauseList />
      </div>

      {/* Stats Section */}
      <div className="mt-10">
        <Stats />
      </div>

      {/* Statistics Section */}
      <div className="pt-10">
        <Statistics />
      </div>
    </div>
  );
};

export default page;
