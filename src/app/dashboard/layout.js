import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <ProtectedRoute role="admin">
      <div className="w-screen h-screen fixed bg-gray-200 overflow-y-auto">
        {/* Navbar */}
        <div className="w-full sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="w-full  p-4 flex gap-4">
          <div className="w-72 h-full">
            <Sidebar />
          </div>
          <div className="w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
