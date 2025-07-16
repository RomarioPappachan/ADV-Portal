import { create } from "zustand";
import { fetchAdvCases, fetchCauseList, getCauseListPdf } from "@/api/case";
import dayjs from "dayjs";

const LOCAL_KEYS = {
  CAUSE_LIST: "cached_cause_list",
  MY_CASES: "cached_my_cases",
  ROOMS_META: "cached_room_nos",
};

const getRoomSortValue = (roomNo) => {
  if (!roomNo) return Infinity;

  const trimmed = roomNo.trim().toUpperCase();
  if (trimmed === "CJ") return -1;

  const match = trimmed.match(/^(\d+)([A-Z]*)$/);
  if (!match) return Infinity;

  const num = parseInt(match[1], 10);
  const suffix = match[2] || "";

  const suffixOffset =
    suffix.length > 0 ? suffix.charCodeAt(0) - "A".charCodeAt(0) + 1 : 0;

  return num * 100 + suffixOffset;
};

export const useCauseListStore = create((set) => ({
  causeList: [],
  count: null,

  advCode: null,
  myCases: [],
  myCasesCount: null,

  cachedRoomMeta: null,

  loading: false,
  error: null,

  getCauseList: async (date, enrollmentNo) => {
    set({ loading: true, error: null, causeList: [] });

    try {
      const res = await fetchCauseList(date, enrollmentNo);
      const rawCases = res.data?.cases || [];

      // sort for display by room no
      const sortedCases = [...rawCases].sort((a, b) => {
        const aVal = getRoomSortValue(a.room_no);
        const bVal = getRoomSortValue(b.room_no);
        return aVal - bVal;
      });

      set({
        advCode: res.data?.advCode || null,
        causeList: sortedCases,
        count: res.data?.count,
      });

      // ✅ Handle caching roomNos for today
      const cldate = res.data?.cldate;
      const today = dayjs().format("YYYY-MM-DD");

      // Step 1: Clear outdated cache if exists
      const existing = JSON.parse(localStorage.getItem(LOCAL_KEYS.ROOMS_META));
      if (existing?.cldate !== today || existing?.rooms.length < 1) {
        localStorage.removeItem(LOCAL_KEYS.ROOMS_META);
        set({ cachedRoomMeta: null });
      }

      // Step 2: Only cache if current API cldate is today
      if (cldate === today) {
        const roomNos = [
          ...new Set(
            rawCases
              .map((item) => item.room_no?.trim())
              .filter((room) => !!room)
          ),
        ];

        const cacheData = {
          cldate,
          rooms: roomNos,
        };

        const already = JSON.parse(localStorage.getItem(LOCAL_KEYS.ROOMS_META));

        if (!already || already.cldate !== today) {
          localStorage.setItem(
            LOCAL_KEYS.ROOMS_META,
            JSON.stringify(cacheData)
          );
          set({ cachedRoomMeta: cacheData }); // ✅ store update
        }
      }
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

  // ✅ Loads cached room meta if cldate === today
  loadCachedRoomMeta: () => {
    try {
      const roomMeta = JSON.parse(localStorage.getItem(LOCAL_KEYS.ROOMS_META));
      const today = dayjs().format("YYYY-MM-DD");

      if (roomMeta?.cldate === today) {
        set({ cachedRoomMeta: roomMeta });
      } else {
        localStorage.removeItem(LOCAL_KEYS.ROOMS_META); // remove outdated
        set({ cachedRoomMeta: null });
      }
    } catch (err) {
      console.warn("Failed to load cached room meta:", err);
    }
  },
}));
