import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Fetch user by Id
export const fetchUserById = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/get-member/${userId}`, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch members");
  }
};
