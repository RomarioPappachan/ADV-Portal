import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Get live court room
export const fetchDisplayBoard = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/displayboard`,
      {},
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    // throw new Error(error?.data?.message || "Failed to fetch cause list");
    handleApiError(error, "user");
  }
};

// Get cause list
export const fetchCauseList = async (date, enrollmentNo) => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/causelist`,
      {
        cldate: date,
        en_no: enrollmentNo,
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

// Get cause list
export const fetchAdvCases = async (enrollmentId) => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/advcases`,
      {
        advCode: 0,
        barRegCode: enrollmentId,
      },
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
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

export const getCauseListPdf = async (dataToDownload) => {
  try {
    const res = await axios.post(
      `${API_URL}/dashboard/get-pdf`,
      dataToDownload,
      {
        responseType: "blob", // ✅ must be here
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    );
    return res;
  } catch (error) {
    handleApiError(error, "user");
  }
};
