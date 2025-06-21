import { create } from "zustand";

import { adminLoginApi } from "@/api/auth";

export const useAdminAuthStore = create((set, get) => ({
  isAdminAuthenticated: false,
  isAdminSessionRestored: false,
  role: null,
  adminToken: null,
  adminInfo: null, // storing full user data (from verifyOtpApi)

  // Admin login
  loginAdmin: async (email, password) => {
    try {
      const res = await adminLoginApi(email, password);
      const adminToken = res.data.token; // token is directly inside the response

      localStorage.setItem("admin_token", adminToken);
      localStorage.setItem("role", "admin");

      set({ isAdminAuthenticated: true, role: "admin", adminToken });
      return res;
    } catch (err) {
      throw err;
    }
  },

  adminLogout: () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("role");
    localStorage.removeItem("admin_info");

    set({
      isAdminAuthenticated: false,
      adminToken: null,
      role: null,
      adminInfo: null,
    });
  },

  restoreAdminSession: () => {
    try {
      const adminToken = localStorage.getItem("admin_token");
      const role = localStorage.getItem("role");
      const adminInfo = localStorage.getItem("admin_info");

      if (adminToken && role) {
        set({
          isAdminAuthenticated: true,
          adminToken,
          role,
          adminInfo: adminInfo ? JSON.parse(adminInfo) : null,
          isAdminSessionRestored: true,
        });
        return { isAdminAuthenticated: true, role };
      } else {
        set({
          isAdminAuthenticated: false,
          adminToken: null,
          role: null,
          adminInfo: null,
          isAdminSessionRestored: true,
        });
        return { isAdminAuthenticated: false };
      }
    } catch (err) {
      set({
        isAdminAuthenticated: false,
        adminToken: null,
        role: null,
        adminInfo: null,
        isAdminSessionRestored: true,
      });
      return { isAdminAuthenticated: false };
    }
  },
}));
