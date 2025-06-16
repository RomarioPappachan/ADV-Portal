"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/adminAuthStore";

const AdminProtectedRoute = ({ children, role }) => {
  const router = useRouter();
  const {
    isAdminAuthenticated,
    adminToken,
    isAdminSessionRestored,
    restoreAdminSession,
  } = useAdminAuthStore();

  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    restoreAdminSession();
    setLoading(false);
  }, []);

  // If session hasn't been restored yet, don't render anything
  if (!isAdminSessionRestored) {
    return null; // or a loader if you want
  }

  // After restore, check authentication
  if (!loading && !adminToken) {
    if (role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
    return null;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return adminToken ? children : null;
};

export default AdminProtectedRoute;
