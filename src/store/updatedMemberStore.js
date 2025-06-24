import { create } from "zustand";
import { fetchProfileUptdMembers } from "@/api/member";

export const useUpdatedMemberStore = create((set) => ({
  updatedMembers: [],
  totalPages: 1,
  searchedDate: "",
  loading: false,
  error: null,

  getUpdatedMembers: async (date, page, limit) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchProfileUptdMembers(date, page, limit);

      set({
        updatedMembers: res.data.result,
        totalPages: res.data.totalPages,

        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
