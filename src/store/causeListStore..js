import { create } from "zustand";
import { fetchTotalMembers, fetchTotalPayments } from "@/api/dashboard";
import { fetchCauseList } from "@/api/case";

export const useCauseListStore = create((set) => ({
  courts: [],
  causeList: [],
  count: null,
  loading: false,
  error: null,

  // Get cause list

  getCauseList: async (date) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchCauseList(date);

      set({
        courts: res.data?.courts,
        causeList: res.data?.cases,
        count: res.data?.count,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
