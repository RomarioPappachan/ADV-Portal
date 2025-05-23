"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import VehicleDetailsSection from "@/components/user/profile/VehicleDetailsSection";
import ClerkDetailsSection from "@/components/user/profile/ClerkDetailsSection";
import UserDetailsSection from "@/components/user/profile/UserDetailsSection";
import BackToHomeButton from "@/components/ui/BackToHomeButton";

export default function ProfilePage() {
  const { userInfo } = useAuthStore();
  const { getUserById } = useUserStore();

  useEffect(() => {
    if (userInfo?.id) {
      getUserById(userInfo.id);
    }
  }, [userInfo.id]);

  return (
    <div className="space-y-6 pb-10">
      <BackToHomeButton />

      {/* User Details */}

      <UserDetailsSection />

      {/* Clerk Details */}

      <ClerkDetailsSection />

      {/* Vehicle Details */}

      <VehicleDetailsSection />
    </div>
  );
}
