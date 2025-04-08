import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

export const adminLogin = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password,
    });
    console.log(res);

    return res; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
};
