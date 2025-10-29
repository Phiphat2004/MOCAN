// src/utils/axiosConfig.js
import axios from "axios";

// Tạo instance của axios
const axiosInstance = axios.create({
  baseURL: "https://ecosoap-q9lr.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn token vào request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
