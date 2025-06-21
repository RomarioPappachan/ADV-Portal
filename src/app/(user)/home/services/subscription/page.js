"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import SubscriptionTable from "@/components/user/subscription/SubscriptionTable";
import SubscriptionCards from "@/components/user/subscription/SubscriptionCards";

const page = () => {
  const { userInfo } = useAuthStore();
  const { paymentDetails, getUserById } = useUserStore();

  useEffect(() => {
    if (userInfo?.id) {
      getUserById(userInfo.id);
    }
  }, [userInfo]);

  return (
    <div className="p-3 bg-white">
      <h1 className="text-black font-semibold text-2xl">Subscriptions</h1>

      <SubscriptionCards />
      <SubscriptionTable />
    </div>
  );
};

export default page;
