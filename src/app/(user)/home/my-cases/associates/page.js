"use client";
import React, { useEffect, useState } from "react";
import AssociatesSection from "@/components/my-cases/associates/AssociatesSection";
import { useAssociateStore } from "@/store/associatesStore";
import { LuPlus } from "react-icons/lu";
import CreateAssociate from "@/components/my-cases/associates/CreateAssociate";
import { useAuthStore } from "@/store/authStore";

export default function Associates() {
  const { userInfo } = useAuthStore();
  const { getAssociates } = useAssociateStore();

  const [showCreateAssociate, setShowCreateAssociate] = useState(false);

  const userId = userInfo?.id;

  useEffect(() => {
    if (userId) getAssociates(userId);
  }, [getAssociates, userId]);

  return (
    <div className="h-full px-2 lg:px-4 flex flex-col">
      <div className="h-12 sm:h-16 px-4 py-3 bg-sky-100 flex justify-between items-center rounded-lg">
        <h1 className="text-gray-500 text-sm sm:text-base">Associates</h1>
        <button
          onClick={() => setShowCreateAssociate(true)}
          className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          <LuPlus size={18} />
          <span className="hidden sm:inline">Add Associate</span>
        </button>
      </div>
      <div className="flex-1 mt-4 overflow-y-auto">
        <AssociatesSection />
      </div>

      {showCreateAssociate && (
        <CreateAssociate onClose={() => setShowCreateAssociate(false)} />
      )}
    </div>
  );
}
