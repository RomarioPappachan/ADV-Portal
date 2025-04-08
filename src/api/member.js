import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("adminToken");

// Fetch all members
export const fetchAllMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/all-members`, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};
