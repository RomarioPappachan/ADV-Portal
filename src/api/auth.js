import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Admin login
export const adminLoginApi = async (email, password) => {
  // console.log(email, password);
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password,
    });

    return res; // Return the response data (user & token)
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Invalid credentials");
    console.log(error);
  }
};

// Member Login Send OTP
export const sendOtpApi = async (mobileNo) => {
  console.log(mobileNo);
  try {
    const res = await axios.post(`${API_URL}/otp/send-otp`, {
      mobile: mobileNo,
    });
    return res; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

// Member Login Send OTP
export const verifyOtpApi = async (mobileNo, otp) => {
  // console.log(mobileNo, otp);
  try {
    const res = await axios.post(`${API_URL}/otp/verify-otp`, {
      session_id: "1234567890abcdef",
      otp: otp,
      mobile: mobileNo,
    });
    // console.log(res);

    return res; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};
