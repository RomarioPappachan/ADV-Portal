import { create } from "zustand";
import { fetchAllPayments } from "@/api/statistics";

export const useStatisticsStore = create((set) => ({
  allPayments: [],
  loading: false,
  error: null,

  getAllPayments: async (paymentType) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAllPayments(paymentType);
      set({
        allPayments: res.data.result,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
