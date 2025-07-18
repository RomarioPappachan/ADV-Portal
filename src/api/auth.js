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
    throw new Error(error.response?.data?.message || "Invalid credentials");
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

// Member Login Verify OTP
export const verifyOtpApi = async (sessionId, mobileNo, otp) => {
  // console.log(mobileNo, otp);
  try {
    const res = await axios.post(`${API_URL}/otp/verify-otp`, {
      session_id: sessionId,
      otp: otp,
      mobile: mobileNo,
    });

    return res; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

// verify OTP for password reset
export const verifyOtpPwdApi = async (sessionId, mobileNo, otp) => {
  // console.log(mobileNo, otp);
  try {
    const res = await axios.post(`${API_URL}/otp/verify-otp-pwd`, {
      session_id: sessionId,
      otp: otp,
      mobile: mobileNo,
    });

    return res; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

// Set members password on first login
export const setPasswordApi = async (adv_id, mobile, password) => {
  try {
    const res = await axios.post(`${API_URL}/otp/setpwd`, {
      adv_id,
      mobile,
      password,
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Set password failed");
  }
};

// Member login using password
export const loginWithPasswordApi = async (mobile, password) => {
  try {
    const res = await axios.post(`${API_URL}/otp/advlogin`, {
      mobile,
      password,
    });

    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login Failed");
  }
};
