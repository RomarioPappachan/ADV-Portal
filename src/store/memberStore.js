import { create } from "zustand";
import { fetchAllMembers, createMember, updateMember } from "@/api/member";

export const useMemberStore = create((set) => ({
  members: [],
  loading: false,
  error: null,

  // Fetch all members
  getAllMembers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAllMembers();
      set({ members: res?.data?.result.splice(0, 10), loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new member
  addMember: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const res = await createMember(memberData);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ error: "Failed to create a new member", loading: false });
      throw error;
    }
  },

  // Edit member details
  editMember: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const res = await updateMember(memberData);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
