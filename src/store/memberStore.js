import { create } from "zustand";

export const useMemberStore = create((set) => ({
  members: [],
  loading: false,
  error: null,

  // Fetch all members
  getAllMembers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAllMembers();
      set({ members: [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
