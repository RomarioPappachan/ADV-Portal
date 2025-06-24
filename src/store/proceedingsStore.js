import { create } from "zustand";
import {
  createProceeding,
  deleteProceeding,
  fetchProceedings,
  updateProceeding,
} from "@/api/proceedings";

export const useProceedingsStore = create((set) => ({
  // {
  //     id: 1,
  //     cn_no: "KLHC010711322022",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     id: 2,
  //     cn_no: "KLHC010711322022",
  //     description: "hello world 1",
  //   },
  //   {
  //     id: 3,
  //     cn_no: "KLHC010711322022",
  //     description: "hello world 1",
  //   },
  //   {
  //     id: 4,
  //     cn_no: "KLHC010711322022",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     id: 5,
  //     cn_no: "KLHC010711322022",
  //     description: "hello world 1",
  //   },
  //   {
  //     id: 6,
  //     cn_no: "KLHC010711322022",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  //   {
  //     id: 7,
  //     cn_no: "KLHC010711322022",
  //     description: "hello world 1",
  //   },
  //   {
  //     id: 8,
  //     cn_no: "KLHC010711322022",
  //     description: "hello world 1",
  //   },

  proceedingsList: [],
  loading: false,
  error: null,

  getProceedings: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchProceedings(userId);
      set({
        proceedingsList: res.data.data,
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
