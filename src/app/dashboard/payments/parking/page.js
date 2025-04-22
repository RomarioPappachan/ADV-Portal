"use client";

import React, { useEffect } from "react";
import { useStatisticsStore } from "@/store/statisticsStore";
import ParkingTicketTable from "@/components/payments/ParkingTicketTable";

export default function ParkingTicket() {
  const { allPayments, getAllPayments } = useStatisticsStore();

  useEffect(() => {
    if (allPayments.length < 1 || allPayments[0].payment_type !== "sticker")
      getAllPayments("sticker");
  }, []);

  return <ParkingTicketTable tableHeading="Parking Slip" />;
}
