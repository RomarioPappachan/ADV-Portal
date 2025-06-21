import { create } from "zustand";
import { fetchAllMembers, createMember, updateMember } from "@/api/member";
import { fetchUserById } from "@/api/user";

export const useMemberStore = create((set) => ({
  members: [],
  totalPages: 1,

  selectedMemberId: null,
  userDetails: {}, //selected user
  vehicleDetails: [], //selected user
  clerkDetails: [], //selected user
  paymentDetails: [], //selected user
  additionalInfo: {}, //selected user
  loading: false,
  error: null,

  // Fetch all members
  getAllMembers: async (page, limit, query) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAllMembers(page, limit, query);
      const allMembers = res?.data?.result;
      // const startPoint = allMembers?.length - 50;
      // const updatedMembers = allMembers?.splice(startPoint, 50);
      set({
        members: res.data.members,
        totalPages: res.data.totalPages,
        loading: false,
      });
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
  editMember: async (memberData, userRole) => {
    set({ loading: true, error: null });
    try {
      const res = await updateMember(memberData, userRole);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch a member by its Id
  getMemberById: async (memberId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchUserById(memberId, "admin");
      set({
        selectedMemberId: memberId,
        userDetails: res?.data?.advocate,
        vehicleDetails: res?.data?.vehicles,
        clerkDetails: res?.data?.clerk,
        paymentDetails: res?.data?.payments,
        additionalInfo: res?.data?.info,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  resetSelectedMember: () =>
    set({
      selectedMemberId: null,
      userDetails: {},
      vehicleDetails: [],
      clerkDetails: [],
      paymentDetails: [],
      additionalInfo: {},
      loading: false,
      error: null,
    }),
}));
