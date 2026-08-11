import axios from "axios";

/**
 * Axios instance with base URL and auth interceptor
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Request interceptor to add auth token to headers
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor to normalize errors for consistent handling across app
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      status: error?.response?.status ?? null,
      message:
        error?.response?.data?.message || error?.message || "Unknown error",
      data: error?.response?.data ?? null,
      isNetworkError: !error?.response,
    };

    // Attach normalized payload for consumers
    error.normalized = normalized;

    return Promise.reject(error);
  },
);

export default api;
