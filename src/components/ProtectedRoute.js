// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";

// const ProtectedRoute = ({ children }) => {
//   const { adminToken, checkAdminAuth, adminLogout } = useAuthStore();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     checkAdminAuth();
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (!loading && !adminToken) {
//       adminLogout();
//       router.push("/admin");
//     }
//   }, [adminToken, loading, router, adminLogout]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   return adminToken ? children : null;
// };

// export default ProtectedRoute;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children, role }) => {
  const router = useRouter();
  const { token, userType, isSessionRestored, restoreSession } = useAuthStore();

  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    restoreSession();
    setLoading(false);
  }, []);

  // If session hasn't been restored yet, don't render anything
  if (!isSessionRestored) {
    return null; // or a loader if you want
  }

  // After restore, check authentication
  if (!loading && !token) {
    if (role === "admin") {
      router.replace("/admin");
    } else {
      router.push("/");
    }
    return null;
  }

  // If user is authenticated but role doesn't match
  if (role === "admin" && userType !== role) {
    router.replace("/admin");
    return null;
  }

  if (role === "user" && userType !== role) {
    router.push("/");
    return null;
  }

  // return <>{children}</>;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return token ? children : null;
};

export default ProtectedRoute;
