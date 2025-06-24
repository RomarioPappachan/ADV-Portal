import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Get associate lawyers
export const fetchAssociates = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/member/associates/${userId}`, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to fetch associate list");
    handleApiError(error, "user");
  }
};

// Get associate lawyers
export const createAssociate = async (associateData) => {
  try {
    const res = await axios.post(
      `${API_URL}/member/associates`,
      associateData,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to create associate");
    handleApiError(error, "user");
  }
};

// Get associate lawyers
export const updateAssociate = async (associateId, updatedData) => {
  try {
    const res = await axios.put(
      `${API_URL}/member/associates/${associateId}`,
      updatedData,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to update associate");
    handleApiError(error, "user");
  }
};

// Get associate lawyers
export const deleteAssociate = async (associateId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/member/associates/${associateId}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to delete associate");
    handleApiError(error, "user");
  }
};
