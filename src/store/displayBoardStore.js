import { create } from "zustand";
import { fetchDisplayBoard } from "@/api/case";

export const useDisplayBoardStore = create((set) => ({
  courtRooms: [],
  loading: false,
  error: null,

  // Get cause list

  getDisplayBoard: async (date) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchDisplayBoard(date);
      set({
        courtRooms: res.data?.data?.data,
        loading: false,
      });
    } catch (error) {
      set({ error: error, loading: false });
    }
  },
}));
