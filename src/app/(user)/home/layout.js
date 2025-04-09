"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserRootLayout({ children }) {
  return (
    <ProtectedRoute role="user">
      <div className="w-screen h-screen box-border overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full box-border z-50">
          <Navbar />
        </div>
        <div className="w-full px-3 sm:px-4 md:px-8 lg:px-16 pt-10 pb-20 bg-white box-border">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
