import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");

// Fetch all payments of parking sticker, Id Card and Medical Subscription
export const fetchAllPayments = async (paymentType) => {
  try {
    const res = await axios.get(
      `${API_URL}/dashboard/all-payments?payment_type=${paymentType}`,
      {
        headers: { Authorization: `${getToken()}` },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch payments"
    );
  }
};

// Add new payment
export const createPayment = async (paymentData) => {
  try {
    const res = await axios.post(`${API_URL}/payment/others`, paymentData, {
      headers: { Authorization: `${getToken()}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add payment");
  }
};
