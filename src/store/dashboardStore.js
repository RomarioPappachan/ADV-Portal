import { create } from "zustand";
import { fetchTotalMembers, fetchTotalPayments } from "@/api/dashboard";

export const useDashboardStore = create((set) => ({
  totalMembers: null,
  totalStickerPayment: null,
  totalIdCardPayment: null,
  totalMedicalPayment: null,
  loading: false,
  error: null,

  // Fetch total no of members
  getTotalMembers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchTotalMembers();
      set({ totalMembers: res.data.total_members, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch total no of parking sticker payments
  getTotalStickerPayments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchTotalPayments("sticker");
      set({ totalStickerPayment: res.data.total_numbers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch total no of id card payments
  getTotalIdCardPayments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchTotalPayments("idcard");
      set({ totalIdCardPayment: res.data.total_numbers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch total no of medical aid scheme payments
  getTotalMedicalPayments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchTotalPayments("idcard");
      set({ totalMedicalPayment: res.data.total_numbers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
