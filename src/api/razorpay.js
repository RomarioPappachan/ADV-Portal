import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage

const getToken = () => localStorage.getItem("auth_token");

// Update vehicle details
export const createRazorPayOrder = async (orderData) => {
  try {
    const res = await axios.post(`${API_URL}/payment/create-order`, orderData, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const verifyRazorpayPayment = async (paymentIds) => {
  try {
    const res = await axios.post(`${API_URL}/payment/verify`, paymentIds, {
      headers: { Authorization: `${getToken()}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};
