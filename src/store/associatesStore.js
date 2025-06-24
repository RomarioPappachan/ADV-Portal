import { create } from "zustand";
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

  getAssociates: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchAssociates(userId);
      set({
        associatesList: res.data.data,
        loading: false,
        error: null,
      });
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
