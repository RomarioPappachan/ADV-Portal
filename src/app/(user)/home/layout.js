"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import UserNavbar from "@/components/UserNavbar";

export default function UserRootLayout({ children }) {
  return (
    <ProtectedRoute role="user">
      <div className="w-screen h-screen box-border overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full box-border z-50">
          <UserNavbar />
        </div>
        <div className="w-full min-h-screen px-3 sm:px-4 md:px-8 lg:px-16 pt-10 pb-20 bg-[#f6f8fa] box-border">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
