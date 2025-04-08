import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="w-screen h-screen fixed bg-gray-200">
        <Navbar />
        <div className="w-full h-10/12 p-4 flex gap-4">
          <div className="w-72 h-full">
            <Sidebar />
          </div>
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
