import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   admin: null,
//   adminToken: null,

//   adminLogin: (admin, adminToken) => {
//     localStorage.setItem("admin", JSON.stringify(admin));
//     localStorage.setItem("adminToken", adminToken);
//     set({ admin, adminToken });
//   },

//   adminLogout: () => {
//     localStorage.removeItem("admin");
//     localStorage.removeItem("adminToken");
//     set({ admin: null, adminToken: null });
//   },

//   checkAdminAuth: () => {
//     try {
//       const adminToken = localStorage.getItem("adminToken");
//       const admin = localStorage.getItem("admin");

//       if (adminToken && admin) {
//         set({ admin: JSON.parse(admin), adminToken });
//         return { isAdminLoggedIn: true };
//       } else {
//         set({ admin: null, adminToken: null });
//         return { isAdminLoggedIn: false };
//       }
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       set({ admin: null, adminToken: null });
//       return { isAdminLoggedIn: false };
//     }
//   },
// }));

import { adminLoginApi, sendOtpApi, verifyOtpApi } from "@/api/auth";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isSessionRestored: false,
  userType: null,
  token: null,
  otpSent: false,
  userInfo: null, // storing full user data (from verifyOtpApi)

  // Admin login
  loginAdmin: async (email, password) => {
    try {
      const res = await adminLoginApi(email, password);
      console.log(res);
      const token = res.data.token; // token is directly inside the response

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", "admin");

      set({ isAuthenticated: true, userType: "admin", token });
      return res;
    } catch (err) {
      console.error("Admin login failed");
      throw err;
    }
  },

  // User OTP flow
  sendOtp: async (mobileNo) => {
    try {
      const res = await sendOtpApi(mobileNo);
      set({ otpSent: true });
      return { ...res.data, status: true };
    } catch (err) {
      console.error("Send OTP failed");
      return false;
    }
  },

  verifyOtp: async (mobileNo, otp) => {
    try {
      const res = await verifyOtpApi(mobileNo, otp);

      const token = res.data.token; // token is inside response
      const user = res.data.result1; // user object available here
      const message = res.data.message;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", "user");
      localStorage.setItem("user_info", JSON.stringify(user));

      set({ isAuthenticated: true, userType: "user", token, userInfo: user });
      return { message, status: true };
    } catch (err) {
      // console.error("Verify OTP failed");
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_info");

    set({
      isAuthenticated: false,
      token: null,
      userType: null,
      userInfo: null,
      otpSent: false,
    });
  },

  restoreSession: () => {
    try {
      const token = localStorage.getItem("auth_token");
      const userType = localStorage.getItem("user_type");
      const userInfo = localStorage.getItem("user_info");

      if (token && userType) {
        set({
          isAuthenticated: true,
          token,
          userType,
          userInfo: userInfo ? JSON.parse(userInfo) : null,
          isSessionRestored: true,
        });
        return { isAuthenticated: true, userType };
      } else {
        set({
          isAuthenticated: false,
          token: null,
          userType: null,
          userInfo: null,
          otpSent: false,
          isSessionRestored: true,
        });
        return { isAuthenticated: false };
      }
    } catch (err) {
      set({
        isAuthenticated: false,
        token: null,
        userType: null,
        userInfo: null,
        otpSent: false,
        isSessionRestored: true,
      });
      return { isAuthenticated: false };
    }
  },
}));
