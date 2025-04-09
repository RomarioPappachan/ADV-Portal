import { create } from "zustand";
import { fetchUserById } from "@/api/user";

export const useUserStore = create((set) => ({
  userDetails: {},
  vehicleDetails: [],
  clerkDetails: [],
  qualification: {},
  loading: false,
  error: null,

  getUserById: async (userId) => {
    console.log(userId);
    set({ loading: true, error: null });
    try {
      const res = await fetchUserById(userId);
      set({
        userDetails: res.data.advocate,
        vehicleDetails: res.data.vehicles,
        clerkDetails: res.data.clerk,
        qualification: res.data.info,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
