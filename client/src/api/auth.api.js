import api from "./axios.js";

/**
 * Register new user
 * @param {Object} data - User registration data
 * @returns {Promise} Registration response
 */
export const registerUser = async (data) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

/**
 * Login user
 * @param {Object} data - User login credentials
 * @returns {Promise} Login response with token
 */
export const loginUser = async (data) => {
  const response = await api.post("/user/login", data);
  return response.data;
};

/**
 * Get user profile
 * @returns {Promise} User profile data
 */
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

/**
 * Update user profile
 * @param {Object} data - Profile update data
 * @returns {Promise} Updated profile response
 */
export const updateProfile = async (data) => {
  const response = await api.put("/user/update-profile", data);
  return response.data;
};

/**
 * Google OAuth login
 * @param {string} credential - Google credential token
 * @returns {Promise} Login response with token
 */
export const googleLogin = async (credential) => {
  const response = await api.post("/user/google", {
    credential,
  });

  return response.data;
};
