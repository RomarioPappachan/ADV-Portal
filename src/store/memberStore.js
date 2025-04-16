import { create } from "zustand";
import { fetchAllMembers, createMember, updateMember } from "@/api/member";
import { fetchUserById } from "@/api/user";

export const useMemberStore = create((set) => ({
  members: [],

  selectedMemberId: null,
  userDetails: {}, //selected user
  vehicleDetails: [], //selected user
  clerkDetails: [], //selected user
  paymentDetails: [], //selected user
  additionalInfo: {}, //selected user
  loading: false,
  error: null,

  // Fetch all members
  getAllMembers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAllMembers();
      const allMembers = res?.data?.result;
      const startPoint = allMembers?.length - 50;
      const updatedMembers = allMembers?.splice(startPoint, 50);
      console.log(updatedMembers);
      set({
        members: updatedMembers,
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

  // Fetch a member by its Id
  getMemberById: async (memberId) => {
    console.log(memberId);
    set({ loading: true, error: null });
    try {
      const res = await fetchUserById(memberId);
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
