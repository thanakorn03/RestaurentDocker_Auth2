import axios from "axios";
import TokenService from "./token.service";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// เพิ่ม response interceptor เพื่อ handle 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token หมดอายุหรือไม่ valid
      TokenService.removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;