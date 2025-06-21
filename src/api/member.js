import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("auth_token");
const getAdminToken = () => localStorage.getItem("admin_token");

// Fetch all members
// export const fetchAllMembers = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/dashboard/all-members`, {
//       headers: { Authorization: `${getAdminToken()}` },
//     });
//     return res;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch members");
//   }
// };

export const fetchAllMembers = async (page, limit, search) => {
  try {
    const res = await axios.get(
      `${API_URL}/dashboard/all-advs`,
      { params: { page, limit, search } },
      {
        headers: { Authorization: `${getAdminToken()}` },
      }
    );
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch members");
  }
};

export const fetchProfileUptdMembers = async (date, page, limit) => {
  try {
    const res = await axios.get(
      `${API_URL}/dashboard/member-updates/${date}?page=${page}&limit=${limit}`,

      {
        headers: { Authorization: `${getAdminToken()}` },
      }
    );
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch members");
  }
};

// Add a new member
export const createMember = async (memberData) => {
  try {
    const res = await axios.post(
      `${API_URL}/dashboard/add-member`,
      memberData,
      {
        headers: { Authorization: `${getAdminToken()}` },
      }
    );
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create a new member"
    );
  }
};

// Update member details
export const updateMember = async (memberData, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.put(`${API_URL}/dashboard/upd-member`, memberData, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update member");
  }
};

// Add vehicle details
export const addVehicle = async (vehicleData, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.post(`${API_URL}/member/add-vehicle`, vehicleData, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add new vehicle"
    );
  }
};

// Update vehicle details
export const updateVehicle = async (vehicleData, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.put(`${API_URL}/member/upd-vehicle`, vehicleData, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update vehicle details"
    );
  }
};

// Delete vehicle details
export const deleteVehicle = async (vehicleId, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.delete(
      `${API_URL}/member/dlt-vehicle/${vehicleId}`,
      {
        headers: { Authorization: token },
      }
    );
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete vehicle details"
    );
  }
};

// Add clerk details
export const addClerk = async (clerkData, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.post(`${API_URL}/member/add-clerk`, clerkData, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add new clerk");
  }
};

// Update clerk details
export const updateClerk = async (clerkData, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.put(`${API_URL}/member/upd-clerk`, clerkData, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update clerk details"
    );
  }
};

// Delete clerk details
export const deleteClerk = async (clerkId, userRole) => {
  try {
    const token = userRole === "admin" ? getAdminToken() : getToken();

    const res = await axios.delete(`${API_URL}/member/dlt-clerk/${clerkId}`, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete clerk details"
    );
  }
};
