"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }) => {
  const { adminToken, checkAdminAuth, adminLogout } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    checkAdminAuth();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !adminToken) {
      adminLogout();
      router.push("/admin");
    }
  }, [adminToken, loading, router, adminLogout]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return adminToken ? children : null;
};

export default ProtectedRoute;
