import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
// const getToken = () => localStorage.getItem("auth_token");
const getAdminToken = () => localStorage.getItem("admin_token");

// Fetch total number of members
export const fetchTotalMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/total-members`, {
      headers: { Authorization: `${getAdminToken()}` },
    });
    return res;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Failed to fetch courses");
    handleApiError(error, "admin");
  }
};

// Fetch total no of payments of parking sticker, Id Card and Medical Subscription
export const fetchTotalPayments = async (paymentType) => {
  try {
    const res = await axios.get(
      `${API_URL}/dashboard/total-payments?payment_type=${paymentType}`,
      {
        headers: { Authorization: `${getAdminToken()}` },
      }
    );

    return res;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Failed to fetch courses");
    handleApiError(error, "admin");
  }
};

// Importcauselist by admin
export const importCauseList = async (date) => {
  try {
    const res = await axios.post(
      `${API_URL}/hc/updlist`,
      {
        cldate: date,
      },
      {
        headers: { Authorization: `${getAdminToken()}` },
      }
    );
    return res;
  } catch (error) {
    // throw new Error(error?.data?.message || "Failed to import cause list");
    handleApiError(error, "admin");
  }
};
