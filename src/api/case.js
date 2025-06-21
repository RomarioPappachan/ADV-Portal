import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

export const fetchCauseList = async (date) => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/causelist`,
      {
        cldate: date,
      },
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to fetch cause list");
    handleApiError(error, "user");
  }
};

// Get case status
export const fetchCaseStatus = async (caseNo) => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/casestatus`,
      {
        cino: caseNo,
      },
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to fetch case status");
    handleApiError(error, "user");
  }
};
