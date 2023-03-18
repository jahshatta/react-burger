import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { setCookie, getCookie } from "../utils";

const BASE_URL = "https://norma.nomoreparties.space/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { status } = error.response;
    if (status === 403) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/token`, {
          token: getCookie("refreshToken"),
        });
        const { success, accessToken, refreshToken } = response.data;

        if (success) {
          localStorage.setItem("accessToken", accessToken.split("Bearer ")[1]);
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
