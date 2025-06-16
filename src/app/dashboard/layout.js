import Navbar from "@/components/Navbar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminProtectedRoute role="admin">
      <div className="w-screen h-screen fixed bg-gray-200">
        {/* Navbar */}
        <div className="w-full h-20 sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="w-full h-[calc(100vh-5rem)] flex">
          {/* calc is used so that the div fits in screen after Navber takes height of 20 */}
          <div className="w-72 h-full relative">
            <Sidebar />
          </div>
          <div className="p-4 pb-20 w-full h-full overflow-y-auto bg-white">
            {children}
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
