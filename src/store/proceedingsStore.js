import { create } from "zustand";
import {
  createProceeding,
  deleteProceeding,
  fetchProceedings,
  updateProceeding,
} from "@/api/proceedings";

export const useProceedingsStore = create((set) => ({
  proceedingsList: [],
  loading: false,
  error: null,

  getProceedings: async (caseNo, userId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchProceedings(caseNo, userId);
      set({
        proceedingsList: res.data.data || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  addProceeding: async (proceedingData) => {
    set({ loading: true, error: null });
    try {
      const res = await createProceeding(proceedingData);

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  editProceeding: async (proceedingId, proceedingData) => {
    set({ loading: true, error: null });
    try {
      const res = await updateProceeding(proceedingId, proceedingData);

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  removeProceeding: async (proceedingId) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteProceeding(proceedingId);

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
