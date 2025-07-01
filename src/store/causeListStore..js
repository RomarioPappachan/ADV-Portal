import { create } from "zustand";
import { fetchAdvCases, fetchCauseList, getCauseListPdf } from "@/api/case";

const LOCAL_KEYS = {
  CAUSE_LIST: "cached_cause_list",
  MY_CASES: "cached_my_cases",
};

export const useCauseListStore = create((set) => ({
  causeList: [],
  count: null,

  advCode: null,
  myCases: [],
  myCasesCount: null,

  loading: false,
  error: null,

  getCauseList: async (date, enrollmentNo) => {
    set({ loading: true, error: null, causeList: [] });

    try {
      const res = await fetchCauseList(date, enrollmentNo);

      set({
        advCode: res.data?.advCode || null,
        causeList: res.data?.cases || [],
        count: res.data?.count,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getAdvCases: async (enrollmentId) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchAdvCases(enrollmentId);
      console.log(res);
      const newData = {
        advCode: res.data?.advCode,
        myCases: res.data?.cases || [],
        count: res.data?.count || 0,
      };

      const newStr = JSON.stringify(newData);
      const cachedStr = localStorage.getItem(LOCAL_KEYS.MY_CASES);

      if (newStr !== cachedStr) {
        localStorage.setItem(LOCAL_KEYS.MY_CASES, newStr);
        set({
          advCode: newData.advCode,
          myCases: newData.myCases,
          myCasesCount: newData.count,
        });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  downloadCauseListPdf: async (dataToDownload) => {
    try {
      const res = await getCauseListPdf(dataToDownload);
      return res;
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Optional: Load cached data initially
  loadCachedData: () => {
    try {
      const myCasesCache = JSON.parse(
        localStorage.getItem(LOCAL_KEYS.MY_CASES)
      );

      if (myCasesCache) {
        set({
          advCode: myCasesCache.advCode,
          myCases: myCasesCache.myCases || [],
          myCasesCount: myCasesCache.count || 0,
        });
      }
    } catch (err) {
      console.warn("Failed to load cached data:", err);
    }
  },
}));
