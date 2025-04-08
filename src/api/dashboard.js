import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("adminToken");

// Fetch total number of members
export const fetchTotalMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/total-members`, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

// Fetch total no of payments of parking sticker, Id Card and Medical Subscription
export const fetchTotalPayments = async (paymentType) => {
  try {
    const res = await axios.get(
      `${API_URL}/dashboard/total-payments?payment_type=${paymentType}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};
