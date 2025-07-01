import BackToHomeButton from "@/components/ui/BackToHomeButton";
import MyCasesSideBar from "@/components/user/my-cases/MyCasesSideBar";
import React from "react";

export default function MyCasesLayout({ children }) {
  return (
    <>
      <BackToHomeButton />
      <div className="mt-4 py-2 sm:py-6 w-full h-[calc(100vh-10rem)] bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden flex flex-col sm:flex-row justify-start items-start">
        <div className="w-full sm:w-1/4 sm:h-full lg:w-1/5 border-b-2 sm:border-r-2 border-slate-100">
          <MyCasesSideBar />
        </div>
        <div className="w-full sm:w-3/4 lg:w-4/5 min-h-full sm:h-full py-2 sm:px-4 sm:pt-0">
          {children}
        </div>
      </div>
    </>
  );
}
