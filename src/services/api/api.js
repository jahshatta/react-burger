import axios from "axios";
import { setCookie } from "../utils";

const BASE_URL = "https://norma.nomoreparties.space/api";

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// api.interceptors.request.use((config) => {});

api.interceptors.request.use(function (config) {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    if (status === 403) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/token`, {
          token: localStorage.getItem("refreshToken"),
        });
        const { success, accessToken, refreshToken } = response.data;

        if (success) {
          localStorage.setItem("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
        }
        return api(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh JWT:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
