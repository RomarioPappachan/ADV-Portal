"use client";

import { useAuthStore } from "@/store/authStore";
import { useAdminAuthStore } from "@/store/adminAuthStore";

export function handleApiError(error, userRole = null) {
  if (typeof window !== "undefined") {
    const status = error?.response?.status;

    if (status === 401 || status === 400) {
      // Use passed role if available
      if (userRole === "user") {
        useAuthStore.getState().logout();
        window.location.href = "/";
      } else if (userRole === "admin") {
        useAdminAuthStore.getState().adminLogout();
        window.location.href = "/admin";
      } else {
        // // Fallback: auto-detect from localStorage
        // const token = localStorage.getItem("auth_token");
        // const adminToken = localStorage.getItem("admin_token");

        // if (token) {
        //   useAuthStore.getState().logout();
        //   window.location.href = "/";
        // } else if (adminToken) {
        //   useAdminAuthStore.getState().adminLogout();
        //   window.location.href = "/admin";
        // }
        return;
      }
    }
  }

  throw new Error(error?.response?.data?.message || "Something went wrong");
}
