"use client";

import { useAssociateStore } from "@/store/associatesStore";

import AssociateDetails from "./AssociateDetails";

export default function AssociatesSection() {
  const { associatesList } = useAssociateStore();

  return (
    <div className="relative h-auto bg-white rounded-lg overflow-y-auto">
      {/* Section Header */}

      {/* Associate Cards */}
      {associatesList && associatesList.length > 0 ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {associatesList.map((associate, index) => (
            <AssociateDetails associate={associate} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-rose-500 text-sm sm:text-base">
          No associates found.
        </p>
      )}
    </div>
  );
}
