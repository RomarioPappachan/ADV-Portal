import { create } from "zustand";

export const useAuthStore = create((set) => ({
  admin: null,
  adminToken: null,

  adminLogin: (admin, adminToken) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("adminToken", adminToken);
    set({ admin, adminToken });
  },

  adminLogout: () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    set({ admin: null, adminToken: null });
  },

  checkAdminAuth: () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const admin = localStorage.getItem("admin");

      if (adminToken && admin) {
        set({ admin: JSON.parse(admin), adminToken });
        return { isAdminLoggedIn: true };
      } else {
        set({ admin: null, adminToken: null });
        return { isAdminLoggedIn: false };
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      set({ admin: null, adminToken: null });
      return { isAdminLoggedIn: false };
    }
  },
}));
