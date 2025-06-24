import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Get case proceedings
export const fetchProceedings = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/member/proceedings/${userId}`, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to fetch case proceedings");
    handleApiError(error, "user");
  }
};

// Add new case proceeding
export const createProceeding = async (proceedingData) => {
  try {
    const res = await axios.post(
      `${API_URL}/member/proceedings`,
      proceedingData,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to add proceeding");
    handleApiError(error, "user");
  }
};

// Update proceeding
export const updateProceeding = async (proceedingId, updatedData) => {
  try {
    const res = await axios.put(
      `${API_URL}/member/proceedings/${proceedingId}`,
      updatedData,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to update proceeding");
    handleApiError(error, "user");
  }
};

// Delete Proceeding
export const deleteProceeding = async (proceedingId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/member/proceedings/${proceedingId}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to delete proceeding");
    handleApiError(error, "user");
  }
};
