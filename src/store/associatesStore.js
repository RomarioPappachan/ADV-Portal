import { create } from "zustand";
import { useAuthStore } from "@/store/authStore";
import {
  createAssociate,
  deleteAssociate,
  fetchAssociates,
  updateAssociate,
} from "@/api/associate";

export const useAssociateStore = create((set) => ({
  associatesList: [],
  loading: false,
  error: null,

  // getAssociates: async (userId) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await fetchAssociates(userId);
  //     set({
  //       associatesList: res.data.data,
  //       loading: false,
  //       error: null,
  //     });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //     throw err;
  //   }
  // },

  getAssociates: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchAssociates(userId); // or whatever your API call is
      const associatesList = response?.data?.data || [];

      set({ associatesList, loading: false, error: null });

      // ✅ Immediately update userInfo.associates
      const { userInfo, updateUserAssociates } = useAuthStore.getState();
      const associateString = associatesList
        .map((a) => a.enrollment_no)
        .filter(Boolean)
        .join(",");

      if (userInfo) {
        const updatedUserInfo = { ...userInfo, associates: associateString };
        updateUserAssociates(updatedUserInfo);
      }
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  addAssociate: async (associateData) => {
    set({ loading: true, error: null });
    try {
      const res = await createAssociate(associateData);

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  editAssociate: async (associateId, associateData) => {
    set({ loading: true, error: null });
    try {
      const res = await updateAssociate(associateId, associateData);
      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  removeAssociate: async (associateId) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteAssociate(associateId);
      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
