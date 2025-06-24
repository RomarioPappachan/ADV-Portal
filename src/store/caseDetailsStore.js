import { create } from "zustand";
import { fetchCaseStatus } from "@/api/case";

export const useCaseDetailsStore = create((set) => ({
  caseDetails: {},
  caseStatus: "",
  lastListed: [],
  petitionerList: [],
  respondentList: [],
  servedon: [],
  acts: [],
  iaList: [],
  documents: [],
  hearinghistory: [],
  category: {},
  objections: {},
  trilacourt: [],
  firDetails: [],
  connectedCases: [],
  appealCases: [],
  arisedCases: [],
  loading: false,
  error: null,

  // Get cause list

  getCaseStatus: async (caseNo) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchCaseStatus(caseNo);

      set({
        caseDetails: res.data?.data?.basicDetails,
        caseStatus: res.data?.data?.status,
        lastListed: res.data?.data?.lastListed,
        petitionerList: res.data?.data?.petitioner,
        respondentList: res.data?.data?.respondent,
        servedon: res.data?.data?.servedon,
        acts: res.data?.data?.acts,
        iaList: res.data?.data?.ias,
        documents: res.data?.data?.documents,
        hearinghistory: res.data?.data?.hearinghistory,
        category: res.data?.data?.category,
        objections: res.data?.data?.objections,
        trialcourt: res.data?.data?.trilacourt,
        firDetails: res.data?.data?.firDetails,
        connectedCases: res.data?.data?.connectedCases,
        appealCases: res.data?.data?.appealCase,
        arisedCases: res.data?.data?.arisedCase,

        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
