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

import {
  adminLoginApi,
  loginWithPasswordApi,
  sendOtpApi,
  setPasswordApi,
  verifyOtpApi,
} from "@/api/auth";

export const useAuthStore = create((set, get) => ({
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

  verifyOtp: async (sessionId, mobileNo, otp) => {
    try {
      const res = await verifyOtpApi(sessionId, mobileNo, otp);

      const token = res.data.token; // token is inside response
      const user = res.data.result1; // user object available here
      const message = res.data.message;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", "user");
      localStorage.setItem("user_info", JSON.stringify(user));

      set({ isAuthenticated: true, userType: "user", token, userInfo: user });
      return { message, status: true, firstLogin: user?.first_login };
    } catch (err) {
      // console.error("Verify OTP failed");
      throw err;
    }
  },

  setPassword: async (password) => {
    try {
      const { userInfo } = get(); // ✅ get() pulls from store state
      const mobile = userInfo?.mobile;
      const adv_id = userInfo?.id;

      if (!mobile || !adv_id) {
        throw new Error("Missing user information. Cannot set password.");
      }

      const res = await setPasswordApi(adv_id, mobile, password);
      return { message: res.data.message, status: true };
    } catch (error) {
      throw new Error(error.message || "Failed to set password");
    }
  },

  loginWithPassword: async (mobile, password) => {
    try {
      const res = await loginWithPasswordApi(mobile, password);

      const token = res.data.token;
      const user = res.data.result1;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_type", "user");
      localStorage.setItem("user_info", JSON.stringify(user));

      set({
        isAuthenticated: true,
        token,
        userInfo: user,
        userType: "user",
      });

      return { status: true, message: res.data.message };
    } catch (err) {
      console.error("Login failed with:", { mobile, password });
      console.error("API Error:", err?.response?.data || err.message);
      throw new Error(err?.response?.data?.message || "Login failed");
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
