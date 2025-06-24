import { create } from "zustand";
import { fetchAdvCases, fetchCauseList } from "@/api/case";

const LOCAL_KEYS = {
  CAUSE_LIST: "cached_cause_list",
  MY_CASES: "cached_my_cases",
};

export const useCauseListStore = create((set) => ({
  courts: [],
  causeList: [],
  count: null,

  advCode: null,
  myCases: [],
  myCasesCount: null,

  loading: false,
  error: null,

  getCauseList: async (date, enrollmentNo) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchCauseList(date, enrollmentNo);

      const newData = {
        advCode: res.data?.advcode || [],
        causeList: res.data?.cases || [],
        count: res.data?.count || 0,
      };

      const newStr = JSON.stringify(newData);
      const cachedStr = localStorage.getItem(LOCAL_KEYS.CAUSE_LIST);

      if (newStr !== cachedStr) {
        localStorage.setItem(LOCAL_KEYS.CAUSE_LIST, newStr);
        set({
          advCode: newData.advCode,
          causeList: newData.causeList,
          myCasesCount: newData.count,
        });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getAdvCases: async (hcCode) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchAdvCases(hcCode);
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
          count: newData.count,
        });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Optional: Load cached data initially
  loadCachedData: () => {
    try {
      const causeListCache = JSON.parse(
        localStorage.getItem(LOCAL_KEYS.CAUSE_LIST)
      );
      const myCasesCache = JSON.parse(
        localStorage.getItem(LOCAL_KEYS.MY_CASES)
      );

      if (causeListCache) {
        set({
          courts: causeListCache.courts || [],
          causeList: causeListCache.causeList || [],
          myCasesCount: causeListCache.count || 0,
        });
      }

      if (myCasesCache) {
        set({
          advCode: myCasesCache.advCode,
          myCases: myCasesCache.myCases || [],
          count: myCasesCache.count || 0,
        });
      }
    } catch (err) {
      console.warn("Failed to load cached data:", err);
    }
  },
}));
