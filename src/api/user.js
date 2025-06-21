import axios from "axios";
import { handleApiError } from "@/utilities/handleApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");
const getAdminToken = () => localStorage.getItem("admin_token");

// Fetch user by Id
export const fetchUserById = async (userId, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.get(`${API_URL}/dashboard/get-member/${userId}`, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Failed to fetch members");
    handleApiError(error, userRole);
  }
};
