"use client";

import React, { useEffect } from "react";
import { useStatisticsStore } from "@/store/statisticsStore";
import ParkingTicketTable from "@/components/payments/ParkingTicketTable";

export default function OtherPayments() {
  const { allPayments, getAllPayments } = useStatisticsStore();

  useEffect(() => {
    if (allPayments.length < 1 || allPayments[0].payment_type !== "others")
      getAllPayments("others");
  }, []);

  return <ParkingTicketTable tableHeading="Other Payments" />;
}
